/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import {Login} from './'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
import { useNavigate } from 'react-router-dom';
import '../style/Register.css'
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2=EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2||!v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            let data = {
                name: user,
                email:email,
                pwd: pwd,
              }
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3600/register',
                data : data
              };
            const response = await axios.request(config);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/Login')
        } catch (err) {
           if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else if (err.response?.status) { 
              setErrMsg('Registration Failed - Server Error'); 
          } else {
              setErrMsg('Registration Failed - Unexpected Error')
          }
            if (errRef.current) {
              errRef.current.focus();  
             }
        }
     }

    return (
           
        <section id="sec" className="container mx-auto px-4 max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4"> 
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <FontAwesomeIcon icon={faCheck} className={validName ? "block ml-2 valid" : "hidden ml-2"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden ml-2" : "block ml-2 invalid"} />
            <div className="flex"> 
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full md:w-1/2" 
              />
              
            </div>
            <p id={userFocus && user && !validName ? "instructions" : "offscreen"} className={userFocus && user && !validName ? "block text-sm text-gray-600 mt-1" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed
            </p>
          </div>
      
          <div className="mb-4">
      <label htmlFor="email" className="block mb-2">
        email:
      </label>
      <FontAwesomeIcon icon={faCheck} className={validEmail ? "block ml-2 valid" : "hidden ml-2"} />
        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden ml-2" : "block ml-2 invalid"} />
      <div className="flex">
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
          className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full md:w-1/2" 
        />
        
      </div>
      <p id={emailFocus && email && !validEmail ? "instructions" : "offscreen"} className={emailFocus && email && !validEmail ? "block text-sm text-gray-600 mt-1" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a valid email format.<br />
                            Example: example@example.com<br />
                            Must contain @ and . characters.<br />
                            No spaces allowed.
      </p>
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block mb-2">
        Password:
      </label>
      <div className="flex">
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full md:w-1/2" 
        />
        <FontAwesomeIcon icon={faCheck} className={validPwd ? "block ml-2 valid" : "hidden ml-2"} />
        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden ml-2" : "block ml-2 invalid"} />
      </div>
      <p id={pwdFocus && !validPwd ? "instructions" : "offscreen"} className={pwdFocus && !validPwd ? "block text-sm text-gray-600 mt-1" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        
      </p>
    </div>

   <div className="mb-4">
      <label htmlFor="confirm_pwd" className="block mb-2">
        Confirm Password:
      </label>
      <div className="flex">
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full md:w-1/2" 
        />
        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "block ml-2 valid" : "hidden ml-2"} />
        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden ml-2" : "block ml-2 invalid"} />
      </div>
      <p id={matchFocus && !validMatch ? "instructions" : "offscreen"} className={matchFocus && !validMatch ? "block text-sm text-gray-600 mt-1" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        
      </p>
    </div>
      
          <button 
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium  py-2 px-4 rounded-md
                   opacity-50 "
          >
            Sign Up
          </button>
        </form>
        
      </section>
       
    )
}

export default Register