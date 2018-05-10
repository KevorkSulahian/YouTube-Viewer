import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';

import VideoList from './components/videoList';
import SearchBar from './components/searchBar';
import VideoDetail from './components/videoDetail';

const API_KEY = 'AIzaSyBFkl-NpxEckwSaEjz8Q6rVmV5mdSaPoDU';




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
       videos: [],
       selectedVideo: null
      };

      this.videoSearch("idubbbz");

  }
    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, videos => {
        this.setState({  
           videos: videos,
           selectedVideo:videos[0]
         });
      });
    }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
  return ( <div>
            <SearchBar onSeachTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
               videos = {this.state.videos}
               onVideoSelect={selectedVideo => this.setState({selectedVideo})}
               />
          </div>
        );
      }
}
ReactDom.render(<App />, document.querySelector('.container'));
