"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
patientRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = utils_1.toNewEntry(req.body);
        const foundPatient = patientService_1.default.getOne(req.params.id);
        if (newEntry && foundPatient) {
            const addedEntry = patientService_1.default.addEntry(newEntry, foundPatient);
            res.json(addedEntry);
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
patientRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientService_1.default.getOne(id));
});
exports.default = patientRouter;
