import { Link } from "@chakra-ui/react"
import React from "react"
import { Card } from "../components/Card"

import { Link as RouterLink } from "react-router-dom"


const sampleArticleData = [
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  },
  {
    "title": "Title",
    "description": "Description",
    "link": "/txn"
  }
]



export const ArticleList = () => {

  return (
    <div>
      {sampleArticleData.map((article) => {
        return (
          <>
            <div style={{height: "20px" }}/>
            <Card>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link as={RouterLink} to={article.link}>
                {article.link}
              </Link>
            </Card>
          </>
        )
      })}

    </div>
  )
}