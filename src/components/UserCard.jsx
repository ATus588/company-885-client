import React from 'react'
import defaultavatar from '../images/defaultavatar.jpg'
import UtilButton from './UtilButton'


function UserCard({ singleAd, inactive }) {
    return (
        <div className='profile-part'>
            {singleAd.avatar_url ? <img src={`${singleAd.avatar_url}`} alt="user avatar" className='avatar' /> : <img src={defaultavatar} alt="user avatar" className='avatar' />}
            <div className='profile-id'>ID: <span>{singleAd.id}</span></div>
            <div className='profile-name'>Name: <span>{`${singleAd.firstname} ${singleAd.lastname}`}</span></div>
            <div className="profile-email">Email: <span>{singleAd.email}</span></div>
            <div className="button-holder">
                {inactive && <UtilButton id={singleAd.id} func='pass-user' text='Authorize' name='authorize' />}
                <UtilButton id={singleAd.id} func='delete-user' text='Delete' name='delete' />
            </div>
        </div>
    )
}

export default UserCard