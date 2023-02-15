import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const ADD_COMMENT = gql`
mutation MyMutation3($content: String!, $created_by_admin: Int, $created_by_user: Int, $news_id: Int!, $point: Int) {
  validate_comment(content: $content, news_id: $news_id, created_by_admin: $created_by_admin, created_by_user: $created_by_user, point: $point) {
    error_code
    error_message
    status_code
  }
}
`

function CommentForm({ id }) {
    const [errors, setErrors] = useState({});
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
            if (result.data.validate_comment.status_code != 200) {
                setErrors(result.data.validate_comment)
            } else {
                navigate(0); // navigate(-1) navigate(0)
            }
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
            {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
        </>
    )
}

export default CommentForm