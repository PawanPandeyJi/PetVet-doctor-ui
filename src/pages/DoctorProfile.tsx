import { Box, Typography, Grid, Avatar, Card, CardContent, Divider } from "@mui/material";
import { useGetDoctorQuery } from "../store/api/doctor-api";
import { useLoginUserDataQuery } from "../store/api/auth-api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const { data: doctorDetail } = useGetDoctorQuery();
  const { data: loggedInUserData } = useLoginUserDataQuery();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const { DoctorShedule } = doctorDetail || {};
  const availableDays = DoctorShedule?.map((val) => val.availableDays);
  const availableTimeFrom = DoctorShedule?.map((val) => val.availableTimeFrom);
  const availableTimeTo = DoctorShedule?.map((val) => val.availableTimeTo);
  const doctorId = DoctorShedule?.map((val) => val.doctorId);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!loggedInUserData) {
      navigate("/register");
    }
  }, [navigate, isLoggedIn, loggedInUserData]);
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {!doctorDetail?.isApproved && (
        <>
          <Box sx={{ color: "green", height: "50px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Your documents are under verification, please wait...
            </Typography>
          </Box>
        </>
      )}
      <Typography variant="h4" align="center" gutterBottom>
        Doctor Profile
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", padding: 2 }}>
            <Avatar
              src={doctorDetail?.profileImage}
              alt="Profile"
              sx={{ width: 150, height: 150, margin: "auto" }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {`Dr. ${loggedInUserData?.firstName} ${loggedInUserData?.lastName}`}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {doctorDetail?.specialization}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", padding: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography>
                <strong>Date of Birth:</strong> {doctorDetail?.dob}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {doctorDetail?.gender}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {doctorDetail?.phone}
              </Typography>
              <Typography>
                <strong>Email:</strong> {loggedInUserData?.email}
              </Typography>
              <Typography>
                <strong>Address:</strong> {doctorDetail?.address}
              </Typography>
              <Typography>
                <strong>Available Days:</strong> {availableDays?.join(",")}
              </Typography>
              <Typography>
                <strong>Available Time:</strong> {`${availableTimeFrom} - ${availableTimeTo}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Card>
              <CardContent sx={{ height: "100%", padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Professional Information
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography>
                  <strong>Qualification:</strong> {doctorDetail?.qualification}
                </Typography>
                <Typography>
                  <strong>Specialization:</strong> {doctorDetail?.specialization}
                </Typography>
                <Typography>
                  <strong>License Number:</strong> {doctorDetail?.licenseNumber}
                </Typography>
                <Typography>
                  <strong>Registration Id:</strong> {doctorId}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom align="center">
          Certificate Image
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <Avatar
                src={doctorDetail?.certificateImage}
                alt="Profile Image"
                sx={{ width: "100%", height: 300, margin: "auto" }}
                variant="square"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DoctorProfile;
