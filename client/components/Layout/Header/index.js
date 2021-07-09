import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './style.module.css';

export default function Header() {
  return (
    <>
      <AppBar position='static' elevation={1} color='transparent'>
        <Toolbar>
          {/* <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton> */}
          <Typography variant='h6' className={styles.brand}>
            coinoak
          </Typography>
          <Button color='inherit'>Account</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
