import React from 'react';
import {Button, createMuiTheme, Grid, responsiveFontSizes, Typography, ThemeProvider, withStyles } from '@material-ui/core'
import SignInWidget from './Firebase/SignInWidget'
import '../styles/Home.css'
import logo from '../images/logo.png'
import tickets from '../images/travel-tickets-colour-thumbnail.png'
import calendar from '../images/calendar-colour-thumbnail.png'
import help from '../images/drawkit-support-woman-colour-thumbnail.png'
import map from '../images/map-colour-thumbnail.png'

const LoginButton = withStyles({
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 70,
    width: 250,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  }, 
  label: {
    fontSize: '20px'
  }
})(Button);

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {clickedToLogin : false};
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    this.setState({clickedToLogin : true});
  }


  render() {
    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    return (
      <ThemeProvider theme={theme}>
        <Grid container id='home'>
          <Grid item id='top-half'>
            <Typography id='banner-header' variant='h2'> Less planning. More exploring. </Typography> 
            <img id='logo' src={logo} alt='ZED logo'/>
            
            {this.state.clickedToLogin ?  <div id='login-firebase'><SignInWidget/></div> :
                <LoginButton id='login-button'
                variant='contained' 
                onClick={this.onLoginClick}>
                Get Started   
                </LoginButton>
            }
          </Grid>

          <Grid item id='bottom-half'>
            <br/>
            <Typography variant='h2'> Features </Typography>
            <br/>
            <Grid container id='features' wrap='nowrap' direction='row' justify='space-around'>
              <Grid item>
                <img id='tickets-icon' src = {tickets} alt = 'travel tickets icon' height='250px' width='250px'  />
                <br/>
                <Typography variant='subtitle-1'> Add flights, hotels, restaurants, 
                concerts, sightseeing spots, and anything else you want to see or do. 
                </Typography>
              </Grid>
              <Grid item >
                <img id='calendar-icon' src = {calendar} alt = 'calendar icon' height='250px' width='250px'/>
                <br/>
                <Typography variant='subtitle-1'> Take the stress out of scheduling by 
                using our calendar to keep track of where you're going and when. 
                </Typography>
              </Grid>
              <Grid item >
                <img id='map-icon' src = {map} alt = 'map icon' height='250px' width='250px' />
                <br/>
                <Typography variant='subtitle-1'> Trying to optimize your day? Use our map 
                to plot your perfect route - or let us do it for you. 
                </Typography>
              </Grid>
              <Grid item >
                <img id='help-icon' src = {help} alt = 'help icon' height='250px' width='250px' />
                <br/>
                <Typography variant='subtitle-1'> Running out of ideas? We can give you 
                suggestions tailored to your schedule and preferences. 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
}

export default Home;