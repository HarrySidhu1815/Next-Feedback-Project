'use client'

import { useFormStatus } from 'react-dom'

const PostForm = () => {
    const status = useFormStatus()

    if(status.pending){
        return <p>Creating the Post..</p>
    }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  )
}

export default PostForm
