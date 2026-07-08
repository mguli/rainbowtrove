"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const recipientEmail =
  process.env.CONTACT_RECIPIENT_EMAIL ?? "therainbowtrove@gmail.com";
const senderEmail =
  process.env.RESEND_FROM_EMAIL ?? "Rainbow Trove <onboarding@resend.dev>";

function getField(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name);

  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function sendCustomOrder(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = getField(formData, "website", 200);

  if (honeypot) {
    return {
      status: "success",
      message: "Thank you! Your request has been sent.",
    };
  }

  const name = getField(formData, "name", 100);
  const email = getField(formData, "email", 320);
  const productType = getField(formData, "productType", 100);
  const neededBy = getField(formData, "neededBy", 30);
  const personalization = getField(formData, "personalization", 3000);
  const message = getField(formData, "message", 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email) || !productType || !message) {
    return {
      status: "error",
      message: "Please complete your name, email, product type, and order details.",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return {
      status: "error",
      message: "Email is temporarily unavailable. Please email us directly instead.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailBody = [
    `New custom order request from ${name}`,
    "",
    `Customer email: ${email}`,
    `Product type: ${productType}`,
    `Needed by: ${neededBy || "Not specified"}`,
    "",
    "Personalization details:",
    personalization || "Not provided",
    "",
    "Additional order details:",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `Custom order request: ${productType} for ${name}`,
      text: emailBody,
    });

    if (error) {
      console.error("Resend rejected the contact email:", error);
      return {
        status: "error",
        message: "We could not send your request. Please try again or email us directly.",
      };
    }

    return {
      status: "success",
      message: "Thank you! Your request has been sent. We will reply by email.",
    };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      status: "error",
      message: "We could not send your request. Please try again or email us directly.",
    };
  }
}
