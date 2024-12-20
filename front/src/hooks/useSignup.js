import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const signup = async (userData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${process.env.VITE_BACKEND_URL}/api/v1/user/signup`   , userData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};

export default useSignup;
