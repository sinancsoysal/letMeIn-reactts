import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, makeStyles, Paper, Snackbar, TextField, Theme, Tooltip, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


interface LoginProps {
  data: {
    id: number,
    url: string,
    mail: string,
    pass: string,
  }
}

interface FormData {
  mail: string,
  pass: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    paper: {
      background: 'linear-gradient(45deg, #ff499e 30%, #49b6ff 90%)',
      margin: theme.spacing(1),
      borderRadius: 16,
    },

  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Login: React.FC<LoginProps> = ({ data }) => {
  // form
  const [formOpen, formSetOpen] = React.useState(false);
  const handleClickFormOpen = () => {
    formSetOpen(true);
  };
  const handleFormClose = () => {
    formSetOpen(false);
  };
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = handleSubmit((toUpdate) => {
    axios.post('http://192.168.1.101:8080/api/update', { id: data.id, mail: toUpdate.mail, pass: toUpdate.pass },
    })
      .catch(err => {
        failSetOpen(true);
      });

    formSetOpen(false);
    successSetOpen(true);
  });


  const [failOpen, failSetOpen] = React.useState(false);
  const [successOpen, successSetOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    failSetOpen(false);
    successSetOpen(false);
    copySetOpen(false);
  };

  // delete
  const[deleteOpen, deleteSetOpen] = React.useState(false);
  const handleClickDialogOpen = () => {
    deleteSetOpen(true);
  };
  const handleDialogClose = () => {
    deleteSetOpen(false);
  };
  const handleDelete = () => {
    axios.post('http://192.168.1.101:8080/api/delete', { id: data.id }, {
    })
      .catch(err => {
        failSetOpen(true);
      });
    successSetOpen(true);
    deleteSetOpen(false);
  }

  // copy
  const [copyOpen, copySetOpen] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(data.pass);

    copySetOpen(true);
  }

  const classes = useStyles();
  return (
    <li>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {data.mail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {data.url}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="delete" onClick={handleClickDialogOpen} placement="left">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={deleteOpen}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"end this login's existence"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  you are going end this login's whole carrier; are you sure you want to continue?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  forgive
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                  finish what you started
          </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="edit" onClick={handleClickFormOpen} placement="left">
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Dialog open={formOpen} onClose={handleFormClose}>
              <DialogTitle id="form-dialog-title">edit login <br />({data.url})</DialogTitle>
              <DialogContent>
                <TextField inputRef={register} margin="dense" id="mail" label="mail" type="email" name="mail" defaultValue={data.mail} fullWidth />
                <TextField inputRef={register} margin="dense" id="password" label="password" type="password" name="pass" defaultValue={data.pass} fullWidth />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleFormClose} color="primary">
                  cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                  update
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="copy" onClick={handleCopy} placement="left">
              <IconButton aria-label="copy">
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          action successfully completed!
        </Alert>
      </Snackbar>
      <Snackbar open={failOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          an error occured while completing the action!
        </Alert>
      </Snackbar>
      <Snackbar open={copyOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          password copied to clipboard!
        </Alert>
      </Snackbar>
    </li>
  );
}
