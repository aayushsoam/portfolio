
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
        <div className="text-lg text-gray-400">Loading certificates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-400">Error loading certificates: {error}</div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-400">No certificates found</div>
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
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {certificate.title}
                    </h3>
                    {certificate.issued_by && (
                      <p className="text-sm text-gray-400 mb-2">
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
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">Click to view details</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white border-gray-600 hover:bg-gray-700" />
        <CarouselNext className="text-white border-gray-600 hover:bg-gray-700" />
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
