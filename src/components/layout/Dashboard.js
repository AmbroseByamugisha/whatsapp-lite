import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    borderRadius: "2%",
  },
  inline: {
    display: 'inline',
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const { contacts } = props
  
  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <List className={classes.root}>
    <ListItem alignItems="flex-start" id="heading-1">
        <ListItemAvatar>
          <Avatar 
            alt="A" 
            src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ambrose"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Byamugisha
              </Typography>
              {" — The ball breaker"}
            </React.Fragment>
          }
        />
      </ListItem> 
    </List>
    <List className={classes.root}>
      {contacts && contacts.map(contact => (
          <div key={contact.user_id}>
          <Link to={{
                        pathname: '/chat',
                        state: {contactId: contact.user_id,
                                contactFirstname: contact.first_name,
                                contactLastname: contact.last_name,
                                contactBio: contact.bio}
          }}
          id="contact_link"
          >
          <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar 
              alt={contact.first_name} 
              src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={contact.first_name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {contact.last_name}
                </Typography>
                {" — " + contact.bio}
              </React.Fragment>
            }
            
          />
          
        </ListItem>
        </Link>
      <Divider variant="inset" component="li" />
          </div>
      ))}    
      
    </List>
    <List className={classes.root}>
      <ListItem alignItems="flex-start" id="heading-1">
        <Link to="/">
        <Button variant="outlined">
          Chats
        </Button>
        </Link>
      </ListItem>
      <ListItem alignItems="flex-start" id="heading-1">
        <Link to="/login">
        <Button variant="outlined">
          Login
        </Button>
        </Link>
      </ListItem> 
    </List>
    </Grid>
  );
}

function mapStateToProps(state){
    return{
        contacts: state.contacts.users,
        chats: state.chats.chats,
        isChating: state.chats.isChating
    }
}


export default connect(mapStateToProps)(Dashboard)