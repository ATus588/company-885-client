import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faDiagramProject, faPersonShelter, faListOl } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/auth'

function Menu() {
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthContext)

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

    return (
        <div className='menu-container' ref={menuRef}>
            <div className="menu-trigger" onClick={() => { setOpen(!open) }}>
                <FontAwesomeIcon className='menu-icon' icon={faBars} /><span>Menu</span>
            </div>
            {
                open && <div className='dropdown-menu'>
                    <ul className='dropdown-ul'>
                        <li className='dropdown-item'>
                            <Link to='news' className='menu-link'>
                                <FontAwesomeIcon className='menu-icon' icon={faEnvelope} /> <span>News</span>
                            </Link>
                        </li>
                        <li className='dropdown-item'>
                            <Link to='users' className='menu-link'>
                                <FontAwesomeIcon className='menu-icon' icon={faDiagramProject} /><span>Users</span>
                            </Link>
                        </li>
                        {user.role === 'admin' ? (
                            <>
                                <li className='dropdown-item'>
                                    <Link to='admins' className='menu-link'>
                                        <FontAwesomeIcon className='menu-icon' icon={faPersonShelter} /><span>Admins</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Menu