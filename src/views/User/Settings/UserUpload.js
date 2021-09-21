import React, { useState, useContext } from "react";
import DialogForm from "components/Modal/DialogForm";
import Button from "@material-ui/core/Button";
import usersApi from "services/usersApi";
import UserContext from "contexts/User/UserContext";
const UserUpload = ({ open, setOpen, id, setSuccess, setFailure }) => {
  const [file, setFile] = useState(null);
  const userContext = useContext(UserContext);
  const handleFile = (event) => setFile(event.target.files[0]);
  const fileUpload = async () => {
    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        const formData = new FormData();
        formData.append("avatar", file, file.name);
        formData.append("id", id);
        const data = await usersApi.uploadImage(formData);
        userContext.changeImage(data.path);
        setSuccess(true);
        setOpen(!open);
        setFile(null);
      } else setFailure(true);
    } else setFailure(true);
  };
  const content = "Make sure your name and photo is clear in the photo";
  return (
    <div>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title={"Uploading Profile Picture"}
        content={content}
      >
        <div>
          <input type="file" onChange={handleFile} />
        </div>
        <div className="flex-end">
          <Button onClick={fileUpload} color="primary">
            Upload
          </Button>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
        </div>
      </DialogForm>
    </div>
  );
};

export default UserUpload;
