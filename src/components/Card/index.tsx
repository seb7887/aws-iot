import React from 'react';
import { WiThermometer, WiHumidity } from 'react-icons/wi';

interface IProps {
  title: string;
  value: string;
}

const Card: React.FC<IProps> = ({ title, value }) => {
  const isTemp = title === 'Temperature';

  return (
    <div className="card">
      <div className={`card__icon card__icon--${isTemp ? 'temp' : 'hum'}`}>
        {title === 'Temperature' ? <WiThermometer /> : <WiHumidity />}
      </div>
      <div className="card__info">
        <h3 className="title">{title}</h3>
        <p className="value">
          {value} {title === 'Temperature' ? '°' : '%'}
        </p>
      </div>
    </div>
  );
};

export default Card;
