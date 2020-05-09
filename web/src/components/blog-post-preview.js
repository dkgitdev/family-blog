import {parseISO, format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {Link} from 'gatsby'
import React from 'react'
import {buildImageObj, cn, getBlogUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'

import styles from './blog-post-preview.module.css'
import {responsiveTitle3} from './typography.module.css'
import {CommentCount} from "disqus-react";

function BlogPostPreview (props) {
  const postUrl = getBlogUrl(props.publishedAt, props.slug.current);
  return (
    <Link
      className={props.isInList ? styles.inList : styles.inGrid}
      to={postUrl}
    >
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .auto('format')
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <div className={styles.text}>
        <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
        {props._rawExcerpt && (
          <div className={styles.excerpt}>
            <PortableText blocks={props._rawExcerpt} />
          </div>
        )}
        <div className={styles.footer}>
          {format(parseISO(props.publishedAt), 'd MMMM yyyy', {locale: ru})}
          <CommentCount
            shortname='blog-dkdev-ru'
            config={
              {
                url: `${window.location.origin}${postUrl}`,
                identifier: props.slug.current,
                title: props.title
              }
            }
          >
            Комментарии
          </CommentCount>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostPreview
