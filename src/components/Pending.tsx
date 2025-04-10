"use client"

import { useFormStatus } from "react-dom"

export default function Pending({ text = "Submit" }: { text?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className={
        "button disabled:bg-primary/80 disabled:cursor-not-allowed " +
        (text === "Sign In" && "h-full w-full")
      }
    >
      {text}
    </button>
  )
}
