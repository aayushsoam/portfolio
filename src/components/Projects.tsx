
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import FadeInWhenVisible from './FadeInWhenVisible';
import { useProjects } from '../hooks/useProjects';

const scaleAnimation = {
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%"
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0]
    }
  }
};

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [modal, setModal] = useState({
    active: false,
    index: 0
  });

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
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
        duration: 0.8,
        ease: "power3"
      });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
        duration: 0.8,
        ease: "power3"
      });

      xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
        duration: 0.5,
        ease: "power3"
      });
      yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
        duration: 0.5,
        ease: "power3"
      });

      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
        duration: 0.45,
        ease: "power3"
      });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
        duration: 0.45,
        ease: "power3"
      });
    }
  }, []);

  const moveItems = (x: number, y: number) => {
    if (xMoveContainer.current && yMoveContainer.current && xMoveCursor.current && yMoveCursor.current && xMoveCursorLabel.current && yMoveCursorLabel.current) {
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
    setModal({
      active,
      index
    });
  };

  const handleMoreWorkClick = () => {
    window.location.href = '/work';
  };

  const handleGithubClick = (githubUrl: string) => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  const handleDemoClick = (demoUrl: string) => {
    if (demoUrl) {
      window.open(demoUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <section className="py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-gray-500 block mb-4">SELECTED WORK</span>
            <h2 className="text-4xl sm:text-5xl font-light">Projects</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-gray-500 block mb-4">SELECTED WORK</span>
            <h2 className="text-4xl sm:text-5xl font-light">Projects</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section onMouseMove={e => moveItems(e.clientX, e.clientY)} className="py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50">
      <FadeInWhenVisible>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-gray-500 block mb-4">SELECTED WORK</span>
            <h2 className="text-4xl sm:text-5xl font-light">Projects</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {projects.map((project, i) => (
              <div 
                key={project.id} 
                onMouseEnter={e => manageModal(true, i, e.clientX, e.clientY)} 
                onMouseLeave={e => manageModal(false, i, e.clientX, e.clientY)} 
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
            <AnimatedButton onClick={handleMoreWorkClick}>
              <span>More work</span>
            </AnimatedButton>
          </div>
        </div>
      </FadeInWhenVisible>
      
      {/* Modal with project image */}
      <motion.div 
        ref={modalContainer} 
        variants={scaleAnimation} 
        initial="initial" 
        animate={active ? "enter" : "closed"} 
        className="fixed h-[350px] w-[400px] bg-white pointer-events-none overflow-hidden rounded-2xl z-50"
      >
        <div 
          style={{
            top: `calc(${index} * -100%)`
          }} 
          className="h-full w-full relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, i) => (
            <div 
              key={project.id} 
              className="h-full w-full flex flex-col rounded-2xl relative" 
              style={{
                backgroundColor: project.color || '#F9F5F0'
              }}
            >
              <div className="w-full h-[75%] p-4">
                <img 
                  src={project.image_url || '/placeholder.svg'} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-center gap-2 p-4 pointer-events-auto">
                {project.github_url && (
                  <button
                    onClick={() => handleGithubClick(project.github_url)}
                    className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink size={12} />
                    GitHub
                  </button>
                )}
                {project.demo_url && (
                  <button
                    onClick={() => handleDemoClick(project.demo_url)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Live Demo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Cursor */}
      <motion.div 
        ref={cursor} 
        variants={scaleAnimation} 
        initial="initial" 
        animate={active ? "enter" : "closed"} 
        className="fixed w-20 h-20 rounded-full bg-black/75 z-50 flex items-center justify-center pointer-events-none" 
      />
      
      {/* Cursor Label */}
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
