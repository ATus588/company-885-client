import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer'>
            <p>Bài tập lớn Lập trình Web</p>
            <Link to={`about`} className='footer-link'>Our group</Link>
        </div>
    )
}

export default Footer