"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getOne = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuid_1.v4() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (entry, patient) => {
    const newEntries = Object.assign({ id: uuid_1.v4() }, entry);
    patient.entries.push(newEntries);
    return patient;
};
exports.default = {
    getEntries,
    getOne,
    addPatient,
    getNonSensitiveEntries,
    addEntry
};
