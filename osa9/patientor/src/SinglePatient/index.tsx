import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Entry, NewEntries, Patient} from "../types";
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import HospitalEntryView from './HospitalEntryView';
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import axios from "axios";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member; ${JSON.stringify(value)}`
  );
};
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type){
  case "Hospital":
    return <HospitalEntryView entry={entry}/>;
  case 'OccupationalHealthcare':
    return <OccupationalHealthcare entry={entry}/>;
  case 'HealthCheck':
    return <HealthCheck entry={entry} />;
  default:
    return assertNever(entry);
  }

};

const SinglePatient = () => {
  const { id } = useParams<{id: string}>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);
  let iconMale: 'mars' | 'venus' | 'genderless';
  //const [{ diagnoses }] = useStateValue();
  //const diagnose = Object.keys(diagnoses);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntries) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if(patient){
    if(patient.gender === 'male'){
      iconMale = 'mars';
    }else if(patient.gender === 'female'){
      iconMale = 'venus';
    }else{
      iconMale = 'genderless';
    }

  return(
    <Container>
      <Header as='h2'>
        {patient.name} <Icon name={iconMale}/>
      </Header>
      <p>
        ssn: {patient.ssn}
      </p>
      <p>
        occupation: {patient.occupation}
      </p>
      <Header as='h3'>
        entries
      </Header>
      {patient.entries.map((p => (
        <div key={p.id}>
            <EntryDetails entry={p}/>
        </div>
      )))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
  }else{
    return null;
  }
};
export default SinglePatient;