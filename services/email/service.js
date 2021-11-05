const Mailgen = require('mailgen');

class EmailService {
  constructor(env, sender) {
    this.sender = sender; // DI внедряем метод sender из других классов ф-ла sender.js
    switch (env) {
      case 'development':
        this.link = 'https://7a80-93-76-183-191.ngrok.io'
        break;
      case 'production':
        this.link = 'link for production';
        break;
      default:
        this.link = 'http://127.0.0.1:3000';
        break;
    }
  }

  createTemplateEmail(name, verifyTokenEmail) {
    const link = this.link;
    console.log('🚀 ~ file: service.js ~ line 38 ~ EmailService ~ createTemplateEmail ~ link', link);
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Mailgen',
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro: "Welcome to the Contacts app! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Contacts, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyTokenEmail}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, name, verifyTokenEmail) {
    const emailHTML = this.createTemplateEmail(name, verifyTokenEmail);
    const msg = {
      to: email,
      subject: 'Verify your email',
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = EmailService;