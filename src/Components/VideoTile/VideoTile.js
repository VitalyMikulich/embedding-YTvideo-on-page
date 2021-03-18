import styles from './VideoTile.module.css';
import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    transition: '0.3s',
    '&:hover': {
       background: "rgb(63 81 181 / 10%)"
    }
  }
})

const VideoTile = props => {
  const { data, setPreview } = props;
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }}>
      <div
        className={ styles.videoContainer }
        onClick={() => setPreview(data.id.videoId)}
        title="Click to watch the video"
      >
        <div className={ styles.imgContainer }>
          <img src={ data.snippet.thumbnails.default.url } alt={ `video-${data.id.videoId}` }/>
        </div>
        <div className={ styles.title }>{ data.snippet.title }</div>
      </div>
    </Paper>
  )
}

export default VideoTile
