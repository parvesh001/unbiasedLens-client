import React from 'react'
import Comment from './Comment'
import styles from './Comments.module.scss'

export default function Comments({comments}) {
  return (
    <div className={styles.commentsContainer}>
      {!comments.length && <p className='text-center fs-4 text-light'>No Comment Yet </p>}
        {comments.map(comment=>{
          return <Comment key={comment._id} comment={comment}/>
        })}
       
    </div>
  )
}
