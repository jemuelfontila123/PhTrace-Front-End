import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useForm } from "react-hook-form";
const VisitorSms = ({ sendMessage, handleClose }) => {
  const { register, handleSubmit } = useForm();
  const handleForm = (data, e) => {
    sendMessage(data.text);
    e.target.reset();
  };
  return (
    <>
      <form className="frm frm-modal" onSubmit={handleSubmit(handleForm)}>
        <div className="frm-modal-title">
          <button onClick={handleClose}>
            <ArrowForwardIosIcon />
          </button>
          <h2>Send SMS</h2>
        </div>
        <div>
          <label>Message</label>
          <textarea name="text" ref={register} rows="15" />
        </div>
        <div className="linebreak">
          <hr />
        </div>
        <div className="flex-row">
          <button className="btn btn-add">Send</button>
          <button type="button" className="btn btn-side" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default VisitorSms;
