import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

const GET_NEWS_BY_ID = gql`
query MyQuery($newsId: Int = 10) {
  news_by_pk(id: $newsId) {
    content
    is_soft_deleted
    id
    created_by
    created_at
    title
    news_comments(order_by: {created_at: asc}) {
      content
      point
      user {
        email
      }
      admin {
        email
      }
    }
  }
}
`

function SingleNews() {
    const navigate = useNavigate();
    const { newsId } = useParams();
    const { data, loading } = useQuery(GET_NEWS_BY_ID, { variables: { newsId } })
    console.log(useQuery(GET_NEWS_BY_ID, { variables: { newsId } }))

    return (
        <div className='page-container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <>
                        <h1 className='single-name'>{data.news_by_pk.title}</h1>
                        <h2 className='single-content'>{data.news_by_pk.content}</h2>
                        <div className='single-section'>Comment section:
                            {data.news_by_pk.news_comments.map(comment => (<Comment comment={comment} />))}
                        </div>
                        <CommentForm id={newsId} />
                        <FontAwesomeIcon className='add-btn' icon={faCircleLeft} onClick={() => navigate(-1)} />
                    </>
                )

            }
        </div>
    )
}

export default SingleNews