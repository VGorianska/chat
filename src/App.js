import './style.css';

import * as React from 'react';
import { Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
import { AddReactionOutlined, AttachFileOutlined, Send } from '@mui/icons-material';
export default function chatCard() {
  return (
    <Card sx={{
      width: 415,
      position: "fixed",
      bottom: 20, right: 20,
      minHeight: "30%",
      // background: "#4C5270"
    }}>
      {/* <CardMedia></CardMedia> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chat
        </Typography>

      </CardContent>

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
