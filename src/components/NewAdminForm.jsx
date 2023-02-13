import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'

const ADD_ADMIN = gql`mutation MyMutation($admin_id: Int!, $email: String!, $name: String!) {
  admin_first_send_mail(email: $email, name: $name, admin_id: $admin_id) {
    created_at
    error_code
    error_message
    status_code
  }
}`

function NewAdminForm() {
    const [errors, setErrors] = useState({});
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const initValue = {
        email: '',
        name: '',
        admin_id: user.id
    };
    const { onChange, onSubmit, values } = useForm(AddAdmin, initValue);

    const [addAdmin, { data, loading }] = useMutation(ADD_ADMIN, {
        update(_, result) {
            console.log(result)
            if (result.data.admin_first_send_mail.status_code != 200) {
                setErrors(result.data.admin_first_send_mail)
            } else {
                navigate(0);
            }
        },
        variables: values
    })

    function AddAdmin() {
        addAdmin();
    }


    return (
        <>
            <form className='login-form-container-middle' onSubmit={onSubmit} style={{ backgroundColor: 'white', margin: '20px', borderRadius: '10px' }}>
                <div >
                    <label>Email</label>
                    <input type="email" name='email' placeholder='test@mail.com' value={values.email} onChange={onChange} />
                </div>
                <div>
                    <label>Name</label>
                    <input type="textinput" name='name' placeholder='Beautiful Name' value={values.name} onChange={onChange} />
                </div>
                <button type='submit' className='login-button'>Add</button>
            </form>
            {loading && <span className='login-loader'></span>}
            {errors.error_code && <div className='login-error'>{errors.error_code}<br />{errors.error_message}</div>}
        </>
    )
}

export default NewAdminForm