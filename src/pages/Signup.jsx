import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/UseAuth';


const Signup = () => {
  const gradientRef = useRef(null);
  const navigate = useNavigate();
  const Auth = useAuth();
  const handleSignUp = (e) => { 
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log('Email:', email); 
    console.log('Username:', username);
    console.log('Password:', password);
    Auth.signup({ email, username, password })
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  }

  

  const spans = Array.from({ length: 200 }).map((_, i) => (
    <span
      key={i}
      className="relative block transition-colors duration-[0.5s] transit bg-[#181818] z-2 w-[calc(20vw-2px)] md:w-[calc(10vw-2px)] lg:w-[calc(6.25vw-2px)] h-[calc(20vw-2px)] md:h-[calc(10vw-2px)] lg:h-[calc(6.25vw-2px)]"/>
  ));

  const handleGoogleSignup = () => {
    // Add Google Sign Up logic here when ready
    console.log('Google Sign Up clicked');
  };

  return (
    <section className="select-none relative w-screen h-screen flex justify-center items-center gap-[2px] flex-wrap overflow-hidden bg-black">
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(#000, #00E5FF, #000)' }}
      ></div>

      {spans}

      <div className="absolute w-[450px] bg-[#222] z-50 flex justify-center items-center p-10 rounded shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
        <div className="w-full flex flex-col items-center gap-8">
          <h2 className="text-2xl uppercase text-cyan-400 font-quicksand">Sign Up</h2>
          <form className="w-full flex flex-col gap-6" onSubmit={handleSignUp}>  
            <div className="relative w-full">
            <input
                type="email" id='email' required
                className="peer w-full bg-[#333] border-none outline-none px-3 pt-5 pb-2 rounded text-white font-medium text-base"/>
              
              <span className="absolute left-0 px-2 py-3 text-gray-400 transition-all duration-100 peer-focus:-translate-y-2 peer-valid:-translate-y-2 peer-focus:text-xs peer-valid:text-xs peer-focus:text-white peer-valid:text-white">
                <label htmlFor="email">Email</label>
              </span>
              </div>
              <div className="relative w-full">
              <input
                type="text" id='username' required
                className="peer w-full bg-[#333] border-none outline-none px-3 pt-5 pb-2 rounded text-white font-medium text-base"/>
              
              <span className="absolute left-0 px-2 py-3 text-gray-400 transition-all duration-100 peer-focus:-translate-y-2 peer-valid:-translate-y-2 peer-focus:text-xs peer-valid:text-xs peer-focus:text-white peer-valid:text-white">
                <label htmlFor="username">Username</label>
              </span>

            </div>

            <div className="relative w-full">
              <input
                type="password" id='password' required
                className="peer w-full bg-[#333] border-none outline-none px-3 pt-5 pb-2 rounded text-white font-medium text-base"
              />
              <span className="absolute left-0 px-2 py-3 text-gray-400 transition-all duration-100 peer-focus:-translate-y-2 peer-valid:-translate-y-2 peer-focus:text-xs peer-valid:text-xs peer-focus:text-white peer-valid:text-white">
                <label htmlFor="password">Password</label>
              </span>
            </div>

            <div className="flex justify-end">

              <p className="text-gray-400">
                Already a user?{' '}
                <Link to="/signin" className="text-cyan-400 font-semibold hover:text-cyan-500">
                  Sign in
                </Link>
              </p>
            </div>



            <button className="relative w-full">
              <input
                type="submit"
                value="SignUp"
                className="w-full p-3 bg-cyan-400 text-black font-semibold text-xl tracking-wider cursor-pointer active:opacity-60 rounded"
              />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-600"></div>
            </div>
          </form>
          <button onClick={handleGoogleSignup} className="flex items-center gap-2  p-3 bg-white text-black font-semibold text-xl tracking-wider cursor-pointer active:opacity-60 rounded">
            <FcGoogle size={24} />
            Sign Up with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;