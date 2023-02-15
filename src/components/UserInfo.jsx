import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import defaultAvatar from '../images/defaultavatar.jpg'


function UserInfo() {
    const { user, logout } = useContext(AuthContext)

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    const onClick = () => {
        logout();
        navigate('/')
    }

    return (
        <div className='menu-container' ref={menuRef}>
            <div className='user-info' onClick={() => { setOpen(!open) }}>
                <img src={user.avatar_url ? user.avatar_url : defaultAvatar} alt="user avatar" className='user-avatar' />
                <span className='hidden-small'>{user.name}</span>
            </div>
            {
                open && <div className='user-info-menu'>
                    <ul className='dropdown-ul'>
                        <li className='dropdown-item'>
                            <Link to='/' className='menu-link'>
                                <FontAwesomeIcon className='menu-icon' icon={faIdBadge} /><span>Profile</span>
                            </Link>
                        </li>
                        <li className='dropdown-item' onClick={onClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FontAwesomeIcon className='menu-icon' icon={faRightFromBracket} /> <span>Logout</span>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default UserInfo