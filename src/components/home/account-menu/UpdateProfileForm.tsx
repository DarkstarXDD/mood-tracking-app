"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { updateUser } from "@/actions/user"
import Button, { buttonStyles } from "@/components/ui/Button"
import FieldError from "@/components/ui/FieldError"
import LoadingDots from "@/components/ui/LoadingDots"
import SVGIcon from "@/components/ui/SVGIcon"
import TextField from "@/components/ui/TextField"
import useUser from "@/hooks/useUser"
import { userProfileSchemaClient } from "@/lib/schema"

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
  } = useForm<z.input<typeof userProfileSchemaClient>>({
    resolver: zodResolver(userProfileSchemaClient),
    defaultValues: {
      name: name,
      avatarFile: undefined,
    },
  })
  const {
    user: { email },
  } = useUser()

  const isDemoUser = email === "jane@doe.com"

  return (
    <form
      className="grid gap-6"
      onSubmit={handleSubmit(async (data) => {
        setStatus("loading")
        const response = await updateUser(data)
        if (!response.success) {
          setError("name", response.error)
          setStatus("idle")
        } else onSuccess()
      })}
    >
      {isDemoUser && (
        <p className="text-sm font-medium text-red-700">
          Updates to name or avatar are disabled for the demo user.
        </p>
      )}
      <fieldset
        className="grid gap-6 disabled:opacity-60"
        disabled={status === "loading" || isDemoUser}
      >
        <TextField
          label="Name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />

        <div className="grid grid-cols-[auto_1fr] items-center justify-items-start gap-x-5 gap-y-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              className="col-start-1 size-16 rounded-full"
              width={64}
              height={64}
            />
          ) : (
            <SVGIcon
              name="avatar-placeholder"
              className="col-start-1 size-16 rounded-full"
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
          <div className="col-start-1 col-end-3 grid gap-2">
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg,"
              {...register("avatarFile")}
              className={buttonStyles({
                variant: "secondary",
                size: "sm",
                className: "max-w-50 min-w-0 text-xs",
              })}
            />
            {errors.avatarFile?.message && (
              <FieldError>{errors.avatarFile.message.toString()}</FieldError>
            )}
          </div>
        </div>
      </fieldset>
      <Button type="submit" isDisabled={status === "loading" || isDemoUser}>
        {status === "loading" ? <LoadingDots /> : buttonText}
      </Button>
    </form>
  )
}
