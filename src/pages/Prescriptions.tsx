import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Prescriptions = () => {
  return (
    <Card sx={{ maxWidth: 345, height: 300,backgroundImage: "https://picsum.photos/200/300" }}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <CardContent sx={{ position: "relative", padding: 2 }}>
          <Typography gutterBottom variant="h5" component="div" color="white">
            Pet Name: Luna
          </Typography>
          <Typography variant="body2" color="white">
            Owner: John Doe
          </Typography>
          <Button variant="contained" color="secondary">
            View Prescription
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Prescriptions;
