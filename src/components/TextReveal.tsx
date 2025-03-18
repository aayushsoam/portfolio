
import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, amount: 0.2 });
  
  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay + (i * 0.03),
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  return (
    <div ref={textRef} className={`${className}`}>
      <p className="flex flex-wrap">
        {text.split(" ").map((word, index) => (
          <span key={index} className="overflow-hidden mr-[0.25em] relative inline-block">
            <motion.span
              custom={index}
              variants={wordVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </p>
    </div>
  );
};

export default TextReveal;
