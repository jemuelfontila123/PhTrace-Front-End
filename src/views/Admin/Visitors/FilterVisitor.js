import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { today } from "../../utils/date";
const FilterVisitor = ({
  visitors,
  handleVisitors,
  setVisitors,
  handleClose,
  setDate,
  handleSuccess,
  handleResetMessage,
}) => {
  const { register, handleSubmit } = useForm();
  const submitFilter = async (data, e) => {
    const filter = {};
    Object.keys(data).map((key) => {
      if (data[key]) {
        filter[key] = data[key];
      }
    });
    const results = visitors.filter((a) => {
      for (let key in filter) {
        if (key === "date") {
          setDate(filter[key]);
          console.log(filter[key]);
          const time = format(parseISO(a["timeStamp"]), "yyyy-MM-dd");
          if (filter[key] !== time) return false;
        } else if (a[key].toLowerCase() !== filter[key].toLowerCase())
          return false;
      }
      return true;
    });
    setVisitors(results);
    handleSuccess();
    handleClose();
  };
  const handleReset = () => {
    handleClose();
    handleVisitors();
    handleResetMessage();
    setDate(today);
  };

  return (
    <>
      <form className="frm" onSubmit={handleSubmit(submitFilter)}>
        <div>
          <label>First Name</label>
          <input name="firstName" ref={register} />
        </div>
        <div>
          <label>Last Name</label>
          <input name="lastName" ref={register} />
        </div>
        <div>
          <label>Date</label>
          <input name="date" type="date" ref={register} />
        </div>
        <div className="flex-end">
          <Button color="primary" type="submit">
            Apply Changes
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </>
  );
};

export default FilterVisitor;
