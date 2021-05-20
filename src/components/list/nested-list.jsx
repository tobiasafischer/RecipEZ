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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
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
  const [visible, setVisible] = useState(true);
  const [{ image }] = useState(props);
  const [{ item }] = useState(props);
  const [{ items }] = useState(props);
  const [{ recipe }] = useState(props);
  const [{ username }] = useState(props);

  let url = 'http://localhost:3001';

  if (process.env.NODE_ENV === 'production') {
    url = 'https://tobias-fischer-recipez.herokuapp.com';
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const deleteItem = () => {
    const data = {
      recipe,
      username,
    };
    axios.post(`${url}/delete-item`, data)
      .then(() => {
        setVisible(false);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const renderItem = () => {
    if (visible) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        >
          <div style={{ width: '80vh', alignItems: 'center' }}>
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
          <div style={{ marginTop: '1.5vh' }}>
            <ListItemIcon onClick={() => deleteItem()}>
              <DeleteIcon />
            </ListItemIcon>
          </div>
        </div>
      );
    }
    return (<></>);
  };

  return (
    <div>
      {renderItem()}
    </div>
  );
};

export default NestedList;
