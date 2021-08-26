/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry, } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  }catch (e) {
    res.status(400).send(e.message);
  }
});

patientRouter.post('/:id/entries', (req,res) => {
  try{
    const newEntry = toNewEntry(req.body);
    const foundPatient = patientService.getOne(req.params.id);

    if(newEntry && foundPatient){
      const addedEntry = patientService.addEntry(newEntry, foundPatient);
      res.json(addedEntry);
    }
  }catch(e){
    res.status(400).send(e.message);
  }
});

patientRouter.get('/:id', (req,res) => {
  const id = req.params.id;
  res.send(patientService.getOne(id));
});

export default patientRouter;