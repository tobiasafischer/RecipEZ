import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import NestedList from './nested-list';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    backgroundColor: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ShoppingList = (props) => {
  const classes = useStyles();
  const [{ parentListItems }] = useState(props);
  return (
    <List
      component="nav"
      className={classes.root}
    >
      {parentListItems.map((item) => (
        <NestedList image={item.image} item={item.category} items={item.items} />))}
    </List>
  );
};

export default ShoppingList;
