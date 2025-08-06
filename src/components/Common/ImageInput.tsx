import React, { useRef, useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Link } from "lucide-react";

interface ImageInputProps {
  value?: string | File | undefined;
  onChange?: (value: string | File | undefined) => void;
}

export default function ImageInput({ value, onChange }: ImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [inputType, setInputType] = useState<"file" | "url">("file");

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setPreview(value);
        setInputType("url");
      } else if (value instanceof File) {
        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);
        setInputType("file");
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange?.(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange?.(url);
  };

  const clearImage = () => {
    onChange?.(undefined);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Image</label>
      
      {/* Row Layout */}
      <div className="flex items-start space-x-4">
        
        {/* Circular Preview */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreview(null)}
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm z-10"
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Input Controls */}
        <div className="flex-1 space-y-3">
          
          {/* Input Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
            <button
              type="button"
              onClick={() => setInputType("file")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                inputType === "file"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload</span>
            </button>
            <button
              type="button"
              onClick={() => setInputType("url")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                inputType === "url"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Link className="h-3.5 w-3.5" />
              <span>URL</span>
            </button>
          </div>

          {/* Input Fields */}
          {inputType === "file" ? (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Choose file or drag and drop</span>
                </div>
              </label>
            </div>
          ) : (
            <input
              type="url"
              value={typeof value === "string" ? value : ""}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          )}

          {/* Error Message for broken URLs */}
          {typeof value === "string" && value && !preview && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <X className="h-3 w-3" />
              <span>Failed to load image from URL</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
