import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './animation.css';
import './popup.css';

function PopUp({ show, children }) {
    return(
        <CSSTransition
            in={show}
            timeout={1000}
            classNames="fade"
            unmountOnExit
        >
        <div className="pop-up-outer">
            <CSSTransition
                in={show}
                timeout={1000}
                classNames="zoom"
                unmountOnExit
            >
            <div className="pop-up-inner">
                {children}
            </div>
            </CSSTransition>   
        </div>
        </CSSTransition>
    )
}

export default PopUp;