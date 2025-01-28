import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

type ConfirmMessageCardProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmMessageCard: React.FC<ConfirmMessageCardProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConfirmMessageCard;
