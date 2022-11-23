import { useEffect, useState } from 'react';
import axios from 'axios';

const useLocation = (lat: number, lon: number) => {
  const [location, setLocation] = useState<{
    address: {
      suburb: string;
      city: string;
      road: string;
      house_number: string;
    };
  }>({ address: { suburb: '', city: '', road: '', house_number: '' } });
  const [error, setError] = useState<unknown>(undefined);
  const getLocation = async () => {
    try {
      const data = await axios.get(
        `https://us1.locationiq.com/v1/reverse?key=pk.2f957cb9f816f42677c7a943ea09945e&lat=${lat}&lon=${lon}&format=json`
      );
      setLocation(data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return { location, error };
};

export default useLocation;
