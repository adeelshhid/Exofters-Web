import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./Contact.css";
import emailjs from "@emailjs/browser";

export const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };
  const sendEmail = () => {
    emailjs
      .send(
        "service_y6cs34m",
        "template_7dat5g2",
        { email: form.email, name: form.name, message: form.message },
        "_6Td844_fKAwDRtj4"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const validateForm = () => {
    const { name, email, message } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Please enter your name";
    if (!email || email === "") newErrors.email = "Please enter your email";
    if (!message || message === "")
      newErrors.message = "Please enter your message";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      sendEmail();
      console.log("form submitted");
      console.log(form);
    }
  };

  return (
    <div>
      {/* Main Section */}
      <div className="services-hero-section">
        <p className="services-main-text1">We are glad to hear from you</p>
        <p className="services-main-text2">Let's start the conversation</p>
        <p className="services-main-text3">You can reach us in many ways</p>
        <p className="main-text4">
          Simply call us, write an email, fill out a form or just stop by.
        </p>
      </div>
      {/* Contact Us Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <h5 className="mb-4 light-text">Contact</h5>
            <div className="">
              <p>
                <span className="fs">Company</span>
                <br />
                <span className="fs light-grey">Exofters Ltd.</span>
              </p>
            </div>
            <div className="pt-4">
              <p>
                <span className="fs">Address</span>
                <br />
                <span className="fs light-grey">
                  257A G5, Phase 1, Wapda Town, Lahore
                </span>
              </p>
            </div>
            <div className="pt-4">
              <p>
                <span className="fs">Tel</span>
                <br />
                <span className="fs light-grey">+92 (300) 7171787</span>
              </p>
            </div>
            <div className="pt-4">
              <p>
                <span className="fs">Fax</span>
                <br />
                <span className="fs light-grey">+92 (52) 1234567</span>
              </p>
            </div>
            <div className="pt-4">
              <p>
                <span className="fs">Email</span>
                <br />
                <a
                  href="mailto:info@exofters.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fs link-color"
                >
                  info@exofters.com
                </a>
              </p>
            </div>
            <div className="pt-4">
              <p>
                <span className="fs">Web</span>
                <br />
                <a
                  href="https://www.exofters.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fs link-color"
                >
                  www.exofters.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <h5 className="mb-4 light-text">Send us a message</h5>
            <div className="form-group">
              <FormControl
                type="text"
                className="form-control mt-3"
                placeholder="Name"
                value={form.name}
                onChange={(e) => {
                  setField("name", e.target.value);
                }}
                isInvalid={!!errors.name}
              ></FormControl>
              <FormControl.Feedback type="invalid">
                {errors.name}
              </FormControl.Feedback>
            </div>
            <div className="form-group">
              <FormControl
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                value={form.email}
                onChange={(e) => {
                  setField("email", e.target.value);
                }}
                isInvalid={!!errors.email}
              ></FormControl>
              <FormControl.Feedback type="invalid">
                {errors.email}
              </FormControl.Feedback>
            </div>
            <div className="form-group">
              <FormControl
                as="textarea"
                rows={11}
                className="form-control mt-3"
                placeholder="Message"
                value={form.message}
                onChange={(e) => {
                  setField("message", e.target.value);
                }}
                isInvalid={!!errors.message}
              />
              <FormControl.Feedback type="invalid">
                {errors.message}
              </FormControl.Feedback>
            </div>
            <div className="form-group mt-3">
              <button
                type="button"
                className="btn btn-primary shadow"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
