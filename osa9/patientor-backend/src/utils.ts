/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NewPatientEntry, Gender, NewEntries, Diagnosis, Discharge, SickLeave, HealthCheckRating} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing comment' + ssn);
  }
  return ssn;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing name' + name);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation' + occupation);
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender' + gender);
  }
  return gender;
};

const isBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isBirth(dateOfBirth)){
    throw new Error('Incorrect or missing gender' + dateOfBirth);
  }
  return dateOfBirth;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown,};

export const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation} : Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newPatient;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isDischarge = (discharge: any): boolean => {
  return (discharge.date && isDate(discharge.date) && isString(discharge.criteria) && discharge.criteria);
};

const isSick = (sick: any): boolean => {
  return (sick.startDate && isDate(sick.startDate) && isDate(sick.endDate) && sick.endDate);
};

const isHealth = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missig description: '+ description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missig description: '+ specialist);
  }
  return specialist;
};

const parseDiagnosis = (diagnosis: unknown): Array<Diagnosis["code"]> => {
  if(!diagnosis || !Array.isArray(diagnosis) || !diagnosis.every((d) => isString(d))){
    throw new Error('Incorrect or missing diagnosis');
  }
  return diagnosis;
};


const parseDischarge = (discharge: any): Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployer = (employerName: unknown): string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missig description: '+ employerName);
  }
  return employerName;
};

const parseSick = (sick: any): SickLeave => {
  if(!sick || !isSick(sick)){
    throw new Error('Incorrect or missing sickleave');
  }
  return sick;
};

const parseHealthCheck = (gender: unknown): HealthCheckRating=> {
  if (!gender || !isHealth(gender)){
    throw new Error('Incorrect or missing healthcheck' + gender);
  }
  return gender;
};


type EntryFields = { date: unknown, type: unknown, diagnosisCodes: unknown, specialist: unknown, description: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown, discharge?: unknown};

export const toNewEntry = ({date, type, diagnosisCodes, specialist, description, employerName, sickLeave, healthCheckRating, discharge}: EntryFields): NewEntries | void => {
  const newEntry = {
    date: parseDate(date),
    diagnosisCodes: parseDiagnosis(diagnosisCodes),
    specialist: parseSpecialist(specialist),
    description: parseDescription(description)
  };
  if(type === 'Hospital'){
    return{
      ...newEntry,
      type: type,
      discharge: parseDischarge(discharge),
    };
  }
  else if(type === 'OccupationalHealthcare'){
    return {
      ...newEntry,
      type: type,
      employerName: parseEmployer(employerName),
      sickLeave: parseSick(sickLeave)
    };
  }
  else if(type === 'HealthCheck'){
    return{
      ...newEntry,
      type: type,
      healthCheckRating: parseHealthCheck(healthCheckRating)
    };
  }
};

export default toNewPatientEntry;