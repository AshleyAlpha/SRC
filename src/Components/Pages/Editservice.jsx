import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateService = () => {
  const { id } = useParams();
  const [service, setService] = useState({ name: '', description: '' });
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
      await axios.put(`https://safety-drive-connect-backend-project-2.onrender.com/api/v1/updateService/${id}`, service);
      
      navigate('/services');
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md">Save</button>
      </form>
    </div>
  );
};

export default UpdateService;
