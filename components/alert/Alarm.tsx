/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Alert } from "flowbite-react";

const Alarm = () => {
	return <div className="w-[100%] h-[100%] flex justify-center items-center p-[1rem] bg-[#111827]">
    <Alert color="warning" rounded>
      <span className="font-medium">Info alert!</span> <br /> Website is under development, Please cope up with us until it's developed. <br /> We are testing and developing at the same time.
    </Alert>
  </div>;
};

export default Alarm;
