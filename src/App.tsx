import './App.css';
import logo from './logo.png';
import { Login } from './Login';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import React, { useEffect } from 'react';
import { AppBar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: '#000',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      maxHeight: 70,
      maxWidth: 230,
    },
    fab: {
      margin: theme.spacing(2),
    },
    fixed: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    ul: {
      padding: 0,
      listStyle: 'none',
    },
    dialog: {
      background: '#000',
      color: '#fff'
    }
  }),
);

interface FormData {
  url: string,
  mail: string,
  pass: string,
}

interface Login {
  id: number,
  url: string,
  mail: string,
  pass: string,
}

function makeStrongPassword() {
  let outString: string = '';
  let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!"£$%^&*()_+=-[];#.:@~<>?-=';

  for (let i = 0; i < 32; i++) {

    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

  }

  return outString;
}

function App() {
  const classes = useStyles();
  const [loginsList, setLoginsList] = React.useState<Login[]>([]);

  useEffect(() => {
    axios.get<Login[]>('http://192.168.1.101:8080/api/logins', {
    })
      .then((response) => response.data)
      .then((json) => {
        setLoginsList(json)
        localStorage.setItem("logins", JSON.stringify(json))
      })
      .catch(err => {
        let collection = localStorage.getItem("logins");
        setLoginsList(JSON.parse(collection || '{}'));
        console.log('err')
      })
  }, []);

  const [formOpen, formSetOpen] = React.useState(false);
  const handleClickFormOpen = () => {
    formSetOpen(true);
  };
  const handleFormClose = () => {
    formSetOpen(false);
  };
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = handleSubmit(async (newLogin) => {

    await axios.post('http://192.168.1.101:8080/api/add', {
      url: newLogin.url,
      mail: newLogin.mail,
      pass: newLogin.pass,  
    },
    {
    })
      .catch(err => {
        console.log(err);
      });
    console.log(newLogin.url);
    console.log(newLogin.mail);
    formSetOpen(false);
    window.location.reload();
  });



  const [copyOpen, copySetOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    copySetOpen(false);
  };

  const handlePassGen = () => {
    let password = makeStrongPassword();

    navigator.clipboard.writeText(password);

    copySetOpen(true);
  } 
  return (
    <div className="App">
      <AppBar position="static" className={classes.appbar}>
        <img src={logo} alt='logo' className={classes.logo} />
      </AppBar>
      <Container maxWidth="sm">
        <ul className={classes.ul}>
          {
            loginsList.map((login) => {
              return (
                <Login data={{ id: login.id, url: login.url, mail: login.mail, pass: login.pass }} />
              )
            })
          }
        </ul>
      </Container>
      <Fab aria-label="add" className={classes.fixed} onClick={handleClickFormOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle id="form-dialog-title">add new login</DialogTitle>
        <DialogContent>
          <TextField inputRef={register} margin="dense" id="url" label="url" name="url" fullWidth />
          <TextField inputRef={register} margin="dense" id="mail" label="mail" type="email" name="mail" fullWidth />
          <TextField inputRef={register} margin="dense" id="pass" label="pass" type="password" name="pass" fullWidth />          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="primary">
            cancel
          </Button>
          <Button onClick={handlePassGen} color="primary">
            generate & copy
          </Button>
          <Button onClick={onSubmit} color="primary">
            add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={copyOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          password copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

