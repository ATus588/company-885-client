import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


function AdminCard({ singleAd }) {
    return (
        <div className='news-card'>
            <label className='news-card-title'>{singleAd.name}</label>
            <div>
                <div className='news-card-content'>{singleAd.email}</div >
            </div>
            {singleAd.status === 1 ? (
                <div className='profile-icon'><FontAwesomeIcon className='profile-active-icon' icon={faCircleCheck} /></div>
            ) : (
                <div className='profile-icon'><FontAwesomeIcon className='profile-inactive-icon' icon={faCircleXmark} /></div>
            )}
        </div>
    )
}

export default AdminCard