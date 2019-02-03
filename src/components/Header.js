import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';

const headerStyles = {
    position: 'relative',
    borderTopLeftRadius: '.5rem',
    borderTopRightRadius: '.5rem',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    fontWeight: '500',
    color: 'white'
}

class Header extends Component {
    render() {
        return (
            <AppBar style={headerStyles}>Pomodoro Clock</AppBar> // Micgaw - style póki co jest ok, ale poczytaj sobie o używaniu className
        )
    }
}

export default Header;
