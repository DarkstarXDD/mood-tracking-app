"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateUser } from "@/actions/user"
import AvatarUploader from "@/components/ui/AvatarUploader"
import Button from "@/components/ui/Button"
import FileInput from "@/components/ui/FileInput"
import LoadingDots from "@/components/ui/LoadingDots"
import SVGIcon from "@/components/ui/SVGIcon"
import TextField from "@/components/ui/TextField"
import { userProfileSchema } from "@/lib/schema"

import type { UserProfileSchemaType } from "@/lib/schema"

type UpdateProfileFormProps = {
  buttonText: string
  name?: string
  avatarUrl?: string
  onSuccess: () => void
}

export default function UpdateProfileForm({
  buttonText,
  name,
  avatarUrl,
  onSuccess,
}: UpdateProfileFormProps) {
  const [status, setStatus] = useState<"idle" | "loading">("idle")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: name,
      avatarUrl: avatarUrl,
    },
  })

  return (
    <form
      className="grid gap-6"
      onSubmit={handleSubmit(async (data) => {
        setStatus("loading")
        const response = await updateUser(data)
        if (!response.success) {
          setError("name", response.error)
          setStatus("loading")
        } else onSuccess()
      })}
    >
      <fieldset
        className="grid gap-6 disabled:opacity-60"
        disabled={status === "loading"}
      >
        <TextField
          label="Name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />

        <div className="grid grid-cols-[auto_1fr] justify-items-start gap-x-5 gap-y-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              className="col-start-1 row-span-2 size-16 rounded-full"
              width={64}
              height={64}
            />
          ) : (
            <SVGIcon
              name="avatar-placeholder"
              className="col-start-1 row-span-2 size-16 rounded-full"
            />
          )}
          <div className="col-start-2 grid content-start gap-1.5">
            <p className="text-lg leading-normal tracking-tight text-neutral-900">
              Upload Image
            </p>
            <p className="text-base leading-normal tracking-tight text-neutral-600">
              Max 250KB, PNG or JPEG
            </p>
          </div>
          {/* <FileInput className="col-start-2" /> */}
          <AvatarUploader className="col-start-2" />
        </div>
      </fieldset>

      <Button type="submit">
        {status === "loading" ? <LoadingDots /> : buttonText}
      </Button>
    </form>
  )
}
