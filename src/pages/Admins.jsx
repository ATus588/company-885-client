import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import AdminCard from '../components/AdminCard'
import NewAdminForm from '../components/NewAdminForm'

const GET_ALL_ADMINS = gql`
query MyQuery {
  admin(order_by: {created_at: asc}) {
    avatar_url
    email
    id
    name
    status
  }
}
`

function Admins() {

    const { data, loading } = useQuery(GET_ALL_ADMINS)
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
            <NewAdminForm />
        </div>
    )
}

export default Admins