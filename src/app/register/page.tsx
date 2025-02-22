"use client"

import Pending from "@/components/Pending"
import Image from "next/image"
import { useActionState, useState } from "react"
import QRCode from "react-qr-code"
import { registerMember } from "./actions"

export default function Register() {
  const [state, action] = useActionState(registerMember, "")
  const [other, setOther] = useState(false)

  return (
    <>
      <div className="mb-2 flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="American Spaces Logo"
          width={80}
          height={80}
        />

        <h1 className="mt-2 text-2xl md:text-4xl">
          Satchmo American Center Membership
        </h1>
      </div>

      {state ? (
        <div className="text-center text-xl">
          <p>Please save this image</p>

          <QRCode
            value={"https://jazzio.land/member/" + state}
            bgColor="#fdf8ee"
            className="mx-auto mt-4"
          />
        </div>
      ) : (
        <form action={action} className="flex flex-col">
          <label htmlFor="title" className="font-semibold">
            Title (ርዕስ)
          </label>
          <select
            name="title"
            id="title"
            defaultValue=""
            className="input mb-3 h-11"
          >
            <option disabled></option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Mrs</option>
            <option>Dr</option>
            <option>Prof</option>
            <option>Ato</option>
          </select>

          <label htmlFor="nameFirst" className="font-semibold">
            First Name (ስም) <Asterisk />
          </label>
          <input
            name="nameFirst"
            id="nameFirst"
            required
            pattern="^[A-Za-z .-'/]+$"
            className="input mb-3"
          />

          <label htmlFor="nameFather" className="font-semibold">
            Father Name (የአባት ስም) <Asterisk />
          </label>
          <input
            name="nameFather"
            id="nameFather"
            required
            pattern="^[A-Za-z .-'/]+$"
            className="input mb-3"
          />

          <label htmlFor="nameGrandfather" className="font-semibold">
            Grandfather Name (የአያት ስም) <Asterisk />
          </label>
          <input
            name="nameGrandfather"
            id="nameGrandfather"
            required
            pattern="^[A-Za-z .-'/]+$"
            className="input mb-3"
          />

          <label htmlFor="mobileNumber" className="font-semibold">
            Mobile Number (ስልክ ቁጥር) <Asterisk />
          </label>
          <p>Nine digits. Do not begin with zero.</p>
          <input
            name="mobileNumber"
            id="mobileNumber"
            required
            pattern="[97]\d{8}"
            className="input mb-3"
            inputmode="numeric"
          />

          <label htmlFor="email" className="font-semibold">
            Email (ኢሜይል) <Asterisk />
          </label>
          <input
            name="email"
            id="email"
            required
            type="email"
            className="input mb-3"
          />

          <label htmlFor="dateOfBirth" className="font-semibold">
            Date of Birth (የልደት ቀን) <Asterisk />
          </label>
          <p>International Calendar (በግሪጎሪያን ዘመን አቆጣጠር)</p>
          <input
            name="dateOfBirth"
            id="dateOfBirth"
            required
            type="date"
            min={
              new Date(Date.now() - 1000 * 60 * 60 * 24 * 365.25 * 80)
                .toISOString()
                .split("T")[0]
            }
            max={
              new Date(Date.now() - 1000 * 60 * 60 * 24 * 365.25 * 14)
                .toISOString()
                .split("T")[0]
            }
            className="input mb-3"
          />

          <label htmlFor="sex" className="font-semibold">
            Sex (ጾታ) <Asterisk />
          </label>
          <select
            name="sex"
            id="sex"
            defaultValue=""
            required
            className="input mb-3 h-11"
          >
            <option disabled></option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label htmlFor="organization" className="font-semibold">
            Organization (የስራ ቦታ) <Asterisk />
          </label>
          <select
            name="organization"
            id="organization"
            defaultValue=""
            required
            className="input mb-3 h-11"
            onChange={(e) => setOther(e.target.value === "Other")}
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
              "BITS College",
              "Black Lion Secondary School",
              "Bole Kale Hiwot",
              "Bole Senior Secondary School",
              "Center African Leadership Studies Xhub",
              "Clearskies Technology",
              "Commercial Bank of Ethiopia",
              "Cordova Academy",
              "Co(X)ist",
              "CPU Collage",
              "Cruise School",
              "Dagmawi Menelik Secondary School",
              "Debre Birhan University",
              "Debre Tabor University",
              "Dejazmach Geresu Secondary School",
              "Don Bosco Catholic School",
              "Efuyegela Technology PLC",
              "Ethiopian Airlines",
              "Ethiopian Broadcasting Corporation",
              "Ethiopian Civil Service University",
              "Ethio National School",
              "Ethio Parents School",
              "Ethio Telecom",
              "Ethiopian International School Jeddah",
              "Ethiopian World Federation",
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
              "Harambe University",
              "Hawassa University",
              "Hayat Medical college",
              "Hillside School",
              "Hope Land Academy",
              "iCog",
              "Indian Community School",
              "Jimma Univ Community School",
              "Kazana Group",
              "Kellamino Special High School",
              "Kibur College",
              "Kokebe Tsibah Secondary School",
              "Kotebe University of Education",
              "Lebu Secondary School",
              "Lideta Catholic Cathedral School",
              "Maarif International School",
              "Magic Carpet School",
              "Medhanialem Preparatory School",
              "Mekane Yesus Seminary School",
              "Mekanisa Abadir School",
              "Mekanisa Debre Genet St Michael Cathedral School",
              "Mekelle University",
              "Menelik II Secondary School",
              "Meskaye Hizunan Medhane Alem Monastery High School",
              "Microlink Information Technology College",
              "Mieraf Academy",
              "National Aviation College",
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
              "Sante Medical College",
              "School Of Indiana",
              "School Of Tomorrow",
              "Seattle Academy",
              "Self Employed",
              "Sosina School",
              "Southwest Academy",
              "St Joseph High School",
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
              "xHub Addis",
              "Yekatit 12 Hospital Medical College",
              "Yekatit 23 Secondary School",
              "Zero One Zero One",
            ]
              .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
              .map((org) => (
                <option key={org}>{org}</option>
              ))}
            <option>Other</option>
          </select>

          {other && (
            <>
              <label htmlFor="customOrganization" className="font-semibold">
                Organization Name (የተቋም ስም) <Asterisk />
              </label>
              <input
                name="customOrganization"
                id="customOrganization"
                required
                pattern="^[A-Za-z .-'/]+$"
                className="input mb-3"
              />
            </>
          )}

          <label htmlFor="idType" className="font-semibold">
            ID Type (የመታወቂያ አይነት) <Asterisk />
          </label>
          <select
            name="idType"
            id="idType"
            defaultValue=""
            required
            className="input mb-3 h-11"
          >
            <option disabled></option>
            <option>Student</option>
            <option>Kebele</option>
            <option>National</option>
            <option>Passport</option>
            <option>Employee</option>
            <option>Residence</option>
            <option>Driver License</option>
            <option>Ministry of Foreign Affairs</option>
          </select>

          <label htmlFor="idNumber" className="font-semibold">
            ID Number (የመታወቂያ ቁጥር) <Asterisk />
          </label>
          <input
            name="idNumber"
            id="idNumber"
            required
            pattern="^[A-Za-z0-9 -/]+$"
            className="input mb-4"
          />

          <Pending />
        </form>
      )}
    </>
  )
}

const Asterisk = () => <span className="text-red-500">*</span>
