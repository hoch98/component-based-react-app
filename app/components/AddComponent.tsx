import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

type props = {
  addComponent: Function
}

const options = [
  "Text",
  "Image", 
  "Grid"
];


const url = "https://images.genius.com/ebaf191aa4cf2754bb3180359860936d.890x890x1.jpg"
function AddComponent(props: props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    var option = options[index]
    props.addComponent(option)
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Card variant='outlined' sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "30px"}}>
      <CardContent>
        <IconButton  sx={{width: 30, height: 30}} 
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddIcon />
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </CardContent>
    </Card>
  )
}

export default AddComponent