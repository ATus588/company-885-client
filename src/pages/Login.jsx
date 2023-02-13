import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const LOGIN_USER = gql`
mutation MyMutation($email: String!, $password: String!) {
  login_user(email: $email, password: $password) {
    email
    error_code
    error_message
    expire_date
    name
    role
    status_code
    token
    id
    avatar_url
  }
}
`

function Login() {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const initValue = {
        email: '',
        password: '',
    };
    const { onChange, onSubmit, values } = useForm(LoginUser, initValue)


    const [loginUser, { data, loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login_user: loginData } }) {
            console.log(loginData)
            if (loginData.status_code != 200) {
                setErrors(loginData)
            } else {
                context.login(loginData);
                navigate('/');
            }
        },
        variables: values
    })

    function LoginUser() {
        loginUser();
    }

    return (
        <>
            <div className='login-container'>
                <h1>Welcome back!!</h1>
                <div className='login-text'>Welcome back to The Company!<br />Enter your email and password to continue</div>
                <form className='login-form-container-middle' onSubmit={onSubmit}>
                    <div >
                        <label>Email</label>
                        <input type="email" name='email' placeholder='test@mail.com' value={values.email} onChange={onChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name='password' placeholder='*********' value={values.password} onChange={onChange} />
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                </form>
                {loading && <span className='login-loader'></span>}
                {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
                <section className='login-under-section'>Want to login as an admin? <br />
                    <Link to='../login/admin'>Go to admin login page here</Link>
                </section>
                <section className='login-under-section'>Don't have an account? <br />
                    <Link to='../register'>Go to register page here</Link>
                </section>
                <section>
                    <Link to='/' className='login-logo-container'>
                        <FontAwesomeIcon className='header-logo' icon={faHouseUser} />
                    </Link>
                </section>
            </div>
        </>
    )
}

export default Login