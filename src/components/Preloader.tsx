
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "नमस्ते", "Hallo"];

const Preloader = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
      return;
    }
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const slideUp = {
    initial: { y: 0 },
    exit: {
      y: -dimension.height,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="text-5xl md:text-7xl font-light flex items-center"
              >
                <span className="inline-block mr-4 w-3 h-3 bg-white rounded-full"></span>
                {words[index]}
              </motion.p>
              <svg className="absolute inset-0 w-full h-full">
                <motion.path
                  fill="#000000"
                  variants={curve}
                  initial="initial"
                  exit="exit"
                ></motion.path>
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
