import * as nodemailer from "nodemailer";
import { MAILER } from "../../settings";
import { EmailRequest } from "../../models/request/EmailRequest";
import { Service } from "@tsed/di";

@Service()
export class EmailService {
  public async send(message: EmailRequest) {
    try {
      console.log('BEFORE SETTINGS');
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAILER.EMAIL_USER,
          pass: MAILER.EMAIL_PWD,
        },
      });
      console.log('AFTER SETTINGS');

      console.log('Transport', transport);

      message = this.asign(message);
      await this.sendEmail(transport, message);
    } catch (e) {
      throw e;
    }
  }

  private asign(message: EmailRequest): EmailRequest {
    if (!message.from) {
      message.from = MAILER.EMAIL_USER;
    }
    if (!message.subject) {
      message.subject = MAILER.SUBJECT;
    }
    return message;
  }

  private sendEmail(transport, message: EmailRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      transport.sendMail(message, (err, resp) => {
        if (err) {
          return reject(err);
        }
        resolve(resp);
      });
    });
  }
}
