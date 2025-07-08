
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useSlidingImages } from '@/hooks/useSlidingImages';

const SlidingImages = () => {
  const container = useRef(null);
  const { data: slidingImages, isLoading, error } = useSlidingImages();

  const {
    scrollYProgress
  } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  if (isLoading) {
    return (
      <div className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1] h-[50vh] items-center justify-center">
        <div className="text-gray-500">Loading sliding images...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading sliding images:', error);
    return (
      <div className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1] h-[50vh] items-center justify-center">
        <div className="text-red-500">Error loading images</div>
      </div>
    );
  }

  // Group images by section
  const section1Images = slidingImages?.filter(img => img.section === 1) || [];
  const section2Images = slidingImages?.filter(img => img.section === 2) || [];

  const renderMediaItem = (item: any, index: number, section: number) => (
    <div 
      key={`slider${section}-${item.id || index}`} 
      className="w-1/4 h-[20vw] flex items-center justify-center" 
      style={{
        backgroundColor: item.background_color || '#e3e5e7'
      }}
    >
      <div className="relative w-[80%] h-[80%]">
        {item.media_type === 'video' ? (
          <video 
            src={item.image_url} 
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img 
            src={item.image_url} 
            alt={item.title || "Sliding image"} 
            loading="lazy" 
            className="w-full h-full object-cover rounded-2xl" 
          />
        )}
        {item.title && (
          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
            <div className="font-semibold">{item.title}</div>
            {item.description && (
              <div className="text-xs opacity-90 mt-1">{item.description}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={container} className="slidingImages flex flex-col gap-[3vw] relative mt-[200px] bg-white z-[1]">
      <motion.div style={{
        x: x1
      }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {section1Images.map((item, index) => renderMediaItem(item, index, 1))}
      </motion.div>

      <motion.div style={{
        x: x2
      }} className="flex relative gap-[3vw] w-[120vw] left-[-10vw]">
        {section2Images.map((item, index) => renderMediaItem(item, index, 2))}
      </motion.div>

      <motion.div style={{
        height
      }} className="relative mt-[100px]">
        <div className="absolute h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] shadow-[0px_60px_50px_rgba(0,0,0,0.748)] z-[1] bg-white">
        </div>
      </motion.div>
    </div>
  );
};

export default SlidingImages;
