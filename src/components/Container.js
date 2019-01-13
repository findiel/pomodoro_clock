import React, { Component } from 'react';
import Header from '../components/Header';
import Panel from '../components/Panel';
import SoundController from '../components/SoundController';
import Grid from '@material-ui/core/Grid';

const containerStyles = {
    backgroundColor: 'white',
    width: '50rem',
    height: '30rem',
    borderRadius: '.5rem',
    boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.555)',
    fontSize: '1.6rem',
    fontWeight: '500',
    color: '#282c34'
}

class Container extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
                <Grid style={containerStyles} container direction='column' justify="space-between">
                    <Grid item sm>
                        <Header />
                    </Grid>
                    <Grid item sm>
                        <Panel />
                    </Grid>
                    <Grid item sm>
                        <SoundController />
                    </Grid>
                </Grid>
        );
    }
}
export default Container;