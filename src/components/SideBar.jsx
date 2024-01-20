import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const SideBar = () => {

  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemText primary="Account" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </List>
  );
};

export default SideBar;
