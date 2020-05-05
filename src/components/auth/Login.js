import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentUser } from '../../actions';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

function Login(props){
    const classes = useStyles();
    const { contacts, loggedIn } = props;
    if(!loggedIn){
    return (
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
        <List className={classes.root}>
            <h1>Login as </h1>
            {contacts.map(contact => (
                <div key={contact.user_id}>
                    <ListItem 
                        alignItems="flex-start" 
                        id="contact_link"
                        onClick={ () => 
                        changeCurrentUser(contact)}>
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
            </List>
        </Grid>
    )}
    return <Redirect to="/" /> 
}

const mapStateToProps = (state) => { 
    return {
        contacts: state.contacts.users,
        loggedIn: state.contacts.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentUser: (user) => {
            dispatch(changeCurrentUser(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)