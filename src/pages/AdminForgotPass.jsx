import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'

const FORGOT_PASS_SEND_MAIL = gql`mutation MyMutation($email: String = "") {
  forget_pass_mail(email: $email, role: "admin") {
    error_code
    error_message
    status_code
  }
}
`

function AdminForgotPass() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const initValue = {
        email: '',
    };
    const { onChange, onSubmit, values } = useForm(ForgotPass, initValue)


    const [forgotPass, { data, loading }] = useMutation(FORGOT_PASS_SEND_MAIL, {
        update(_, result) {
            console.log(result)
            if (result.data.forget_pass_mail.status_code != 200) {
                setErrors(result.data.forget_pass_mail)
            } else {
                navigate('./reset');
            }
        },
        variables: values
    })

    function ForgotPass() {
        forgotPass();
    }

    return (
        <>
            <div className='admin-login-container'>
                <h1>Hmmm...</h1>
                <div className='login-text'>Look likes you forgot your password!<br />Enter your email to continue</div>
                <form className='login-form-container-middle' onSubmit={onSubmit}>
                    <div >
                        <label>Email</label>
                        <input type="email" name='email' placeholder='test@mail.com' value={values.email} onChange={onChange} />
                    </div>
                    <button type='submit' className='login-button'>Request</button>
                </form>
                {loading && <span className='login-loader'></span>}
                {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
                <section className='login-under-section'>Want to login as an admin? <br />
                    <Link to='../login/admin'>Go to admin login page here</Link>
                </section>
                <section className='login-under-section'>Login as an user then?<br />
                    <Link to='../login/user'>Go to user login page here</Link>
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

export default AdminForgotPass