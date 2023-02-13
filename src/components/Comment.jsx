
import React from 'react'

function Comment({ comment }) {
    return (
        <div className='comment-container'>
            {comment.user && <h2 className='comment-email'>{comment.user.email}</h2>}
            {comment.admin && <h2 className='comment-email'>{comment.admin.email}</h2>}
            <h2 className='comment-content'>{comment.content}</h2>
            <h2 className="comment-point">Points: {comment.point}</h2>
        </div>
    )
}

export default Comment