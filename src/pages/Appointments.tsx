import AppointmentCard from "../components/AppointmentCard";
import { useGetAppointmentsQuery } from "../store/api/doctor-api";

const Appointments = () => {
  const { data: appointment } = useGetAppointmentsQuery();

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
          marginTop: "0.5rem",
        }}
      >
        {appointment &&
          appointment.map((val) => {
            return (
              <AppointmentCard
                firstName={val.appointmentOfUserPet.firstName}
                lastName={val.appointmentOfUserPet.lastName}
                email={val.appointmentOfUserPet.email}
                petName={val.appointmentToPet.petName}
                age={val.appointmentToPet.age}
                breed={val.appointmentToPet.breed}
                weight={val.appointmentToPet.weight}
                type={val.appointmentToPet.type}
                gender={val.appointmentToPet.gender}
                color={val.appointmentToPet.color}
                appointmentDay={val.appointmentDay}
                petImage={val.petImage}
                time="06:30 PM"
              />
            );
          })}
      </div>
    </>
  );
};

export default Appointments;
