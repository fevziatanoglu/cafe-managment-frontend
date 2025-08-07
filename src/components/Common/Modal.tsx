import useStore from "../../store";
import { X } from "lucide-react";

export default function Modal() {
  const { isModalOpen, modalContent, closeModal , modalTitle , modalSize } = useStore();
  
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl p-0 min-w-[320px] max-w-${modalSize} w-full lg:mx-10 mx-4 transform transition-all duration-300 scale-100`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">{modalTitle}</h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group hover:cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {modalContent}
        </div>
      </div>
    </div>
  );
}
