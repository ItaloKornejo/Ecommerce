import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './styles/register.css'

const Register = () => {
    const { handleSubmit, register, reset } = useForm()
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate()
    const registerSwal = withReactContent(Swal)


    const submit = (data) => {
        data['role'] = 'admin';
        if (data.email && data.firstName && data.lastName && data.email && (data.phone.length >= 10)) {
            const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/users'
            axios.post(URL, data)
                .then(res => {
                    console.log(res, data)
                    registerSwal.fire({
                        title: <strong>Success</strong>,
                        html: <span>User is registered</span>,
                        timer: 3000,
                        icon: 'success'
                      })
                    handleNavigationLogin()
                })
                .catch(err => {
                    console.log(err)
                    registerSwal.fire({
                        title: <strong>Error</strong>,
                        html: <span>{err.response.data.message}</span>,
                        timer: 2500,
                        icon: 'error'
                      })
                
                })
        }else{
            registerSwal.fire({
                title: <strong>Error</strong>,
                html: <span>Please enter valid fields</span>,
                timer: 2500,
                icon: 'warning'
              }) 
        }
    }

    const handleNavigationLogin = () => {
        navigate(`/login`)
    }

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit(submit)} className='register__form-container' required>
                <h2>Sign Up</h2>
                <div className='register__input'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='Email' placeholder='Enter your Email'  {...register('email')} />
                </div>
                <div className='register__input'>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' id='firstname' placeholder='Enter your Firstname'  {...register('firstName')} />
                </div>
                <div className='register__input'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' id='lastname' placeholder='Enter your Lastname'  {...register('lastName')} />
                </div>
                <div className='register__input'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id='Password' placeholder='Password' autoComplete="on" {...register('password')} />
                </div>
                <div className='register__input'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' id='phone' placeholder='Enter your phone'  {...register('phone')} />
                </div>
                <button className='register__btn'>Sign up</button>
                <p className='register__text'>Already have an account?<a onClick={handleNavigationLogin} >Login up</a></p>
            </form>

        </div>
    )
}

export default Register