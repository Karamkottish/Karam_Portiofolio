import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      <Experience />

      <Skills />

      <Projects />

      <section id="courses" className="min-h-screen py-20 px-4 flex items-center justify-center bg-secondary/20">
        <h2 className="text-4xl font-bold opacity-20">Courses Section (Coming Soon)</h2>
      </section>

      <section id="diploma" className="min-h-screen py-20 px-4 flex items-center justify-center">
        <h2 className="text-4xl font-bold opacity-20">Diploma Section (Coming Soon)</h2>
      </section>

      <section id="education" className="min-h-screen py-20 px-4 flex items-center justify-center bg-secondary/20">
        <h2 className="text-4xl font-bold opacity-20">Education Section (Coming Soon)</h2>
      </section>
    </div>
  );
}
