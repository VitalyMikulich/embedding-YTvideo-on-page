import React, { useState } from 'react';
import VideoTile from '../VideoTile/VideoTile';
import styles from './SearchingByKeyword.module.css';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles({
  input: {
    marginRight: '10px',
    width: '300px'
  },
  searchButton: {
    height: '40px'
  },
  navButtons: {
    margin: '0 10px'
  }
})

const SearchingByKeyword = props => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [videos, setVideos] = useState(null);
  const [data, setData] = useState(null);
  const [startHeight, setStartHeight] = useState(styles.startHeight);
  const [nextPageButtonStatus, setNextPageButtonStatus] = useState(false);
  const [prevPageButtonStatus, setPrevPageButtonStatus] = useState(false);
  const { setPreview } = props;
 
  const getVideos = input => {
    setStartHeight('');
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&type=video&part=snippet&q=`
    fetch(searchUrl + input).then(responce => responce.json())
                            .then(data => {
                              setData(data);
                              setVideos([...data.items])
                            })
    if (!nextPageButtonStatus) {
      setNextPageButtonStatus(true);
    }
    if (prevPageButtonStatus) {
      setPrevPageButtonStatus(false);
    }
  }

  const changePage = (pageToken, input) => {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&type=video&part=snippet&pageToken=${pageToken}&q=`
    fetch(searchUrl + input).then(responce => responce.json())
                            .then(data => {
                              setData(data);
                              setVideos([...data.items])
                              if (!prevPageButtonStatus) {
                                setPrevPageButtonStatus(true);
                              }
                              if (!data.prevPageToken) {
                                setPrevPageButtonStatus(false);
                              }
                            })
  }

  return (
    <div className={ `${styles.SearchingByKeywordContainer} ${startHeight}` }>
      <div>
        <TextField
          size="small"
          label="Type keywords"
          variant="outlined"
          classes={{ root: classes.input }} value={input} onChange={event => setInput(event.target.value)}
        />
        <Button
          size="small"
          variant="outlined"
          color="primary"
          classes={{ root: classes.searchButton }} onClick={() => getVideos(input)}
          disabled={ !input }
        >
          Load videos
        </Button>
      </div>
      <div className={ styles.videosContainer }>
        { videos ? videos.map((video, index) => <VideoTile key={ index } data={ video } setPreview={(id) => setPreview(id)} /> ) : null }
      </div>
      <div>
        { prevPageButtonStatus ? <Button
         startIcon={<NavigateBefore />}
         onClick={() => changePage(data.prevPageToken, input)}
         classes={{ root: classes.navButtons }}
        >
          Prev page
        </Button> : null }
        { nextPageButtonStatus ? <Button
          endIcon={<NavigateNext />}
          onClick={() => changePage(data.nextPageToken, input)}
          classes={{ root: classes.navButtons }}
        >
          Next page
        </Button> : null }
      </div>
    </div>
  )
}

export default SearchingByKeyword
