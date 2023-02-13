import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/hooks'

const REGISTER_USER = gql`
mutation ReisterUser( $email: String!, $firstname: String!, $lastname: String!, $pass_confirm: String!, $password: String!, $phone: String!) {
  register_user(email: $email, firstname: $firstname, lastname: $lastname, pass_confirm: $pass_confirm, password: $password, phone: $phone) {
    created_at
    error_code
    error_message
    status_code
  }
}
`

function Register(props) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        status_code: false
    });
    const initValue = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        pass_confirm: '',
        phone: '',
    };
    const { onChange, onSubmit, values } = useForm(registerUser, initValue)


    const [addUser, { data, loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            if (result.data.register_user.status_code != 200) {
                setErrors(result.data.register_user)
            } else {
                navigate('/');
            }
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }


    return (
        <div className='login-container'>
            <h1>Welcome!!</h1>
            <div className='login-text'>Welcome new user!<br />Please fill in the form below to complete registeration</div>
            <form className='login-form-container' onSubmit={onSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name='email' placeholder='test@mail.com' value={values.email} onChange={onChange} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="textinput" name='phone' placeholder='0123456789' value={values.phone} onChange={onChange} />
                </div>
                <div>
                    <label>Firstmame</label>
                    <input type="textinput" name='firstname' placeholder='Your firstname' value={values.firstname} onChange={onChange} />
                </div>
                <div>
                    <label>Lastname</label>
                    <input type="textinput" name='lastname' placeholder='Your lastname' value={values.lastname} onChange={onChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' placeholder='*********' value={values.password} onChange={onChange} />
                </div>
                <div>
                    <label>Password confirm</label>
                    <input type="password" name='pass_confirm' placeholder='*********' value={values.pass_confirm} onChange={onChange} />
                </div>
                <button type='submit' className='login-button'>Register</button>
            </form>
            {loading && <span className='login-loader'></span>}
            {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
            <section className='login-under-section'>Already have an account? <br />
                <Link to='../login/user'>Go to login page here</Link>
            </section>
            <section>
                <Link to='/' className='login-logo-container'>
                    <FontAwesomeIcon className='header-logo' icon={faHouseUser} />
                </Link>
            </section>
        </div>
    )
}



export default Register