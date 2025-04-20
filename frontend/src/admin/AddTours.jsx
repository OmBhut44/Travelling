// AddTourForm.jsx
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const AddTourForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/tours`, formData); // adjust path as per your API
      navigate("/admin/tours");
    } catch (error) {
      console.error("Failed to add tour:", error);
    }
  };

  return (
    <>
    {/* <Header></Header> */}
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      {["title", "city", "address", "photo", "desc", "distance", "price", "maxGroupSize"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block font-semibold capitalize">{field}</label>
          <input
            type={field === "distance" || field === "price" || field === "maxGroupSize" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-semibold">Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Tour
      </button>
    </form>
    {/* <Footer/> */}
    </>
  );
};

export default AddTourForm;
