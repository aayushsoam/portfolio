
import FadeInWhenVisible from './FadeInWhenVisible';
import CertificateCarousel from './CertificateCarousel';

const CertificatesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
        <FadeInWhenVisible>
          <div className="mb-12 text-center">
            <span className="text-sm text-gray-500 block mb-4">ACHIEVEMENTS</span>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900">My Certificates</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Professional certifications and achievements that showcase my expertise and commitment to continuous learning.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
      
      <CertificateCarousel />
    </section>
  );
};

export default CertificatesSection;
