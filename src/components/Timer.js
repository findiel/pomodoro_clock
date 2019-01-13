
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

var timerStyle = {
    width: '15rem',
    height: '15rem',
    border: '.5rem solid #3f51b5',
    borderRadius: '50%',
    color: '#3f51b5',
    fontSize: '2.5rem',
    cursor: 'pointer'
}
//TODO: Fix the timer multi-function-running when click and add break when click + add the break function
class Timer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            timerState: 'Session',
            isPlayed: false,
            sessionLength: null,
            breakLength: null
        }
        this.runSession = this.runSession.bind(this);
    }
    componentWillMount(){
        this.setState({
            sessionLength: this.props.sessionLength,
            breakLength: this.props.breakLength
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            sessionLength: nextProps.sessionLength,
            breakLength: nextProps.breakLength
        })
    }

    pauseSession(timer) {
        clearInterval(timer);
    }

    //sometimes we want to run this function byut sometimes we dont :D
    runSession() {
        let timer;
        console.log(this.state.isPlayed)
        if(this.state.isPlayed === false) {
            console.log('start interval');
            timer = setInterval(() => {
            this.setState({
                sessionLength: this.state.sessionLength - 1
            })
            console.log(this.state.sessionLength);
            console.log(this.state.isPlayed)
        }, 1000)
            //return timer;
        } else {
            console.log('clear interval')
            return clearInterval(timer);
        }
        
    }

    displayTime() {
        if ( Math.floor(this.state.sessionLength % 60) < 10) {
            return `${Math.floor(this.state.sessionLength / 60)}:0${Math.floor(this.state.sessionLength % 60)}`
        } else {
            return `${Math.floor(this.state.sessionLength / 60)}:${Math.floor(this.state.sessionLength % 60)}`
        }
    }

    render() {
        return (
            <Grid container style={timerStyle} direction='column' justify='center' alignItems='center' onClick={() => {
                this.props.toggleTimer(this.state.isPlayed);
                this.setState({
                    isPlayed: !this.state.isPlayed
                })
                console.log(`Is timer running ? ${!this.state.isPlayed}`);
                this.runSession();
            }}>
                <div>{this.state.timerState}</div>
                <div>{this.displayTime()}</div>
            </Grid>
        )
    }
}

export default Timer;