import styles from './PreviewIframe.module.css';
import React from 'react';


const PreviewIframe = props => {
  return (
    <div className={ styles.PreviewIframeContainer }>
      <iframe
        title="preview-video"
        width="500"
        height="300"
        src={`https://www.youtube.com/embed/${props.id}?rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen 
      />
    </div>
  )
}

export default PreviewIframe
