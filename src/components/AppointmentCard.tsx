import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
  Tooltip,
  Modal,
} from "@mui/material";
import { VaccinesOutlined } from "@mui/icons-material";
import ChatBox from "./ChatBox";
import { useCallback, useEffect, useState } from "react";
import { useLoginUserDataQuery } from "../store/api/auth-api";
import { useCreateRoomMutation, useGetRoomsQuery } from "../store/api/chat";
import { io } from "socket.io-client";
import ConfirmMessageCard from "./ConfirmMessageCard";

const socket = io("http://localhost:8000", {});

type AppointmentDataProps = {
  key: string;
  userId: string;
  appointmentId: string;
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
};

const AppointmentCard = (props: AppointmentDataProps) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [openConfirmCard, setOpenConfirmCard] = useState(false);
  const [roomId, setRoomId] = useState<string>();

  const { data: loginUserData } = useLoginUserDataQuery();
  const { data: rooms, isLoading: isRoomsLoading, refetch } = useGetRoomsQuery(undefined);
  const [createRoomApi] = useCreateRoomMutation();

  const handleClose = () => setOpenChatBox(false);
  const handleConfirmCardClose = () => setOpenConfirmCard(false);

  const joinAppointment = useCallback(async () => {
    if (!loginUserData?.id) return;
    if (isRoomsLoading) return;

    let currentRoomId;

    const previousRoom = rooms?.find((room) => room.appointmentId === props.appointmentId);

    if (!previousRoom) {
      const room = await createRoomApi({
        participant: props.userId,
        appointmentId: props.appointmentId,
      }).unwrap();
      currentRoomId = room.id;
    } else {
      currentRoomId = previousRoom.id;
    }

    setRoomId(currentRoomId);
    socket.emit("askToJoin", {});
    setOpenChatBox(true);
  }, [createRoomApi, isRoomsLoading, loginUserData?.id, props.appointmentId, props.userId, rooms]);

  useEffect(() => {
    const handleAskToJoin = () => refetch();
    socket.on("askToJoin", handleAskToJoin);

    return () => {
      socket.off("askToJoin", handleAskToJoin);
    };
  }, [refetch]);

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
            <Button variant="contained" color="error" onClick={() => setOpenConfirmCard(true)}>
              End Chat
            </Button>
            <Tooltip title={`Waiting for user to connect`}>
              <span>
                <Button variant="contained" color="primary" onClick={joinAppointment}>
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
      <div>
        <Modal open={openChatBox && !!roomId} onClose={handleClose}>
          <Box sx={style}>
            <ChatBox
              roomId={roomId ?? ""}
              onClose={() => setOpenChatBox(false)}
              petImage={props.petImage}
              petName={props.petName}
            />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal open={openConfirmCard} onClose={handleConfirmCardClose}>
          <Box sx={style}>
            <ConfirmMessageCard
              title={"Confirm"}
              message={`Are you sure to end chat with ${props.petName}`}
              onConfirm={() => {
                props.disconnect();
                setOpenConfirmCard(false);
              }}
              onCancel={() => setOpenConfirmCard(false)}
            />
          </Box>
        </Modal>
      </div>
    </Card>
  );
};

export default AppointmentCard;
