import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckboxList from './checkbox-list';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize: '20px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedList = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [{ image }] = useState(props);
  const [{ item }] = useState(props);
  const [{ items }] = useState(props);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${item + 1}`}
            src={image}
          />
        </ListItemAvatar>
        <ListItemText primary={item} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.root}>
          {items.map((val) => (<CheckboxList item={val} />))}
        </List>
      </Collapse>
    </div>
  );
};

export default NestedList;
