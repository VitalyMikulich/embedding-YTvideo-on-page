/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import styles from './SearchingByLink.module.css';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    marginBottom: '10px',
    width: '100%'
  },
  button: {
    width: '100%'
  }
})

const SearchingByLink = props => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [linkMessage, setLinkMessage] = useState(null);
  const [containerHeight, setContainerHeight] = useState('');
  const { setPreview } = props;

  const getYouTubeVideoId = url => {
    const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const result = url.match(regex);
    if(!result) {
      setContainerHeight(styles.bigHieght);
      setLinkMessage(`The link don't contains video ID. Please, check the link and try again`);
    } else if (result[1].length !== 11) {
      setContainerHeight(styles.bigHieght);
      setLinkMessage('The link contains bad video ID. Please, check the link and try again');
    } else return result[1];
    return null;
  }

  const previewVideo = url => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    setLinkMessage(null);
    if(url.match(regex)) {
      setContainerHeight('');
      setPreview(getYouTubeVideoId(url));
    } else {
      setPreview(null);
      setContainerHeight(styles.bigHieght);
      setLinkMessage('Please, paste the correct link (example: https://www.youtube.com/watch?v=)');
    }
  }

  return (
    <div className={`${styles.SearchingByLinkContainer} ${containerHeight}`} >
      <TextField
        classes={{ root: classes.input }}
        value={input} size="small"
        label="Paste link"
        variant="outlined"
        onChange={event => setInput(event.target.value)}
      />
      <Button
        classes={{ root: classes.button }} onClick={() => previewVideo(input)}
        size="small"
        variant="outlined"
        color="primary"
        disabled={ !input }
      >
        Watch the video
      </Button>
      { linkMessage ? <div className={ styles.linkMessage }>{ linkMessage }</div> : null }
    </div>
  )
}

export default SearchingByLink
