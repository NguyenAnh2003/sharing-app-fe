import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to={`account/${currentUser.userId}`}>
        <ListItemButton>
          <ListItemText primary="Account" />
        </ListItemButton>
      </Link>
      <Link to={'create-post'}>
        <ListItemButton>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default SideBar;
