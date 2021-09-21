import React, { useEffect, useState } from "react";
import List from "./List";
import SmsForm from "./SmsForm";
import DialogForm from "../Modal/DialogForm";

const Table = ({
  data,
  rows,
  handleDelete,
  kind,
  isChecked,
  setIsChecked,
  numbers,
  setNumbers,
  smsOpen,
  setSmsOpen,
  isNumbers,
  setIsNumbers,
  handleSmsMessage,
}) => {
  const [allChecked, setAllChecked] = useState(false);
  const [number, setNumber] = useState("");
  const handleAllChecked = () => {
    if (allChecked) {
      setNumbers([]);
    } else {
      const newNumbers = [];
      for (let i = 0; i < rows.length; i++)
        newNumbers.push(rows[i].contactNumber);
      setNumbers(newNumbers);
    }
    setAllChecked(!allChecked);
    const newChecked = isChecked.map((element) => !element);
    setIsChecked(newChecked);
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="rows"
                value={rows}
                onChange={handleAllChecked}
                checked={allChecked}
              />
            </th>
            {data.map((d, index) => (
              <th key={index}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((data, index) => (
            <List
              key={index}
              data={data}
              index={index}
              handleDelete={handleDelete}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              open={smsOpen}
              setOpen={setSmsOpen}
              setNumber={setNumber}
              numbers={numbers}
              setNumbers={setNumbers}
            />
          ))}
        </tbody>
      </table>
      <DialogForm
        open={smsOpen}
        setOpen={setSmsOpen}
        title={"Sending SMS "}
        content={"Fill in the input to send the message you want to send"}
        onExit={() => setIsNumbers(false)}
      >
        <SmsForm
          setOpen={setSmsOpen}
          number={number}
          setNumber={setNumber}
          kind={kind}
          numbers={numbers}
          isNumbers={isNumbers}
          handleSmsMessage={handleSmsMessage}
        />
      </DialogForm>
    </>
  );
};

export default Table;
