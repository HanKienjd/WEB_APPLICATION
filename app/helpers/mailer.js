require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken: 'ya29.a0AfH6SMCk1MM229MR85jaXVVEeiPlPU1eunN1CYdF7Ws1hbiypyRIDM8OhHyHKiDkUQ6xT63kK-rOS4H4KtDNDH9JvTejYDIqUDGDjONR4POL2n2IGR-6f8sZ_M3vFnQ28hT7jzCQFjLpCJGZ5rpr0qKOrxbH',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

exports.sendEmail = async (emailOptions) => {
  const emailTransporter = await createTransporter();

  await emailTransporter.sendMail(emailOptions);
};
