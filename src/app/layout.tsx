import "@/styles/base.css"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = { title: "Jazzio" }

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="mx-auto my-8 w-4/5 lg:w-3/5">{children}</main>
      </body>
    </html>
  )
}
