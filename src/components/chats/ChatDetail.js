import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { create_chat, send_chat } from '../../actions';
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


function ChatDetail(props) {
  const classes = useStyles();
  const [inputMsgVal, setValue] = useState('');
  
  const { handleSubmit } = useForm();
  const { 
    mychat, 
    dispatch, 
    CurrentUserId, 
    receiverId,
    chats,
    currentUser,
    CurrentUserFirstName,
    CurrentUserLastName } = props

  const handleMsgChange = (event) => {
    setValue(event.target.value);
  };

  function resetMsgInput() {
    setValue('');
}

  function genMsgId(){
    if(mychat.length !== 0){
      const msg_id = mychat[0].msgs.length + 1;
      return msg_id;
    } else {
      const msg_id = 1;
      return msg_id
    }
    
  }

  function genChatId(){
      const id = chats.length + 1;
      return id
    }
  const data = {
    id: genChatId(),
    senderId: CurrentUserId,
    receiverId: receiverId,
    senderFirstName: CurrentUserFirstName,
    senderLastName: CurrentUserLastName,
    receiverFirstName: props.location.state.contactFirstname,
    receiverLastName: props.location.state.contactLastname,
    senderBio: currentUser.bio,
    receiverBio: props.location.state.contactBio,
    msgs:[
      {
        id: genMsgId(),
        body: inputMsgVal,
        user_id: 3,
        first_name: CurrentUserFirstName,
        last_name: CurrentUserLastName
      }
    ]
  }
  const data1 = {
    id: genMsgId(),
    body: inputMsgVal,
    user_id: 3,
    first_name: CurrentUserFirstName,
    last_name: CurrentUserLastName
  }

  function createMessage(){
    if(mychat.length === 0){
      dispatch(create_chat(data))
      resetMsgInput()
    }
    else {
      dispatch(send_chat(mychat[0].id, data1))
      resetMsgInput()
    }
  }
  
  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <h1>Chat Detail</h1>
    <List className={classes.root}>
    <ListItem alignItems="flex-start" id="heading-1">
        <ListItemAvatar>
          <Avatar 
            alt={props.location.state.contactFirstname}
            src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.location.state.contactFirstname}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.location.state.contactLastname}
              </Typography>
              {" — " + props.location.state.contactBio }
            </React.Fragment>
          }
        />
      </ListItem> 
    </List>
    {mychat.length !== 0 ? 
    <List className={classes.root}>
    {
        mychat.map(chat => (
          <div key={chat.id}>
            {
              chat.msgs.map(msg => (
                <div key={msg.id}>
                <ListItem alignItems="flex-start" id="heading-1">
                    <ListItemAvatar>
                      <Avatar 
                        alt={msg.first_name} 
                        src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.first_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {msg.last_name}
                          </Typography>
                          {" — " + msg.body}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              ))
            }
          </div>
        ))
      } 
    </List>: null}
    <List className={classes.root}>
      <ListItem alignItems="flex-start" id="heading-1">
        <div id="chat_form">
        <form 
          onSubmit={handleSubmit(createMessage)}
          id="chat_form">
        <textarea 
        value={inputMsgVal}
        onChange={handleMsgChange}
        type="text">
        </textarea>
        <button
          type="submit" 
          id="send_btn">
          Send
        </button>
        </form>
        </div>  
      </ListItem> 
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

const mapStateToProps = (state, ownProps) => {
  const chats = state.chats.chats;
  const ReceiverId = ownProps.location.state.contactId;
  const currentUserId = state.contacts.currentUser.user_id;
  const chat = chats.filter(chat =>
    currentUserId === (chat.senderId || chat.receiverId) &&
    ReceiverId === (chat.receiverId || chat.senderId))
  return {
    mychat: chat,
    CurrentUserId:currentUserId,
    receiverId: ReceiverId,
    chats: state.chats.chats,
    CurrentUserFirstName: state.contacts.currentUser.first_name,
    CurrentUserLastName: state.contacts.currentUser.last_name,
    currentUser: state.contacts.currentUser
  }
}

export default connect(mapStateToProps)(ChatDetail)