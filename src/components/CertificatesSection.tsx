import FadeInWhenVisible from './FadeInWhenVisible';
import CertificateCarousel from './CertificateCarousel';
const CertificatesSection = () => {
  return <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-[#fdfdfd] rounded-b-[10%] z-20 ">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible>
          <div className="mb-16">
            <span className="text-sm text-gray-500 block mb-4">CERTIFICATES</span>
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              My Certifications
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Professional certifications and achievements that showcase my expertise and commitment to continuous learning.
            </p>
          </div>
        </FadeInWhenVisible>
        
        <FadeInWhenVisible delay={0.2}>
          <CertificateCarousel />
        </FadeInWhenVisible>
      </div>
    </section>;
};
export default CertificatesSection;