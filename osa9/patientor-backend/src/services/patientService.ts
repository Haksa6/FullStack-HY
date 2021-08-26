/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry, NewEntries, Entry } from '../types';


const getEntries = (): Array<Patient> => {
  return patients;
};

const getOne = (id:string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( entry: NewPatientEntry
): Patient => {

const newPatientEntry = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  id: uuidv4(),
  ...entry
};

patients.push(newPatientEntry);
return newPatientEntry;
};

const addEntry = ( entry: NewEntries, patient: Patient
  ): Patient => {
  const newEntries: Entry = {
    id: uuidv4(),
    ...entry
  };
  patient.entries.push(newEntries);
  return patient;
};

export default {
  getEntries,
  getOne,
  addPatient,
  getNonSensitiveEntries,
  addEntry
};