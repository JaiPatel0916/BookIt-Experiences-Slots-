export interface Slot {
  date: string;
  time: string;
  available: boolean;
  _id?: string;
}

export interface Experience {
  _id?: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  slots: Slot[];
  createdAt?: string;
  updatedAt?: string;
}
