import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const Register = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const { setUser } = React.useContext(UserDataContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email,
        password,
        username: userName
      };

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    } finally {
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setUserName('');
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center gap-x-4 bg-black items-center overflow-hidden'>
      <div className='hidden sm:flex items-center justify-center h-screen'>
        <img className='h-5/6' src="/images/home.png" />
      </div>
      <div className='p-4 h-screen pt-16'>
        <div className='flex flex-col w-full sm:w-96 h-96 sm:border border-neutral-700 items-center max-w-full'>
          <div className='flex mt-8 justify-center'>
            <img className='w-3/6' src="/images/insta-home.png" />
          </div>
          <div>
            <form className='flex mt-8 flex-col justify-center items-center' onSubmit={handleSubmit}>
              <input className='bg-transparent text-stone-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 mt-2 font-light box-border' type="text" placeholder="first name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className='bg-transparent text-stone-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 mt-2 font-light box-border' type="text" placeholder="last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input className='bg-transparent text-stone-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 mt-2 font-light box-border' type="text" placeholder="user name" required value={userName} onChange={(e) => setUserName(e.target.value)} />
              <input className='bg-transparent text-neutral-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 font-light box-border' type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className='bg-transparent text-stone-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 mt-2 font-light box-border' type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className='bg-blue-500 hover:bg-blue-600 rounded-lg text-white w-80 max-w-full p-1.5 mt-4'>Register</button>
            </form>
          </div>
        </div>
        <div className='flex justify-center mt-4 h-16 border border-neutral-700 items-center'>
          <p className='text-white'>Have an account? <Link className='text-blue-400' to='/'>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;