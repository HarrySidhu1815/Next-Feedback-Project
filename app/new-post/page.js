"use client";

import { createPost } from "@/actions/posts.js";
import PostForm from "@/components/post-form";
import { useFormState } from "react-dom";

export default function NewPostPage() {
  const [state, formaction] = useFormState(createPost, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formaction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title"  />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5"  />
        </p>
        <p className="form-actions">
          <PostForm />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((err) => (
              <li>
                <li key={err}>{err}</li>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
