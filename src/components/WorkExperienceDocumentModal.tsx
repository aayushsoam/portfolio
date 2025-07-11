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
const WorkExperienceDocumentModal = ({
  document,
  isOpen,
  onClose
}: WorkExperienceDocumentModalProps) => {
  if (!document) return null;
  const handleDownload = () => {
    window.open(document.document_url, '_blank');
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light mb-4 flex items-center justify-between">
            {document.document_name}
            <div className="flex items-center gap-2">
              
              
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative w-full">
            {/* Document Image Display */}
            <div className="w-full h-[600px] rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center">
              <img src={document.document_url} alt={document.document_name} className="max-w-full max-h-full object-contain" onError={e => {
              // Fallback to iframe if image fails to load
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                      <iframe 
                        src="${document.document_url}"
                        class="w-full h-full rounded-lg border"
                        title="${document.document_name}"
                      ></iframe>
                    `;
              }
            }} />
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>If the document doesn't display properly, you can download it using the button above.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default WorkExperienceDocumentModal;