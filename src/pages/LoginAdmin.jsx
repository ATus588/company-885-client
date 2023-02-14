import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const LOGIN_ADMIN = gql`
mutation MyMutation2($email: String = "", $password: String = "") {
  login_admin(email: $email, password: $password) {
    id
    email
    error_code
    error_message
    expire_date
    name
    role
    status_code
    token
    avatar_url
  }
}
`


function LoginAdmin() {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const initValue = {
        email: '',
        password: '',
    };
    const { onChange, onSubmit, values } = useForm(LoginAdmin, initValue)


    const [loginAdmin, { data, loading }] = useMutation(LOGIN_ADMIN, {
        update(_, { data: { login_admin: loginData } }) {
            console.log(loginData)
            context.login(loginData);
            if (loginData.status_code != 200) {
                setErrors(loginData)
            } else {
                navigate('/');
            }
        },
        variables: values
    })

    function LoginAdmin() {
        loginAdmin();
    }

    return (
        <>
            <div className='admin-login-container'>
                <h1>Welcome back!!</h1>
                <div className='login-text'>Here is the Admin login page<br />Enter your email and password to continue</div>
                <form className='login-form-container-middle' onSubmit={onSubmit}>
                    <div >
                        <label>Email</label>
                        <input type="email" name='email' placeholder='test@mail.com' value={values.email} onChange={onChange} />
                    </div>
                    <div >
                        <label>Password</label>
                        <input type="password" name='password' placeholder='*********' value={values.password} onChange={onChange} />
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                </form>
                {loading && <span className='login-loader'></span>}
                {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
                <section className='login-under-section'>Forget your password <br />
                    <Link to='../forgotpass/admin'>Request reset token here</Link>
                </section>
                <section className='login-under-section'>Want to login as an user? <br />
                    <Link to='../login/user'>Go to user login page here</Link>
                </section>
                <section className='login-under-section'>Don't have an account? <br />
                    <Link to='../register'>Go to user login page here</Link>
                </section>
                <section className='login-under-section'>Login for the first time<br />
                    <Link to='../login/token'>Use your token here</Link>
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

export default LoginAdmin