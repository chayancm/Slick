/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
 import axios from 'axios';
 import { useStateContext } from '../../contexts/ContextProvider';
const Login = () => {
     const { setAuth } = useAuth();
     const navigate = useNavigate();
     const location = useLocation();
    const from = location.state?.from?.pathname || "/DashBoard";
    const userRef = useRef();
    const {isLoading,setIsLoading,setIsLogedIn}=useStateContext(); 
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // eslint-disable-next-line no-unused-vars
  
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {

        e.preventDefault();

        
const loginUser = async () => {
  try {
    const data = {
      "email": email,
      "pwd": pwd
    }
    axios.defaults.withCredentials = true;
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3600/login',
      data: data
    };

    const response = await axios.request(config);
    const role = response?.data?.role;
    console.log(role);
    setAuth({ email, role});
    const ttl = 24 * 60 * 60 * 1000;
      const now = new Date();
      const item = {
        value: true,
        expiry: now.getTime() + ttl, 
      };
      localStorage.setItem('isLogedIn', JSON.stringify(item));
        setEmail('');
        setPwd('');
        setIsLogedIn(true);
        navigate(from, { replace: true });
        setIsLoading(true);
  } catch (error) {
    console.log(error);
  }
};

loginUser();

    }


  return (
        
             <section className='flex-auto justify-center align-middle'>
                    <p ref={errRef} className={`${errMsg ? "errmsg" : "offscreen"} text-red-600 text-sm mb-2`} aria-live="assertive">
                    {errMsg}
                    </p>
                    <h1 className="text-2xl font-bold mb-4">Sign In</h1>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                      <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                      <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Sign In
                        </button>
                        <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
                      </div>
  <p className="text-center text-sm mt-4">
  Need an Account?<br />
  <span className="line">
    {/* put router link here */}
    <a href="#" className="text-blue-500 hover:text-blue-800 font-bold">
      Sign Up
    </a>
  </span>
</p>

</form>

        </section>
            
  );
}

export default Login;

