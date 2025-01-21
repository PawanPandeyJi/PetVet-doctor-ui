import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { VaccinesOutlined } from "@mui/icons-material";

type AppointmentDataProps = {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  petName: string;
  age: string;
  breed: string;
  weight: string;
  type: string;
  gender: string;
  color: string;
  appointmentDay: string;
  time: string;
  petImage: string;
  onClickJoin: () => void;
  canJoin: boolean;
  isConnected: boolean;
  disconnect: () => void;
};

const AppointmentCard = (props: AppointmentDataProps) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "1rem",
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        position: "relative",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginBottom={2}>
        <Avatar sx={{ bgcolor: "primary.main", height: 80, width: 80 }} src="Avatar" />
        <VaccinesOutlined color="disabled" sx={{ height: 40, width: 40 }} />
        <Avatar sx={{ bgcolor: "secondary.main", height: 80, width: 80 }} src={props.petImage} />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          Appointment Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Client Name:</strong> {`${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Client Email:</strong> {props.email}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Pet Name:</strong> {props.petName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Age:</strong> {props.age}, <strong>Breed:</strong> {props.breed},{" "}
          <strong>Weight:</strong> {props.weight}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Type:</strong> {props.type}, <strong>Gender:</strong> {props.gender},{" "}
          <strong>Color:</strong> {props.color}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Date:</strong> 2025-02-20
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Time:</strong> {props.time}, <strong>Day:</strong> {props.appointmentDay}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {props.canJoin && props.isConnected ? (
          <>
            <Button variant="contained" color="error" onClick={props.disconnect}>
              Disconnect
            </Button>
            <Tooltip title={`Waiting for user to connect`}>
              <span>
                <Button variant="contained" color="primary">
                  Chat
                </Button>
              </span>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title={`You can join on ${props.appointmentDay}`}>
              <span style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Button variant="contained" color="primary" onClick={props.onClickJoin}>
                  Ask to Join
                </Button>
              </span>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default AppointmentCard;
