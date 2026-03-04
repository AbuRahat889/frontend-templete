"use client";


import { FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type DragEvent,
} from "react";

export interface UploadedFile {
  id: string;
  file?: File;
  preview: string;
  type: "image" | "video" | "pdf";
  isDefault?: boolean;
}

interface UploadMediaProps {
  name: string;
  setValue: any; // 👈 pass it
  defaultFile?: string;
  label?: string;
  onUpload?: (formData: FormData) => Promise<void>;
}

export default function UploadMedia({
  name,
  setValue,
  defaultFile,
  label,
  onUpload,
}: UploadMediaProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  // ✅ Handle default file
  useEffect(() => {
    if (defaultFile) {
      const isVideo =
        defaultFile.includes(".mp4") ||
        defaultFile.includes(".webm") ||
        defaultFile.includes(".mov");

      const type = isVideo ? "video" : "image";

      const defaultUploaded: UploadedFile = {
        id: "default",
        preview: defaultFile,
        type,
        isDefault: true,
      };

      startTransition(() => {
        setUploadedFile(defaultUploaded);
        setValue(name, defaultFile, { shouldValidate: true });
      });
    }
  }, [defaultFile, name, setValue]);

  const handleFiles = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    const isPdf = file.type === "application/pdf";

    if (!isImage && !isVideo && !isPdf) return;

    const newUpload: UploadedFile = {
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: isImage ? "image" : isVideo ? "video" : "pdf",
    };

    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }

    setUploadedFile(newUpload);
    setValue(name, file, { shouldValidate: true });

    // lkj


    if (onUpload) {
      const formData = new FormData();
      formData.append("file", file);
      await onUpload(formData);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFiles(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    if (uploadedFile?.file) {
      URL.revokeObjectURL(uploadedFile.preview);
    }

    setUploadedFile(null);
    setValue(name, null, { shouldValidate: true });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <>
      {label && (
        <p className="block text-base font-medium text-gray-700">{label}</p>
      )}

      {!uploadedFile && (
        <div
          className={`bg-[#f5f5f5] border-2 border-dashed border-[#e0e0e0] rounded-md w-full ${
            isDragOver ? "bg-blue-50 border-blue-400" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDrop={handleDrop}
        >
          <div className="p-5 text-center space-y-4">
            <Upload className="h-12 w-12 text-blue-500 mx-auto" />
            <p className="text-sm md:text-lg text-gray-700">
              Drag & Drop your file
            </p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="bg-primaryColor text-sm rounded-md text-white px-6 py-2 md:text-base font-semibold"
            >
              Browse to Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      )}

      {uploadedFile && (
        <div>
          <div className="relative aspect-square w-60 rounded-lg overflow-hidden bg-gray-100">
            {uploadedFile.type === "image" ? (
              <Image
                src={uploadedFile.preview}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : uploadedFile.type === "video" ? (
              <video
                src={uploadedFile.preview}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FileText className="h-10 w-10 text-red-500 mb-2" />
              </div>
            )}

            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
