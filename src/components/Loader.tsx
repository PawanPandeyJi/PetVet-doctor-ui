import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: "100%",
          height: "85vh"
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loader;
