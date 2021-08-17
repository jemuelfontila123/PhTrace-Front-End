import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const del = {
  color: "#f44336",
  cursor: "pointer",
};
const message = {
  color: "#4CAF50",
  cursor: "pointer",
};
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const List = ({
  data,
  index,
  handleDelete,
  isChecked,
  setIsChecked,
  open,
  setOpen,
  setNumber,
  numbers,
  setNumbers,
}) => {
  const [isUser, setIsUser] = useState(false);
  let {
    firstName,
    lastName,
    timeStamp,
    temperature,
    status,
    id,
    email,
    contactNumber,
    role,
  } = data;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTheDelete = (data) => {
    handleDelete(data);
    setAnchorEl(null);
  };
  const handleSms = (contactNumber) => {
    setOpen(true);
    setNumber(contactNumber);
  };
  const handleCheck = (i, contactNumber) => {
    const newChecked = isChecked.map((element, index) =>
      index === i ? !element : element
    );
    if (isChecked[i]) {
      setNumbers(numbers.filter((n) => n !== contactNumber));
    } else {
      setNumbers(numbers.concat(contactNumber));
    }
    setIsChecked(newChecked);
  };
  useEffect(() => {
    if (timeStamp) {
      setIsUser(true);
    }
  }, []);

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="rows"
            onChange={() => handleCheck(index, contactNumber)}
            checked={isChecked[index]}
          />
        </td>
        <td>{index + 1}</td>
        <td>
          {firstName} {lastName}
        </td>
        <td>{email}</td>
        {<td>{contactNumber}</td>}
        {isUser === true ? null : <td>{role}</td>}
        {isUser && <td>{format(parseISO(timeStamp), "HH:mm")}</td>}
        {isUser && <td>{temperature}</td>}
        {isUser && <td>{status}</td>}
        <td className="action">
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Open
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon onClick={() => handleSms(contactNumber)}>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Send sms" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleTheDelete(id)}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </StyledMenuItem>
          </StyledMenu>
        </td>
      </tr>
    </>
  );
};

export default List;
