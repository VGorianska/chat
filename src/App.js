import './style.css';

import * as React from 'react';
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';

import { AddReactionOutlined, AttachFileOutlined, Send } from '@mui/icons-material';
export default function chatCard() {
  return (
    <Card sx={{
      width: 415,
      position: "fixed",
      bottom: 20, right: 20,
      minHeight: "50%",
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chat
        </Typography>

      </CardContent>
      <CardMedia sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        m: 1,
      }}>

        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ background: "#cdefee" }}></Avatar>
          <Typography sx={{
            background: "#cdefee",
            borderRadius: "0 10px 10px 10px",
            m: 1,
            marginTop: 2, p: 1,
            minHeight: "30px",
            minWidth: "50px",
            paddingRight: 3
          }}>
            Hallo zusammen!</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Typography sx={{
            background: "rgba(255,237,186,255)",
            borderRadius: "10px 0 10px 10px",
            minWidth: "50px", m: 1,
            marginTop: 2, p: 1,
            paddingLeft: 4
          }}>
            Hey!</Typography>
          <Avatar sx={{ background: "rgba(255,237,186,255)" }}></Avatar>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ background: "#97a99a" }}></Avatar>
          <Typography sx={{
            background: "#97a99a",
            borderRadius: "0 10px 10px 10px",
            m: 1,
            marginTop: 2, p: 1,
            maxWidth: "60%",
            minHeight: "30px",
            minWidth: "50px",
            paddingRight: 3
          }}>
            Download the React DevTools for a better development experience</Typography>
        </Box>
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

        <IconButton aria-label="send" color="success" sx={{ margin: 1 }}>
          <Send />
        </IconButton>
      </CardActions>
    </Card>
  );
}
