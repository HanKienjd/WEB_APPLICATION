const mailer = require('nodemailer');

const { abort } = require('./error');

module.exports = ({
  to, subject, message,
}) => {
  try {
    const transporter = mailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mainOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      html: message || '',
    };
    
    transporter.sendMail(mainOptions);
  } catch (e) {
    abort(500, 'Can not send mailer');
  }
};
