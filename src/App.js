import React from 'react';
import PopUp from './components/popup';
import { Button, PopUpButton } from './components/btn';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';
import './components/img.css';
import './components/animation.css';

import heart from './static/heart-icon1.png';
import axios from 'axios';

import { SnowFall } from './components/snowflake';

function getRandomInt(max) {
  const sign = (Math.random() > 0.5) ? -1 : 1;
  return Math.floor(Math.random() * Math.floor(max)) * sign;
}

async function getNewCachedImgSrc() {
  try {
    axios.defaults.headers.common['x-api-key'] = "b3921cad-6daf-47e5-b6b9-6d6f8d241d59"

    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:5, size:"full" } })

    console.log(response.data)
    const srcList = response.data.map((image) => {
      new Image().src = image.url
      return {src: image.url, id: image.id}
    });
    return srcList
  } catch(err) {
    console.log(err)
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      srcList: [],
      angle: getRandomInt(15),
      showPopUp: false,
      buttonEnabled: true,
      snow: false
    }
    this.togglePopUp = this.togglePopUp.bind(this);
    this.newImage = this.newImage.bind(this);
    this.toggleSnow = this.toggleSnow.bind(this);
  }

  togglePopUp() {
    this.setState({
      showPopUp: !this.state.showPopUp
    });
  }

  newImage() {
    this.setState({buttonEnabled: false}, // disable button before doing anything else
      () => {
        var modifiedList = [...this.state.srcList];
        modifiedList.shift();
        this.setState({srcList: modifiedList, angle: getRandomInt(15)}, 
          () => {this.setState({buttonEnabled: true}); // enable the button again
        });
      });
  }

  async fillSrcList() {
    const lowerLimit = 5;
    const {srcList} = this.state;
    if(srcList.length < lowerLimit) {
      this.setState({srcList: [...srcList, ...await getNewCachedImgSrc()]}, console.log(this.state.srcList))
      this.fillSrcList();
    }
  }

  componentDidMount() {
    this.fillSrcList();
  }

  componentDidUpdate() {
    this.fillSrcList();
  }

  toggleSnow() {
    console.log("haha")
    this.setState({snow: !this.state.snow})
  }

  render() {
      const {srcList, showPopUp, angle, buttonEnabled} = this.state;
      var hasImage = true;
      if (srcList === undefined || srcList.length === 0) {
        hasImage = false;
        console.log(hasImage)
      }
      return(
        <div className="App">

          <SnowFall />

          { (hasImage) ?
            <TransitionGroup className="image-container">
              <CSSTransition
                key={`image-${srcList[0].id}`} // to trigger transition everytime it updates
                timeout={700}
                classNames="image"
                unmountOnExit
              >
                <img 
                  className="image" 
                  src={srcList[0].src} 
                  alt="cute cat" 
                  style={{transform: `translate(-50%, -50%) rotate(${angle}deg)`}}
                  onClick={(buttonEnabled) ? this.newImage: null} 
                />
              </CSSTransition>
            </TransitionGroup> : null
          }

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