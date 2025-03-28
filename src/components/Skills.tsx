import { useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import TextReveal from './TextReveal';
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Figma, FileType, Wind, Braces, LayoutTemplate, FileCode, Zap } from "lucide-react";

const skillCategories = [{
  title: "Development",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "WebGL"]
}, {
  title: "Design",
  skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping", "Motion Design", "Accessibility"]
}, {
  title: "Other",
  skills: ["Project Management", "SEO", "Performance Optimization", "Responsive Design", "Git"]
}];

const experiences = [{
  company: "Design Studio",
  position: "Senior Developer",
  period: "2020 - Present",
  description: "Led the development of interactive websites for luxury brands and created immersive digital experiences."
}, {
  company: "Creative Agency",
  position: "Frontend Developer",
  period: "2018 - 2020",
  description: "Developed responsive websites and implemented animations using GSAP and Framer Motion."
}, {
  company: "Tech Startup",
  position: "UI/UX Designer",
  period: "2016 - 2018",
  description: "Designed user interfaces and created wireframes and prototypes for mobile and web applications."
}];

const skillsData = [{
  name: "Figma",
  icon: <Figma className="w-6 h-6" />,
  color: "bg-purple-500",
  percentage: 95,
  projects: ["Brand Redesign", "E-commerce UI", "Dashboard"]
}, {
  name: "Python",
  icon: <FileCode className="w-6 h-6" />,
  color: "bg-blue-500",
  percentage: 85,
  projects: ["Data Analysis", "Web Scraper", "API"]
}, {
  name: "HTML 5",
  icon: <FileType className="w-6 h-6" />,
  color: "bg-orange-500",
  percentage: 98,
  projects: ["Portfolio Site", "Landing Pages", "Email Templates"]
}, {
  name: "CSS",
  icon: <Wind className="w-6 h-6" />,
  color: "bg-blue-400",
  percentage: 92,
  projects: ["Animations", "Responsive Layouts", "Design Systems"]
}, {
  name: "JavaScript",
  icon: <Braces className="w-6 h-6" />,
  color: "bg-yellow-400",
  percentage: 90,
  projects: ["Interactive Forms", "Dynamic Content", "API Integration"]
}, {
  name: "Framer",
  icon: <Zap className="w-6 h-6" />,
  color: "bg-pink-500",
  percentage: 80,
  projects: ["Micro-interactions", "Motion Design", "Prototypes"]
}, {
  name: "React",
  icon: <Code className="w-6 h-6" />,
  color: "bg-blue-600",
  percentage: 95,
  projects: ["SPA", "Component Library", "Dashboard"]
}, {
  name: "Next.js",
  icon: <LayoutTemplate className="w-6 h-6" />,
  color: "bg-black",
  percentage: 88,
  projects: ["E-commerce", "Blog", "Corporate Site"]
}];

const scaleAnimation = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  hover: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const Skills = () => {
  const container = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  return <motion.section ref={container} style={{
    y
  }} className="py-20 sm:py-24 md:py-28 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50 lg:py-[240px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <div className="mb-12">
              <FadeInWhenVisible delay={0.2}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <img src="/lovable-uploads/25faa88e-62a5-43b8-bc2c-4d2d33a2bf45.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium">John Doe</h3>
                    <p className="text-gray-500">Creative Developer</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
            
            <TextReveal text="My skills and expertise in creative development." className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-10" />
            
            <motion.p initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.6
          }} viewport={{
            once: true
          }} className="text-base sm:text-lg text-gray-500 mb-8">
              As a developer with a design background, I bring a unique perspective to projects, creating 
              visually appealing and functionally robust digital experiences.
            </motion.p>
          </div>
          
          <div>
            <FadeInWhenVisible delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {skillsData.map((skill, index) => <HoverCard key={index} openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Card className={`cursor-pointer hover:shadow-md transition-all duration-300 group h-24 sm:h-28 flex items-center justify-center ${hoveredSkill === skill.name ? 'ring-2 ring-black' : ''}`} onMouseEnter={() => setHoveredSkill(skill.name)} onMouseLeave={() => setHoveredSkill(null)}>
                        <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full">
                          <div className={`${skill.color} p-2 rounded-full text-white mb-2 group-hover:scale-110 transition-transform duration-300`}>
                            {skill.icon}
                          </div>
                          <p className="text-xs sm:text-sm font-medium">{skill.name}</p>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent side="bottom" align="center" className="w-72 p-4 shadow-lg bg-white border-0" sideOffset={10}>
                      <motion.div initial="initial" animate="hover" exit="exit" variants={scaleAnimation}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`${skill.color} p-1.5 rounded-md text-white`}>
                            {skill.icon}
                          </div>
                          <h4 className="text-lg font-medium">{skill.name}</h4>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Proficiency</span>
                            <span className="text-sm font-semibold">{skill.percentage}%</span>
                          </div>
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm mb-2 font-medium">Recent Projects:</p>
                          <div className="flex flex-wrap gap-2">
                            {skill.projects.map((project, idx) => <Badge key={idx} variant="outline" className="bg-gray-100">
                                {project}
                              </Badge>)}
                          </div>
                        </div>
                      </motion.div>
                    </HoverCardContent>
                  </HoverCard>)}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-16 relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-12">Work Experience</h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => <FadeInWhenVisible key={index} delay={0.2 * index} className="border-l-2 border-gray-300 pl-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] top-0"></div>
                <span className="text-sm text-gray-500 block mb-1">{exp.period}</span>
                <h3 className="text-xl font-medium mb-1">{exp.position}</h3>
                <h4 className="text-lg mb-3">{exp.company}</h4>
                <p className="text-gray-600">{exp.description}</p>
              </FadeInWhenVisible>)}
          </div>
          
          <motion.div style={{ height }} className="relative mt-24">
            <div className="absolute h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] shadow-[0px_60px_50px_rgba(0,0,0,0.748)] z-[1] bg-white">
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>;
};

export default Skills;
