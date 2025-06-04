"use client"

import { CldUploadWidget } from "next-cloudinary"

import Button from "@/components/ui/Button"

type AvatarUploaderProps = {
  onUploadSuccess?: (url: string) => void
  className?: string
}

export default function AvatarUploader({
  onUploadSuccess,
  className,
}: AvatarUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset="mood_avatar_preset"
      onSuccess={({ info }) => console.log(info)}
    >
      {({ open }) => {
        return (
          <Button
            isDisabled={!!!open}
            variant="secondary"
            size="sm"
            className={className}
            onPress={() => open?.()}
          >
            Upload
          </Button>
        )
      }}
    </CldUploadWidget>
  )
}
