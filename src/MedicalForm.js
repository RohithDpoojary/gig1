import React, { useState } from "react";
import "./MedicalForm.css"; // Import the CSS file

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/medical-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", age: "", gender: "", condition: "", contact: "", address: "" });
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form className="medical-form" onSubmit={handleSubmit}>
        <h2>Medical Form</h2>

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Current Condition</label>
        <textarea name="condition" value={formData.condition} onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MedicalForm;
