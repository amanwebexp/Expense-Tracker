import React, { useContext, useState } from "react";
import FormInput from "./shared/form/formData";
import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { balanceValidation } from "./validation/balanceValidation";
import UserContext from "@/context/UserContext";
import { successMsg } from "./Toastmsg/toaster";
import useLocalStorage from "use-local-storage";

const SetBalance = ({ setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(balanceValidation) });
  const { totalbalance, setTotalBalance } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin");


  // Submit handler :-
  const onSubmit = (data) => {
    setLoader(true);
    const storedData = parseFloat(data.balance);
    setTotalBalance((prev) => [
      ...prev,
      { user: currentLogin, data: storedData },
    ]);

    reset();
    setOpen(false);
    successMsg("Balance added successfully");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="balance"
        className="mt-4"
        label=""
        placeholder="Set Balance"
        inputType="number"
        id="balance"
        min="0"
        errors={errors}
      />
      {loader === false ? (
        <>
          <Button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            type="submit"
          >
            Submit Balance
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <CircularProgress size={24} />
          </div>
        </>
      )}
    </form>
  );
};

export default SetBalance;
