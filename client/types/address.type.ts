type Address = {
  id: number;
  details: string;
  postalCode: number;
  userId: number;
  stateId: number;
  cityId: number;
  state: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
};

export { Address };
