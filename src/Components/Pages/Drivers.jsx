import React from 'react';

const Drivers = ({ drivers = [] }) => {
  const handleEdit = (index) => {
    console.log(`Edit driver at index ${index}`);
    // Implement your edit functionality here
  };

  const handleDelete = (index) => {
    console.log(`Delete driver at index ${index}`);
    // Implement your delete functionality here
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">License Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Has Car</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{driver.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{driver.licenseCategory}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{driver.hasCar ? 'Yes' : 'No'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-[#a3d6a3] mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-blue-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drivers;
