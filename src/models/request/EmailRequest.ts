export class EmailRequest {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: any[];

  constructor(
    from?: string,
    to?: string,
    subject?: string,
    text?: string,
    html?: string,
    attachments?: any[]
  ) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.attachments = attachments;
  }
}
