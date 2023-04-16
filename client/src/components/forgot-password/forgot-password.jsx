import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { BasicModal } from "../modal/modal";
import { useAuth } from "../../contexts/auth/authProvider";
import Typography from "@mui/material/Typography";
import "./forgot-password.scss";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [answer, setAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answerError, setAnswerError] = useState("");
  const auth = useAuth();
  const [modal, setModal] = useState({ header: "Alert", content: <></> });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSignupClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !answer) {
      setModal({
        header: "Missing inputs",
        content: (
          <>
            <Typography sx={{ mt: 2 }}>Missing username or answer</Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
      return;
    }
    try {
      const { isValid } = await auth.attemptToResetPassword({
        username,
        answer,
      });
      setIsCorrectAnswer(isValid);
    } catch (e) {
      setModal({
        header: "Error",
        content: (
          <>
            <Typography sx={{ mt: 2 }}>
              Error:
              <br />
              {e.message}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await auth.resetPassword({
        username,
        password,
      });
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (e) {
      setModal({
        header: "Error",
        content: (
          <>
            <Typography sx={{ mt: 2 }}>
              Error:
              <br />
              {e.message}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
    }
  };

  const validateInput = (e) => {
    if (e.target.name === "username") {
      setUsernameError(e.target.validationMessage);
      return;
    }
    if (e.target.name === "answer") {
      setAnswerError(e.target.validationMessage);
      return;
    }
    if (e.target.name === "password") {
      if (
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*()_\-+={}[\]:";'<>,.?/])[A-Za-z\d!@#$%^&*()_\-+={}[\]:";'<>,.?/]{8,}$/.test(
          e.target.value
        )
      ) {
        setPasswordError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, 4 numbers, and one special character"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  return (
    <div id="forgot-password">
      {!isCorrectAnswer ? (
        <form className="form">
          <div className="title">Forgot Password</div>

          <TextField
            label="Username"
            className="input"
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
          {usernameError && <div className="error">{usernameError}</div>}
          <br />
          <Typography sx={{ mt: 2 }}>What is your first pet's name?</Typography>
          <TextField
            label="Answer"
            className="input"
            InputProps={{
              name: "answer",
              id: "answer",
              value: answer,
              required: true,
              autoComplete: "on",
              onChange: (e) => setAnswer(e.target.value),
              onInput: validateInput,
            }}
          />
          {answerError && <div className="error">{answerError}</div>}
          <br />
          <Button
            className="button"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Reset password
          </Button>
          <br></br>
          <div>
            <div className="text">Don't have an account?</div>
            <Button
              className="button"
              variant="contained"
              onClick={onSignupClick}
            >
              Sign up
            </Button>
          </div>
        </form>
      ) : (
        <form className="form">
          <div className="title">Choose Password</div>

          <br />
          <TextField
            label="Password"
            className="input"
            required={true}
            InputProps={{
              name: "password",
              id: "password",
              type: "password",
              value: password,
              autoComplete: "on",
              onChange: (e) => setPassword(e.target.value),
              onInput: validateInput,
            }}
          />
          {passwordError && <div className="error">{passwordError}</div>}

          <br />
          <Button
            className="button"
            type="submit"
            variant="contained"
            onClick={handleReset}
          >
            Reset password
          </Button>
          <br></br>
        </form>
      )}
      {open && (
        <BasicModal
          header={modal.header}
          content={modal.content}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
