import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

export default function AlertDialog() {
const history = useHistory()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false)
  const signin = () => history.push('/signin')
  const signup = () => history.push('/signup')

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create contract
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you have account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Need account to create contract for this product!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={signin} color="primary">
            Sign In
          </Button>
          <Button onClick={signup} color="primary" autoFocus>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
