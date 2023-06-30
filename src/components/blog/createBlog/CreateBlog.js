import React from 'react'
import Input from '../../../UI/Input'
import styles from './CreateBlog.module.scss'

export default function CreateBlog() {
  return (
    <form className={styles.createBlog}>
      <Input label="Blog Title" id="blogTitle" type="text" placeholder="Blog Title" />
      <Input label="Blog Title" id="blogTitle" type="text" placeholder="Blog Title" />
      <Input label="Blog Title" id="blogTitle" type="text" placeholder="Blog Title" />
      <Input label="Blog Title" id="blogTitle" type="text" placeholder="Blog Title" />
      <Input label="Blog Title" id="blogTitle" type="text" placeholder="Blog Title" />
    </form>
  )
}
