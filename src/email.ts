export const subject = 'This is a test email';

export const emailBody = `
  <p>Dear Person</p>

  <p>Hi, there, I am \${process.env.FROM_NAME}. I hope this email finds you well!</p>
    
  <p><strong>Here’s an example list:</strong></p>

  <ul>
    <li>🔄 <strong>Example 1</strong> – This is example one.</li>
    <li>💾 <strong>Example 2</strong> – This is example two.</li>    
  </ul>

  <p><strong>Thank you for your time!</strong></p>

  <p>Best Regards,</p>

  <p>\${process.env.FROM_NAME}</p>
  <p><a href="mailto:\${process.env.FROM_EMAIL}">\${process.env.FROM_EMAIL}</a></p>
`;
