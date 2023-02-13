import React from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {
    return (
        <div className='login-header'>
            <Link className='login-header-btn' to='login/user'>Login</Link>
            <Link className='login-header-btn' to='register'>Register</Link>
        </div>
    )
}

export default LoginHeader