# Jazzio

## What is Jazzio?

Jazzio is a web-based membership system for the Satchmo American Center in Ethiopia. It helps manage visitor registration, member check-ins, and daily attendance tracking. The system is bilingual (English and Amharic) to serve the local community effectively. The main goal is to streamline how new visitors register and how guards track who visits the center each day. Instead of paper forms and manual record-keeping, everything is digital and automatically organized.

## Who Uses It?

**Visitors/New Members:**

- Register themselves using a detailed online form
- Receive a QR code that serves as their digital membership card
- Can be searched and checked in by guards during visits

**Guards/Staff:**

- Sign in with a password to access the system
- Search for existing members
- Check visitors in and out
- Add notes or comments about members
- View daily attendance reports

## Key Features

### Member Registration

- Comprehensive registration form collecting personal details
- Validates Ethiopian phone numbers (must start with 9 or 7)
- Age verification (members must be 14-80 years old)
- Extensive list of local organizations and institutions
- Email verification with spell-checking
- Generates a unique QR code for each member

### Guard Portal

- Secure login system for authorized staff
- Quick member search by name or phone number
- One-click visitor check-in
- Visual indicators showing who has already visited today
- Comment system for recording notes about members

### Attendance Tracking

- Automatic daily logs of all visits
- Detailed visitor information with timestamps
- Prevents duplicate check-ins within 5 hours
- Historical records organized by date
- Easy-to-read attendance summaries

### Member Profiles

- Complete member information display
- Visit history tracking
- Editable comments section
- Direct links between search results and profiles

## Technical Architecture

**Tech Stack:**

- **Frontend:** Next.js 15 with React 19 and TypeScript for type safety
- **Styling:** TailwindCSS with custom design system and responsive layout
- **Database:** Firebase Firestore (NoSQL cloud database)
- **Authentication:** Firebase Auth with secure session management
- **Hosting:** Web-based application accessible via browser
- **Package Management:** pnpm for efficient dependency management

**Technology Foundation:**

- Server-side rendering with Next.js for fast page loads
- Real-time database updates with Firestore
- Progressive Web App features for mobile compatibility
- TypeScript provides code reliability and fewer bugs
- Cloud infrastructure ensures 99.9% uptime

**Website Access:**

- Available at jazzio.land
- No special software needed - works in any web browser
- Mobile-friendly design for use on phones and tablets

**Data Flow:**

1. Visitors register online and get a QR code
2. Guards search for members when they arrive
3. Quick check-in creates a timestamped visit record
4. Daily logs automatically organize attendance data
5. Comments and notes are saved to member profiles

## Security & Privacy

**Access Control:**

- Guard portal protected by password authentication
- Only authorized staff can view member information
- Secure session management keeps unauthorized users out

**Data Protection:**

- Firebase Firestore provides enterprise-grade security and encryption
- HTTPS encryption for all data transmission
- Firebase Admin SDK for secure server-side operations
- Session-based authentication with secure HTTP-only cookies
- Environment variables protect sensitive configuration data
- Regular automatic backups through Firebase infrastructure

**Privacy Measures:**

- Personal information only collected for legitimate center purposes
- Member details not shared outside the organization
- QR codes link to profiles but don't contain personal data
- Comments and notes only visible to center staff

## Getting Help

**System Access:**

- Website: jazzio.land
- Guard login: Use the provided password at jazzio.land/signin
- Registration page: jazzio.land/register

**Common Tasks:**

- **Searching for a member:** Go to /search after signing in
- **Viewing daily attendance:** Go to /log (automatically shows today)
- **Checking someone in:** Find their profile and click "Sign In"
- **Adding comments:** Use the comment box on any member profile

**Troubleshooting:**

- If login isn't working, check that you're using the correct password
- If search isn't finding someone, try using just their first name or phone number
- If the site seems slow, check your internet connection
- For technical issues, contact the system administrator

**Support Contacts:**

- For system problems or questions, reach out to the technical team
- For policy questions about member data, contact center management
- Keep the guard password secure and don't share it with unauthorized persons

## Development & Maintenance

**Code Quality:**

- TypeScript ensures type safety and reduces runtime errors
- ESLint and Prettier maintain consistent code formatting
- Next.js provides built-in optimization and performance features

**Deployment:**

- Hosted on Firebase/Vercel for reliable uptime
- Automated deployments from version control
- Environment-specific configurations for development and production
