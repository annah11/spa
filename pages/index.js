// pages/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    const response = await axios.get('/api/records');
    setRecords(response.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = async (data) => {
    if (selectedRecord) {
      await axios.put('/api/records', { ...data, id: selectedRecord.id });
      setSelectedRecord(null);
    } else {
      await axios.post('/api/records', data);
    }
    reset();
    fetchRecords();
  };

  const handleDelete = async (id) => {
    await axios.delete('/api/records', { data: { id } });
    fetchRecords();
  };

  const handleSelect = (record) => {
    setSelectedRecord(record);
    reset(record);
  };

  return (
    <div>
      <h1>Record Management</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" placeholder="Name" ref={register} />
        <input name="email" placeholder="Email" ref={register} />
        <button type="submit">{selectedRecord ? 'Update' : 'Register'}</button>
      </form>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            {record.name} ({record.email})
            <button onClick={() => handleSelect(record)}>Update</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
