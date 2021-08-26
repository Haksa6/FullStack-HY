import React from 'react';
import { HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';





const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  let iconColor: 'green' | 'yellow' | 'orange' | 'red';

  if(entry.healthCheckRating === 0){
    iconColor = 'green';
  } else if(entry.healthCheckRating === 1){
    iconColor = 'yellow';
  } else if(entry.healthCheckRating === 2){
    iconColor = 'orange';
  }else{
    iconColor = 'red';
  }


  return(
    <Card.Group>
      <Card fluid color = 'black'>
      <Card.Header as='h3'>
        {entry.date} <Icon name='doctor'/>
      </Card.Header>
      <Card.Content>
        {entry.description}
      </Card.Content>
      <Card.Content>
        <Icon color={iconColor} name='heart'/> 
      </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HealthCheck;