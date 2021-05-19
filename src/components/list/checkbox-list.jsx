import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxList = (props) => {
  const [checked, setChecked] = useState([0]);
  const [{ item }] = useState(props);

  const labelId = `checkbox-list-label-${item}`;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ListItem key={item} role={undefined} dense button onClick={handleToggle(item)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked.indexOf(item) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={item} />
    </ListItem>
  );
};

export default CheckboxList;
