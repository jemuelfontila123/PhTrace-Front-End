import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import AddIcon from "@material-ui/icons/Add";
import Table from "./Table";
import DialogForm from "../Modal/DialogForm";
import EmployeeForm from "./EmployeeForm";
import SendIcon from "@material-ui/icons/Send";

const AdminEmployees = ({ employeeSuccess, handleSmsMessage }) => {
  const employeesData = [
    "#",
    "Name",
    "Email",
    "Contact Number",
    "Role",
    "Actions",
  ];
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const deleteEmployee = async (id) => {
    await userContext.remove(id, "employee");
  };
  const [smsOpen, setSmsOpen] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [isChecked, setIsChecked] = useState(
    new Array(userContext.user.visitors.length).fill(false)
  );
  const [numbers, setNumbers] = useState([]);
  const [isNumbers, setIsNumbers] = useState(false);
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
    if (isOneChecked()) {
      setShowSms(true);
    } else setShowSms(false);
  }, [isChecked]);
  return (
    <>
      <div>
        <div className="buttons">
          <div>
            <button className="btn btn-add icon" onClick={() => setOpen(true)}>
              <AddIcon />
              <span>Create new</span>
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
        <Table
          data={employeesData}
          rows={userContext.user.employees}
          handleDelete={deleteEmployee}
          kind={"employee"}
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
          title={"Adding new employee"}
          content={
            "Fill in the the following information to create employee who can scan"
          }
        >
          <EmployeeForm setOpen={setOpen} employeeSuccess={employeeSuccess} />
        </DialogForm>
      </div>
    </>
  );
};

export default AdminEmployees;
