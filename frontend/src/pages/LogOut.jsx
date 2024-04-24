import  {  useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useStateContext } from '../contexts/ContextProvider';

const LogOut = () => {
    const {  setIsLogedIn } = useStateContext(); 
    const { setAuth } = useAuth();
    let navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        const logout = async () => {
          try {
            axios.defaults.withCredentials = true;
            const config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: 'http://localhost:3600/logout',
              headers: {
                'Content-Type': 'application/json',
                
              },
            };
      
             await axios.request(config);

        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLogedIn(false);
            localStorage.setItem('isLogedIn',false);
            setAuth({});
            navigate('/');
        }
    }
    logout()
    },[])
  return (
    <></>
  )
}

export default LogOut