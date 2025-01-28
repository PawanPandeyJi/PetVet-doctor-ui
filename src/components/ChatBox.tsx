import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLoginUserDataQuery } from "../store/api/auth-api";
import { useCreateMessageMutation, useGetMessagesQuery } from "../store/api/chat";

const socket = io("http://localhost:8000", {});

type ModalFormProps = {
  petImage: string;
  petName: string;
  onClose?: () => void;
  roomId: string;
  isChatEnded: boolean;
};

const ChatBox = (props: ModalFormProps) => {
  const [message, setMessage] = useState("");

  const { data: loginUserData } = useLoginUserDataQuery();
  const {
    data: messages,
    refetch,
    isSuccess,
  } = useGetMessagesQuery(props.roomId, {
    skip: !props.roomId,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [createMessageApi] = useCreateMessageMutation();

  const sendMessage = useCallback(async () => {
    if (!loginUserData?.id || message.trim() === "") return;

    await createMessageApi({
      message,
      senderId: loginUserData.id,
      roomId: props.roomId,
    }).unwrap();

    setMessage("");
    inputRef.current?.focus();
  }, [createMessageApi, loginUserData?.id, message, props.roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isSuccess) {
      socket.on("messageUpdatedOnCreate", () => {
        refetch();
      });

      return () => {
        socket.off("messageUpdatedOnCreate");
      };
    }
  }, [refetch, isSuccess]);
  return (
    <Paper
      elevation={3}
      sx={{
        width: "500px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          p: 1,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={props.petImage} alt="User" sx={{ mr: 2, width: 48, height: 48 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {props.petName}
          </Typography>
        </Box>
        <IconButton
          onClick={props.onClose}
          aria-label="close"
          sx={{
            color: "#9e9e9e",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          p: 1,
        }}
      >
        {messages?.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              justifyContent: message.senderId === loginUserData?.id ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                bgcolor: message.senderId === loginUserData?.id ? "#1976d2" : "#f1f1f1",
                color: message.senderId === loginUserData?.id ? "#fff" : "#000",
                p: 1,
                borderRadius: 2,
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              <Typography variant="body2">{message.message}</Typography>
            </Box>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      {
      props.isChatEnded ? (
        <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        // onClick={sendMessage}
      >
        Upload Prescription
      </Button>
      ) : (
        <>
        <Box
       component="form"
       onSubmit={(e) => {
         e.preventDefault();
         sendMessage();
       }}
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          fullWidth
          inputRef={inputRef}
          variant="outlined"
          size="small"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>    
        </>
      )
    }
    </Paper>
  );
};

export default ChatBox;
