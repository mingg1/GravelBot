import { useEffect, useState } from 'react';
import axios from 'axios';
import { LatLng } from 'react-native-maps';

type LocationRes = {
  address: {
    suburb: string;
    city: string;
    road: string;
    house_number: string;
  };
};

const useLocations = (locations: LatLng[]) => {
  const [location, setLocation] = useState<LocationRes[]>([]);
  const [error, setError] = useState<unknown>(undefined);
  const getLocation = async () => {
    try {
      const newArr: LocationRes[] = [];
      for (let i = 0; i < locations.length; i++) {
        const data = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=pk.2f957cb9f816f42677c7a943ea09945e&lat=${locations[i].latitude}&lon=${locations[i].longitude}&format=json`
        );
        newArr.push(data.data);
      }

      setLocation(newArr);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error };
};

export default useLocations;
