import './style.css';
import { Message } from './components/styles/message.styled';
import { MyMessage } from './components/styles/myMessage.styled';
import { Text } from './components/styles/textOfMessage.styled';
import { MyText } from './components/styles/myText.styled';
import * as React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, TextField, Typography } from '@mui/material';
import io from 'socket.io-client';
import { AddReactionOutlined, SettingsOutlined, Send } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const newSocket = io(`http://192.168.178.34:8080`);


export default function chatCard() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [messages, setMessages] = React.useState(allMessages);
  const [openDrag, setOpenDrag] = React.useState(false);

  const handleClickOpenDrag = () => {
    setOpenDrag(true);
  };

  const handleCloseDrag = () => {
    setOpenDrag(false);
  };

  newSocket.off('message');
  newSocket.on("message", (data) => createMessage(data));

  const saveUserName = () => {
    const textareaEl = document.getElementById('standard-basic');
    localStorage.setItem("userName", textareaEl.value);
    userName = textareaEl.value;
    textareaEl.value = '';
    handleClose();
  }

  const sendMessage = () => {

    const textareaEl = document.getElementById('outlined-textarea');
    if (textareaEl.value.length < 2) {
      return
    }
    const newMessage = {
      name: userName,
      text: textareaEl.value,
      userId: uniqueUserId,
    }
    // send message to server:
    newSocket.emit("message", newMessage);

    textareaEl.value = ''
  }


  const createMessage = (msg) => {
    let localArray = [...messages];
    localArray.push(msg);
    setMessages(localArray);
    localStorage.setItem("allMessages", JSON.stringify(localArray))
  }

  const handleEmojiClick = (el) => {
    const textareaEl = document.getElementById('outlined-textarea');
    textareaEl.value += el.emoji;
    handleCloseDrag();
  }



  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(message) {
    return {
      sx: {
        bgcolor: stringToColor(message.userId),
      },
      children: message.name ? `${message.name.split(" ").map((item) => item[0])}` : null,
    };
  }


  return (

    <Card sx={{
      width: 415,
      position: "fixed",
      bottom: 20, right: 5,
      minHeight: "40%",
      maxHeight: "100%",
      backgroundImage: "url='./img/photo-1655474396177-e727349f44dc.avif'"
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
            <TextField id="standard-basic" variant="standard" />
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
        m: 1,
        mb: "120px",
        overflowY: "scroll",
        overflowX: "hidden",
        maxHeight: "64vh",
      }}>


        {messages.map((message, index) => {
          if (message.userId === uniqueUserId) { // This is a message from me, use MyMessage
            return <MyMessage key={index}>
              <MyText sx={{ background: stringToColor(message.userId) }} >{message.text}</MyText>
              <Avatar {...stringAvatar(message)}></Avatar>
            </MyMessage>
          } else { // This is a message from somebody else
            return <Message key={index}>
              <Avatar {...stringAvatar(message)}></Avatar>
              <Text sx={{ background: stringToColor(message.userId) }}>{message.text}</Text>
            </Message>
          }
        })}

      </CardMedia>

      <CardActions sx={{
        position: "fixed",
        bottom: 25,
        borderTop: "1px solid #ccc",
        width: 400
      }}>
        <div sx={{ display: "block" }}>
          <IconButton onClick={handleClickOpenDrag} aria-label="addReactionOutlined" color="secondary">
            < AddReactionOutlined />
          </IconButton>

          <Dialog
            open={openDrag}
            onClose={handleCloseDrag}

            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              EmojiPicker
            </DialogTitle>
            <DialogContent>
              <div>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDrag}>
                Cancel
              </Button>
              <Button onClick={handleCloseDrag}>Subscribe</Button>
            </DialogActions>
          </Dialog>

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

        {newSocket ? (
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
