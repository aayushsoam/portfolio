import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
const images1 = [{
  color: "#e3e5e7",
  src: "/placeholder.svg"
}, {
  color: "#d6d7dc",
  src: "/placeholder.svg"
}, {
  color: "#e3e3e3",
  src: "/placeholder.svg"
}, {
  color: "#f5f5f5",
  src: "/placeholder.svg"
}];
const images2 = [{
  color: "#d4e3ec",
  src: "/placeholder.svg"
}, {
  color: "#e5e0e1",
  src: "/placeholder.svg"
}, {
  color: "#d7d4cf",
  src: "/placeholder.svg"
}, {
  color: "#e1dad6",
  src: "/placeholder.svg"
}];
const SlidingImages = () => {
  const container = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  return <div ref={container} className="relative py-40 bg-black">
      <div className="overflow-hidden">
        <motion.div style={{
        x: x1
      }} className="flex gap-6 mb-6">
          {images1.map((image, index) => <div key={`a-${index}`} className="w-[350px] h-[200px] rounded-2xl overflow-hidden" style={{
          backgroundColor: image.color
        }}>
              <div className="relative w-[80%] h-[80%] mx-auto my-[10%]">
                <img src={image.src} alt="Project image" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>)}
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.div style={{
        x: x2
      }} className="flex gap-6">
          {images2.map((image, index) => <div key={`b-${index}`} className="w-[350px] h-[200px] rounded-2xl overflow-hidden" style={{
          backgroundColor: image.color
        }}>
              <div className="relative w-[80%] h-[80%] mx-auto my-[10%]">
                <img src={image.src} alt="Project image" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>)}
        </motion.div>
      </div>

      <motion.div style={{
      height
    }} className="relative mt-24">
        <div className="absolute h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] shadow-2xl bg-slate-50">
        </div>
      </motion.div>
    </div>;
};
export default SlidingImages;