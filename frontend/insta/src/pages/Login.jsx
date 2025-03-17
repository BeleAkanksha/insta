
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [ userData, setUserData ] = React.useState({})

    const navigate = useNavigate()
    const { user, setUser } = React.useContext(UserDataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, userData)
        if (response.status === 200) {
            console.log("Login successful, navigating...");
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        }

        setEmail('')
        setPassword('')
    }

  
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
                <form className='flex mt-8 flex-col justify-center items-center' onSubmit={(e) => handleSubmit(e)}>
                    <input className='bg-transparent text-neutral-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 font-light box-border' type="email" placeholder="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input className='bg-transparent text-stone-700 p-1.5 w-80 max-w-full border text-sm border-neutral-700 mt-2 font-light box-border' type="password" placeholder="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className='bg-blue-500 hover:bg-blue-600 rounded-lg text-white w-80 max-w-full p-1.5 mt-4'>Log in</button>
                </form>
            </div>
        </div>
        <div className='flex justify-center mt-4 h-16 border border-neutral-700 items-center'>
            <p className='text-white'>Don't have an account? <Link className='text-blue-400' to='/register'>Sign up</Link></p>
        </div>
    </div>
</div>


  )
}

export default Login