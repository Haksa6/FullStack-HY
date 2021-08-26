import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';


const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return(
    <Card.Group>
      <Card fluid color = 'black'>
      <Card.Header as='h3'>
        {entry.date} <Icon name='stethoscope'/> {entry.employerName}
      </Card.Header>
      <Card.Content>
        {entry.description}
      </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default OccupationalHealthcare;