import React from 'react'
import { useQuery, gql } from '@apollo/client'
import NewsCard from '../components/NewsCard'


const GET_NEWS_FOR_ALL = gql`query MyQuery {
  news(where: {company_only_flag: {_eq: false}}, order_by: {created_at: asc}) {
    content
    created_at
    id
    is_soft_deleted
    title
  }
}`

function Home() {
    console.log(useQuery(GET_NEWS_FOR_ALL))
    const { data, loading } = useQuery(GET_NEWS_FOR_ALL);


    return (
        <div className='page-container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    data.news && data.news.map(singleNews => (
                        <NewsCard singleNews={singleNews} key={singleNews.id} type='home' />
                    ))
                )
            }
        </div>
    )
}

export default Home