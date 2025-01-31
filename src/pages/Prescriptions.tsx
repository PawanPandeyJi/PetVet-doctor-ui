import { Box, Typography } from "@mui/material";
import { useGetPrescriptionsQuery } from "../store/api/prescription-api";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";
import PrescriptionCard from "../components/PrescriptionCard";
import Loader from "../components/Loader";

const Prescriptions = () => {
  const { data: prescriptions, isLoading: isPrescriptionLoading } = useGetPrescriptionsQuery();
  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
  } = useGetAppointmentsQuery();
  const prescriptionOfAppointments = prescriptions?.map((val) => val.appointmentId);
  const appointmentDeails = appointments?.filter((appointments) =>
    prescriptionOfAppointments?.includes(appointments.id)
  );

  if (isPrescriptionLoading && isAppointmentsLoading) {
    return <Loader />;
  }

  if (appointmentDeails?.length == 0) {
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
        No Prescription found!
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "95%",
          minHeight: "85vh",
          display: "flex",
          flexWrap: "wrap",
          gap: "5rem",
          margin: "1rem auto",
        }}
      >
        {appointmentDeails?.map((appointments) => {
          return (
            <PrescriptionCard
              key={appointments.id}
              petImage={appointments.petImage}
              petName={appointments.appointmentToPet.petName}
              petOwnerName={`${appointments.appointmentOfUserPet.firstName} ${appointments.appointmentOfUserPet.lastName}`}
              email={appointments.appointmentOfUserPet.email}
              appointmentDate={appointments.createdAt}
              appointmentId={appointments.id}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Prescriptions;
