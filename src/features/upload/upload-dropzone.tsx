"use client"

import { useDropzone } from "react-dropzone"
import { UploadCloud, FileUp } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
  maxSize?: number
}

export function UploadDropzone({
  onFileSelect,
  disabled = false,
  maxSize = 20 * 1024 * 1024,
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
    maxFiles: 1,
    maxSize,
    disabled,
  })

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].errors[0].code === "file-too-large"

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} />
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.005 }}
        whileTap={{ scale: disabled ? 1 : 0.995 }}
      >
        <Card
          className={cn(
            "cursor-pointer border-dashed border-[#FF3B30]/40 p-12 transition-all duration-300 hover:border-[#FF3B30]/80",
            isDragActive && "border-[#FF3B30] bg-[#FF3B30]/5 scale-[1.01] shadow-[0_0_30px_rgba(255,59,48,0.25)]",
            disabled && "cursor-not-allowed opacity-50 hover:border-[#FF3B30]/40"
          )}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.div
              className={cn(
                "rounded-2xl border border-[#FF3B30]/30 bg-[#FF3B30]/10 p-4 transition-colors",
                isDragActive && "bg-[#FF3B30]/20 border-[#FF3B30]/50"
              )}
              animate={{ y: isDragActive ? 0 : [0, -6, 0] }}
              transition={{
                duration: 2.2,
                repeat: isDragActive ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {isDragActive ? (
                <FileUp className="h-8 w-8 text-[#FF3B30]" />
              ) : (
                <UploadCloud className="h-8 w-8 text-[#FF3B30]" />
              )}
            </motion.div>
            <div className="space-y-1">
              <p className="font-grotesk text-xl font-bold tracking-tight">
                {isDragActive ? "Release to Autopsy..." : "Drop your pitch deck here"}
              </p>
              <p className="text-xs text-[#8A8A8A]">
                Supports PDF and PPTX formats (Max 20MB)
              </p>
            </div>
            {isFileTooLarge && (
              <p className="text-xs text-[#FF3B30] font-semibold mt-2 animate-pulse">
                File size exceeds the 20MB limit.
              </p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
