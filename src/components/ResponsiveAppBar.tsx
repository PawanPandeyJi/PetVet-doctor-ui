import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLoginUserDataQuery } from "../store/api/auth-api";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useGetDoctorQuery } from "../store/api/doctor-api";

function ResponsiveAppBar() {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.auth.isLoggedIn;
  });
  const { data: loggedInUserData } = useLoginUserDataQuery(undefined, {
    skip: !isLoggedIn,
  });
  const { data: getDoctorDetails } = useGetDoctorQuery(undefined, {
    skip: !isLoggedIn,
  });

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PetVet
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              {getDoctorDetails ? (
                <>
                  <Button component={Link} to="/" color="inherit">
                    Your Profile
                  </Button>
                  <Button component={Link} to="/appointments" color="inherit">
                    Appointments
                  </Button>
                  <Button component={Link} to="/prescriptions" color="inherit">
                    All Prescriptions
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/register" color="inherit">
                    Submit Document
                  </Button>
                </>
              )}
              <Avatar sx={{ color: deepPurple[500] }}>
                {loggedInUserData &&
                  `${loggedInUserData.firstName[0]}${loggedInUserData.lastName[0]}`.toUpperCase()}
              </Avatar>
              <Button variant="contained" component={Link} to="/logout" color="warning">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                color="success"
                sx={{ marginLeft: "auto" }}
              >
                Login
              </Button>
              <Button variant="contained" component={Link} to="/signup" color="warning">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
