import React from "react";
import Button from "@material-ui/core/Button";

const UserPrivacy = ({ setPage, setOpen }) => {
  return (
    <div className="flex-end">
      <Button color="primary" onClick={() => setPage(2)}>
        I agree
      </Button>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
    </div>
  );
};

export default UserPrivacy;
