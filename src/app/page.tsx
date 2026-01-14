import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Courses } from "@/components/sections/Courses";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      <Experience />

      <Skills />

      <Projects />

      <Courses />

      <Education />

      <Contact />
    </div>
  );
}
