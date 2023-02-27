import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function Reset() {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const { password, confirmPassword } = data;
        if (password === confirmPassword) {
            // naviate to reset password page
            navigate('/reset');
        } else {
            // toaster notify
        }
    };

    function resendOTP() {
        return;
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen w-96 xl:w-1/3 mx-auto my-3 rounded-xl drop-shadow-2xl shadow-2xl'>

            <div className="title flex flex-col items-center space-y-4 px-2">
                <h4 className='text-3xl font-bold text-red-400'>Reset</h4>
                <span className='py-4 text-lg w-full px-2 text-center text-gray-500'>
                    Enter a new password.
                </span>
            </div>

            <form className="flex flex-col space-y-6 mt-1 w-full 2xl:my-auto justify-center align-middle items-center mx-auto"
                onSubmit={handleSubmit(onSubmit)}>


                <input className='contact-input w-96 px-3 2xl:w-5/6' type="password" placeholder='Password'
                    {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g })}
                    aria-invalid={errors.Email ? "true" : "false"} />
                {errors.password?.type === 'required' &&
                    <p role="alert" className='text-center font-mono text-sm text-[#F43F5E]/70'>
                        Password is required</p>}
                {errors.password?.type === 'pattern' &&
                    <span role="alert" className='px-1 text-center overflow-ellipsis font-mono text-sm text-[#F43F5E]/70'>
                        Password should contain minimum eight characters, at least one letter and one number.</span>}

                <input className='contact-input w-96 px-3 2xl:w-5/6' type="password" placeholder='Confirm Password'
                    {...register("confirmPassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g })}
                    aria-invalid={errors.Email ? "true" : "false"} />
                {errors.confirmPassword?.type === 'required' &&
                    <p role="alert" className='text-center font-mono text-sm text-[#F43F5E]/70'>
                        Confirm Password is required</p>}
                {errors.confirmPassword?.type === 'pattern' &&
                    <span role="alert" className='px-1 text-center overflow-ellipsis font-mono text-sm text-[#F43F5E]/70'>
                        Password should contain minimum eight characters, at least one letter and one number.</span>}

                <button type='submit'
                    className="bg-[#F43F5E] font-semibold rounded-md tracking-widest px-3 py-3 text-stone-100
         align-middle hover:bg-[#F43F5E]/90 hover:scale-105 hover:transition-all ease-in-out delay-150
         hover:text-[#F43F5E] hover:bg-red-100 hover:border hover:border-[#F43F5E]">
                    Reset
                </button>

            </form>

        </div>
    )
}

export default Reset