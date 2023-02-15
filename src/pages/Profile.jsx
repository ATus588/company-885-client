import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import ProfilePart from '../components/ProfilePart'
import { useForm } from '../utils/hooks'

const GET_ADMIN_DATA = gql`query MyQuery($id: Int!) {
  admin_by_pk(id: $id) {
    avatar_url
    email
    name
    id
  }
}
`
const GET_USER_DATA = gql`query MyQuery2($id: Int!) {
  user_by_pk(id: $id) {
    avatar_url
    email
    firstname
    lastname
    id
    phone
  }
}`
const UPDATE_AVATAR_ADMIN = gql`mutation MyMutation($id: Int!, $avatar_url: String = "") {
  update_admin_by_pk(pk_columns: {id: $id}, _set: {avatar_url: $avatar_url}) {
    id
  }
}`
const UPDATE_AVATAR_USER = gql`mutation MyMutation2($avatar_url: String = "", $id: Int = 10) {
  update_user_by_pk(pk_columns: {id: $id}, _set: {avatar_url: $avatar_url}) {
    id
  }
}`

function Profile() {

  const { user } = useContext(AuthContext)
  const query = user.role === 'admin' ? GET_ADMIN_DATA : GET_USER_DATA
  const { data, loading } = useQuery(query, { variables: { id: user.id } })

  const initValue = {
    avatar_url: '',
  }
  const { onChange, onSubmit, values } = useForm(LoginUser, initValue)
  const mutation = user.role === 'admin' ? UPDATE_AVATAR_ADMIN : UPDATE_AVATAR_USER
  const [loginUser, { data: dataUpdate, loading: loadingUpdate }] = useMutation(mutation, {
    update(_, result) {
      navigate(0);
    },
    variables: { id: user.id }
  })

  function LoginUser() {
    loginUser();
  }

  return (
    <div className='page-middle'>
      {
        loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <ProfilePart data={data} />
            <h3 style={{ color: 'aqua' }}>Update your avatar</h3>
            <form className='profile-form' onSubmit={onSubmit}>
              <input type='textinput' name='avatar_url' value={values.avatar_url} onChange={onChange} />
              <button type='submit' className='login-button'>Update</button>
            </form>
            {loadingUpdate && <span className='login-loader'></span>}
          </>
        )
      }
    </div>
  )
}

export default Profile