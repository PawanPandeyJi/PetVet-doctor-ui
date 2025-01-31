import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";
import Loader from "./Loader";
import { useGetPrescriptionsQuery } from "../store/api/prescription-api";

const PrescriptionView: React.FC = () => {
  const { prescriptionId } = useParams();
  const { data: prescriptions } = useGetPrescriptionsQuery();
  const { data: appoitmentDetails, isLoading: isAppointmentDetailsLoading } =
    useGetAppointmentsQuery();

  if (isAppointmentDetailsLoading) {
    return <Loader />;
  }

  if (!prescriptionId) {
    return (
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
        No Prescription found!
      </Typography>
    );
  }

  const prescriptionDetail = prescriptions?.filter(
    (prescription) => prescription.id === prescriptionId
  );

  if (!prescriptionDetail) {
    return (
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
        No Prescription found!
      </Typography>
    );
  }

  if (!prescriptionDetail[0]?.appointmentId) {
    return (
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
        No Prescription found!
      </Typography>
    );
  }

  const appointmentOfPrescription = appoitmentDetails?.filter(
    (appointment) => appointment.id === prescriptionDetail[0].appointmentId
  );
  console.log(prescriptionDetail);

  if (!appointmentOfPrescription) {
    return (
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
        No Prescription found!
      </Typography>
    );
  }
  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={appointmentOfPrescription[0].petId}
                  src={appointmentOfPrescription[0].petImage}
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                <div>
                  <Typography variant="h6">
                    {appointmentOfPrescription[0].appointmentToPet.petName}
                  </Typography>
                  <Typography variant="body2">
                    {appointmentOfPrescription[0].appointmentToPet.breed}
                  </Typography>
                  <Typography variant="body2">
                    Age: {appointmentOfPrescription[0].appointmentToPet.age}
                  </Typography>
                  <Typography variant="body2">
                    Weight: {appointmentOfPrescription[0].appointmentToPet.weight}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                <div>
                  <Typography variant="h6">{`${appointmentOfPrescription[0].appointmentOfUserPet.firstName} ${appointmentOfPrescription[0].appointmentOfUserPet.lastName}`}</Typography>
                  <Typography variant="body2">
                    {appointmentOfPrescription[0].appointmentOfUserPet.email}
                  </Typography>
                </div>
                <Avatar sx={{ width: 80, height: 80, marginLeft: 2 }}>
                  {`${appointmentOfPrescription[0].appointmentOfUserPet.firstName[0].toUpperCase()} ${appointmentOfPrescription[0].appointmentOfUserPet.lastName[0].toUpperCase()}`}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Prescription Details
          </Typography>
          <Typography variant="body1">
            <strong>Diagnosis:</strong> {prescriptionDetail[0].diagnosis}
          </Typography>
          <Typography variant="body1">
            <strong>Remarks:</strong> {prescriptionDetail[0].remarks}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Date:</strong> {new Date(prescriptionDetail[0].createdAt).toLocaleDateString()}
          </Typography>
        </Paper>

        <Divider sx={{ my: 3 }} />

        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Medicines
          </Typography>
          <List>
            {prescriptionDetail[0].medicineOfPrescription.map((medicine, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${index + 1}. Drug Name: ${medicine.drugName} | Dose: (${
                    medicine.dose
                  })`}
                  secondary={`Frequency: ${medicine.frequency} | Dose Time: ${medicine.doseTime} | Drug Form: ${medicine.drugForm} | Duration: ${medicine.duration}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      <div
        className="printPrescription"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "2rem",
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={() => window.print()}>
          Print Or Save
        </Button>
      </div>
    </>
  );
};

export default PrescriptionView;
