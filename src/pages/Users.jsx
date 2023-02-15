import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import UserCard from '../components/UserCard'
import { AuthContext } from '../context/auth'

const GET_INACTIVE_USERS = gql`
query MyQuery {
  user(order_by: {created_at: asc}, where: {status: {_eq: 0}}) {
    email
    id
    firstname
    lastname
    status
  }
}
`

const GET_ACTIVE_USERS = gql`
query MyQuery {
  user(order_by: {created_at: asc}, where: {status: {_neq: 0}}) {
    avatar_url
    email
    id
    firstname
    lastname
    status
  }
}
`

function Users() {

    const { data: dataActive, loading: loading } = useQuery(GET_ACTIVE_USERS)

    const { data: dataInactive, loading: loading2 } = useQuery(GET_INACTIVE_USERS)

    const { user } = useContext(AuthContext)

    return (
        <div className='page-middle'>
            {user.role === 'admin' ?
                (
                    <div className='user-inactive-container'>
                        <h3 style={{ color: 'aqua' }}>Unauthorized users</h3>
                        {
                            loading2 ? (
                                <h2>Loading...</h2>
                            ) : (
                                dataInactive.user && dataInactive.user.map(singleAd => (
                                    <UserCard singleAd={singleAd} key={singleAd.id} inactive={true} />
                                ))
                            )
                        }
                    </div>
                ) : (<></>)}
            {user.role === 'admin' ? (<h3 style={{ color: 'aqua' }}>Authorized users</h3>) : (<></>)}
            <div className="user-inactive-container">
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        dataActive.user && dataActive.user.map(singleAd => (
                            <UserCard singleAd={singleAd} key={singleAd.id} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Users