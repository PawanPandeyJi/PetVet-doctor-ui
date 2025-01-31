import { Box } from "@mui/material";
// import PrescriptionCard from "../components/PrescriptionCard";
import { useGetPrescriptionsQuery } from "../store/api/prescription-api";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";
import PrescriptionCard from "../components/PrescriptionCard";

const Prescriptions = () => {
  const { data: prescriptions } = useGetPrescriptionsQuery();
  const { data: appointments } = useGetAppointmentsQuery();
  const prescriptionOfAppointments = prescriptions?.map((val) => val.appointmentId);
  const appointmentDeails = appointments?.filter((appointments) =>
    prescriptionOfAppointments?.includes(appointments.id)
  );
  return (
    <>
      <Box
        sx={{
          width: "95%",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          gap: "5rem",
          margin: "1rem auto",
        }}
      >
        {appointmentDeails?.map((appointments) => {
          return (
            <PrescriptionCard
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

