import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
/*
    The state passed in the chat link 
    below, USE the same as the first
    value of contactId
    also applied down below
    as you seek to return that value that is 
    not the currentUser among the chats
    or contacts
*/
function AllChats(props){
    const classes = useStyles();
    const { 
        mychats,
        currentUser, 
        CurrentUserFirstName,
        CurrentUserLastName} = props;
    return (
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
        <List className={classes.root}>
            <ListItem alignItems="flex-start" id="heading-1">
                <ListItemAvatar>
                <Avatar 
                    alt={currentUser.first_name} 
                    src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={currentUser.first_name}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {currentUser.last_name}
                    </Typography>
                    {" — " + currentUser.bio}
                    </React.Fragment>
                }
                />
            </ListItem> 
        </List>
        <List className={classes.root}>
            {mychats.map(chat =>(
                <div key={chat.id}>
                <Link to={{
                        pathname: '/chat',
                        state: {contactId: (currentUser.user_id === chat.receiverId ?
                                            null: chat.receiverId) || (currentUser.user_id === chat.senderId ?
                                            null: chat.senderId),
                                contactFirstname: chat.receiverFirstName,
                                contactLastname: chat.receiverLastName,
                                contactBio: chat.receiverBio}
                        }}
                        id="contact_link"
                        >
                <ListItem alignItems="flex-start" id="heading-1">
                <ListItemAvatar>
                <Avatar 
                    alt={(CurrentUserFirstName === chat.receiverFirstName ?
                    null: chat.receiverFirstName) || (CurrentUserFirstName === chat.senderFirstName ?
                    null: chat.senderFirstName)} 
                    src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={chat.receiverFirstName}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {(CurrentUserLastName === chat.receiverLastName ?
                    null: chat.receiverLastName) || (CurrentUserLastName === chat.senderLastName ?
                    null: chat.senderLastName)}
                    </Typography>
                    {" — " + chat.msgs[0].body}
                    </React.Fragment>
                }
                />
            </ListItem>
            </Link>
                </div>
            ))}
             
        </List>
        <List className={classes.root}>
            <ListItem alignItems="flex-start" id="heading-1">
                <Link to="/contacts">
                <Button variant="outlined">
                Contacts
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
    )
}

const mapStateToProps = (state) => {
    const currentUserId = state.contacts.currentUser.user_id;
    const allChats = state.chats.chats;
    const chats = allChats.filter(chat => 
        currentUserId === (chat.senderId || chat.receiverId));
    
    return {
        mychats: chats,
        currentUser: state.contacts.currentUser,
        CurrentUserFirstName: state.contacts.currentUser.first_name,
        CurrentUserLastName: state.contacts.currentUser.last_name
    }
}

export default connect(mapStateToProps)(AllChats)