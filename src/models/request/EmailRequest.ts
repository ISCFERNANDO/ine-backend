export class EmailRequest {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;

  constructor(
    from?: string,
    to?: string,
    subject?: string,
    text?: string,
    html?: string
  ) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }
}
