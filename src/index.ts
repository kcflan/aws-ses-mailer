import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { emailBody, subject } from './email';
import { recipients } from './recipients';

dotenv.config();

// Validate and load environment variables
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Error: Missing environment variable ${name}`);
    process.exit(1);
  }
  return value;
}

// Load SMTP configuration from environment variables
const SMTP_HOST = getEnvVar('SMTP_HOST');
const SMTP_PORT = Number(getEnvVar('SMTP_PORT'));

const SMTP_USER = getEnvVar('SMTP_USER');
const SMTP_PASS = getEnvVar('SMTP_PASS');

const FROM_EMAIL = getEnvVar('FROM_EMAIL');
const FROM_NAME = getEnvVar('FROM_NAME');

// Create an email transporter using AWS SES SMTP
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Send an email to a single recipient with proper error handling
async function sendEmail(recipient: string): Promise<void> {
  const mailOptions = {
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: recipient,
    subject: subject,
    html: emailBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${recipient}: Message ID - ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${recipient}:`, error);
  }
}

// Send emails to all recipients concurrently
async function sendEmails() {
  await Promise.all(recipients.map(sendEmail));
}

sendEmails()
  .then(() => console.log('All emails processed'))
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
