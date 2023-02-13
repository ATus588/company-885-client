import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight, faComment } from '@fortawesome/free-solid-svg-icons'


function NewsCard({ singleNews }) {
    return (
        <div className='news-card'>
            <label className='news-card-title'>{singleNews.title}</label>
            <div>
                <div className='news-card-content'>{singleNews.content}</div >
                {singleNews.news_comments_aggregate != null ?
                    (<section className='news-card-comment'>
                        <FontAwesomeIcon icon={faComment} />
                        <div>{singleNews.news_comments_aggregate.aggregate.count}</div>
                    </section>) : (<></>)}
                <Link to={`${singleNews.id}`} className='news-card-link'>
                    <FontAwesomeIcon className='news-card-icon' icon={faCircleArrowRight} /><span>Details</span>
                </Link>
            </div>
        </div>
    )
}

export default NewsCard