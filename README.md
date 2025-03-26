# AWS SES Mailer

This project sends emails using AWS SES (via SMTP) to a list of recipients defined in [`src/recipients.ts`](src/recipients.ts).

## Prerequisites

- Node.js
- AWS SES SMTP credentials

## Setup

1. Clone the repository.
2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the project root based on [`.env.example`](.env.example) and fill in your SMTP credentials and sender information.

## Build and Run

1. Build the project using the TypeScript compiler:

    ```sh
    npm run build
    ```

2. Run the built JavaScript using Node.js:

    ```sh
    npm start
    ```

## How It Works

- The application loads environment variables using [`dotenv`](https://www.npmjs.com/package/dotenv).
- It uses [`nodemailer`](https://nodemailer.com/about/) to create a transporter configured with your AWS SES SMTP details.
- The mail content is defined in [`src/email.ts`](src/email.ts) while the list of recipients is in [`src/recipients.ts`](src/recipients.ts).
- Emails are sent concurrently to all recipients, with error handling to log any failures.

## Environment Variables

The following environment variables need to be set (see [`.env.example`](.env.example) for details):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `FROM_NAME`

## License

This project is licensed under the ISC License.
