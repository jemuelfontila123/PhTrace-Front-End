import React, { useContext } from "react";
import UserContext from "contexts/User/UserContext";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import usersApi from "services/usersApi";
const UserSettings = ({ setPage, setBlank, setSuccessUpdate }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { register, handleSubmit, errors, reset } = useForm();
  const handleUpdate = async (data) => {
    if (data.password === "") {
      setBlank(true);
    }
    try {
      const { firstName, lastName, password } = data;
      await usersApi.update(firstName, lastName, user.email, password);
      setSuccessUpdate(true);
    } catch (exception) {
      setBlank(true);
    }
  };
  return (
    <div>
      <div className="settings-body">
        <form className="frm frm-wrapper" onSubmit={handleSubmit(handleUpdate)}>
          <div>
            <label>First Name</label>
            <input
              name="firstName"
              ref={register}
              placeholder={user.firstName}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" ref={register} placeholder={user.lastName} />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              ref={register}
              placeholder={user.email}
              disabled={true}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              ref={register}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </div>

          <div className="settings-choices">
            <div>
              <Button
                variant="contained"
                color="primary"
                className="but"
                type="submit    "
              >
                <SaveAltIcon />
                <span>Save</span>
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setPage(1)}
                className="but"
              >
                <HomeIcon />
                <span>Home</span>
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                className="but"
                onClick={() => userContext.logOut()}
              >
                <ExitToAppIcon />
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
