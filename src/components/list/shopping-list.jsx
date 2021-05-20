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
  const [{ username }] = useState(props);

  const populate = () => {
    if (parentListItems.length > 0) {
      return (
        <List
          component="nav"
          className={classes.root}
        >
          {parentListItems.map((item) => (
            <NestedList
              username={username}
              image={item.image}
              recipe={item.recipe}
              item={item.category}
              items={item.items}
            />
          ))}
        </List>
      );
    }
    return (<></>);
  };

  return (
    <div>
      {populate()}
    </div>
  );
};

export default ShoppingList;
