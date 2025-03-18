
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Simplicity", "Elegance", "Clarity", "Precision", "Innovation"];

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

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`;

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

  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const slideUp = {
    initial: { y: 300 },
    exit: {
      y: -300,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
          style={{ zIndex: 9999 }}
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="text-4xl md:text-6xl lg:text-7xl font-light"
              >
                <span className="inline-block mr-3 w-4 h-4 bg-white rounded-full"></span>
                {words[index]}
              </motion.p>
              <svg className="fixed inset-0 h-full w-full pointer-events-none">
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
