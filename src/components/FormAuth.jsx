import React from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from './form/FormInput'

const FormAuth = ({ isRegister }) => {
    return (
        <div className="h-screen grid place-items-center">
            <Form method='post' className='card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4'>
                <h4 className='text-center text-3xl font-bold'> {isRegister ? "Register" : "Login"} </h4>
                {isRegister ? <FormInput type="name" name="name" label="Username" /> : null}
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="password" name="password" label="Password" />
                <div className="mt-4">
                    <button className="btn btn-primary btn-block" type='submit'>{isRegister ? "Register" : "Login"}</button>
                </div>
                <p className='text-center'> {isRegister ? "Sudah punya Account?" : "Belum ada Account?"}
                    <Link to={isRegister ? '/login' : '/register'} className="ml-2 link link-accent capitalize">{isRegister ? "Login" : "Register"}</Link>
                </p>
            </Form>
        </div>
    )
}

export default FormAuth