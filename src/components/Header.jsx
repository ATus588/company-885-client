import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import LoginHeader from './LoginHeader'
import UserInfo from './UserInfo'

import { AuthContext } from '../context/auth'

function Header() {

    const { user } = useContext(AuthContext)

    return (
        <>

            <div className='header'>
                {user && <Menu />}
                <Link to='/' className='header-logo-container'>
                    <FontAwesomeIcon className='header-logo' icon={faHouseUser} />
                </Link>
                {!user && <LoginHeader />}
                {user && <UserInfo />}
            </div>

        </>
    )
}

export default Header