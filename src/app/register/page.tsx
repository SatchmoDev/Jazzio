"use client"

import Pending from "@/components/Pending"
import { useActionState, useState } from "react"
import QRCode from "react-qr-code"
import { createMember } from "./actions"

export default function Register() {
  const [state, action] = useActionState(createMember, "")
  const [other, setOther] = useState(false)

  return (
    <>
      <h1>Register</h1>

      {state ? (
        <QRCode
          value={"https://habinout.vercel.app/member/" + state}
          bgColor="#fdf8ee"
          className="mx-auto mt-8"
        />
      ) : (
        <form action={action} className="flex flex-col">
          <label htmlFor="firstName">
            First Name (ስም) <Asterisk />
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="input mb-2"
          />

          <label htmlFor="fatherName">
            Father&apos;s Name (የአባት ስም) <Asterisk />
          </label>
          <input
            id="fatherName"
            name="fatherName"
            required
            className="input mb-2"
          />

          <label htmlFor="grandfatherName">
            Grandfather&apos;s Name (የአያት ስም) <Asterisk />
          </label>
          <input
            id="grandfatherName"
            name="grandfatherName"
            required
            className="input mb-2"
          />

          <label htmlFor="phoneNumber">
            Phone Number (ስልክ ቁጥር) <Asterisk />
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            pattern="(9|7)\d{8}"
            required
            className="input mb-2"
          />

          <label htmlFor="organization">
            Organization (የስራ ቦታ) <Asterisk />
          </label>
          <select
            id="organization"
            name="organization"
            className="input mb-2 h-[44px]"
            onChange={(e) => setOther(e.target.value === "Other")}
          >
            <option>Addis Ababa University</option>
            <option>Addis Ababa Institute of Technology</option>
            <option>Other</option>
          </select>

          {other && (
            <>
              <label htmlFor="organizationName">
                Organization Name (የተቋም ስም) <Asterisk />
              </label>
              <input
                id="organizationName"
                name="organizationName"
                required
                className="input mb-2"
              />
            </>
          )}

          <label htmlFor="idType">
            ID Type (የመታወቂያ አይነት) <Asterisk />
          </label>
          <select id="idType" name="idType" className="input mb-2 h-[44px]">
            <option>Driver&apos;s License</option>
            <option>Passport</option>
            <option>Kebele</option>
            <option>Employee ID</option>
            <option>School ID</option>
            <option>Ministry of Foreign Affairs ID</option>
            <option>Temporary Residence ID</option>
          </select>

          <label htmlFor="idNumber">
            ID Number (የመታወቂያ ቁጥር) <Asterisk />
          </label>
          <input
            id="idNumber"
            name="idNumber"
            required
            className="input mb-2"
          />

          <label htmlFor="dateOfBirth">
            Date of Birth (የልደት ቀን) <Asterisk />
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            className="input mb-2"
          />

          <label htmlFor="gender">
            Gender (ጾታ) <span className="text-red-500">*</span>
          </label>
          <select id="gender" name="gender" className="input mb-4 h-[44px]">
            <option>Male</option>
            <option>Female</option>
          </select>

          <Pending />
        </form>
      )}
    </>
  )
}

const Asterisk = () => <span className="text-red-500">*</span>
