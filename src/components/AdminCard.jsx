import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import defaultavatar from '../images/defaultavatar.jpg'


function AdminCard({ singleAd }) {
    return (
        <div className='profile-part'>
            {singleAd.avatar_url ? <img src={`${singleAd.avatar_url}`} alt="admin avatar" className='avatar' /> : <img src={defaultavatar} alt="admin avatar" className='avatar' />}
            <div className='profile-id'>ID: <span>{singleAd.id}</span></div>
            <div className='profile-name'>Name: <span>{singleAd.name}</span></div>
            <div className="profile-email">Email: <span>{singleAd.email}</span></div>
            {singleAd.status === 1 ? (
                <div className='profile-icon'><FontAwesomeIcon className='profile-active-icon' icon={faCircleCheck} /></div>
            ) : (
                <div className='profile-icon'><FontAwesomeIcon className='profile-inactive-icon' icon={faCircleXmark} /></div>
            )}
        </div>
    )
}

export default AdminCard