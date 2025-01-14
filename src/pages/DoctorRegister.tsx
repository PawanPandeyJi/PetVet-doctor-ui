import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import { BackendError, useCreateDoctorMutation, useGetDoctorQuery } from "../store/api/doctor-api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type RequestDoctorData = {
  dob: string;
  gender: string;
  phone: string;
  qualification: string;
  specialization: string;
  licenseNumber: string;
  address: string;
  availableDays: string[];
  availableTimeFrom: string;
  availableTimeTo: string;
};

const DoctorRegister = () => {
  const [formData, setFormData] = useState<RequestDoctorData>({
    dob: "",
    gender: "",
    phone: "",
    qualification: "",
    specialization: "",
    licenseNumber: "",
    address: "",
    availableDays: [],
    availableTimeFrom: "",
    availableTimeTo: "",
  });

  const [profileImageFile, setProfileImageFile] = useState<File | string>("");
  const [certificateImageFile, setCertificateImageFile] = useState<File | string>("");
  const [profilePreview, setProfilePreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");
  const [createDoctor] = useCreateDoctorMutation();
  const { data: getDoctorDetails } = useGetDoctorQuery();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    setProfileImageFile(selectedFile);
    setProfilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleCertificateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    setCertificateImageFile(selectedFile);
    setCertificatePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      availableDays: checked
        ? [...prevData.availableDays, value]
        : prevData.availableDays.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileImageFile) {
      setErrorMessage("No Profile Image selected");
      setSnackbarOpen(true);
      return;
    }

    if (!certificateImageFile) {
      setErrorMessage("No Certificate Image selected");
      setSnackbarOpen(true);
      return;
    }

    const form_data = new FormData();
    form_data.append("dob", formData.dob);
    form_data.append("gender", formData.gender);
    form_data.append("phone", formData.phone);
    form_data.append("qualification", formData.qualification);
    form_data.append("specialization", formData.specialization);
    form_data.append("licenseNumber", formData.licenseNumber);
    form_data.append("address", formData.address);
    form_data.append("profileImage", profileImageFile);
    form_data.append("certificateImage", certificateImageFile);
    form_data.append("availableTimeFrom", formData.availableTimeFrom);
    form_data.append("availableTimeTo", formData.availableTimeTo);
    formData.availableDays.forEach((day) => {
      form_data.append("availableDays[]", day);
    });

    try {
      const response = await createDoctor(form_data).unwrap();
      window.location.reload();
      navigate("/");
      setErrorMessage(response.message);
      setSnackbarOpen(true);
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
    if (isLoggedIn && getDoctorDetails) {
      navigate("/");
    }
  }, [navigate, getDoctorDetails, isLoggedIn]);

  return (
    <Box sx={{ p: 1, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Doctor Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              inputProps={{ min: "1970-01-01", max: "2005-12-31" }}
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField fullWidth label="Country Code" value="+91" />
          </Grid>

          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="subtitle1">Available Days</Typography>
            <FormGroup row>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        value={day.toLowerCase().slice(0, 3)}
                        checked={formData.availableDays.includes(day.toLowerCase().slice(0, 3))}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={day}
                  />
                )
              )}
            </FormGroup>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1">Available Time (From)</Typography>
            <TextField
              fullWidth
              type="time"
              name="availableTimeFrom"
              value={formData.availableTimeFrom}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Available Time (To)</Typography>
            <TextField
              fullWidth
              type="time"
              name="availableTimeTo"
              value={formData.availableTimeTo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="section"
              sx={{ border: "1px solid black", color: "inherit", height: "350px" }}
            >
              {profilePreview ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={profilePreview}
                  alt={profilePreview}
                />
              ) : (
                <Typography variant="h5">No Images Selected</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="section"
              sx={{ border: "1px solid black", color: "inherit", height: "350px" }}
            >
              {certificatePreview ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={certificatePreview}
                  alt={certificatePreview}
                />
              ) : (
                <Typography variant="h5">No Images Selected</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mt: 1 }}>
              Upload Profile Image
              <input type="file" hidden name="profileImage" onChange={handleProfileFileChange} />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth sx={{ mt: 1 }}>
              Upload Certificate Image
              <input
                type="file"
                hidden
                name="certificateImage"
                onChange={handleCertificateFileChange}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default DoctorRegister;
