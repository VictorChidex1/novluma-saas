import emailjs from "@emailjs/browser";

// Initialize EmailJS with your Public Key
// We will call this when the app starts or before sending
export const initEmail = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  } else {
    console.warn("EmailJS Public Key missing. Email features will not work.");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials missing. Skipping email.");
    return;
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        email: email, // Matches {{email}} in your 'To Email' field
        name: name, // Matches {{name}} in your Subject line
        link: "https://novluma-saas.vercel.app/dashboard",
      },
      publicKey
    );
    console.log("Welcome email sent!", response.status, response.text);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};

export const sendContactForm = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: "Admin",
        from_name: data.name,
        from_email: data.email,
        subject: `StartUp Notification: ${data.subject}`,
        message: data.message,
      },
      publicKey
    );
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }
};

export const sendJobApplication = async (data: {
  role: string;
  name: string;
  email: string;
  coverLetter?: string;
}) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: "Hiring Manager",
        from_name: data.name,
        from_email: data.email,
        subject: `New Application: ${data.role}`,
        message: `Candidate: ${data.name} (${data.email})\nRole: ${
          data.role
        }\n\nCover Letter:\n${data.coverLetter || "N/A"}`,
      },
      publicKey
    );
  } catch (error) {
    console.error("Failed to send application email:", error);
  }
};
