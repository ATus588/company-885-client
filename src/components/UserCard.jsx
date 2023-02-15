import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import defaultavatar from '../images/defaultavatar.jpg'


function UserCard({ singleAd, inactive }) {
    return (
        <div className='profile-part'>
            {singleAd.avatar_url ? <img src={`${singleAd.avatar_url}`} alt="user avatar" className='avatar' /> : <img src={defaultavatar} alt="user avatar" className='avatar' />}
            <div className='profile-id'>ID: <span>{singleAd.id}</span></div>
            <div className='profile-name'>Name: <span>{`${singleAd.firstname} ${singleAd.lastname}`}</span></div>
            <div className="profile-email">Email: <span>{singleAd.email}</span></div>
            {inactive && <button>Authorize</button>}
        </div>
    )
}

export default UserCard