import React from 'react';
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Recover() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        // naviate to reset password page
        navigate('/reset');
    };

    function resendOTP() {
        return;
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen w-96 xl:w-1/3 mx-auto my-3 rounded-xl drop-shadow-2xl shadow-2xl'>

            <div className="title flex flex-col items-center space-y-4">
                <h4 className='text-3xl font-bold text-red-400'>Recovery</h4>
                <span className='py-4 text-lg w-2/3 text-center text-gray-500'>
                    Enter OTP to recover password.
                </span>
            </div>

            <form className="flex flex-col space-y-6 mt-1 w-full 2xl:my-auto justify-center align-middle items-center mx-auto"
                onSubmit={handleSubmit(onSubmit)}>

                <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                        Enter 6 digit OTP sent to your email address.
                    </span>
                    <input className="contact-input w-96 px-3 2xl:w-5/6" type="text" placeholder='OTP'
                        {...register("otp", { required: true, minLength: 6, maxLength: 6, pattern: /^(0|[1-9][0-9]*)$/g })}
                        aria-invalid={errors.Name ? "true" : "false"} />
                    {errors.otp?.type === 'required' && <p role="alert" className='px-1 py-0 text-center font-mono text-sm text-[#F43F5E]/70'>
                        OTP is required</p>}
                    {errors.otp?.type === 'pattern' && <p role="alert" className='px-1 py-0 text-center font-mono text-sm text-[#F43F5E]/70'>
                        Enter numeric OTP</p>}
                    {(errors.otp?.type === 'minLength' || errors.otp?.type === 'maxLength') && <p role="alert" className='px-1 py-0 text-center font-mono text-sm text-[#F43F5E]/70'>
                        Please enter 6 digits OTP</p>}
                </div>

                <button type='submit'
                    className="bg-[#F43F5E] font-semibold rounded-md tracking-widest px-3 py-3 text-stone-100
         align-middle hover:bg-[#F43F5E]/90 hover:scale-105 hover:transition-all ease-in-out delay-150
         hover:text-[#F43F5E] hover:bg-red-100 hover:border hover:border-[#F43F5E]">
                    Recover
                </button>

            </form>

            <div className="text-center mb-2 mt-2 2xl:text-4xl">
                <span className='text-gray-500'>
                    Can't get OTP?
                    <Link className='text-red-500 underline' onClick={resendOTP}>Resend</Link>
                </span>
            </div>
        </div>
    )
}

export default Recover