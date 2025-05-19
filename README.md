# Heaven Mallorca – Automated Booking System (WhatsApp + MONEI + Google Sheets)

## 📦 What's Included

- WhatsApp Cloud API bot (Node.js)
- MONEI integration for payment links
- Google Sheets as booking database
- Gmail-based email notifications
- Date availability check via scraping HeavenMallorca.com

---

## 🚀 Quickstart Guide

### 1. Clone the repo
```bash
git clone https://github.com/your-org/heaven-booking-bot.git
cd heaven-booking-bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup `.env`
Create a `.env` file with this content:
```env
VERIFY_TOKEN=your_webhook_verify_token
WHATSAPP_TOKEN=your_whatsapp_cloud_api_token
PHONE_NUMBER_ID=your_whatsapp_number_id
MONEI_API_KEY=your_monei_private_key

NOTIFY_EMAIL_FROM=your_email@gmail.com
NOTIFY_EMAIL_PASS=your_gmail_app_password
NOTIFY_EMAIL_TO=recipient_email@example.com

PORT=3000
```

### 4. Setup Google Sheets
- Create a new Google Sheet called `Bookings`
- Share it with your Service Account (from `credentials.json`) with editor access
- Set your `SPREADSHEET_ID` in `googleSheetsBooking.js`

### 5. Run locally
```bash
node index.js
```

Or deploy using [Railway](https://railway.app), [Render](https://render.com), or your preferred Node hosting.

---

## 📲 WhatsApp Webhook Setup
- Go to your Facebook Developer App
- Setup webhook for messages
- URL: `https://your-deployed-url.com/webhook`
- Verify token: use the same as in `.env`

---

## 📬 How it works
1. User sends message from form ➝ WhatsApp
2. Bot reads: Name, Activity, Date, Payment method
3. Checks availability from HeavenMallorca.com
4. If "cash" → notifies team and logs manually
5. If "card" → generates MONEI link
6. Logs into Google Sheets and sends notification email

---

## 📍 Meeting Point
All activities start from:
```
Carrer Federico García Lorca, 1–23
07181 Calvià, Balearic Isles, Spain
```

---

## ✅ Status
Production-ready (May 2025)
