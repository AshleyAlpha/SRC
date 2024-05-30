import React, { useState } from 'react';
import Customers from './Customers';

const Dashboard = () => {
  const [customerData, setCustomerData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 3, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 4, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 5, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 6, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 7, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 8, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 9, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 10, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
    // Add more customer data as needed
  ]);

  return (
    <div>
     
      <Customers data={customerData} />
    </div>
  );
};

export default Dashboard;
