import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './animation.css';
import './btn.css';
import gift from '../static/gift2.png';

export class PopUpButton extends React.Component {
    render() {
        const {in: inProp, onClick} = this.props;
        return(
            <CSSTransition
                in={inProp}
                timeout={1000}
                classNames="fade-zoom-rotate"
                unmountOnExit
            >
                <button className={`open-pop-up myButton ${(inProp)?'hoverable':''}`} onClick={onClick}>
                    <img src={gift} alt="pop-up-logo"/> 
                </button>
            </CSSTransition>
        )
    }
}

export function Button({children, className, addClass, ...rest}) {
    const cls = className || ((addClass) ? `myButton ${addClass}`: 'myButton');
    return(
        <button className={cls} {...rest}>{children}</button>
    )
}


