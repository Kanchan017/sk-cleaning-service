// lib/email-template.ts

export function generateEmailHtml(formType: string, formData: Record<string, string>) {
    const formConfigs: Record<
        string,
        { title: string; fields: { label: string; key: string }[] }
    > = {
        "Booking Request": {
            title: "New Booking Request",
            fields: [
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Service Type", key: "service" },
                { label: "Preferred Date", key: "date" },
                { label: "Additional Details", key: "message" },
            ],
        },
        "Quote Request": {
            title: "New Quote Enquiry",
            fields: [
                { label: "Full Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Property Address", key: "address" },
                { label: "Service Type", key: "service" },
                { label: "Property Size (sq ft)", key: "size" },
                { label: "Cleaning Frequency", key: "frequency" },
                { label: "Additional Details", key: "details" },
            ],
        },
        "Contact Form": {
            title: "New Contact Form Submission",
            fields: [
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Subject", key: "subject" },
                { label: "Message", key: "message" },
            ],
        },
    };

    const config = formConfigs[formType] || {
        title: "New Form Submission",
        fields: Object.keys(formData).map((key) => ({ label: key, key })),
    };

    const fieldsHtml = config.fields
        .map(({ label, key }) =>
            formData[key]
                ? `<p><strong>${label}:</strong> ${formData[key]}</p>`
                : ""
        )
        .join("");

    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #111;">
      <h2 style="color: #1E40AF;">${config.title}</h2>
      ${fieldsHtml}
    </div>
  `;
}
