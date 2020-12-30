import { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

import snowFlake1 from '../static/snowFlake1.png';
import snowFlake2 from '../static/snowFlake2.png';
import './snow.css';

import {v4 as uuid} from 'uuid';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class SnowFlake extends Component {
    src = ''

    constructor(props) {
        super(props);

        this.Img = null;
        this.setImgRef = element => {
            this.Img = element
        };
    }

    getStyle(state) {
        const {duration, left, scale, spin} = this.props;
        const height = 71*(scale || 1); //default height = 71px

        const defaultStyle = {
            position: "absolute",
            left: left,
            top: `-${height}px`, // offset == height
            height: `${height}px`,
            zIndex: 1
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
                transform: this.getCurrentTransform(), // not a good solution because will make it glitches
                opacity: 0,
                transition: 'transform 300ms, opacity 700ms ease-in-out'
            }, //start melting
            exited: {
                opacity: 0,
                transform: 'rotate(0deg)', 
            } //when inProp = false
        }

        return {...defaultStyle, ...addStyle[state]}
    }

    getCurrentTransform() {
        return (this.Img &&
            getComputedStyle(this.Img).getPropertyValue("transform"))
    }

    render() {
        const {in: inProp, toggle: toggle, duration} = this.props
        return(
            <Transition 
                in={inProp} 
                timeout={{
                    appear: 0,
                    enter: duration,
                    exit: 700
                }}
                onEntered={toggle}
            >
                {state => (
                    <img
                        ref={this.setImgRef}
                        src={this.src}
                        alt="Snow flake"
                        style={this.getStyle(state)}
                        onClick={toggle}
                    />
                )}
            </Transition>
        )
    }
}

export class SnowFlake1 extends SnowFlake {
    src = snowFlake1
}

export class SnowFlake2 extends SnowFlake {
    src = snowFlake2
}

export class SnowFall extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.createItem = this.createItem.bind(this);
        this.state = {
            items: []
        }
    }

    createItem() {
        console.log(this.state.items);
        this.setState({items: [
            ...this.state.items,
            {
                id: uuid(),
                duration: getRandomInt(5000, 15000), // get random duration
                scale: getRandomArbitrary(0.5, 2), // get random scale
                spin: getRandomInt(100, 200),// get random spin
                left: `${getRandomInt(2, 98)}%`// get random left
            }
        ]}, () => {
            setTimeout(this.createItem, 1000)
        })
    }


    toggle(id) {// get rid of the item with "id" from the list
        var items = [...this.state.items];
        console.log(id);
        this.setState({items: items.filter(item => !(item.id === id))}, console.log(this.state.items))
    }

    componentDidMount() {
        this.createItem();
    }

    render() {
        const {items} = this.state;
        return(
            <TransitionGroup className="snow-fall">
                {items.map(({id, duration, scale, spin, left}) => (
                    <SnowFlake1
                        key={id}
                        toggle={() => {
                            this.toggle(id)
                        }}
                        duration={duration}
                        scale={scale}
                        spin={spin}
                        left={left}
                    />
                ))}
            </TransitionGroup>
        )
    }
}

