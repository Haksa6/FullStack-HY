import React from 'react';
import { HospitalEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HospitalEntryView: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return(
    <Card.Group>
      <Card fluid color = 'black'>
      <Card.Header as='h3'>
        {entry.date} <Icon name='doctor'/>
      </Card.Header>
      <Card.Content>
        {entry.description}
      </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HospitalEntryView;