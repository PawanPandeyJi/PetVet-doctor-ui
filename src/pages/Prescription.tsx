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
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { UploadOutlined } from "@mui/icons-material";
import { useCreatePrescriptionMutation } from "../store/api/prescription-api";
import ConfirmMessageCard from "../components/ConfirmMessageCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
};

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

  const [openConfirmCard, setOpenConfirmCard] = useState(false);

  const [remarksOrDiagnosis, setRemarksOrDiagnosis] = useState({
    diagnosis: "",
    remarks: "",
    appointmentId: "",
  });

  const handleTextFieldInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarksOrDiagnosis((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const { data: appointment, isLoading: isAppointmentDetailsLoading } = useGetAppointmentsQuery();
  const [createPrescription] = useCreatePrescriptionMutation();
  const { appointmentId } = useParams();

  const appointmentDetail = appointment?.find((appointment) => appointment.id === appointmentId);

  const appointmentDate = appointmentDetail?.createdAt;
  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

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

  const handlePrescriptionSubmit = async () => {
    if (!appointmentId) {
      return;
    }

    await createPrescription({
      remarksOrDiagnosis: { ...remarksOrDiagnosis, appointmentId },
      medicines,
    });

    setRemarksOrDiagnosis({ diagnosis: "", remarks: "", appointmentId: "" });
    setMedicines([
      { drugName: "", doseTime: "", frequency: "", dose: "", drugForm: "", duration: "" },
    ]);
  };

  const handleConfirmCardClose = () => setOpenConfirmCard(false);

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmCard(true);
  };

  const handleConfirm = async () => {
    setOpenConfirmCard(false);
    await handlePrescriptionSubmit();
  };

  if (isAppointmentDetailsLoading) {
    return <Loader />;
  }

  if (!appointmentDetail) {
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
        No appointment details found!
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ margin: "2rem auto" }}>
      <form onSubmit={handleConfirmSubmit}>
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
                  <Typography variant="body2">
                    {appointmentDetail.appointmentToPet.breed}
                  </Typography>
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
                  <Typography variant="h6">
                    {`${appointmentDetail.appointmentOfUserPet.firstName.toUpperCase()} ${appointmentDetail.appointmentOfUserPet.lastName.toUpperCase()}`}
                  </Typography>
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
              required
              value={remarksOrDiagnosis.diagnosis}
              onChange={handleTextFieldInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              required
              value={remarksOrDiagnosis.remarks}
              onChange={handleTextFieldInput}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Medicines
        </Typography>

        {medicines.map((medicine, index) => (
          <Accordion key={index} sx={{ marginY: 1 }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Medicine {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.keys(medicine).map((field) => (
                  <Grid item xs={6} key={field}>
                    <TextField
                      label={field.replace(/([A-Z])/g, " $1")}
                      fullWidth
                      required
                      value={medicine[field as keyof typeof medicine]}
                      onChange={(e) => handleMedicineChange(index, field, e.target.value)}
                    />
                  </Grid>
                ))}
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
          <Button variant="contained" startIcon={<UploadOutlined />} type="submit">
            Upload
          </Button>
        </Box>
      </form>
      <div>
        <Modal open={openConfirmCard} onClose={handleConfirmCardClose}>
          <Box sx={style}>
            <ConfirmMessageCard
              title={"Kindly Recheck"}
              message={`Are you sure to upload this prescription.`}
              onConfirm={handleConfirm}
              onCancel={() => setOpenConfirmCard(false)}
            />
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default Prescription;
