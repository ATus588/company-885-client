import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import AdminCard from '../components/AdminCard'


const GET_ALL_USERS = gql`
query MyQuery {
  users(order_by: {created_by: asc}) {
    avatar_url
    email
    id
    name
    status
  }
}
`

function Users() {

    const { data, loading } = useQuery(GET_ALL_USERS)
    return (
        <div className='page-container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    data.admin && data.admin.map(singleAd => (
                        <AdminCard singleAd={singleAd} key={singleAd.id} />
                    ))
                )
            }
        </div>
    )
}

export default Users