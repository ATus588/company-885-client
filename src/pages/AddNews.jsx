import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const ADD_NEWS = gql`
mutation MyMutation( $created_by: Int!, $title: String!, $content: String!) {
  insert_news_one(object: {content: $content, created_by: $created_by, title: $title}) {
    id
  }
}
`

function AddNews() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const [forAdmin, setForAdmin] = useState(false)
    const [forCompany, setForCompany] = useState(false)
    const initValue = {
        title: '',
        content: '',
        created_by: user.id,
    };
    const { onChange, onSubmit, values } = useForm(AddNews, initValue)


    const [addNews, { data, loading }] = useMutation(ADD_NEWS, {
        update(_, result) {
            console.log(result)
            navigate('/news')
        },
        variables: values
    })

    function AddNews() {
        addNews();
    }


    return (
        <>
            <div className='page-container'>
                <form className='add-form-container' onSubmit={onSubmit}>
                    <div className='add-form'>
                        <label>Title</label>
                        <input type='textinput' name='title' value={values.title} onChange={onChange} style={{ textAlign: 'center' }} />
                    </div>
                    <div className='add-form'>
                        <label>Content</label>
                        <input type="textinput" name='content' value={values.password} onChange={onChange} />
                    </div>
                    <button type='submit' className='login-button'>Submit</button>
                </form>
                {loading && <span className='login-loader'></span>}
            </div>
        </>
    )
}

export default AddNews