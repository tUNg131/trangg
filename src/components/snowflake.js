import { Component } from "react";

import snowFlake1 from '../static/snowFlake1.png';
import snowFlake2 from '../static/snowFlake2.png';

class SnowFlake extends Component {
    src = ''

    constructor(props) {
        super(props);
        this.state = {
            snowState: "start"
        }
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        this.setState({snowState: "melt"}) // Start melting animation
    }

    getStyle() {
        var {duration, translateX, translateY, scale, spin} = this.props;

        translateX = (translateX) ? `translateX(${translateX})`: '';
        translateY = (translateY) ? `translateY(${translateY})`: 'translateY(100vh)';
        scale = (zoom) ? `scale(${zoom})`: '';
        const rotate = `rotate(${spin*duration}deg)`;// spin is the angular speed

        const defaultStyle = {
            position: absolute,
            // z-index 
        }

        const addStyle = {
            start: {
                transform: `${translateX} ${scale}`
            },
            fall: {
                transform: `${translateX} ${translateY} ${scale} ${rotate}`,
                transition: `ease-in-out ${duration}`
            }, // onAnimationEnd change to ended
            melt: {
                opacity: 0,
                transition: 'opacity 200ms'
            } // End if clickedF
        }
        return {...defaultStyle, ...addStyle[this.state.snowState]}
    }

    render() {
        return(
            <img
                src={this.src}
                alt="Snow flake"
                style={this.getStyle()}
                onClick={this.clicked}
                onAnimationEnd={(this.state.snowState === "fall") ? this.clicked: null}
            />
        )
    }
}

export class SnowFlake1 extends SnowFlake {
    src = snowFlake1
}

export class SnowFlake2 extends SnowFlake {
    src = snowFlake2
}