import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getAllProductsCart } from '../store/slices/cart.slice';
import { setUserGlobal } from '../store/slices/user.slice';
import './styles/login.css'

const Login = () => {
  const { handleSubmit, register, reset } = useForm()
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginSwal = withReactContent(Swal)

  const submit = (data) => {
    // console.log(data);
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login'
    axios.post(URL, data)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        dispatch(setUserGlobal(res.data.data.user))
        dispatch(getAllProductsCart())
        loginSwal.fire({
          title: <strong>Success</strong>,
          html: <span>{`Welcome ${res.data.data.user.firstName}`}</span>,
          timer: 2000,
          icon: 'success'
        })
        handleNavigationHome()

      })
      .catch(err => {
        loginSwal.fire({
          title: <strong>{err.response.data.status}</strong>,
          html: <span>{err.response.data.message}</span>,
          timer: 1800,
          icon: 'error'
        })
        console.log(err)})
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  const handleNavigationHome = () => {
    navigate(`/`)
  }
  const handleNavigationRegister = () => {
    navigate(`/register`)
  }
  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit(submit)} className='login__form-container'>
        <h2>Sign In</h2>
        <div className='login__email'>
          <label htmlFor='email'><i className='login__email-icon bx bx-user' ></i></label>
          <input type='email' id='email' placeholder='Username'  {...register('email')} />
        </div>
        <div className='login__password'>
          <label htmlFor='password'><i className='login__password-icon bx bx-lock-alt' ></i></label>
          <input type="password" id='password' placeholder='Password' autoComplete="on" {...register('password')}/>
        </div>
        <button className='login__btn'>Login</button>
        <p className='login__text'>Don't have an account?<a onClick={handleNavigationRegister}>Sign up</a></p>
      </form>
    </div>
  )
}

export default Login