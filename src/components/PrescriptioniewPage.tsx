// src/components/PrescriptionView.tsx
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
} from "@mui/material";

const PrescriptionView: React.FC = () => {
  // Sample Data (Replace with API data)
  const prescriptionDetail = {
    id: "b7a01a5b-1af0-43fa-87fa-dd8dd2839e60",
    appointmentId: "7e17dc03-d10a-4b9a-8af6-62de4ed476a1",
    diagnosis: "Acute Bronchitis",
    remarks: "Patient advised to rest.",
    createdAt: "2025-01-29T14:49:27.439Z",
  };

  const medicineDetails = [
    {
      id: "1a741318-8096-487f-9a71-04969a944c2e",
      drugName: "Amoxicillin",
      doseTime: "Before food",
      frequency: "Twice a day",
      dose: "500mg",
      drugForm: "Tablet",
      duration: "7 days",
    },
    {
      id: "042ec5b2-0b68-4da8-942c-75704e701311",
      drugName: "Paracetamol",
      doseTime: "After food",
      frequency: "Thrice a day",
      dose: "650mg",
      drugForm: "Tablet",
      duration: "5 days",
    },
  ];

  const petDetails = {
    name: "Buddy",
    breed: "Golden Retriever",
    age: "5 Years",
    weight: "25kg",
    photo: "https://via.placeholder.com/100",
  };

  const userDetails = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    photo: "https://via.placeholder.com/100",
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      {/* Pet & User Details */}
      <Grid container spacing={2} alignItems="center">
        {/* Pet Details */}
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={petDetails.photo}
                alt={petDetails.name}
                sx={{ width: 80, height: 80, marginRight: 2 }}
              />
              <div>
                <Typography variant="h6">{petDetails.name}</Typography>
                <Typography variant="body2">{petDetails.breed}</Typography>
                <Typography variant="body2">Age: {petDetails.age}</Typography>
                <Typography variant="body2">Weight: {petDetails.weight}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* User Details */}
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
              <div>
                <Typography variant="h6">{`${userDetails.firstName} ${userDetails.lastName}`}</Typography>
                <Typography variant="body2">{userDetails.email}</Typography>
              </div>
              <Avatar
                src={userDetails.photo}
                alt={`${userDetails.firstName} ${userDetails.lastName}`}
                sx={{ width: 80, height: 80, marginLeft: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Prescription Details */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Prescription Details
        </Typography>
        <Typography variant="body1">
          <strong>Diagnosis:</strong> {prescriptionDetail.diagnosis}
        </Typography>
        <Typography variant="body1">
          <strong>Remarks:</strong> {prescriptionDetail.remarks}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Date:</strong> {new Date(prescriptionDetail.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Medicines List */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Medicines
        </Typography>
        <List>
          {medicineDetails.map((medicine, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${medicine.drugName} (${medicine.dose})`}
                secondary={`Take ${medicine.frequency}, ${medicine.doseTime} | Form: ${medicine.drugForm} | Duration: ${medicine.duration}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PrescriptionView;
