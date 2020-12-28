import React from 'react';

import Img, { ImgList } from './components/img';
import PopUp from './components/popup';
import { Button, PopUpButton } from './components/btn';

import './App.css';
import './components/animation.css';

import next from './static/next.png';
import heart from './static/heart-icon1.png'; 

function getRandomInt(max) {
  const sign = (Math.random() > 0.5) ? -1 : 1;
  return Math.floor(Math.random() * Math.floor(max)) * sign;
}

funciton getNewCachedImgSrc() {

}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      images: this.populatedImages(),
      showPopUp: false
    }
    this.nextPic = this.nextPic.bind(this);
    this.prevPic = this.prevPic.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  populatedImages() {
    const arrayModules = this.importAll(require.context('./data/', false, /\.(png|jpe?g|svg)$/));
    return arrayModules.map((module, index) => {
      return {
        id: `img-${index}`,
        src: module.default,
        angle: getRandomInt(20)
      }
    })
  }

  importAll(r) {
      return r.keys().map(r);
  }

  nextPic() {
    var arrayData = [...this.state.images];
    var lastImg = arrayData.pop();
    lastImg.angle = getRandomInt(20);
    arrayData.unshift(lastImg);
    this.setState({
      images: arrayData
    });
  }

  prevPic() {
    var arrayData = [...this.state.images];
    var firstImg = arrayData.shift();
    firstImg.angle = getRandomInt(20);
    arrayData.push(firstImg);
    this.setState({
      images: arrayData
    });
  }

  togglePopUp() {
    this.setState({
      showPopUp: !this.state.showPopUp
    });
  }

  newImage() {
    var modifiedList = [...this.state.srcList];
    const imgSrc = modifiedList.pop();
    this.setState(
      {
        imgSrc: imgSrc,
        srcList: modifiedList
      });
  }

  fillSrcList() {
    const finalLength = 5;
    const {srcList} = this.state;
    if(srcList.length < finalLength) {
      var modifiedList = [...srcList].push(getNewCachedImgSrc());
      this.setState({srcList: modifiedList})
      this.fillSrcList();
    }
  }

  render(){
      const {images, showPopUp} = this.state;
      return(
        <div className="App">
          


          <PopUp show={showPopUp}>
            <h1>This is the PopUp!</h1>
            <Button addClass="close-pop-up hoverable" onClick={this.togglePopUp}>
              <img src={heart} style={{width: "50px"}} />
            </Button>
          </PopUp>
          <PopUpButton in={!showPopUp} onClick={this.togglePopUp} />
        </div>
      )
  }
}

export default App;
