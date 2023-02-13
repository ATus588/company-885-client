import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { useQuery, gql } from '@apollo/client'
import ProfilePart from '../components/ProfilePart'

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

function Profile() {

    const { user } = useContext(AuthContext)
    const query = user.role === 'admin' ? GET_ADMIN_DATA : GET_USER_DATA
    console.log(query)
    const { data, loading } = useQuery(query, { variables: { id: user.id } })
    console.log(data);


    return (
        <div className='page-container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <ProfilePart data={data} />
                )

            }
        </div>
    )
}

export default Profile