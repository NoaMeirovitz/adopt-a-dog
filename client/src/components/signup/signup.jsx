import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./signup.scss";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import * as React from "react";
import { toasts } from "../../helpers/toasts";
import { Typography } from "@mui/material";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [forgotPasswordAnswer, setForgotPasswordAnswer] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({
    username: "",
    password: "",
    address: "",
    phone: "",
    forgetPasswordAnswer: "",
  });

  const loginSubmit = async (e) => {
    navigate("/login");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await fetcher(`/auth/signup`, "POST", {
        username,
        password,
        address,
        phone,
        forgotPasswordAnswer,
      });
      if (result.status !== 500) {
        toasts.success("Added successfully");
      } else {
        toasts.error("Error: " + result.message);
      }
    } catch (err) {
      toasts.error("Error: " + err.message);
    }
  };

  const validateInput = (e) => {
    setValidationError((prevState) => {
      const updatedState = {
        ...prevState,
        [e.target.name]: e.target.validationMessage,
      };

      if (e.target.name === "password") {
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*()_\-+={}[\]:";'<>,.?/])[A-Za-z\d!@#$%^&*()_\-+={}[\]:";'<>,.?/]{8,}$/.test(
            e.target.value
          )
        ) {
          updatedState.password =
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, 4 numbers, and one special character";
        }
      }
      if (e.target.name === "phone") {
        if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(e.target.value)) {
          updatedState.phone =
            "Phone number must be in the format of 052-4567890";
        }
      }

      return updatedState;
    });
  };

  return (
    <div id="signup">
      <form className="form">
        <div className="title">SIGN UP</div>
        <TextField
          label="Username"
          error={!!validationError.username}
          InputProps={{
            name: "username",
            id: "username",
            value: username,
            required: true,
            autoComplete: "on",
            onChange: (e) => setUsername(e.target.value),
            onInput: validateInput,
          }}
        />
        {validationError.username && (
          <div className="error">{validationError.username}</div>
        )}
        <br />
        <TextField
          label="Password"
          error={!!validationError.password}
          InputProps={{
            name: "password",
            required: true,
            id: "password",
            type: "password",
            value: password,
            autoComplete: "on",

            onInput: validateInput,
            onChange: (e) => setPassword(e.target.value),
          }}
        />
        {validationError.password && (
          <div className="error">{validationError.password}</div>
        )}
        <br />
        <TextField
          label="Address"
          error={!!validationError.address}
          InputProps={{
            name: "address",
            required: true,
            id: "address",
            type: "address",
            value: address,
            autoComplete: "on",
            onInput: validateInput,
            onChange: (e) => setAddress(e.target.value),
          }}
        />
        {validationError.address && (
          <div className="error">{validationError.address}</div>
        )}
        <br />
        <TextField
          label="Phone"
          error={!!validationError.phone}
          InputProps={{
            name: "phone",
            required: true,
            id: "phone",
            type: "phone",
            value: phone,
            autoComplete: "on",
            onInput: validateInput,
            onChange: (e) => setPhone(e.target.value),
          }}
        />
        {validationError.phone && (
          <div className="error">{validationError.phone}</div>
        )}
        <br />
        <Typography variant="h6" component="div" gutterBottom>
          What was your first dog name?
        </Typography>
        <TextField
          label="Forget Password Answer"
          error={!!validationError.forgetPasswordAnswer}
          InputProps={{
            name: "Forget Password Answer",
            required: true,
            id: "forgetPasswordAnswer",
            type: "text",
            value: forgotPasswordAnswer,
            autoComplete: "on",
            onInput: validateInput,
            onChange: (e) => setForgotPasswordAnswer(e.target.value),
          }}
        />

        {validationError.forgetPasswordAnswer && (
          <div className="error">{validationError.forgetPasswordAnswer}</div>
        )}

        <br />
        <Button
          className="button"
          type="submit"
          variant="contained"
          onClick={handleCreate}
        >
          Sign Up
        </Button>
        <br />
        <div>
          <div className="text">Do you already have an account?</div>
          <Button className="button" variant="contained" onClick={loginSubmit}>
            Login
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default SignUp;
