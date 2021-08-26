"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing comment' + ssn);
    }
    return ssn;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name' + name);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation' + occupation);
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender' + gender);
    }
    return gender;
};
const isBirth = (dateOfBirth) => {
    return Boolean(Date.parse(dateOfBirth));
};
const parseBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isBirth(dateOfBirth)) {
        throw new Error('Incorrect or missing gender' + dateOfBirth);
    }
    return dateOfBirth;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newPatient;
};
exports.toNewPatientEntry = toNewPatientEntry;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isDischarge = (discharge) => {
    return (discharge.date && isDate(discharge.date) && isString(discharge.criteria) && discharge.criteria);
};
const isSick = (sick) => {
    return (sick.startDate && isDate(sick.startDate) && isDate(sick.endDate) && sick.endDate);
};
const isHealth = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missig description: ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missig description: ' + specialist);
    }
    return specialist;
};
const parseDiagnosis = (diagnosis) => {
    if (!diagnosis || !Array.isArray(diagnosis) || !diagnosis.every((d) => isString(d))) {
        throw new Error('Incorrect or missing diagnosis');
    }
    return diagnosis;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
};
const parseEmployer = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missig description: ' + employerName);
    }
    return employerName;
};
const parseSick = (sick) => {
    if (!sick || !isSick(sick)) {
        throw new Error('Incorrect or missing sickleave');
    }
    return sick;
};
const parseHealthCheck = (gender) => {
    if (!gender || !isHealth(gender)) {
        throw new Error('Incorrect or missing healthcheck' + gender);
    }
    return gender;
};
const toNewEntry = ({ date, type, diagnosisCodes, specialist, description, employerName, sickLeave, healthCheckRating, discharge }) => {
    const newEntry = {
        date: parseDate(date),
        diagnosisCodes: parseDiagnosis(diagnosisCodes),
        specialist: parseSpecialist(specialist),
        description: parseDescription(description)
    };
    if (type === 'Hospital') {
        return Object.assign(Object.assign({}, newEntry), { type: type, discharge: parseDischarge(discharge) });
    }
    else if (type === 'OccupationalHealthcare') {
        return Object.assign(Object.assign({}, newEntry), { type: type, employerName: parseEmployer(employerName), sickLeave: parseSick(sickLeave) });
    }
    else if (type === 'HealthCheck') {
        return Object.assign(Object.assign({}, newEntry), { type: type, healthCheckRating: parseHealthCheck(healthCheckRating) });
    }
};
exports.toNewEntry = toNewEntry;
exports.default = exports.toNewPatientEntry;
