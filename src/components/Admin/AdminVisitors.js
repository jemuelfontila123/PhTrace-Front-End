import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/User/UserContext";
import Table from "./Table";
import TuneIcon from "@material-ui/icons/Tune";
import SendIcon from "@material-ui/icons/Send";
import DialogForm from "../Modal/DialogForm";
import { dateToday, today } from "../../utils/date";
import { format, parseISO } from "date-fns";
import FilterVisitor from "./FilterVisitor";
const AdminVisitors = ({
  handleSuccess,
  handleResetMessage,
  handleSmsMessage,
}) => {
  const visitorsData = [
    "#",
    "Name",
    "Email",
    "Contact Number",
    "Time Visited",
    "Temperature",
    "Status",
    "Actions",
  ];
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [open, setOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const handleClose = () => setOpen(!open);
  const [isChecked, setIsChecked] = useState(
    new Array(userContext.user.visitors.length).fill(false)
  );
  const [numbers, setNumbers] = useState([]);
  const [showSms, setShowSms] = useState(false);
  const deleteUser = async (id) => {
    await userContext.remove(id, "user");
    setVisitors(user.visitors);
  };
  const [dateSet, setDate] = useState(today);
  const [visitors, setVisitors] = useState([]);
  const [isNumbers, setIsNumbers] = useState(false);
  const handleVisitors = () => {
    const results = user.visitors.filter(
      (visitor) =>
        format(parseISO(visitor.timeStamp), "yyyy-MM-dd") == dateToday
    );
    setVisitors(results);
  };
  const isOneChecked = () => {
    for (let x = 0; x < isChecked.length; x++) {
      if (isChecked[x]) return true;
    }
    return false;
  };
  const showForm = () => {
    setIsNumbers(true);
    setSmsOpen(true);
  };
  useEffect(() => {
    handleVisitors();
  }, []);
  useEffect(() => {
    if (isOneChecked()) {
      setShowSms(true);
    } else setShowSms(false);
  }, [isChecked]);
  return (
    <>
      <div className="buttons">
        <div>
          <button className="btn btn-side icon" onClick={() => setOpen(true)}>
            <TuneIcon />
            <span>Filter Visitors</span>
          </button>
        </div>
        {showSms && (
          <div>
            <button className="btn btn-add icon" onClick={showForm}>
              <SendIcon />
              <span>Send Message</span>
            </button>
          </div>
        )}
      </div>
      <div id="date">
        <span>Date: {dateSet}</span>
      </div>
      <Table
        data={visitorsData}
        rows={visitors}
        handleDelete={deleteUser}
        kind={"visitor"}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        numbers={numbers}
        setNumbers={setNumbers}
        smsOpen={smsOpen}
        setSmsOpen={setSmsOpen}
        isNumbers={isNumbers}
        setIsNumbers={setIsNumbers}
        handleSmsMessage={handleSmsMessage}
      />
      <DialogForm
        open={open}
        setOpen={setOpen}
        title={"Filtering Visitors"}
        content={"Fill in the information based on what you want to filter"}
        onExit={() => setIsNumbers(false)}
      >
        <FilterVisitor
          visitors={userContext.user.visitors}
          handleVisitors={handleVisitors}
          setVisitors={setVisitors}
          handleClose={handleClose}
          setDate={setDate}
          handleSuccess={handleSuccess}
          handleResetMessage={handleResetMessage}
        />
      </DialogForm>
    </>
  );
};

export default AdminVisitors;
