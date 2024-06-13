const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  //----------Письмо на почту(активация)------------------------------//-----------------------
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: "Активация аккаунта " + process.env.API_URL,
      text: "",
      html: `
          <div>
            <h1>Пройдите по ссылке чтобы активировать свой аккаунт</h1>
            <a href="${link}">${link}</a>
          </div>`,
    });
  }

  //----------Письмо на почту(восстановление пароля)------------------------------//-----------------------
  async sendResetPasswordMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: "Восстановление пароля.",
      text: "",
      html: `
          <div>
            <h1>Пройдите по ссылке чтобы восстановить свой пароль</h1>
            <a href="${link}">${link}</a>
          </div>`,
    });
  }
}

module.exports = new MailService();
