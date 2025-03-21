
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const slider1 = [
  {
    color: "#e3e5e7",
    src: "/placeholder.svg"
  },
  {
    color: "#d6d7dc",
    src: "/placeholder.svg"
  },
  {
    color: "#e3e3e3",
    src: "/placeholder.svg"
  },
  {
    color: "#21242b",
    src: "/placeholder.svg"
  }
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "/placeholder.svg"
  },
  {
    color: "#e5e0e1",
    src: "/placeholder.svg"
  },
  {
    color: "#d7d4cf",
    src: "/placeholder.svg"
  },
  {
    color: "#e1dad6",
    src: "/placeholder.svg"
  }
];

const SlidingImages = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1]">
      <motion.div style={{ x: x1 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {slider1.map((project, index) => (
          <div key={`slider1-${index}`} className="w-1/4 h-[20vw] flex items-center justify-center" style={{ backgroundColor: project.color }}>
            <div className="relative w-[80%] h-[80%]">
              <img 
                src={project.src} 
                alt="Project image" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {slider2.map((project, index) => (
          <div key={`slider2-${index}`} className="w-1/4 h-[20vw] flex items-center justify-center" style={{ backgroundColor: project.color }}>
            <div className="relative w-[80%] h-[80%]">
              <img 
                src={project.src} 
                alt="Project image" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ height }} className="relative mt-[100px]">
        <div className="absolute h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] shadow-[0px_60px_50px_rgba(0,0,0,0.748)] z-[1] bg-white">
        </div>
      </motion.div>
    </div>
  );
};

export default SlidingImages;
