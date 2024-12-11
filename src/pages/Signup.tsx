import { useEffect, useState } from "react";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { BackendError, useCreateUsersMutation } from "../store/api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/feature/auth/authSlice";
import { RootState } from "../store/store";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [createUsers] = useCreateUsersMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await createUsers(formData).unwrap();
      disPatch(login(response.token));
      console.log(response.token);
      navigate("/");
    } catch (err) {
      const message = (err as BackendError)?.data?.message || "An unexpected error occurred.";
      setErrorMessage(message);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.reload();
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
}

export default Signup;
