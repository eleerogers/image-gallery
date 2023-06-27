import { UnsplashUser } from '@/models/unsplash-user'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
// import { cache } from 'react'

interface PageProps {
  params: { username: string },
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)

  if (response.status === 404) notFound()

  return await response.json()
}

// Use getUserCached if using axios instead of fetch, and then call it instead of getUser below
// const getUserCached = cache(getUser)

export async function generateMetadata({ params: { username }}: PageProps): Promise<Metadata> {
  const user: UnsplashUser = await getUser(username)
  return {
    title: ([user.first_name, user.last_name].filter(Boolean).join(' ') || user.username + ' - Image Gallery')
  }
}

export default async function Page({ params: { username }}: PageProps) {
  const user: UnsplashUser = await getUser(username)

  return(
    <div>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
    </div>
  )
}