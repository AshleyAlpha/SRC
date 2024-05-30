import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const newService = { name, description };

  const fetchService = () => {
    if (!name || !description) {
      alert("Please fill out all fields.");
      return;
    }

    axios
      .post(
        "https://safety-drive-connect-backend-project-2.onrender.com/api/v1/createService",
        newService
      )
      .then((response) => {
        console.log(response.data.services);
        setSuccessMessage("Service successfully added.");
        setTimeout(() => {
          navigate("/Services");
        }, 2000); // Navigate after 2 seconds
      })
      .catch((error) => {
        console.error("There was an error adding the service!", error);
        console.error("Error details:", error.response ? error.response.data : error.message);
      });
  };

  

  return (
    <div>
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Service</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        <form action="#" method="post">
          <div className="mb-4">
            <label htmlFor="serviceName" className="block font-semibold mb-1">
              Service Name:
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              className="w-full p-2 border rounded-md"
              value={name} 
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceDescription" className="block font-semibold mb-1">
              Service Description:
            </label>
            <textarea
              id="serviceDescription"
              name="serviceDescription"
              className="ww-full p-2 border rounded-md resize-none h-32 overflow-y-auto"
              value={description}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </form>
        <button
          className="bg-green-700 text-white font-semibold py-2 px-4 cursor-pointer mt-4 w-full p-2 border rounded-md"
          onClick={fetchService}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddService;
