import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const ADD_COMMENT = gql`
mutation MyMutation($created_by_admin: Int, $created_by_user: Int, $content: String, $point: Int!, $news_id: Int!) {
  insert_news_comment_one(object: {created_by_admin: $created_by_admin, created_by_user: $created_by_user, content: $content, point: $point, news_id: $news_id}) {
    id
  }
}
`

function CommentForm({ id }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const initValue = {
        content: '',
        point: 10,
        created_by_admin: user.role === 'admin' ? user.id : null,
        created_by_user: user.role === 'user' ? user.id : null,
        news_id: id
    };
    const { onChange, onSubmit, values } = useForm(AddComment, initValue)


    const [addComment, { data, loading }] = useMutation(ADD_COMMENT, {
        update(_, result) {
            console.log(result)
            navigate(0)
        },
        variables: values
    })

    function AddComment() {
        addComment();
    }

    return (
        <>
            <form className='comment-form' onSubmit={onSubmit}>
                <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label>Content</label>
                    <input type="textinput" name='content' value={values.content} onChange={onChange} style={{ width: '90%' }} />
                </div>
                <div style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label>Point</label>
                    <input type="number" name='point' placeholder='10/10' value={values.point} onChange={onChange} />
                </div>
                <button type='submit' className='comment-button'>Comment</button>
            </form>
        </>
    )
}

export default CommentForm