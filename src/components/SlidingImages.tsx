
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useSlidingImages } from '@/hooks/useSlidingImages';

const SlidingImages = () => {
  const container = useRef(null);
  const { slider1Images, slider2Images, loading, error } = useSlidingImages();
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  if (loading) {
    return (
      <div className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1] min-h-[500px] items-center justify-center">
        <div className="text-gray-500">Loading images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1] min-h-[500px] items-center justify-center">
        <div className="text-red-500">Error loading images: {error}</div>
      </div>
    );
  }

  return (
    <div ref={container} className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1]">
      <motion.div style={{ x: x1 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {slider1Images.map((project, index) => (
          <div 
            key={`slider1-${project.id}`} 
            className="w-1/4 h-[20vw] flex items-center justify-center" 
            style={{ backgroundColor: project.background_color || '#e3e5e7' }}
          >
            <div className="relative w-[80%] h-[80%]">
              <img 
                src={project.image_url} 
                alt="Project image" 
                loading="lazy" 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {slider2Images.map((project, index) => (
          <div 
            key={`slider2-${project.id}`} 
            className="w-1/4 h-[20vw] flex items-center justify-center" 
            style={{ backgroundColor: project.background_color || '#e3e5e7' }}
          >
            <div className="relative w-[80%] h-[80%]">
              <img 
                src={project.image_url} 
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
