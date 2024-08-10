'use client'

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react'
import Image from 'next/image';

function Post({ post, action }) {
  function imageLoader(config){
    const urlStart = config.src.split('upload/')[0]
    const urlEnd = config.src.split('upload/')[1]
    const tranformedUrl = `w_200`
    console.log(`${urlStart}upload/${tranformedUrl}/${urlEnd}`)
    return `${urlStart}/${tranformedUrl}/${urlEnd}`
    // return config.src
  }
  return (
    <article className="post">
      <div className="post-image">
        <Image quality={50} fill src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : null}>
            <LikeButton />
            </form>
            
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPost, updateOptimisticPost] = useOptimistic(posts, (prevPost, updatePostID) => {
    const updatePostIndex = prevPost.findIndex(post => post.id === updatePostID)

    if(updatePostIndex === -1){
      return prevPost
    }

    const updatePost = {...prevPost[updatePostIndex]}
    updatePost.likes = updatePost.like + (updatePost.isLiked ? -1 : 1)
    updatePost.isLiked = !updatePost.isLiked

    const newPosts = [...prevPost]
    newPosts[updatePostIndex] = updatePost
    return newPosts
  })

  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId){
    updateOptimisticPost(postId)
    toggleLikeStatus(postId)
  }

  return (
    <ul className="posts">
      {optimisticPost.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
