import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = Math.floor(Math.random() * 10) + 1;
      await axios.get(`${process.env.REACT_APP_BASE_API_URL}/users/${userId}`)
      .then(response => {
        setUser(response.data);
      }).catch(err=>{

      });

    };

    fetchUser();
  }, []);

  return user;
};

export default useFetchUser;
