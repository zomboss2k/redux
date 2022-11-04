import React from "react";

const InputFields = (props) => {
  // Tái sử dụng components input
  const { label, type, data, setData } = props;
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={data}
        required={true}
        onChange={(e) => setData(e.target.value)}
      />
    </>
  );
};

export default InputFields;
