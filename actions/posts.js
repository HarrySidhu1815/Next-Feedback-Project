'use server'

import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost( prevState,formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = []

    if(!title || title.trim().length === 0){
        errors.push('Invalid Title Length')
    }

    if(!image || image.size === 0){
        errors.push('Invalid Image Length')
    }

    if(!content || content.trim().length === 0){
        errors.push('Invalid Title Length')
    }

    if(errors.length > 0){
        return  {errors} 
    }

    let imageUrl

    try {
        imageUrl = await uploadImage(image)
    } catch (error) {
        new Error('Image failed to upload. Please try it again')
    }
    await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1
    })
    revalidatePath('/', 'layout')
    redirect('/feed')
  }

  export async function toggleLikeStatus(postID){
    await updatePostLikeStatus(postID, 2)
    revalidatePath('/', 'layout')
  }
