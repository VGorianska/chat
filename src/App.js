import './style.css';
import { Message } from './components/styles/message.styled';
import { MyMessage } from './components/styles/myMessage.styled';
import { Text } from './components/styles/textOfMessage.styled';
import { MyText } from './components/styles/myText.styled';
import * as React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, TextField, Typography } from '@mui/material';
import io from 'socket.io-client';
import { AddReactionOutlined, AttachFileOutlined, SettingsOutlined, Send } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const localStorage = require('localStorage');

let uniqueUserId = localStorage.getItem("uniqueUserId");
if (!uniqueUserId) {
  uniqueUserId = uuidv4();
  localStorage.setItem("uniqueUserId", uniqueUserId);
}

let allMessages = localStorage.getItem("allMessages");
if (!allMessages) {
  allMessages = "[]";
  localStorage.setItem("allMessages", JSON.stringify([]));
}
allMessages = JSON.parse(allMessages);

let userName = localStorage.getItem("userName");
if (!userName) {
  userName = "";
  localStorage.setItem("userName", userName);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function chatCard() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [socket, setSocket] = React.useState(null);
  const [messages, setMessages] = React.useState(allMessages);




  React.useEffect(() => {
    const newSocket = io(`http://127.0.0.1:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const saveUserName = () => {
    const textareaEl = document.getElementById('standard-basic');
    localStorage.setItem("userName", textareaEl.value);
    userName = textareaEl.value;
    textareaEl.value = '';
    handleClose();
  }

  const sendMessage = () => {


    const textareaEl = document.getElementById('outlined-textarea');
    const newMessage = {
      name: userName,
      text: textareaEl.value,
      userId: uniqueUserId,
    }
    const allMsgsPlusNewMsg = [...messages, newMessage]
    localStorage.setItem("allMessages", JSON.stringify(allMsgsPlusNewMsg))
    setMessages(allMsgsPlusNewMsg)
    textareaEl.value = ''
  }

  return (
    <Card sx={{
      width: 415,
      position: "fixed",
      bottom: 20, right: 20,
      minHeight: "40%",
    }}>
      <CardContent>


        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Name engeben:"}</DialogTitle>
          <DialogContent id="alert-dialog-slide-description">
            <TextField id="standard-basic" label="Name" variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveUserName}>Speichern</Button>
            <Button onClick={handleClose}>Zurück</Button>
          </DialogActions>
        </Dialog>


        <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
          Chat
          <IconButton onClick={handleClickOpen} aria-label="send" color="success" sx={{ margin: 1 }}>
            <SettingsOutlined />
          </IconButton>
        </Typography>

      </CardContent>
      <CardMedia sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        m: 1,
      }}>


        {messages.map((message, index) => {
          if (message.userId === uniqueUserId) { // This is a message from me, use MyMessage
            return <MyMessage key={index}>
              <MyText>{message.text}</MyText>
              <Avatar sx={{ background: "rgba(255,237,186,255)" }}>{message.name}</Avatar>
            </MyMessage>
          } else { // This is a message from somebody else, use Message
            return <Message key={index}>
              <Avatar>{message.name}</Avatar>
              <Text>{message.text}</Text>
            </Message>
          }
        })}

        {/* <Message>
          <Avatar sx={{ background: "#97a99a" }}></Avatar>
          <Text>Download the React DevTools for a better development experience</Text>
        </Message>
        */}

        {/* <Paper elevation={3} sx={{
          alignItems: "center",
          display: "block",
          justifyContent: "center",
          position: "absolute",
          borderRadius: "50%",
          bottom: 100,
          right: 20,
          width: 60,
          height: 60,
          zIndex: 999
        }}>
          <MarkEmailUnreadOutlined color="success" sx={{ height: 50, width: "auto", marginLeft: "5px", marginTop: 1 }} />
        </Paper> */}
      </CardMedia>

      <CardActions sx={{
        position: "fixed",
        bottom: 25,
        borderTop: "1px solid #ccc",
        width: 400
      }}>
        <div sx={{ display: "block" }}>
          <IconButton aria-label="addReactionOutlined" color="secondary">
            < AddReactionOutlined />
          </IconButton>
          <IconButton aria-label="attachFileOutlined" color="primary">
            < AttachFileOutlined />
          </IconButton>
        </div>
        <TextField
          id="outlined-textarea"
          label="Nachricht eingeben..."
          placeholder="Hallo"
          multiline
          maxRows={4}
          margin="dense"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: 16
            }
          }}
          sx={{
            width: "100%",
            margin: 0,
            fontSize: 8,
            padding: 0,
            fontWeight: 500
          }} />

        {socket ? (
          <IconButton onClick={sendMessage} aria-label="send" color="success" id="btnSend" sx={{ margin: 1 }}>
            <Send />
          </IconButton>
        ) : (
          <div>Not Connected</div>
        )}

      </CardActions>
    </Card>
  );
}
