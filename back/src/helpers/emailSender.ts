import nodemailer from 'nodemailer';
import { CONFIG } from './config';
import { CustomError } from './errorHanlder';

const transport = {
  host: CONFIG.SMTP.host,
  port: CONFIG.SMTP.port,
  secure: true, // use TLS
  auth: {
    user: CONFIG.SMTP.login,
    pass: CONFIG.SMTP.password,
  },
};

const appState = {
  smtpReady: false,
};

const transporter = nodemailer.createTransport(transport);

export const startSMTP = async () => {
  try {
    await transporter.verify();
    appState.smtpReady = true;
    console.log('Ready to send mail!');
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    appState.smtpReady = false;
    console.log(message);
  }
};

interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

const testLetter = {
  from: '"Node js" <nodejs@example.com>',
  to: CONFIG.SMTP.address,
  subject: 'SMTP TEST',
  text: 'TEST mail',
  html: 'This <i>message</i> with <strong>attachments</strong>.',
};

export const sendMail = async (message: Message = testLetter) => {
  if (!appState.smtpReady) throw new CustomError('smtp module is not ready', 500);
  const res = await transporter.sendMail(message);
  console.log('res: ', res);
  return 'Message Was sent to ....';
};
