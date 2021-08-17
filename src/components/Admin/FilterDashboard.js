import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { today } from "../../utils/date";
const FilterDashboard = ({ setOpen, handleClose, setState, setDate }) => {
  const { register, handleSubmit } = useForm();
  const max = 150;
  const submitFilter = async (data, e) => {
    if (data.date !== "") {
      const good = Math.floor(Math.random() * max);
      const mild = Math.floor(Math.random() * max);
      const severe = Math.floor(Math.random() * max);
      const infected = Math.floor(Math.random() * max);
      const vaccinated = Math.floor(Math.random() * max);
      setState({ good, mild, severe, infected, vaccinated });
      handleClose();
      setDate(data.date);
    }
    handleClose();
  };
  const handleReset = () => {
    handleClose();
    setDate(today);
  };
  return (
    <>
      <form className="frm" onSubmit={handleSubmit(submitFilter)}>
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

export default FilterDashboard;
