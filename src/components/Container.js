import React, { Component } from 'react';
import Header from '../components/Header';
import Panel from '../components/Panel';
import Grid from '@material-ui/core/Grid';

const containerStyles = {
    backgroundColor: 'white',
    width: '50rem',
    height: '33rem',
    borderRadius: '.5rem',
    boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.555)',
    fontSize: '1.6rem',
    fontWeight: '500',
    color: '#282c34'
}

class Container extends Component {

    render() {
        return (
                <Grid style={containerStyles} container direction='column' justify="flex-start">
                    <Grid item>
                        <Header />
                    </Grid>
                    <Grid item sm style={{marginTop: '4rem'}}>
                        <Panel />
                    </Grid>
                </Grid>
        );
    }
}
export default Container;