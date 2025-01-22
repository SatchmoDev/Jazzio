"use client"

import Pending from "@/components/Pending"
import { useActionState } from "react"
import QRCode from "react-qr-code"
import { createMember } from "./actions"

export default function Register() {
  const [state, action] = useActionState(createMember, "")

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Register</h1>

      {state ? (
        <QRCode
          value={state}
          bgColor="#fdf8ee"
          className="mx-auto mt-8 w-4/5"
        />
      ) : (
        <form action={action} className="flex flex-col">
          <label htmlFor="first">First Name</label>
          <input
            id="first"
            name="first"
            required
            placeholder="First Name"
            className="input mb-2"
          />

          <label htmlFor="last">Last Name</label>
          <input
            id="last"
            name="last"
            required
            placeholder="Last Name"
            className="input mb-2"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            required
            placeholder="Phone Number"
            className="input mb-2"
          />

          <label htmlFor="type">ID Type</label>
          <select
            id="type"
            name="type"
            required
            className="input mb-2 h-[42px]"
          >
            <option value="kebele">Kebele</option>
            <option value="passport">Passport</option>
            <option value="license">License</option>
          </select>

          <label htmlFor="number">ID Number</label>
          <input
            id="number"
            name="number"
            required
            placeholder="ID Number"
            className="input mb-4"
          />

          <Pending />
        </form>
      )}
    </>
  )
}
