
import { useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import TextReveal from './TextReveal';
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Figma, FileType, Wind, Braces, LayoutTemplate, FileCode, Zap, Download, FileText } from "lucide-react";
import { useWorkExperience } from "@/hooks/useWorkExperience";
import WorkExperienceDocumentModal from './WorkExperienceDocumentModal';
import type { Database } from '@/integrations/supabase/types';

type WorkExperienceDocument = Database['public']['Tables']['work_experience_documents']['Row'];

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
  const { data: workExperience, isLoading: isWorkExperienceLoading, error: workExperienceError } = useWorkExperience();
  
  const {
    scrollYProgress
  } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<WorkExperienceDocument | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const handleDocumentClick = (document: WorkExperienceDocument) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  const handleDownloadDocument = (document: WorkExperienceDocument, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(document.document_url, '_blank');
  };
  
  return (
    <>
      <motion.section ref={container} style={{
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
            
            {isWorkExperienceLoading ? (
              <div className="text-center text-gray-500">Loading work experience...</div>
            ) : workExperienceError ? (
              <div className="text-center text-red-500">Error loading work experience</div>
            ) : (
              <div className="space-y-12">
                {workExperience?.map((exp, index) => (
                  <FadeInWhenVisible key={exp.id} delay={0.2 * index} className="border-l-2 border-gray-300 pl-8 relative">
                    <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] top-0"></div>
                    <span className="text-sm text-gray-500 block mb-1">{exp.period}</span>
                    <h3 className="text-xl font-medium mb-1">{exp.position}</h3>
                    <h4 className="text-lg mb-3">{exp.company}</h4>
                    {exp.description && (
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                    )}
                    
                    {exp.work_experience_documents && exp.work_experience_documents.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Related Documents:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {exp.work_experience_documents.slice(0, 6).map((doc) => (
                            <div
                              key={doc.id}
                              onClick={() => handleDocumentClick(doc)}
                              className="relative cursor-pointer group overflow-hidden"
                              style={{
                                height: '50px',
                                width: '100px',
                                border: 'solid 2px black',
                                margin: '30px',
                                padding: '10px',
                                borderRadius: '10px'
                              }}
                            >
                              {/* Background image from document URL */}
                              <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{
                                  backgroundImage: `url(${doc.document_url})`,
                                  borderRadius: '8px'
                                }}
                              />
                              
                              <div className="relative z-10 flex items-center justify-between h-full">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                  <span className="text-xs font-medium truncate text-gray-800">
                                    {doc.document_name}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => handleDownloadDocument(doc, e)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded z-20"
                                  title="Open PDF in new tab"
                                >
                                  <Download className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                              
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-0"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FadeInWhenVisible>
                ))}
              </div>
            )}
            
            <motion.div style={{ height }} className="relative mt-24">
              <div className="absolute h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] shadow-[0px_60px_50px_rgba(0,0,0,0.748)] z-[1] bg-white">
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <WorkExperienceDocumentModal 
        document={selectedDocument}
        isOpen={isDocumentModalOpen}
        onClose={handleCloseDocumentModal}
      />
    </>
  );
};

export default Skills;
