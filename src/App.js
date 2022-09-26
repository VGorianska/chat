import './style.css';

import * as React from 'react';
import { Avatar, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import { Chip, ChipDelete } from '@mui/joy';
import { AddReactionOutlined, AttachFileOutlined, Send } from '@mui/icons-material';
export default function chatCard() {
  return (
    <Card sx={{
      width: 415,
      position: "fixed",
      bottom: 20, right: 20,
      minHeight: "40%",
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chat
        </Typography>

      </CardContent>
      <CardMedia sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        m: 1,
      }}>

        <Chip
          variant="outlined"
          color="neutral"
          size="lg"
          startDecorator={<Avatar size="sm" />}
          endDecorator={<ChipDelete />}
          sx={{
            m: 1,
            p: 1,
            "--Chip-minHeight": "33px",
            "--Chip-radius": "25px",
            "--Chip-gap": "30px"
          }}
        >Hallo!</Chip>
        <Chip
          variant="outlined"
          color="neutral"
          size="lg"

          endDecorator={<Avatar size="sm" />}
          sx={{
            m: 1,
            p: 1,
            "--Chip-minHeight": "33px",
            "--Chip-maxWidth": "100px",
            "--Chip-radius": "25px",
            "--Chip-gap": "30px"
          }}
        >Hey!</Chip>

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
