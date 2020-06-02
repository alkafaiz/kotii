import React, { useState } from "react";
import RedRoseBouquetComponent from "./rrb.component";
import RedRoseBouquetAuth from "./rrb-auth.component";

const PASSCODE = process.env.REACT_APP_red_rose_bouquet_passcode;

export default function RedRoseBouquetContainer() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState({ value: false, msg: "" });
  const [passcode, setPasscode] = useState("");

  function hitError(msg = "Error") {
    setError({ value: true, msg });
  }

  function resetError() {
    setError({ value: false, msg: "" });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (passcode !== PASSCODE) {
      hitError("Passcode is incorrect");
      return;
    }

    resetError();
    setAuthenticated(true);
  };

  const handleChange = e => {
    e.persist();
    setPasscode(e.target.value);
  };

  if (!isAuthenticated)
    return (
      <RedRoseBouquetAuth
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        passcode={passcode}
        error={error}
      />
    );

  return <RedRoseBouquetComponent />;
}
