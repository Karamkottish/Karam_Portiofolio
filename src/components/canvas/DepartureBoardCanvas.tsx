"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three/webgpu"
import {
    Fn, If, Loop, clamp, cos, dot, exp, float, int, max, min, mix, normalize, positionGeometry,
    pow, screenCoordinate, select, sin, step, uniform, uniformArray, vec2, vec3, vec4,
} from "three/tsl"

const MAX_CELLS = 40
// Keep rendering this long after a perspective change so staggered flaps finish
const FLIP_WINDOW_MS = 1400
// Matches the flaps' CSS perspective (22rem)
const PERSPECTIVE = 352

/**
 * The board's light layer as a TSL node material. WebGPURenderer compiles it to WGSL on WebGPU
 * and to GLSL when it falls back to WebGL2, so one definition covers both.
 *
 * It draws only light: a cursor key light, a sheen across each turning leaf and a glint on its
 * free edge. Output is premultiplied and fully transparent wherever nothing is happening.
 */
function createBoardLight() {
    // Plain arrays the frame loop mutates in place; the uniform-array nodes upload them every render
    const cellRects = Array.from({ length: MAX_CELLS }, () => new THREE.Vector4())
    const cellTurns = new Array<number>(MAX_CELLS).fill(0)
    // 0 = split-flap (hinge in the middle, --flip), 1 = release-notes panel (hinge on top, --drop)
    const cellKinds = new Array<number>(MAX_CELLS).fill(0)

    const u = {
        size: uniform(new THREE.Vector2()),
        dpr: uniform(1),
        pointer: uniform(new THREE.Vector2()),
        light: uniform(0),
        dark: uniform(0),
        count: uniform(0, "int"),
        cells: uniformArray(cellRects, "vec4"),
        turns: uniformArray(cellTurns, "float"),
        kinds: uniformArray(cellKinds, "float"),
    }

    const shade = Fn(() => {
        // CSS pixels, origin top-left (TSL flips the WebGL fallback to match), like getBoundingClientRect
        const p = screenCoordinate.div(u.dpr)
        const fx = vec4(0).toVar()
        const onTile = float(0).toVar()

        // Without a cursor the light sits high above the board
        const lightPos = vec3(mix(vec2(u.size.x.mul(0.5), u.size.y.negate()), u.pointer, u.light), 240)
        const glintInk = vec3(u.dark)

        Loop({ start: int(0), end: u.count, type: "int", condition: "<" }, ({ i }) => {
            const c = u.cells.element(i)
            const inColumn = p.x.greaterThanEqual(c.x).and(p.x.lessThanEqual(c.x.add(c.z)))
            If(inColumn.and(p.y.greaterThanEqual(c.y)).and(p.y.lessThanEqual(c.y.add(c.w))), () => {
                onTile.assign(1)
            })

            const f = u.turns.element(i)
            const s = sin(clamp(f, 0, 1).mul(Math.PI))
            const near = p.y.greaterThan(c.y.sub(4)).and(p.y.lessThan(c.y.add(c.w).add(4)))

            If(s.greaterThan(0.002).and(inColumn).and(near), () => {
                const drop = u.kinds.element(i).greaterThan(0.5)
                // Split-flap leaves fall from the top half (edge above the hinge); the notes panel hangs below its hinge
                const dir = select(drop, float(1), float(-1))
                const leaf = select(drop, c.w, c.w.mul(0.5))
                const hinge = select(drop, c.y, c.y.add(c.w.mul(0.5)))
                const th = select(drop, float(1).sub(f).mul(Math.PI / 2), f.mul(Math.PI))
                const z = leaf.mul(sin(th))
                const edge = hinge.add(dir.mul(leaf).mul(cos(th)).mul(PERSPECTIVE).div(float(PERSPECTIVE).sub(z)))

                const onLeaf = step(min(hinge, edge), p.y).mul(step(p.y, max(hinge, edge)))
                const n = vec3(0, dir.negate().mul(sin(th)), cos(th))
                const facing = select(n.z.lessThan(0), n.negate(), n)
                const l = normalize(lightPos.sub(vec3(p, 0)))
                const h = normalize(l.add(vec3(0, 0, 1)))
                const spec = pow(max(dot(facing, h), 0), 36).mul(s).mul(onLeaf)
                const sheen = vec4(spec.mul(0.45))
                fx.assign(sheen.add(fx.mul(float(1).sub(sheen.w))))

                const d = p.y.sub(edge).div(1.1)
                const g = exp(d.mul(d).negate()).mul(s)
                const glint = vec4(glintInk, 1).mul(g.mul(mix(0.22, 0.5, u.dark)))
                fx.assign(glint.add(fx.mul(float(1).sub(glint.w))))
            })
        })

        // Light-mode tiles are near white with dark ink, so the glow only lands on the board around them
        const toPointer = u.pointer.sub(p)
        const glow = exp(dot(toPointer, toPointer).div(2 * 170 * 170).negate()).mul(u.light)
        const key = vec4(glow.mul(mix(float(0.3).mul(float(1).sub(onTile)), 0.085, u.dark)))

        return fx.add(key.mul(float(1).sub(fx.w)))
    })

    const material = new THREE.NodeMaterial()
    material.vertexNode = vec4(positionGeometry.xy, 0, 1)
    material.fragmentNode = shade()
    material.blending = THREE.NoBlending
    material.depthTest = false
    material.depthWrite = false
    material.toneMapped = false

    return {
        material,
        setCell(i: number, [x, y, w, h]: [number, number, number, number], turn: number, kind: number) {
            cellRects[i].set(x, y, w, h)
            cellTurns[i] = turn
            cellKinds[i] = kind
        },
        setFrame(frame: { count: number; width: number; height: number; dpr: number; pointer: { x: number; y: number }; light: number; dark: boolean }) {
            u.count.value = frame.count
            u.size.value.set(frame.width, frame.height)
            u.dpr.value = frame.dpr
            u.pointer.value.set(frame.pointer.x, frame.pointer.y)
            u.light.value = frame.light
            u.dark.value = frame.dark ? 1 : 0
        },
    }
}

type BoardState = {
    cells: HTMLElement[]
    rects: [number, number, number, number][]
    pointer: { x: number; y: number }
    target: { x: number; y: number }
    light: number
    lightTarget: number
    busyUntil: number
}

/** Untransformed position inside the board (the notes panel is rotated edge-on at rest). */
function offsetWithin(el: HTMLElement, root: HTMLElement): [number, number, number, number] {
    let x = 0
    let y = 0
    let node: HTMLElement | null = el
    while (node && node !== root) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent as HTMLElement | null
    }
    return [x, y, el.offsetWidth, el.offsetHeight]
}

function BoardLight() {
    const gl = useThree((state) => state.gl)
    const invalidate = useThree((state) => state.invalidate)
    const light = useMemo(() => createBoardLight(), [])
    const board = useRef<BoardState>({
        cells: [],
        rects: [],
        pointer: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        light: 0,
        lightTarget: 0,
        busyUntil: 0,
    })

    useEffect(() => () => light.material.dispose(), [light])

    useEffect(() => {
        const el = gl.domElement.closest<HTMLElement>("[data-departures]")
        if (!el) return
        const s = board.current

        const measure = () => {
            s.cells = Array.from(el.querySelectorAll<HTMLElement>(".flap, [data-drop]"))
                .filter((cell) => cell.getClientRects().length > 0)
                .slice(0, MAX_CELLS)
            s.rects = s.cells.map((cell) => offsetWithin(cell, el))
            invalidate()
        }

        const onMove = (e: PointerEvent) => {
            const origin = el.getBoundingClientRect()
            s.target = { x: e.clientX - origin.left, y: e.clientY - origin.top }
            if (s.light < 0.01) s.pointer = { ...s.target }
            s.lightTarget = 1
            // A hovered row's notes panel may be dropping
            s.busyUntil = performance.now() + 700
            invalidate()
        }
        const onLeave = () => {
            s.lightTarget = 0
            s.busyUntil = performance.now() + 700
            invalidate()
        }
        const onChange = () => {
            s.busyUntil = performance.now() + FLIP_WINDOW_MS
            invalidate()
        }

        const resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(el)
        const htmlObserver = new MutationObserver(onChange)
        htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-perspective", "class"] })
        el.addEventListener("pointermove", onMove)
        el.addEventListener("pointerleave", onLeave)
        el.addEventListener("focusin", onChange)
        document.fonts?.ready.then(measure)
        measure()

        return () => {
            resizeObserver.disconnect()
            htmlObserver.disconnect()
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerleave", onLeave)
            el.removeEventListener("focusin", onChange)
        }
    }, [gl, invalidate])

    useFrame((state) => {
        const s = board.current

        s.pointer.x += (s.target.x - s.pointer.x) * 0.2
        s.pointer.y += (s.target.y - s.pointer.y) * 0.2
        s.light += (s.lightTarget - s.light) * 0.14
        const easing =
            Math.abs(s.target.x - s.pointer.x) + Math.abs(s.target.y - s.pointer.y) > 0.4 ||
            Math.abs(s.lightTarget - s.light) > 0.004
        if (!easing) {
            s.pointer = { ...s.target }
            s.light = s.lightTarget
        }

        // Flaps and notes animate in CSS; read their live values so light and paper stay in lockstep
        let turning = false
        s.cells.forEach((cell, i) => {
            const drop = cell.hasAttribute("data-drop")
            const prop = drop ? "--drop" : cell.hasAttribute("data-flap") ? "--flip" : null
            const f = prop ? parseFloat(getComputedStyle(cell).getPropertyValue(prop)) || 0 : 0
            if (Math.abs(f - Math.round(f)) > 0.0005) turning = true
            light.setCell(i, s.rects[i], f, drop ? 1 : 0)
        })

        light.setFrame({
            count: s.cells.length,
            width: state.size.width,
            height: state.size.height,
            dpr: state.viewport.dpr,
            pointer: s.pointer,
            light: s.light,
            dark: document.documentElement.classList.contains("dark"),
        })

        // Zero frames at rest: only ask for another one while something is still moving
        if (easing || turning || performance.now() < s.busyUntil) invalidate()
    })

    return (
        <mesh frustumCulled={false} material={light.material}>
            <planeGeometry args={[2, 2]} />
        </mesh>
    )
}

export default function DepartureBoardCanvas() {
    const [ready, setReady] = useState(false)

    return (
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 1 : 0 }}>
            <Canvas
                frameloop="demand"
                dpr={[1, 1.5]}
                flat
                linear
                gl={async (props) => {
                    // Always an element here: the canvas is never transferred to a worker
                    const canvas = props.canvas as HTMLCanvasElement
                    // WebGPU where an adapter exists; otherwise go straight to three's WebGL2 backend
                    // (asking first avoids three's "WebGPU is not available" console warning)
                    const adapter = await navigator.gpu?.requestAdapter({ powerPreference: "low-power" }).catch(() => null)
                    const renderer = new THREE.WebGPURenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power", forceWebGL: !adapter })
                    await renderer.init()
                    canvas.dataset.backend = "isWebGPUBackend" in renderer.backend ? "webgpu" : "webgl2"
                    return renderer
                }}
                style={{ pointerEvents: "none" }}
                onCreated={() => setReady(true)}
            >
                <BoardLight />
            </Canvas>
        </div>
    )
}
