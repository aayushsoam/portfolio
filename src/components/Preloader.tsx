
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "नमस्ते", "Hallo"];

// Animation variants
const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: {duration: 1, delay: 0.2}
  },
};

const slideUp = {
  initial: {
    top: 0
  },
  exit: {
    top: "-100vh",
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2}
  }
};

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

  // Modified path with more pronounced curve at the bottom
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height - 100} Q${dimension.width/2} ${dimension.height + 100} 0 ${dimension.height - 100} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
      d: targetPath,
      transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="introduction fixed h-screen w-screen flex items-center justify-center z-[99] bg-[#141516]"
          style={{
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="flex text-white text-[42px] items-center absolute z-[1]"
              >
                <span className="block w-[10px] h-[10px] bg-white rounded-full mr-[10px]"></span>
                {words[index]}
              </motion.p>
              <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
                <motion.path
                  fill="#141516"
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
