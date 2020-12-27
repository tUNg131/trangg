import React from 'react';
import './popup.css';

class PopUp extends React.Component {
    render() {
        const {toggle, show} = this.props
        const visible = show ? 'popshow' : 'pophidden';
        return(
            <div className={`pop-up-wrapper ${visible}`}>
                <div className="pop-up-inner">
                    <h1>This is a pop up!</h1>
                    <button className="close-popup" onClick={toggle}>Click here to close me!</button>
                </div>
            </div>
        )
    }
}

export default PopUp;