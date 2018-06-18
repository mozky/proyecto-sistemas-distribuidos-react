import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sockette from 'sockette'

import { withStyles } from '@material-ui/core/styles'
import { Button, Input, InputLabel, FormControl, AppBar, Toolbar, Typography, Grid,
  Card, CardActions, CardContent, Paper } from '@material-ui/core'

import withWrapper from './wrapper'

import logo from './escom.png'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justify: 'center'
  },
  container: {
    maxWidth: '1000px',
    flexGrow: 1,
    justify: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      socket: null,
      partida: {}
    }
  }

  sendMessage = (mensaje) => {
    this.state.socket.send(mensaje)
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePlayButton = () => {
    this.sendMessage(`join:${this.state.username}`)
  }

  componentDidMount() {
    this.connectToWebSocket()
  }

  handleIncommingMessage = (m) => {
    const partida = JSON.parse(m.data)
    this.setState({ partida })
    console.log(partida)
  }

  connectToWebSocket = () => {
    const socket = new Sockette('ws://localhost:9001/play', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: this.handleIncommingMessage,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    })

    this.setState({socket})
  }

  render() {
    const { classes } = this.props
    const { partida } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Sistemas Distribuidos - Pokemon
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24} className={classes.container}>
          { partida.estado === 'abierta' && (
            <Grid item xs={24}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="username">Nombre</InputLabel>
                <Input id="username" value={this.state.username} onChange={this.handleUsernameChange} />
              </FormControl>
              <Button color='primary' variant='contained' onClick={this.handlePlayButton}>Jugar!</Button>
            </Grid>
          )}
          <Grid item xs={24}>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    Word of the Day
                  </Typography>
                  <Typography variant="headline" component="h2">
                    yoyo
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withWrapper(withStyles(styles)(App))
