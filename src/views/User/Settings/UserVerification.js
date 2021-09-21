import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import textApi from "services/textApi";
import UserContext from "contexts/User/UserContext";
import usersApi from "services/usersApi";
const UserVerification = ({ setPage, setOpen, state, setState }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const userContext = useContext(UserContext);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [contactNumberVisible, setContactNumberVisible] = useState(false);
  const showContactNumber = { display: contactNumberVisible ? "" : "none" };
  const handleVerification = async (data, e) => {
    setState(2);
    reset(data.number);
    const number = "63" + data.number.substring(1);
    setNumber(number);
    await textApi.sendVerificationCode(number);
  };
  const handleCode = async (data) => {
    try {
      const response = await usersApi.verifyCode(userContext.user, data.number);
      userContext.verifyPhone(number);
      setPage(3);
    } catch (exception) {
      console.log("error");
    }
  };
  return (
    <div>
      <form className="frm frm-dialog">
        <div>
          <div>
            <label>
              {state === 1 ? "Contact Number" : "Verification Code"}
            </label>
            <input
              name="number"
              type="text"
              ref={register(
                state === 1
                  ? {
                      required: true,
                      minLength: { value: 11 },
                      pattern: /(09)[0-9]{2,9}/i,
                    }
                  : { required: true, minLength: { value: 6 } }
              )}
              placeholder="+63"
              maxLength={state === 1 ? "11" : "6"}
            />
            <div className="frm-helper">
              {state === 1 &&
                errors.number &&
                errors.number.type === "required" && (
                  <p>Contact Number is required</p>
                )}
              {state === 2 &&
                errors.number &&
                errors.number.type === "required" && (
                  <p>Verification Code is required</p>
                )}
              {state == 1 &&
                errors.number &&
                errors.number.type === "minLength" && (
                  <p>Contact Number requires 11 numbers</p>
                )}
              {state == 2 &&
                errors.number &&
                errors.number.type === "minLength" && (
                  <p>The minimum length required is six</p>
                )}
              {state == 1 &&
                errors.number &&
                errors.number.type === "pattern" && (
                  <p>Only numbers are allowed and it should start with 09</p>
                )}
              <p style={showContactNumber} className="error">
                {numberError} already exists in the database
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="flex-end">
        <Button
          color="primary"
          onClick={
            state === 1
              ? handleSubmit(handleVerification)
              : handleSubmit(handleCode)
          }
        >
          {state === 1 ? "Submit" : "Verify"}
        </Button>
        <Button
          onClick={state === 1 ? () => setOpen(false) : () => setState(1)}
        >
          {state === 1 ? "Cancel" : "Back"}
        </Button>
      </div>
    </div>
  );
};

export default UserVerification;
