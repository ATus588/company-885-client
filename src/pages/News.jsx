import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import NewsCard from '../components/NewsCard'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'


const GET_NEWS_FOR_USER = gql`query MyQuery($_eq: Boolean = false) {
  news(where: {admin_only_flag: {_eq: $_eq}}, order_by: {created_at: asc}) {
    content
    created_at
    created_by
    id
    is_soft_deleted
    title
    news_comments_aggregate {
      aggregate {
        count
      }
    }
  }
}
`
const GET_ALL_NEWS = gql`
query MyQuery {
  news {
    content
    created_at
    created_by
    id
    is_soft_deleted
    title
    news_comments_aggregate {
      aggregate {
        count
      }
    }
  }
}
`


function News() {
    const { user } = useContext(AuthContext)

    const { data, loading } = user.role === "admin" ? useQuery(GET_ALL_NEWS) : useQuery(GET_NEWS_FOR_USER)
    return (
        <div className='page-container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    data.news && data.news.map(singleNews => (
                        <NewsCard singleNews={singleNews} key={singleNews.id} />
                    ))
                )
            }
            {
                user.role === "admin" ? (
                    <Link to='add'>
                        <FontAwesomeIcon className='add-btn' icon={faCirclePlus} />
                    </Link>
                ) : (<></>)
            }
        </div>
    )
}

export default News