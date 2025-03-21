
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import TextReveal from './TextReveal';

const skillCategories = [
  {
    title: "Development",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "WebGL"]
  },
  {
    title: "Design",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping", "Motion Design", "Accessibility"]
  },
  {
    title: "Other",
    skills: ["Project Management", "SEO", "Performance Optimization", "Responsive Design", "Git"]
  }
];

const experiences = [
  {
    company: "Design Studio",
    position: "Senior Developer",
    period: "2020 - Present",
    description: "Led the development of interactive websites for luxury brands and created immersive digital experiences."
  },
  {
    company: "Creative Agency",
    position: "Frontend Developer",
    period: "2018 - 2020",
    description: "Developed responsive websites and implemented animations using GSAP and Framer Motion."
  },
  {
    company: "Tech Startup",
    position: "UI/UX Designer",
    period: "2016 - 2018",
    description: "Designed user interfaces and created wireframes and prototypes for mobile and web applications."
  }
];

const Skills = () => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <motion.section 
      ref={container} 
      style={{ y }} 
      className="py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <TextReveal 
              text="My skills and expertise in creative development." 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-10" 
            />
            
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.6 }} 
              viewport={{ once: true }}
              className="text-base sm:text-lg text-gray-500 mb-8"
            >
              As a developer with a design background, I bring a unique perspective to projects, creating 
              visually appealing and functionally robust digital experiences.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <FadeInWhenVisible key={index} delay={0.2 * index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="text-gray-600">{skill}</li>
                  ))}
                </ul>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-12">Work Experience</h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <FadeInWhenVisible key={index} delay={0.2 * index} className="border-l-2 border-gray-300 pl-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] top-0"></div>
                <span className="text-sm text-gray-500 block mb-1">{exp.period}</span>
                <h3 className="text-xl font-medium mb-1">{exp.position}</h3>
                <h4 className="text-lg mb-3">{exp.company}</h4>
                <p className="text-gray-600">{exp.description}</p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
