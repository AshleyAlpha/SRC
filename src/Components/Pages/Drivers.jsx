import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://safety-drive-connect-backend-project-2.onrender.com/api/v1/viewallDrivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDrivers();
  }, []);

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const filteredDrivers = drivers.filter(driver =>
    driver.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    driver.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    driver.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const handleEdit = (id) => {
    navigate(`/EditDriver/${id}`);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://safety-drive-connect-backend-project-2.onrender.com/api/v1/deleteDriver/${id}`
      );
      setDrivers(drivers.filter(driver => driver._id !== id));
      console.log('Driver deleted successfully');
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <NavLink to="/AddDriver">
          <button className="bg-green-700 text-green-200 py-1 px-4 text-lg mt-2 sm:mt-0 mb-4">
            Add Driver
          </button>
        </NavLink> */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search drivers" 
            className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-green-500" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button className="absolute right-0 top-0 bg-green-700 text-green-200 py-1 px-4 text-lg mt-2 sm:mt-0 mb-4" onClick={() => setSearchQuery('')}>
            Clear
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mb-4">
          <thead>
            <tr className="bg-green-700 text-green-200">
              <th className="py-2">Username</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2 pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDrivers.map((driver) => (
              <tr key={driver._id} className="border-t">
                <td className="p-8 font-bold">{driver.username}</td>
                <td className="p-8">{driver.email}</td>
                <td className="p-8">{driver.role}</td>
                <td className="p-8">
                  <button onClick={() => handleEdit(driver._id)} className="text-[#a3d6a3] mr-2 mb-2 block">Edit</button>
                  <button onClick={() => handleDelete(driver._id)} className="text-green-700 block">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Pagination
          itemsPerPage={driversPerPage}
          totalItems={filteredDrivers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-between">
        {currentPage > 1 && (
          <li className="page-item">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              className="page-link bg-green-700 text-green-100 p-2"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button 
              onClick={() => paginate(number)} 
              className={`page-link ${number === currentPage ? 'bg-green-900 text-white' : 'bg-green-700 text-green-100'} p-2`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li className="page-item">
            <button 
              onClick={() => paginate(currentPage + 1)} 
              className="page-link bg-green-700 text-green-100 p-2"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Drivers;
