"use client"

import Pending from "@/components/Pending"
import Image from "next/image"
import { useActionState, useState } from "react"
import QRCode from "react-qr-code"
import { createMember } from "./actions"

export default function Register() {
  const [state, action] = useActionState(createMember, "")
  const [other, setOther] = useState(false)
  const [otherEmail, setOtherEmail] = useState(false)

  return (
    <>
      <div className="mb-2 flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="American Spaces Logo"
          width={80}
          height={80}
        />

        <h1 className="mt-3 text-2xl md:text-4xl">
          Satchmo American Center Membership
        </h1>
      </div>

      {state ? (
        <div className="text-center text-lg">
          <p>Please take a screenshot of this image</p>
          <p>እባክዎ የዚህን ምስል እይታ በስልክዎ ፎቶ ያንሱ</p>

          <QRCode
            value={"https://jazzio.land/member/" + state}
            bgColor="#fdf8ee"
            className="mx-auto mt-8"
          />
        </div>
      ) : (
        <form action={action} className="flex flex-col">
          <label htmlFor="nameFirst" className="font-semibold">
            First Name (ስም) <Asterisk />
          </label>
          <input
            id="nameFirst"
            name="nameFirst"
            required
            pattern="[A-Za-z -.'/]+"
            className="input mb-3"
          />

          <label htmlFor="nameFather" className="font-semibold">
            Father&apos;s Name (የአባት ስም) <Asterisk />
          </label>
          <input
            id="nameFather"
            name="nameFather"
            required
            pattern="[A-Za-z -.'/]+"
            className="input mb-3"
          />

          <label htmlFor="nameGrandfather" className="font-semibold">
            Grandfather&apos;s Name (የአያት ስም) <Asterisk />
          </label>
          <input
            id="nameGrandfather"
            name="nameGrandfather"
            required
            pattern="[A-Za-z -.'/]+"
            className="input mb-3"
          />

          <label htmlFor="phoneNumber" className="font-semibold">
            Mobile Number (ስልክ ቁጥር) <Asterisk />
          </label>
          <p>Nine digits. Do not begin with zero.</p>
          <input
            id="phoneNumber"
            name="phoneNumber"
            pattern="(9|7)\d{8}"
            required
            className="input mb-3"
          />

          <div className="mb-3 flex items-center gap-2">
            <div className="flex w-full flex-col">
              <label htmlFor="email" className="font-semibold">
                Email (ኢሜይል) <Asterisk />
              </label>
              <input
                id="email"
                name="email"
                required
                pattern="[^@]*"
                className="input w-full disabled:opacity-40"
                disabled={otherEmail}
              />
            </div>

            <p className="mt-5 text-xl">@</p>

            <div className="flex w-full flex-col">
              <label htmlFor="domain" className="font-semibold">
                Domain <Asterisk />
              </label>
              <select
                id="domain"
                name="domain"
                className="input h-[44px] w-full"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setOtherEmail(true)
                  } else {
                    setOtherEmail(false)
                  }
                }}
                required
                defaultValue=""
              >
                <option disabled></option>
                <option>gmail.com</option>
                <option>yahoo.com</option>
                <option>hotmail.com</option>
                <option>outlook.com</option>
                <option>icloud.com</option>
                <option>aau.edu.et</option>
                <option>aastu.edu.et</option>
                <option>smuc.edu.et</option>
                <option>ethiotelecom.et</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {otherEmail && (
            <>
              <label htmlFor="fullEmail" className="font-semibold">
                Full Email (ሙሉ የኢሜይል አድራሻ) <Asterisk />
              </label>
              <input
                id="fullEmail"
                name="fullEmail"
                type="email"
                required
                className="input mb-3"
              />
            </>
          )}

          <label htmlFor="organization" className="font-semibold">
            School / Organization (ትምህርት ቤት / የስራ ቦታ) <Asterisk />
          </label>
          <select
            id="organization"
            name="organization"
            className="input mb-3 h-[44px]"
            onChange={(e) => setOther(e.target.value === "Other")}
            required
            defaultValue=""
          >
            <option disabled></option>
            {[
              "Abay Bank",
              "Abune Gorgorios School",
              "Action for Resilience",
              "Adama Science and Technology University",
              "Addis Ababa Institute of Technology",
              "Addis Ababa Medical and Business College",
              "Addis Ababa Science and Technology University",
              "Addis Ababa University",
              "Addis Ketema Secondary School",
              "Adigrat University",
              "Admas University",
              "Ambo University",
              "Andinet International School",
              "Arba Minch University",
              "Assia Public School",
              "Ayzon Foundation",
              "Bahir Dar University",
              "Bethel Medical College",
              "Bisrate Gebriel School",
              "Black Lion Secondary School",
              "Bole Kale Hiwot",
              "Bole Senior Secondary School",
              "CALS/xHub Addis",
              "Center African Leadership Studies Xhub",
              "Clearskies Technology",
              "Commercial Bank of Ethiopia",
              "Cordova Academy",
              "Co(X)ist",
              "Cruise School",
              "Dagmawi Menelik Secondary School",
              "Debre Birhan University",
              "Debre Tabor University",
              "Dejazmach Geresu Secondary School",
              "Don Bosco Catholic High School",
              "Efuyegela Technology PLC",
              "Ethio National School",
              "Ethio Parents School",
              "Ethio Telecom",
              "Ethiopian International School Jeddah",
              "Evangelical Theological College",
              "Everest Youth Academy",
              "Falcon Academy",
              "Fountian Of Knowledge",
              "Frame by Frame Studio",
              "Future Talent Academy",
              "Google Developers Group Addis",
              "G Media Studios",
              "Gelan Boys Boarding Secondary School",
              "Geresu Duki Secondary School",
              "Gibson Youth Academy",
              "Gondar University",
              "Haramaya University",
              "Hawassa University",
              "Hayat Medical college",
              "Hillside School",
              "Hope Land Academy",
              "iCog",
              "Indian Community School",
              "Jimma Univ Community School",
              "Kazana Group",
              "Kellamino Special High School",
              "Kokebe Tsibah Secondary School",
              "Kotebe University",
              "Lebu Secondary School",
              "Lideta Catholic Cathedral School",
              "Maarif International School",
              "Magic Carpet School",
              "Medhanialem Preparatory School",
              "Mekanisa Abadir School",
              "Mekanisa Debre Genet St. Michael Cathedral School",
              "Mekelle University",
              "Menelik II Secondary School",
              "Meskaye Hizunan Medhane Alem Monastery High School",
              "Microlink Information Technology College",
              "Mieraf Academy",
              "Nativity Girls Catholic School",
              "Nazareth School",
              "New English Private School",
              "New Generation University College",
              "Neway Challenge Academy",
              "Oda Special Boarding Schools",
              "Oromia Development Association Special Boarding School",
              "Pan Nation Academy",
              "Progress Academy",
              "Queens College",
              "Rehoboth School",
              "Renaissance School",
              "Rift Valley University",
              "Safari Academy",
              "Saint John Baptist De La Salle Catholic School",
              "Saint Joseph High School",
              "School Of Indiana",
              "School Of Tomorrow",
              "Seattle Academy",
              "Self-Employed",
              "Sosina School",
              "Southwest Academy",
              "St John Baptist School",
              "St Marys University",
              "St Paul Millenium Medical College",
              "St Raguel School",
              "STEMpower",
              "Tebita Ambulance",
              "Tesfabirhan Secondary School",
              "Tikur Anbessa Secondary School",
              "Unity University",
              "Value Events and Initiatives",
              "Vision Academy",
              "Wollo University",
              "Yekatit 13 Hospital",
              "Zero-One-Zero-One Tech and Entrepreneurship",
              "Other",
            ]
              .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
              .map((org) => {
                return <option key={org}>{org}</option>
              })}
          </select>

          {other && (
            <>
              <label htmlFor="organizationCustom" className="font-semibold">
                Organization Name (የተቋም ስም) <Asterisk />
              </label>
              <input
                id="organizationCustom"
                name="organizationCustom"
                required
                className="input mb-3"
              />
            </>
          )}

          <label htmlFor="idType" className="font-semibold">
            ID Type (የመታወቂያ አይነት) <Asterisk />
          </label>
          <select
            id="idType"
            name="idType"
            required
            className="input mb-3 h-[44px]"
            defaultValue=""
          >
            <option disabled></option>
            <option>Student ID</option>
            <option>Kebele</option>
            <option value="National ID">National ID / Fayda</option>
            <option>Drivers License</option>
            <option>Passport</option>
            <option>Employee ID</option>
            <option>Ministry of Foreign Affairs ID</option>
            <option>Temporary Residence ID</option>
          </select>

          <label htmlFor="idNumber" className="font-semibold">
            ID Number (የመታወቂያ ቁጥር) <Asterisk />
          </label>
          <input
            id="idNumber"
            name="idNumber"
            required
            className="input mb-3"
          />

          <label htmlFor="dateOfBirth" className="font-semibold">
            Date of Birth (የልደት ቀን) <Asterisk />
          </label>
          <p>International Calendar (በግሪጎሪያን ዘመን አቆጣጠር)</p>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            max={
              new Date(Date.now() - 441797328000).toISOString().split("T")[0]
            }
            className="input mb-3"
          />

          <label htmlFor="gender" className="font-semibold">
            Gender (ጾታ) <Asterisk />
          </label>
          <select
            id="gender"
            name="gender"
            className="input mb-4 h-[44px]"
            required
            defaultValue=""
          >
            <option disabled></option>
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
