import { useState } from 'react'

export default function Post({ submitPost, user, board }) {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    submitPost({ post: { 
      title,
      text,
      username: user,
      board_name: board
     }})
  }

  const handleChange = e => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value)
        break

      case 'text':
        setText(e.target.value)
        break

      default:
        return null
    }
  }

  return (
    <>
      <div id="post-form-header-container">
        <h1 id="post-form-header">New Post</h1>
      </div>

      <div id="post-form-container">
        
        <form onSubmit={handleSubmit}>

          <input type="text"
            name="title"
            onChange={handleChange}
            value={title}
            placeholder="title"
          />

          <textarea 
            name="text"
            onChange={handleChange}
            value={text}
            placeholder="text"
          />

          <input type="submit" value="Post" />

        </form>
      </div>
    </>
  )
}