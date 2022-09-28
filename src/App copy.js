import './style.css';
import { Message } from './components/styles/message.styled';
import { MyMessage } from './components/styles/myMessage.styled';
import { Text } from './components/styles/textOfMessage.styled';
import { MyText } from './components/styles/myText.styled';
import * as React from 'react';
import { Avatar, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import io from 'socket.io-client';
import { AddReactionOutlined, AttachFileOutlined, SettingsOutlined, Send } from '@mui/icons-material';

const myId = "12344rergwegf34f"
const myName = "Mike"

export default function chatCard() {
  /*
  const messages = [
    { name: "AJ", text: "Hallo!", user: "12344rergwegf34f" },
    { name: "XC", text: "Hey!", user: "ergse3gerger" },
  ];
  */

  const [socket, setSocket] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const newSocket = io(`http://127.0.0.1:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const sendMessage = () => {
    socket.emit("newMsg", { a: 1, b: 2 })

    const textareaEl = document.getElementById('outlined-textarea');


    setMessages([
      ...messages,
      {
        name: myName,
        text: textareaEl.value,
      }
    ])

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
        {/* <Paper elevation={3} sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 3,
          top: 10,
          right: 50,
          width: 230,
          height: 190,
          p: 2,
          zIndex: 999
        }} >
          <TextField id="standard-basic" label="Nickname" variant="standard" />
          <IconButton aria-label="addReactionOutlined" color="secondary">
            <AddAPhotoOutlined />
          </IconButton>
          <Stack spacing={2} direction="row">
            <Button variant="contained">SPEICHERN</Button>
            <Button variant="outlined">Zurück</Button>
          </Stack>
        </Paper> */}
        <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
          Chat
          <IconButton aria-label="send" color="success" sx={{ margin: 1 }}>
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
          if (message.user === myId) { // This is a message from me, use MyMessage
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
