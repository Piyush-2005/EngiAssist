import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';


const SignIn = () => {
  const Auth = useAuth();
  const navigate = useNavigate();
  const gradientRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await Auth.login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(
        error.code === 'auth/wrong-password' ? 'Invalid password' :
        error.code === 'auth/user-not-found' ? 'User not found' :
        error.code === 'auth/invalid-email' ? 'Invalid email format' :
        'Failed to sign in'
      );
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await Auth.googleSignIn();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (gradientRef.current) {
  //     gsap.set(gradientRef.current, { y: '-100%' });
  //     gsap.to(gradientRef.current, {
  //       y: '100%',
  //       ease: 'linear',
  //       duration: 6,
  //       repeat: -1,
  //     });
  //   }
  // }, []);

  const spans = Array.from({ length: 200 }).map((_, i) => (
    <span
      key={i}
      className="relative block transition-colors duration-[0.5s] transit bg-[#181818] z-2 w-[calc(20vw-2px)] md:w-[calc(10vw-2px)] lg:w-[calc(6.25vw-2px)] h-[calc(20vw-2px)] md:h-[calc(10vw-2px)] lg:h-[calc(6.25vw-2px)]"/>
  ));

  return (
    <section className="select-none relative w-screen h-screen flex justify-center items-center gap-[2px] flex-wrap overflow-hidden bg-black">
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(#000, #00E5FF, #000)' }}
      ></div>

      {spans}

      <div className="absolute w-[400px] bg-[#222] z-50 flex justify-center items-center p-10 rounded shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
        <div className="w-full flex flex-col items-center gap-10">
          <h2 className="text-2xl uppercase text-cyan-400 font-quicksand">Sign In</h2>
          
          {error && (
            <div className="w-full p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form className="w-full flex flex-col gap-6" onSubmit={handleSignIn}>
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
              <Link to="/signup" className="text-cyan-400 font-semibold hover:text-cyan-500">
                  Sign Up
                </Link>
            </div>

            <button 
              className="relative w-full" 
              disabled={loading}
            >
              <input
                type="submit"
                value={loading ? "Signing in..." : "Login"}
                className={`w-full p-3 bg-cyan-400 text-black font-semibold text-xl tracking-wider cursor-pointer rounded ${
                  loading ? 'opacity-60' : 'active:opacity-60'
                }`}
                disabled={loading}
              />
            </button>

            {/* Add divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-600"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full p-3 bg-transparent border border-gray-600 rounded flex items-center justify-center gap-3 text-white transition-colors ${
                loading ? 'opacity-60' : 'hover:bg-white/5'
              }`}
            >
              <FcGoogle className="text-2xl" />
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;