import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import logo from '../assets/logo.png';

function Sigin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <div className='flex flex-col justify-center items-center h-screen w-96 xl:w-1/3 mx-auto my-3 rounded-xl drop-shadow-2xl shadow-2xl'>

            <div className="title flex flex-col items-center justify-center space-y-0 mx-auto my-2 px-6">
                <img alt="logo-airbnb" src={logo} className='w-32 h-12 mt-4 object-contain 2xl:h-36 2xl:w-52' />
                <h1 className='text-center text-xl font-mono text-gray-500 2xl:text-5xl'>Hello User</h1>
            </div>

            <form className="flex flex-col space-y-6 mt-1 w-full 2xl:my-auto justify-center align-middle items-center mx-auto"
                onSubmit={handleSubmit(onSubmit)}>

                <div className='profile flex justify-center py-2'>
                    <img src={avatar} className="w-40 h-40 shadow-xl rounded-full 2xl:h-52 2xl:w-52" alt="avatar" />
                </div>

                <input className="contact-input w-96 px-3 2xl:w-5/6" type="text" placeholder='Password'
                    {...register("password", { required: true })}
                    aria-invalid={errors.Name ? "true" : "false"} />
                {errors.password?.type === 'required' && <p role="alert" className='px-1 py-0 text-left font-mono text-sm text-[#F43F5E]/70'>
                    Password is required</p>}

                <button type='submit'
                    className="bg-[#F43F5E] font-semibold rounded-md tracking-widest px-3 py-3 text-stone-100
         align-middle hover:bg-[#F43F5E]/90 hover:scale-105 hover:transition-all ease-in-out delay-150
         hover:text-[#F43F5E] hover:bg-red-100 hover:border hover:border-[#F43F5E]">
                    Sign In
                </button>

            </form>

            <div className="text-center mb-2 mt-2 2xl:text-4xl">
                <span className='text-gray-500'>
                    Forgot Password?
                    <Link className='text-red-500 underline' to="/recoverpassword">Recover Now</Link>
                </span>
            </div>
        </div>
    )
}

export default Sigin;