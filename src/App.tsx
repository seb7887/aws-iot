import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { awsConfig } from './utils/awsConfig';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { IShadow } from './types';

const App: React.FC = () => {
  const [temp, setTemp] = useState('');
  const [hum, setHum] = useState('');

  const getShadow = (data: IShadow) => {
    console.log(data);
    const { hum, temp } = data.value.state.desired;
    setHum(hum.toFixed(1));
    setTemp(temp.toFixed(1));
  };

  useEffect(() => {
    console.log('Hey');
    Amplify.configure({
      Auth: {
        identityPoolId: awsConfig.poolId,
        region: awsConfig.region,
        userPoolId: awsConfig.userPool,
        userPoolWebClientId: awsConfig.clientId
      }
    });
    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: awsConfig.region,
        aws_pubsub_endpoint: awsConfig.mqttEndpoint
      })
    );
    Amplify.PubSub.subscribe(awsConfig.topic).subscribe({
      next: (data: any) => getShadow(data),
      error: (data: any) => console.log(data),
      close: () => console.log('Done')
    });
  }, []);

  return (
    <>
      <Header />
      <Dashboard temp={temp} hum={hum} />
    </>
  );
};

export default App;
