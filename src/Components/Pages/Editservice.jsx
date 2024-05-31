import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateService = () => {
  const { id } = useParams();
  const [service, setService] = useState({ name: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`https://safety-drive-connect-backend-project-2.onrender.com/api/v1/viewService/${id}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://safety-drive-connect-backend-project-2.onrender.com/api/v1/updateService/${id}`, service);
      setSuccessMessage('Service successfully updated!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/services');
      }, 2000); // Reset message and navigate after 2 seconds
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="m-80 container mt-8 p-6 bg-green-200 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl mb-4 font-bold text-green-700">Edit Service</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-green-700 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-700 font-semibold">Description:</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleInputChange}
            className="mt-1 p-4 block w-full border h-44 border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="bg-green-700 text-green-200 font-semibold py-2 px-4 cursor-pointer mt-4 w-full p-2 border rounded-md">Save</button>
      </form>
    </div>
  );
};

export default UpdateService;
