import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchVid: 'reactjs',
      listOfVid: [],
      loadingg: null ,
      videoURL: '',
      comment: '',
      ListOfCom: [],
      likee: 'Like',
      LoadingError: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchVid: event.target.value
})
console.log(this.state.searchVid)
}
searchVideo = async () => {
    this.setState({
    loadingg: "LOADING",
    LoadingError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchVid}&type=video&videoDefinition=high&key=AIzaSyCuaU4-tggcXiedGAmYkhxvfWowsyb-w7o`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    LoadingError: true
  })
}
this.setState({
  listOfVid: myJson.items
})
console.log(this.state.listOfVid)
  this.setState({
    loadingg: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingg: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  listOfVid: myJson.items,
  loadingg: "LOADED"
})
console.log(this.state.listOfVid)
this.setState({
  videoURL: this.state.listOfVid[0].id.videoId
})
console.log("videoURL" , this.state.videoURL)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("listOfVid" , this.state.listOfVid)
}
setCurrentUrl = (id) => {

  this.setState({
    videoURL: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    ListOfCom: [...this.state.ListOfCom, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.likee == "Like"){
  this.setState({
    likee: 'Liked'
  })
  } else {
      this.setState({
    likee: 'Like'
  })
  }

}

  render() {
    let videos = this.state.listOfVid.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '221px', marginLeft: "0px",cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"452px",marginTop:"-21",width:"491px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.LoadingError ? (<h1>No videos found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.videoURL}`} style={{height: '350px', width: '850px', float : 'left',marginLeft: "2%"}}/>
)}

      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '348px',marginTop:"-71px", float : 'right'}}>
        {this.state.loadingg == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "830px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.likee}</button>
{this.state.ListOfCom.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'301px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"44px", width:'302px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'581px', width:'122px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"22px" ,width:'121px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));