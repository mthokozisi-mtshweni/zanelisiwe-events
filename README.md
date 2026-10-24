# Zanelisiwe Events — React + Vite

Premium, responsive event-planning website starter for Gauteng and Mpumalanga.

## Requirements
- Node.js 18+ recommended
- npm
- Internet access for the temporary Unsplash images and Google Fonts

## Run on Windows
1. Extract `zanelisiwe-events.zip`.
2. Open Command Prompt in the extracted `zanelisiwe-events` folder.
3. Run:

```bat
npm install
npm run dev
```

4. Open the local URL Vite prints (usually `http://localhost:5173`).

## Production build

```bat
npm run build
npm run preview
```

## Before launch
1. Open `src/App.jsx`.
2. Update `BRAND.whatsapp` with digits only in international format (South Africa example: `27721234567`, without `+` or spaces).
3. Update `BRAND.email` with the real business email.
4. Replace temporary Unsplash imagery with approved Zanelisiwe Events photos and confirm image licensing/usage.
5. Update Instagram/social links, business details and any factual claims. No testimonials or event counts have been invented.
6. The contact form prepares an email via the visitor's email app when an email is configured. It does not save submissions to a database. A backend/email service is needed for dependable delivery and storage.
7. Test all routes, form fields, mobile navigation, and contact methods before deployment.

## Routes
- `/` Home
- `/about`
- `/services`
- `/portfolio` (working category filters and image lightbox)
- `/process`
- `/contact` (validated enquiry form with draft email preparation)

## Notes
- This starter has no backend and does not persist enquiries.
- Portfolio images are inspiration placeholders, not a representation of the company's completed work.
