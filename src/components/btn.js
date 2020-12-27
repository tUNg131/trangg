import React from 'react';
import './btn.css';

class Button extends React.Component {
    render() {
        const {className, children, ...rest} = this.props;
        return(
            <button className={`${(className) ? className: 'myButton'}`} {...rest}>
                {children}
            </button>
        )
    }
}

export default Button;