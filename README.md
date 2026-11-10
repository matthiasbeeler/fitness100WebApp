# Fitness 100

A small, mobile-first web app (PWA-style) for following a weekly workout plan. Users register, get activated by an admin, and then see their workout for each day of the week. Admins manage accounts and create or edit workout plans.

> **Status:** archived / not maintained. The app is not deployed anywhere.

## Features

- Registration and login (JWT in an HTTP cookie, bcrypt/salted password hashing)
- Admin activation of new accounts, with an email notification
- Password reset by email
- Weekly workout view (Monday to Sunday) with exercises, descriptions and images
- Account settings: personal details, profile image, email and password change
- Admin area: account management, workout plan creation and editing, image uploads
- Brute-force protection on login (`express-bouncer`)
- German-language UI, cookie notice, privacy policy and impressum pages

## Tech stack

- Node.js, Express 4, EJS templates
- MySQL (`mysql2`)
- `nodemailer` for email, `sharp` for image processing, `node-cron` for scheduled jobs
- `jsonwebtoken`, `bcryptjs`, `validator`

## Project structure

```
app.js                Express app setup
bin/www               HTTP server entry point
routes/               index (public/auth), user, admin routes
javascripts/          Handlers behind the routes (auth, admin, account updates)
services/             database.js (MySQL connection), mailer.js (email)
views/                EJS templates (public, loggedin, admin, modules)
emailTemplates/       Activation and password-reset emails
public/               Static assets (CSS, fonts, images, manifest)
routes/workoutTempalte.json   Example workout plan structure
```

## Getting started

### Requirements

- Node.js 18 or newer
- A MySQL database
- An SMTP account for sending email (the host is currently hardcoded in `services/mailer.js`)

### Install

```bash
npm install
```

### Configure

Create a `.env` file in the project root (it is git-ignored):

```env
PORT=3000
appUrl=http://localhost:3000
appUrlNice=localhost:3000
apiUrl=http://localhost:3000

dbHost=localhost
dbPort=3306
dbUser=your_db_user
dbPass=your_db_password
db=your_db_name

emailUser=smtp_username
emailPassword=smtp_password
emailUserName="Fitness 100 <no-reply@example.com>"

jwtSecret=long_random_string
salt=long_random_string
```

Use long, random values for `jwtSecret` and `salt`.

### Database

The repository does not include a schema file. The code expects at least an `accounts` table and a `workouts` table; check the queries in `javascripts/` and `routes/` for the columns used. You will need to create these tables yourself.

### Run

```bash
npm start          # production
npm test           # development, with nodemon (NODE_ENV=dev)
```

Then open `http://localhost:3000`.

## Workout plan format

Plans are stored as JSON with a `week` section (title and estimated time per day) and a `workouts` section (exercises per day, each with a description and image). See `routes/workoutTempalte.json` for an example.

## Known issues

- The login query interpolates a column name into the SQL string; this should be refactored to a fixed, validated column.
- No database schema or migrations are included.
- There are no automated tests.
