import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'

const CHECK_TOKEN = gql`
mutation MyMutation($pass_confirm: String!, $password: String!, $token: String!) {
  forget_pass_check(pass_confirm: $pass_confirm, password: $password, token: $token) {
    error_code
    error_message
    status_code
  }
}
`


function ResetPass() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const initValue = {
        token: '',
        password: '',
        passconfirm: ''
    };
    const { onChange, onSubmit, values } = useForm(ResetPass, initValue)


    const [resetPass, { data, loading }] = useMutation(CHECK_TOKEN, {
        update(_, result) {
            if (result.data.forget_pass_check.status_code != 200) {
                setErrors(result.data.forget_pass_check)
            } else {
                navigate('../login/user');
            }
        },
        variables: values
    })

    function ResetPass() {
        resetPass();
    }

    return (
        <>
            <div className='login-container'>
                <h1>Almost there...</h1>
                <div className='login-text'>We have sent you an email with token<br />Enter your token and reset up your password <br />If you don't receive an email, please make sure you register with an valid email</div>
                <form className='login-form-container-middle' onSubmit={onSubmit}>
                    <div >
                        <label>Token</label>
                        <input type="textinput" name='token' value={values.token} onChange={onChange} />
                    </div>
                    <div >
                        <label>Password</label>
                        <input type="password" name='password' placeholder='*********' value={values.password} onChange={onChange} />
                    </div>
                    <div >
                        <label>Confirm password</label>
                        <input type="password" name='pass_confirm' placeholder='*********' value={values.pass_confirm} onChange={onChange} />
                    </div>
                    <button type='submit' className='login-button'>Reset</button>
                </form>
                {loading && <span className='login-loader'></span>}
                {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
                <section className='login-under-section'>Want to login as an admin? <br />
                    <Link to='../login/admin'>Go to admin login page here</Link>
                </section>
                <section className='login-under-section'>Don't have an account? <br />
                    <Link to='../register'>Go to user register page here</Link>
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

export default ResetPass