import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://safety-drive-connect-backend-project-2.onrender.com/api/v1/viewallReachout');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const filteredMessages = messages.filter(message =>
    (message.name ? message.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
    (message.email ? message.email.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
    (message.subject ? message.subject.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
    (message.message ? message.message.toLowerCase().includes(searchQuery.toLowerCase()) : false)
  );
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://safety-drive-connect-backend-project-2.onrender.com/api/v1/viewReachout/${id}`);
      setMessages(messages.filter(message => message._id !== id));
      console.log('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search messages" 
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
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Subject</th>
              <th className="py-2">Message</th>
              <th className="py-2 pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((message) => (
              <tr key={message._id} className="border-t">
                <td className="p-8 font-bold">{message.Name}</td>
                <td className="p-8">{message.email}</td>
                <td className="p-8">{message.subject}</td>
                <td className="p-8">{message.message}</td>
                <td className="p-8">
                  <button onClick={() => handleDelete(message._id)} className="text-green-700 block">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Pagination
          itemsPerPage={messagesPerPage}
          totalItems={filteredMessages.length}
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

export default Messages;
