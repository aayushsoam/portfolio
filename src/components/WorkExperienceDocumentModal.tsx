
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import type { Database } from '@/integrations/supabase/types';

type WorkExperienceDocument = Database['public']['Tables']['work_experience_documents']['Row'];

interface WorkExperienceDocumentModalProps {
  document: WorkExperienceDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkExperienceDocumentModal = ({ document, isOpen, onClose }: WorkExperienceDocumentModalProps) => {
  if (!document) return null;

  const handleDownload = () => {
    window.open(document.document_url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light mb-4 flex items-center justify-between">
            {document.document_name}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative w-full">
            <iframe 
              src={document.document_url}
              className="w-full h-[600px] rounded-lg border"
              title={document.document_name}
            />
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>If the PDF doesn't display properly, you can download it using the button above.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkExperienceDocumentModal;
