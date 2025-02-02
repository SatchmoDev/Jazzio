"use client"

import { useFormStatus } from "react-dom"

export default function Pending({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={disabled || pending}
      className="button disabled:bg-primary/80 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  )
}
