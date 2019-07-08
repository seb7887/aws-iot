import React from 'react';
import Card from '../Card';

interface IProps {
  temp: string;
  hum: string;
}

const Dashboard: React.FC<IProps> = ({ temp, hum }) => (
  <div className="dashboard">
    <Card title="Temperature" value={temp} />
    <Card title="Humidity" value={hum} />
  </div>
);

export default Dashboard;
