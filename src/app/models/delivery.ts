export interface IDelivery {
  id: number;
  name: string;
  deliveryDate: string;
  initialLatitude: number;
  initialLongitude: number;
  finalLatitude: number;
  finalLongitude: number;
}

export interface ICreateDelivery {
  name: string;
  deliveryDate: Date;
  initialLatitude: number;
  initialLongitude: number;
  finalLatitude: number;
  finalLongitude: number;
}
