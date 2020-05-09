import {parseISO, formatDistance, format, differenceInDays} from 'date-fns'
import {ru} from 'date-fns/locale'
import React from 'react'
import {Location} from '@reach/router'
import {DiscussionEmbed} from 'disqus-react'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'

import styles from './blog-post.module.css'

function BlogPost (props) {
  const {_rawBody, authors, categories, title, mainImage, publishedAt, slug} = props
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
            <Location>
              {
                ({location}) => (
                  <DiscussionEmbed
                    shortname='blog-dkdev-ru'
                    config={
                      {
                        url: `${location.origin}${location.pathname}`,
                        identifier: slug.current,
                        title: title,
                        language: 'ru_RU'
                      }
                    }
                  />
                )
              }
            </Location>
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(parseISO(publishedAt), new Date()) > 3
                  ? formatDistance(parseISO(publishedAt), new Date())
                  : format(parseISO(publishedAt), 'd MMMM yyyy', {locale: ru})}
              </div>
            )}
            {authors && <AuthorList items={authors} title='Авторы' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Категории</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
