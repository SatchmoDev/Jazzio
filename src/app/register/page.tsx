// This tells the code it will run on the user's browser, not the server
"use client"

import Pending from "@/components/Pending" // A loading animation component
import Image from "next/image" // A special way to show images
import { useActionState, useState } from "react" // Tools from React to manage form data
import QRCode from "react-qr-code" // A tool to make QR codes
import { registerMember } from "./actions" // Our function to save the form data

// This is the main function that creates our registration page
export default function Register() {
  // 'state' holds the result after form submission (like a member ID)
  // 'action' is the function that runs when we submit the form
  const [state, action] = useActionState(registerMember, "")

  // 'other' tracks if user picked "Other" for organization
  // 'setOther' lets us change that value
  const [other, setOther] = useState(false)

  return (
    <>
      {/* This section shows the logo and title */}
      <div className="mb-2 flex items-center gap-4">
        {/* Shows the logo image */}
        <Image
          src="/logo.png" // Where the image is stored
          alt="American Spaces Logo" // Description for accessibility
          width={80} // Image width in pixels
          height={80} // Image height in pixels
        />

        {/* The main heading */}
        <h1 className="mt-2 text-2xl md:text-4xl">
          Satchmo American Center Membership
        </h1>
      </div>

      {/* If 'state' has a value (form was submitted), show QR code */}
      {state ? (
        <div className="text-center text-xl">
          <p>Please save this image</p>

          {/* Creates a QR code with a unique URL */}
          <QRCode
            value={"https://jazzio.land/member/" + state} // The link the QR code points to
            bgColor="#fdf8ee" // Background color of QR code
            className="mx-auto mt-4" // Styling to center it
          />
        </div>
      ) : (
        // If form hasn't been submitted yet, show the form
        <form action={action} className="flex flex-col">
          {/* Title dropdown */}
          <label htmlFor="title" className="font-semibold">
            Title (ርዕስ)
          </label>
          <select
            name="title" // Name for form data
            id="title" // ID to match the label
            defaultValue="" // Starts empty
            className="input mb-3 h-11" // Styling classes
          >
            <option disabled></option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Mrs</option>
            <option>Dr</option>
            <option>Prof</option>
            <option>Ato</option>
          </select>
          {/* First Name input */}
          <label htmlFor="nameFirst" className="font-semibold">
            First Name (ስም) <Asterisk />
          </label>
          <input
            name="nameFirst" // Name for form data
            id="nameFirst" // ID to match label
            required // Must be filled
            pattern="^[A-Za-z .-'/]+$" // Only allows letters and some symbols
            className="input mb-3" // Styling
            autoComplete="off" // No auto-fill suggestions
          />
          {/* Father Name input */}
          <label htmlFor="nameFather" className="font-semibold">
            Father Name (የአባት ስም) <Asterisk />
          </label>
          <input
            name="nameFather"
            id="nameFather"
            required
            pattern="^[A-Za-z .-'/]+$"
            className="input mb-3"
            autoComplete="off"
          />
          {/* Grandfather Name input */}
          <label htmlFor="nameGrandfather" className="font-semibold">
            Grandfather Name (የአያት ስም) <Asterisk />
          </label>
          <input
            name="nameGrandfather"
            id="nameGrandfather"
            required
            pattern="^[A-Za-z .-'/]+$"
            className="input mb-3"
            autoComplete="off"
          />
          {/* Mobile Number input */}
          <label htmlFor="mobileNumber" className="font-semibold">
            Mobile Number (ስልክ ቁጥር) <Asterisk />
          </label>
          <p>Nine digits. Do not begin with zero.</p>
          <input
            name="mobileNumber"
            id="mobileNumber"
            required
            type="text" // Text input
            pattern="^[97]\d{8}$" // Must start with 9 or 7, then 8 digits
            className="input mb-3"
          />
          {/* Email input */}
          <label htmlFor="email" className="font-semibold">
            Email (ኢሜይል) <Asterisk />
          </label>
          <input
            name="email"
            id="email"
            required
            type="email" // Email format only
            className="input mb-3"
          />
          {/* Date of Birth input */}
          <label htmlFor="dateOfBirth" className="font-semibold">
            Date of Birth (የልደት ቀን) <Asterisk />
          </label>
          <p>International Calendar (በግሪጎሪያን ዘመን አቆጣጠር)</p>
          <input
            name="dateOfBirth"
            id="dateOfBirth"
            required
            type="date" // Shows date picker
            min={
              // Oldest allowed date (80 years ago)
              new Date(Date.now() - 1000 * 60 * 60 * 24 * 365.25 * 80)
                .toISOString()
                .split("T")[0]
            }
            max={
              // Youngest allowed date (14 years ago)
              new Date(Date.now() - 1000 * 60 * 60 * 24 * 365.25 * 14)
                .toISOString()
                .split("T")[0]
            }
            className="input mb-3"
          />
          {/* Sex dropdown */}
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
          {/* Organization dropdown */}
          <label htmlFor="organization" className="font-semibold">
            Organization (የስራ ቦታ) <Asterisk />
          </label>
          <select
            name="organization"
            id="organization"
            defaultValue=""
            required
            className="input mb-3 h-11"
            onChange={(e) => setOther(e.target.value === "Other")} // If "Other" is picked, show extra field
          >
            <option disabled></option>
            {/* List of organizations sorted alphabetically */}
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
              "American College of Technology",
              "Andinet International School",
              "Arba Minch University",
              "Assia Public School",
              "Association of Ethiopian Architects",
              "Ayzon Foundation",
              "Bahir Dar University",
              "Bethel Medical College",
              "Bisrate Gebriel School",
              "BITS College",
              "Black Lion Secondary School",
              "Bole Kale Hiwot",
              "Bole Senior Secondary School",
              "Bunna Bank",
              "Center African Leadership Studies Xhub",
              "Clearskies Technology",
              "Commercial Bank of Ethiopia",
              "Cordova Academy",
              "Col John C Robinson Am Corner",
              "Co(X)ist",
              "CPU Collage",
              "Cruise School",
              "Dagmawi Menelik Secondary School",
              "Dandii Boru School",
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
              "Ethiopian Space Science Society",
              "Ethiopian World Federation",
              "Evangelical Theological College",
              "Everest Youth Academy",
              "Falcon Academy",
              "FDRE Technical and Vocational Education and Training Inst",
              "Fountian Of Knowledge",
              "Frame by Frame Studio",
              "Future Talent Academy",
              "Google Developers Group Addis",
              "G Media Studios",
              "Gelan Boys Boarding Secondary School",
              "Geresu Duki Secondary School",
              "Gibson Youth Academy",
              "GMJA",
              "Gondar University",
              "Haramaya University",
              "Harambe University",
              "Hawassa University",
              "Hayat Medical College",
              "Hillside School",
              "Hope Land Academy",
              "Hope Enterprise University College",
              "iCog",
              "Indian Community School",
              "Jimma University",
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
              "Mekane Yesus Seminary School of Music and Media",
              "Mekanisa Abadir School",
              "Mekanisa Debre Genet St Michael Cathedral School",
              "Mekelle University",
              "Menelik II Secondary School",
              "Meskaye Hizunan Medhane Alem Monastery High School",
              "Microlink Information Technology College",
              "Mieraf Academy",
              "Ministry of Innovation and Technology",
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
              "RIM Architects",
              "Safari Academy",
              "Sante Medical College",
              "School Of Indiana",
              "School Of Tomorrow",
              "Seattle Academy",
              "Self Employed",
              "Shega Media and Technology PLC",
              "Sosina School",
              "Southwest Academy",
              "Space Science and Geospatial Institute",
              "St John Baptist De La Salle Catholic School",
              "St Joseph High School",
              "St Marys University",
              "St Paul Millenium Medical College",
              "St Peter Specialized Hospital",
              "St Raguel School",
              "STEMpower",
              "Tebita Ambulance",
              "Tesfabirhan Secondary School",
              "Tikur Anbessa Secondary School",
              "TVET College",
              "Unity University",
              "Value Event and Initiative",
              "Vision Academy",
              "Wachemo University",
              "Washington Healthcare",
              "Wolkite University",
              "Wollo University",
              "xHub Addis",
              "Yeka Abado Secondary School",
              "Yekatit 12 Hospital Medical College",
              "Yekatit 23 Secondary School",
              "YeneHealth",
              "Zero One Zero One",
              "ZIAS Architecture and Engineering",
            ]
              .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)) // Sorts A-Z
              .map((org) => (
                <option key={org}>{org}</option> // Creates an option for each organization
              ))}
            <option>Other</option>
          </select>
          {/* If "Other" is selected, show this extra input */}
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
          {/* ID Type dropdown */}
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
          {/* ID Number input */}
          <label htmlFor="idNumber" className="font-semibold">
            ID Number (የመታወቂያ ቁጥር) <Asterisk />
          </label>
          <input
            name="idNumber"
            id="idNumber"
            required
            pattern="^[A-Za-z0-9 -/]+$" // Allows letters, numbers, and some symbols
            className="input mb-4"
          />
          {/* Shows a loading animation while form submits */}
          <Pending />
        </form>
      )}
    </>
  )
}

// Helper function to show a red asterisk for required fields
const Asterisk = () => <span className="text-red-500">*</span>
