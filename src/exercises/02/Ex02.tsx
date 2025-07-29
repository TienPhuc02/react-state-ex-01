import { useState } from "react";
import "./style.css";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState<ContactFormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Submitted Data:", formData);
    setSubmitted(formData);

    // Reset form (optional)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="submitted-data">
          <h4>Submitted Data:</h4>
          <p>First Name: {submitted.firstName}</p>
          <p>Last Name: {submitted.lastName}</p>
          <p>Email: {submitted.email}</p>
        </div>
      )}
    </>
  );
}

export default function Ex02() {
  return (
    <div className="container">
      <h2>Contact Us</h2>
      <ContactForm />
    </div>
  );
}
