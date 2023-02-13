import React from 'react'
import defaultavatar from '../images/defaultavatar.jpg'

function ProfilePart({ data }) {

    return (
        <div className="profile-part">
            {data.user_by_pk &&
                <>
                    {data.user_by_pk.avatar_url ? <img src={`${data.user_by_pk.avatar_url}`} alt="user avatar" className='avatar' /> : <img src={defaultavatar} alt="user avatar" className='avatar' />}
                    <div className='profile-id'>ID: <span>{data.user_by_pk.id}</span></div>
                    <div className='profile-name'>Name: <span>{`${data.user_by_pk.firstname} ${data.user_by_pk.lastname}`}</span></div>
                    <div className="profile-email">Email: <span>{data.user_by_pk.email}</span></div>
                </>
            }
            {data.admin_by_pk &&
                <>
                    {data.admin_by_pk.avatar_url ? <img src={`${data.admin_by_pk.avatar_url}`} alt="admin avatar" className='avatar' /> : <img src={defaultavatar} alt="admin avatar" className='avatar' />}
                    <div className='profile-id'>ID: <span>{data.admin_by_pk.id}</span></div>
                    <div className='profile-name'>Name: <span>{data.admin_by_pk.name}</span></div>
                    <div className="profile-email">Email: <span>{data.admin_by_pk.email}</span></div>
                </>
            }
        </div>
    )
}

export default ProfilePart