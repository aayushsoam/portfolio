
import SlidingImages from './SlidingImages';
import FadeInWhenVisible from './FadeInWhenVisible';

const ProjectShowcase = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
        <FadeInWhenVisible>
          <div className="mb-24 text-center">
            <span className="text-sm text-gray-500 block mb-4">SHOWCASE</span>
            <h2 className="text-4xl sm:text-5xl font-light">Selected projects</h2>
          </div>
        </FadeInWhenVisible>
      </div>
      
      <SlidingImages />
    </section>
  );
};

export default ProjectShowcase;
