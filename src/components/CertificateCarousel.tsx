
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCertificates } from '@/hooks/useCertificates';
import CertificateModal from './CertificateModal';
import type { Database } from '@/integrations/supabase/types';

type Certificate = Database['public']['Tables']['certificates']['Row'];

const CertificateCarousel = () => {
  const { certificates, loading, error } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-500">Loading certificates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-500">Error loading certificates: {error}</div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-500">No certificates found</div>
      </div>
    );
  }

  return (
    <div className="relative px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {certificates.map((certificate) => (
            <CarouselItem key={certificate.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleCertificateClick(certificate)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {certificate.title}
                    </h3>
                    {certificate.issued_by && (
                      <p className="text-sm text-gray-600 mb-2">
                        Issued by {certificate.issued_by}
                      </p>
                    )}
                    {certificate.issued_date && (
                      <p className="text-sm text-gray-500">
                        {new Date(certificate.issued_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CertificateCarousel;
