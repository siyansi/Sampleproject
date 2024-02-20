import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const FirebaseTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firebase.database();
        const snapshot = await db.ref('your/firebase/path').once('value');
        const fetchedData = snapshot.val();
        if (fetchedData) {
          const dataArray = Object.keys(fetchedData).map(key => ({
            id: key,
            ...fetchedData[key]
          }));
          setData(dataArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Clean up function (optional)
    return () => {
      // Do cleanup if necessary
    };
  }, []);

  return (
    <div>
      <h1>Firebase Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              {/* Add more table data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirebaseTable;
