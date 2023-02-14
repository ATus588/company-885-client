import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


function AdminCard({ singleAd }) {
    return (
        <div className='news-card'>
            <label className='news-card-title'>{`${singleAd.firstname} ${singleAd.lastname}`}</label>
            <div>
                <div className='news-card-content'>{singleAd.email}</div >
            </div>
        </div>
    )
}

export default AdminCard