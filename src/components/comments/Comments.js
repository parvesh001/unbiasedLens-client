import React from 'react'
import Comment from './Comment'
import styles from './Comments.module.scss'

export default function Comments() {
  return (
    <div className={styles.commentsContainer}>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </div>
  )
}
