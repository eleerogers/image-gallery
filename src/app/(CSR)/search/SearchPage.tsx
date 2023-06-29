"use client"

import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image"
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from './SearchPage.module.css'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
  const [searchResultsLoading, setSearchResultsLoading] = useState(false)
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setSearchResults(null)
        setSearchResultsLoadingIsError(false)
        setSearchResultsLoading(true)
        const response = await fetch("/api/search?query=" + query)
        const images: UnsplashImage[] = await response.json()
        setSearchResults(images)
      } catch (error) {
        console.error(error)
        setSearchResultsLoadingIsError(true)
      } finally {
        setSearchResultsLoading(false)
      }
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. cats, hotdogs, etc..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingIsError && <p>Something went wrong. Please try again.</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query.</p>}
      </div>
      {searchResults && 
        <>
          {
            searchResults.map(image => (
              <Image src={image.urls.raw} width={250} height={250} alt={image.description} key={image.urls.raw} className={styles.image} />
            ))
          }
        </>
      }
    </div>
  );
}
 
export default SearchPage;