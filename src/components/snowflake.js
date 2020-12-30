import { Component, createRef } from "react";
import { Transition } from "react-transition-group";

import snowFlake1 from '../static/snowFlake1.png';
import snowFlake2 from '../static/snowFlake2.png';

// class SnowFlake extends Component {
//     src = ''

//     constructor(props) {
//         super(props);
//         this.state = {
//             snowState: "start"
//         }
//         this.clicked = this.clicked.bind(this);
//     }

//     clicked() {
//         this.setState({snowState: "melt"}) // Start melting animation
//     }

//     getStyle() {
//         var {duration, translateX, translateY, scale, spin} = this.props;

//         translateX = (translateX) ? `translateX(${translateX})`: '';
//         translateY = (translateY) ? `translateY(${translateY})`: 'translateY(100vh)';
//         scale = (scale) ? `scale(${scale})`: '';
//         const rotate = `rotate(${spin*duration}deg)`;// spin is the angular speed

//         const defaultStyle = {
//             position: "absolute",
//             // z-index 
//         }

//         const addStyle = {
//             start: {
//                 transform: `${translateX} ${scale}`
//             },
//             fall: {
//                 transform: `${translateX} ${translateY} ${scale} ${rotate}`,
//                 transition: `ease-in-out ${duration}ms`
//             }, // onAnimationEnd change to ended
//             melt: {
//                 opacity: 0,
//                 transition: 'opacity 200ms'
//             } // End if clickedF
//         }
//         return {...defaultStyle, ...addStyle[this.state.snowState]}
//     }

//     componentDidMount() {
//         this.setState({snowState: "start"}, 
//             this.setState({snowState: "fall"})
//         )
//     }

//     render() {
//         return(
//             <img
//                 src={this.src}
//                 alt="Snow flake"
//                 style={this.getStyle()}
//                 onClick={this.clicked}
//                 onAnimationEnd={(this.state.snowState === "fall") ? this.clicked: null}
//             />
//         )
//     }
// }

class SnowFlake extends Component {
    src = ''

    constructor(props) {
        super(props);
        this.state = {
            in: false
        }
        this.clicked = this.clicked.bind(this);
        this.toggle = this.toggle.bind(this);
        this.img = createRef();
    }

    toggle() {
        this.setState({in: !this.state.in})
    }

    clicked() {
        this.setState({in: false}) // pull "in" prop to false to go to the exiting.
    }

    getStyle(state) {
        var {duration, left, scale, spin} = this.props;

        const defaultStyle = {
            position: "absolute",
            left: left,
            top: "-71px",
            width: "64px",
            // z-index 
        }

        const addStyle = {
            entering: {
                transform: `translateY(100vh) rotate(${spin*duration}deg)`, // spin is the angular speed
                opacity: 1,
                transition: `transform ${duration}ms linear`
            }, //move to the bottom
            entered: {
                transform: `translateY(100vh) rotate(${spin*duration}deg)`, // spin is the angular speed
                opacity: 1,
                transition: `transform ${duration}ms linear` 
            }, 
            exiting: {
                transform: this.getCurrentTransform(),
                opacity: 0,
                transition: 'opacity 700ms'
            }, //start melting
            exited: {
                opacity: 0,
                transform: 'rotate(0deg)',
            }
        }

        return {...defaultStyle, ...addStyle[state]}
    }

    getCurrentTransform() {
        return (this.img.current &&
            window.getComputedStyle(this.img.current).getPropertyValue("transform"))
    }

    render() {
        const {in: inProp} = this.state
        return(
            <div style={{height: "100vh"}}>
            <Transition in={inProp} 
                timeout={{
                    appear: 0,
                    enter: 10000,
                    exit: 700
                }}
                onEntered={this.clicked}>
                {state => (
                    <img
                        ref={this.img}
                        src={this.src}
                        alt="Snow flake"
                        style={this.getStyle(state)}
                        onClick={this.clicked}
                    />
                )}
            </Transition>
            <button onClick={this.toggle}>toggle</button>
            </div>
        )
    }
}

export class SnowFlake1 extends SnowFlake {
    src = snowFlake1
}

export class SnowFlake2 extends SnowFlake {
    src = snowFlake2
}

