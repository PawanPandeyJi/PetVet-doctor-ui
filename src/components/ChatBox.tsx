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

type ModalFormProps = {
  petImage: string;
  petName: string;
  onClose?: () => void;
};

const ChatBox = (props: ModalFormProps) => {
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
      {/* Header */}
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

      {/* Message List */}
      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          p: 1,
        }}
      >
        <ListItem sx={{ justifyContent: "flex-start" }}>
          <Box
            sx={{
              bgcolor: "#f1f1f1",
              p: 1,
              borderRadius: 2,
              maxWidth: "70%",
            }}
          >
            <Typography variant="body2">Hello! How are you?</Typography>
          </Box>
        </ListItem>
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <Box
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              p: 1,
              borderRadius: 2,
              maxWidth: "70%",
            }}
          >
            <Typography variant="body2">I'm good, thank you!</Typography>
          </Box>
        </ListItem>
      </List>

      {/* Input and Send Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField fullWidth variant="outlined" size="small" placeholder="Type your message..." />
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;
