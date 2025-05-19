// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { googleSheetsBooking } = require('./utils/googleSheetsBooking');
const { sendEmailNotification } = require('./utils/sendEmailNotification');
const { createMoneiPayment } = require('./utils/createMoneiPayment');
const { sendWhatsAppMessage, getPriceEstimate, checkAvailability } = require('./utils/helpers');

const app = express();
app.use(bodyParser.json());

const OPERATOR_WHATSAPP = '+34669851005';
const BUSINESS_LOCATION = 'Carrer Federico García Lorca, 1–23, 07181 Calvià, Balearic Isles, Spain';

// Endpoint para recibir reservas desde formulario web
app.post('/booking', async (req, res) => {
  const { name, phone, activity, date, variant, paymentMethod } = req.body;

  try {
    const available = await checkAvailability(activity, date);
    if (!available) return res.status(400).send({ error: 'Date not available' });

    const price = getPriceEstimate(activity, variant);
    const prepayment = (paymentMethod === 'card') ? price * 0.2 : 0;

    let paymentLink = 'Payment on site';
    if (paymentMethod === 'card') {
      paymentLink = await createMoneiPayment({
        amount: prepayment,
        activity,
        phone,
        name,
      });
    }

    const summary = `Booking for ${name}\nActivity: ${activity}\nDate: ${date}\nVariant: ${variant}\nPhone: ${phone}\nTotal: €${price}\nPayment method: ${paymentMethod}\nLocation: ${BUSINESS_LOCATION}`;

    await googleSheetsBooking({ name, phone, activity, date, variant, paymentMethod, price, status: 'pending' });
    await sendEmailNotification(name, activity, date, phone, price);
    await sendWhatsAppMessage(phone, `Your booking is almost complete!\n${summary}\n${paymentMethod === 'card' ? `Pay here: ${paymentLink}` : 'One of our team will contact you soon.'}`);
    await sendWhatsAppMessage(OPERATOR_WHATSAPP, `NEW RESERVATION:\n${summary}`);

    return res.send({ success: true, paymentLink });
  } catch (err) {
    console.error('Booking error:', err.message);
    return res.status(500).send({ error: 'Booking failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MallorcaTickets Bot running on port ${PORT}`));
// Entry file for mallorcatickets bot
