import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useGetPrescriptionsQuery } from "../store/api/prescription-api";
import { useNavigate } from "react-router-dom";

type AppointmentProps = {
  petImage: string;
  petName: string;
  petOwnerName: string;
  email: string;
  appointmentDate: string;
  appointmentId: string;
};

const PrescriptionCard = (props: AppointmentProps) => {
  const { data: prescriptions } = useGetPrescriptionsQuery();

  const navigate = useNavigate();

  const viewPrescription = (id: string) => {
    const prescriptionId = prescriptions?.filter(
      (prescriptions) => prescriptions.appointmentId === id
    );
    if (!prescriptionId) {
      return;
    }
    navigate(`/prescriptions/${prescriptionId[0].id}`);
  };

  const appointmentDate = props.appointmentDate;
  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  return (
    <Card sx={{ width: 300, height: 350, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        image={props.petImage}
        alt={props.petName}
        sx={{ height: "55%", width: "100%", objectFit: "fill" }}
      />

      <CardContent
        sx={{ height: "45%", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Typography variant="h6" fontWeight="bold">
          {props.petName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.petOwnerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {props.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {formattedDate}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: "0.7rem" }}
          onClick={() => viewPrescription(props.appointmentId)}
        >
          Prescription
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
