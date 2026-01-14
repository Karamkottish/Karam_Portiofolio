import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Courses } from "@/components/sections/Courses";
import { Education } from "@/components/sections/Education";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      <Experience />

      <Skills />

      <Projects />

      <Courses />

      <Education />

      <section id="contact" className="py-20 px-4 flex items-center justify-center">
        <h2 className="text-4xl font-bold opacity-20">Contact Section (Coming Soon)</h2>
      </section>
    </div>
  );
}
