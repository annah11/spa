// pages/api/records.js

let records = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newRecord = req.body;
    newRecord.id = Date.now();
    records.push(newRecord);
    res.status(201).json(newRecord);
  } else if (req.method === 'GET') {
    res.status(200).json(records);
  } else if (req.method === 'PUT') {
    const updatedRecord = req.body;
    records = records.map(record =>
      record.id === updatedRecord.id ? updatedRecord : record
    );
    res.status(200).json(updatedRecord);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    records = records.filter(record => record.id !== id);
    res.status(204).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
