
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Database } from '@/integrations/supabase/types';

type Certificate = Database['public']['Tables']['certificates']['Row'];

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ certificate, isOpen, onClose }: CertificateModalProps) => {
  if (!certificate) return null;

  const handleDownload = () => {
    // Create a link element to download the certificate as PDF
    const link = document.createElement('a');
    link.href = certificate.image_url;
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light mb-4 flex items-center justify-between">
            {certificate.title}
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative w-full">
            <img 
              src={certificate.image_url} 
              alt={certificate.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-4">
            {certificate.description && (
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{certificate.description}</p>
              </div>
            )}
            
            {certificate.issued_by && (
              <div>
                <h3 className="text-lg font-medium mb-2">Issued By</h3>
                <p className="text-gray-600">{certificate.issued_by}</p>
              </div>
            )}
            
            {certificate.issued_date && (
              <div>
                <h3 className="text-lg font-medium mb-2">Issued Date</h3>
                <p className="text-gray-600">
                  {new Date(certificate.issued_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
