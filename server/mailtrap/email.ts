import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const senderVarificationEmail = async (
  email: string,
  varifiactionToken: string
) => {
  const recipient = [
    {
      email,
    },
  ];

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", varifiactionToken),
      category: "Email Varification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to PatelEats",
      html: htmlContent,
      template_variables: {
        company_info_name: "PatelEats",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  const htmlcontent = `${resetURL}`;
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your email",
      html: htmlcontent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};
export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successfully",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
