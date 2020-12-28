import { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './img.css';

function getStyle(angle) {
    return {
        transform: `translate(-50%,-50%) rotate(${angle}deg)`
    }
  }
  
class Img extends Component {
    constructor(props) {
        super(props);
        this.state = {
        style: getStyle(this.props.angle)
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.angle !== state.lastAngle) {
        return {
            style: getStyle(props.angle),
            lastAngle: props.angle
        };
        }
        return null;
    }

    render() {
        const {src} = this.props
        const {style} = this.state
        return (
        <img className="image" src={src} style={style} alt="pics"/> 
        );
    }
}

export default Img;

export function ImgList ({images}) {
    return(
        <TransitionGroup className="image-list">
            {images.map(({src, angle, id}) => (
                    <CSSTransition
                        key={`animation-for-${id}`}
                        timeout={1600}
                        classNames="image"
                    >
                        <img 
                            className="image" 
                            src={src}
                            style={{
                                transform: `translate(-50%,-50%) rotate(${angle}deg)`
                            }}
                            alt="pic"
                        />
                    </CSSTransition>
                )
            )}
        </TransitionGroup>
    )
}