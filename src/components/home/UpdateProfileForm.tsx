"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"

import { updateUser } from "@/actions/user"
import avatarPlaceholder from "@/assets/avatar-placeholder.svg"
import Button from "@/components/ui/Button"
import FileInput from "@/components/ui/FileInput"
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
        const response = await updateUser(data)
        if (!response.success) {
          setError("name", response.error)
        } else onSuccess()
      })}
    >
      <TextField
        label="Name"
        {...register("name")}
        errorMessage={errors.name?.message}
      />

      <div className="grid grid-cols-[auto_1fr] justify-items-start gap-x-5 gap-y-4">
        <Image
          src={avatarUrl ?? avatarPlaceholder}
          alt=""
          className="col-start-1 row-span-2 size-16 rounded-full"
          width={128}
          height={128}
        />
        <div className="col-start-2 grid content-start gap-1.5">
          <p className="text-lg leading-normal tracking-tight text-neutral-900">
            Upload Image
          </p>
          <p className="text-base leading-normal tracking-tight text-neutral-600">
            Max 250KB, PNG or JPEG
          </p>
        </div>
        <FileInput className="col-start-2" />
      </div>

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}
