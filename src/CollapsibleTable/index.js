import React from 'react';
import CollapsibleTable from './Table';

const App = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      location: 'New York',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 25,
      location: 'Los Angeles',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 35,
      location: 'Chicago',
      email: 'mike.johnson@example.com',
      phone: '555-123-4567',
    },
    {
      id: 4,
      name: 'Mike Johnson',
      age: 35,
      location: 'Chicago',
      email: 'mike.johnson@example.com',
      phone: '555-123-4567',
    },
    {
      id: 5,
      name: 'Mike Johnson',
      age: 35,
      location: 'Chicago',
      email: 'mike.johnson@example.com',
      phone: '555-123-4567',
    },
    {
      id: 6,
      name: 'Mike Johnson',
      age: 35,
      location: 'Chicago',
      email: 'mike.johnson@example.com',
      phone: '555-123-4567',
    },
    {
      id: 7,
      name: 'Mike Johnson',
      age: 35,
      location: 'Chicago',
      email: 'mike.johnson@example.com',
      phone: '555-123-4567',
    },
    // Add more data objects as needed
  ];

  return (
    <div>
      <h1>Collapsible Table Example</h1>
      <CollapsibleTable data={data} />
    </div>
  );
};

export default App;
