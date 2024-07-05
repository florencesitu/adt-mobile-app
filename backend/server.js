const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let patients = [];

app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  const newPatient = { ...req.body, id: Date.now().toString() };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const patientIndex = patients.findIndex(p => p.id === id);

  if (patientIndex === -1) {
    return res.status(404).send('Patient not found');
  }

  patients[patientIndex] = { ...patients[patientIndex], ...req.body };
  res.json(patients[patientIndex]);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
