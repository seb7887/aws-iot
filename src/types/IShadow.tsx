export interface IDesired {
  hum: number;
  temp: number;
}

export interface IState {
  desired: IDesired;
  timestamp: number;
  version: number;
}

export interface IValue {
  clientToken: string;
  metadata: object;
  state: IState;
}

export interface IShadow {
  provider: object;
  value: IValue;
}
