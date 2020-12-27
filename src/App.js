import React from 'react';
import './App.css';
import Img from './components/img';
import PopUp from './components/popup';
import next from './static/next.png';
import gift from './static/gift2.png';

function getRandomInt(max) {
  const sign = (Math.random() > 0.5) ? -1 : 1;
  return Math.floor(Math.random() * Math.floor(max)) * sign;
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
        id: `img-key ${index}`,
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

  render(){
      const {images, showPopUp} = this.state;
      const showPopUpButton = showPopUp ? 'hidden': 'show';
      return(
        <div className="App">
          <button className="prev button" onClick={this.prevPic}>
            <img src={next} />
          </button>
          <div className="images-wrapper">
            {
              images.map(
                image => {
                  return <Img key={image.id} src={image.src} angle={image.angle}/>
                }
              )
            }
          </div>
          <button className="next button" onClick={this.nextPic}>
            <img src={next} /> 
          </button>

          <PopUp toggle={this.togglePopUp} show={showPopUp}/>

          <button className={`button open-pop-up ${showPopUpButton}`} onClick={this.togglePopUp}>
              <img src={gift} alt="pop-up-logo"/> 
          </button>
        </div>
      )
  }
}

export default App;
