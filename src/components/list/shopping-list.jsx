import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import NestedList from './nested-list';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ShoppingList = (props) => {
  const classes = useStyles();
  const [{ parentListItems }] = useState(props);
  console.log(parentListItems);
  return (
    <List
      component="nav"
      className={classes.root}
    >
      {parentListItems.map((item) => (
        <NestedList item={item.category} items={item.items} />))}
    </List>
  );
};

export default ShoppingList;
