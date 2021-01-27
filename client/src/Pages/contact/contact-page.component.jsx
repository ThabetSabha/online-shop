import React, { useState } from "react";
import CustomButton from "../../Components/custom-button/custom-button.component";
import FormInput from "../../Components/form-input/form-input.component";
import toast, { Toaster } from "react-hot-toast";

import "./contact-page.styles.scss";
const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs({
      name: "",
      email: "",
      message: "",
    });
    toast.success("Awesome,We'll get back to you shortly");
  };
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const { name, email, message } = inputs;

  return (
    <div className="contact-page">
      <div>
        <Toaster
          toastOptions={{
            style: {
              margin: "5rem",
              zIndex: 1,
            },
            duration: 5000,
          }}
        />
      </div>
      <h1>Contact Us</h1>
      <span>We would love to hear from you!</span>
      <form onSubmit={handleSubmit} className="contact-form">
        <FormInput
          name="name"
          type="name"
          label="Name"
          value={name}
          handleChange={handleChange}
          required
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name="message"
          type="message"
          label="Your Message"
          value={message}
          handleChange={handleChange}
          required
          className="message-input form-input"
        />
        <div className="buttons">
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
