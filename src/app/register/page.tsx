"use client"

import Pending from "@/components/Pending"
import { useActionState } from "react"
import QRCode from "react-qr-code"
import { createMember } from "./actions"

export default function Register() {
  const [state, action] = useActionState(createMember, "")

  return (
    <>
      <h1>Register</h1>

      {state ? (
        <QRCode value={state} bgColor="#fdf8ee" className="mx-auto mt-8" />
      ) : (
        <form action={action} className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            required
            placeholder="First Name"
            className="input mb-2"
          />

          <label htmlFor="fatherName">Father&apos;s Name</label>
          <input
            id="fatherName"
            name="fatherName"
            required
            placeholder="Father's Name"
            className="input mb-2"
          />

          <label htmlFor="grandfatherName">Grandfather&apos;s Name</label>
          <input
            id="grandfatherName"
            name="grandfatherName"
            required
            placeholder="Grandfather's Name"
            className="input mb-2"
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="Phone Number"
            className="input mb-2"
          />

          <label htmlFor="organization">Organization</label>
          <select
            id="organization"
            name="organization"
            className="input mb-2 h-[44px]"
          >
            <option>Addis Ababa University</option>
            <option>Addis Ababa Institute of Technology</option>
          </select>

          <label htmlFor="documentType">Document Type</label>
          <select
            id="documentType"
            name="documentType"
            className="input mb-2 h-[44px]"
          >
            <option>Driver&apos;s License</option>
            <option>Passport</option>
            <option>Kebele</option>
            <option>Employee ID</option>
            <option>School ID</option>
            <option>Ministry of Foreign Affairs ID</option>
          </select>

          <label htmlFor="documentNumber">Document Number</label>
          <input
            id="documentNumber"
            name="documentNumber"
            required
            placeholder="Document Number"
            className="input mb-4"
          />

          <Pending />
        </form>
      )}
    </>
  )
}
