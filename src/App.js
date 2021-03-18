import SearchingByKeyword from './Components/SearchingByKeyword/SearchingByKeyword';
import SearchingByLink from './Components/SearchingByLink/SearchingByLink';
import PreviewIframe from './Components/PreviewIframe/PreviewIframe';
import classes from './App.module.css';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';

function App() {
  const [previewId, setPreviewId] = useState(null);

  return (
    <div className={ classes.App }>
      <div>Choose video by link or keywords</div>
      <div className={ classes.searchingContainer }>
        <SearchingByLink setPreview={ (id) => setPreviewId(id) } />
        <SearchingByKeyword setPreview={ (id) => setPreviewId(id) } />
      </div>
      { previewId ? <div className={ classes.PreviewIframeContainer }>
        <div>
          <Button variant="outlined" color="primary" onClick={ () => setPreviewId(null) }>Close preview</Button>
        </div>
        <PreviewIframe id={ previewId }/>
      </div> : null }
    </div>
  );
}

export default App;
