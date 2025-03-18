
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedButton from './AnimatedButton';
import Magnetic from './Magnetic';
import FadeInWhenVisible from './FadeInWhenVisible';

interface Project {
  title: string;
  category: string;
  src: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "Harmony",
    category: "Interface Design",
    src: "/placeholder.svg",
    color: "#F9F5F0"
  },
  {
    title: "Serenity",
    category: "Design & Development",
    src: "/placeholder.svg",
    color: "#F5F5F5"
  },
  {
    title: "Essence",
    category: "Product Design",
    src: "/placeholder.svg",
    color: "#F0F0F0"
  },
  {
    title: "Balance",
    category: "Visual Identity",
    src: "/placeholder.svg",
    color: "#EAEAEA"
  }
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { 
    scale: 1, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
  },
  closed: { 
    scale: 0, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } 
  }
};

const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  
  const xMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const yMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  
  useEffect(() => {
    // Initialize GSAP animations
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      // Move modal container
      xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
      
      // Move cursor
      xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
      yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
      
      // Move cursor label
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
    }
  }, []);
  
  const moveItems = (x: number, y: number) => {
    if (xMoveContainer.current && yMoveContainer.current && 
        xMoveCursor.current && yMoveCursor.current && 
        xMoveCursorLabel.current && yMoveCursorLabel.current) {
      xMoveContainer.current(x);
      yMoveContainer.current(y);
      xMoveCursor.current(x);
      yMoveCursor.current(y);
      xMoveCursorLabel.current(x);
      yMoveCursorLabel.current(y);
    }
  };
  
  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <section 
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
      className="py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48"
    >
      <FadeInWhenVisible>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-gray-500 block mb-4">SELECTED WORK</span>
            <h2 className="text-4xl sm:text-5xl font-light">Projects</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {projects.map((project, i) => (
              <div 
                key={i}
                onMouseEnter={(e) => manageModal(true, i, e.clientX, e.clientY)}
                onMouseLeave={(e) => manageModal(false, i, e.clientX, e.clientY)}
                className="py-12 sm:py-16 flex justify-between items-center cursor-pointer group"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light transition-transform duration-300 group-hover:translate-x-[-10px] group-hover:opacity-50">
                  {project.title}
                </h3>
                <p className="text-gray-500 transition-transform duration-300 group-hover:translate-x-[10px] group-hover:opacity-50">
                  {project.category}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <AnimatedButton>
              <span>More work</span>
            </AnimatedButton>
          </div>
        </div>
      </FadeInWhenVisible>
      
      {/* Image preview on hover */}
      <motion.div 
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="fixed h-[350px] w-[400px] bg-white pointer-events-none overflow-hidden rounded-2xl z-50"
      >
        <div 
          style={{ top: `calc(${index} * -100%)` }}
          className="h-full w-full relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, i) => (
            <div 
              key={i}
              className="h-full w-full flex items-center justify-center rounded-2xl"
              style={{ backgroundColor: project.color }}
            >
              <div className="w-[80%] h-[80%]">
                <img 
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="fixed w-20 h-20 rounded-full bg-black/75 z-50 flex items-center justify-center pointer-events-none"
      />
      
      <motion.div 
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="fixed text-white text-sm font-light z-50 pointer-events-none"
      >
        View
      </motion.div>
    </section>
  );
};

export default Projects;
