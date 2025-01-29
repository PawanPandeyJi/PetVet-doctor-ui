// src/components/PrescriptionForm.tsx
import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { UploadOutlined } from "@mui/icons-material";

const Prescription: React.FC = () => {
  const [medicines, setMedicines] = useState([
    {
      drugName: "",
      doseTime: "",
      frequency: "",
      dose: "",
      drugForm: "",
      duration: "",
    },
  ]);

  const [remarksOrDiagnosis, setRemarksOrDiagnosis] = useState({
    diagnosis: "",
    remarks: "",
  });

  const handleTextFieldInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarksOrDiagnosis((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const { data: appointment, isLoading: isAppointmentDetailsLoading } = useGetAppointmentsQuery();
  const { appointmentId } = useParams();

  const appointmentDetail = appointment?.find((appointment) => appointment.id === appointmentId);

  const appointmentDate = appointmentDetail?.createdAt;
  const getAppointmentDate = new Date(appointmentDate as string);
  const formattedDate = getAppointmentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleMedicineChange = (index: number, field: string, value: string) => {
    const newMedicines = [...medicines];
    newMedicines[index][field as keyof (typeof newMedicines)[0]] = value;
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { drugName: "", doseTime: "", frequency: "", dose: "", drugForm: "", duration: "" },
    ]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handlePrescriptionSubmit = () => {
    console.log({ remarksOrDiagnosis, medicines });
  };

  if (isAppointmentDetailsLoading) {
    return <Loader />;
  }

  if (!appointmentDetail) {
    return (
      <>
        <Typography
          variant="h2"
          color="textDisabled"
          sx={{
            display: "flex",
            width: "100%",
            height: "85vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No appointment details found!
        </Typography>
      </>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ margin: "2rem auto" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={appointmentDetail.petImage}
                alt={appointmentDetail.appointmentToPet.petName}
                sx={{ width: 80, height: 80, marginRight: 2 }}
              />
              <div>
                <Typography variant="h6">
                  {appointmentDetail.appointmentToPet.petName.toUpperCase()}
                </Typography>
                <Typography variant="body2">{appointmentDetail.appointmentToPet.breed}</Typography>
                <Typography variant="body2">
                  {appointmentDetail.appointmentToPet.age},{" "}
                  {appointmentDetail.appointmentToPet.weight}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent
              sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "1rem" }}
            >
              <div>
                <Typography variant="h6">{`${appointmentDetail.appointmentOfUserPet.firstName.toUpperCase()} ${appointmentDetail.appointmentOfUserPet.lastName.toUpperCase()}`}</Typography>
                <Typography variant="body2">
                  {appointmentDetail.appointmentOfUserPet.email}
                </Typography>
                <Typography variant="body2">{formattedDate}</Typography>
              </div>
              <Avatar sx={{ width: 80, height: 80, marginRight: 2 }}>
                {`${appointmentDetail.appointmentOfUserPet.firstName[0].toUpperCase()} ${appointmentDetail.appointmentOfUserPet.lastName[0].toUpperCase()}`.toUpperCase()}
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2, borderColor: "GrayText", height: 5 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Diagnosis"
            name="diagnosis"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={remarksOrDiagnosis.diagnosis}
            onChange={handleTextFieldInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Remarks"
            name="remarks "
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={remarksOrDiagnosis.remarks}
            onChange={handleTextFieldInput}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Medicines
      </Typography>

      {medicines.map((medicine, index) => (
        <Accordion key={index} sx={{ marginY: 1 }} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Medicine {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Drug Name"
                  fullWidth
                  value={medicine.drugName}
                  onChange={(e) => handleMedicineChange(index, "drugName", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Dose Time"
                  fullWidth
                  value={medicine.doseTime}
                  onChange={(e) => handleMedicineChange(index, "doseTime", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Frequency"
                  fullWidth
                  value={medicine.frequency}
                  onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Dose"
                  fullWidth
                  value={medicine.dose}
                  onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Drug Form"
                  fullWidth
                  value={medicine.drugForm}
                  onChange={(e) => handleMedicineChange(index, "drugForm", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Duration"
                  fullWidth
                  value={medicine.duration}
                  onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => removeMedicine(index)}
              sx={{ marginTop: 2 }}
            >
              Remove Medicine
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addMedicine}>
          Add Another Medicine
        </Button>
        <Button
          variant="contained"
          startIcon={<UploadOutlined />}
          onClick={handlePrescriptionSubmit}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default Prescription;
