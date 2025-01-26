import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import {
  useAskToJoinMutation,
  useDisconnectUserMutation,
  useGetAppointmentsQuery,
} from "../store/api/doctor-api";
import { socket } from "../socket";
const Appointments = () => {
  const { data: appointment, refetch } = useGetAppointmentsQuery();

  const [askToJoin] = useAskToJoinMutation();
  const [disconnectUser] = useDisconnectUserMutation();

  const [appointmentIdToBeJoined, setAppointmentIdToBeJoined] = useState<string>();

  async function handleSocketConnection(appointmentId: string) {
    try {
      if (appointmentIdToBeJoined === undefined) {
        setAppointmentIdToBeJoined(appointmentId);
        await askToJoin(appointmentId);
        socket.emit("USER", { appointmentId });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDisconnect = async () => {
    try {
      if (appointmentIdToBeJoined) {
        await disconnectUser(appointmentIdToBeJoined);
      }
      setAppointmentIdToBeJoined(undefined);
      refetch();
    } catch (error) {
      console.error("Error while disconnecting:", error);
    }
  };

  useEffect(() => {
    socket.on("cancelAppointment", () => {
      refetch();
    });

    return () => {
      socket.off("cancelAppointment");
    };
  }, [refetch]);

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
          appointment.map((appointment) => {
            return (
              <AppointmentCard
                key={appointment.id}
                appointmentId={appointment.id}
                userId={appointment.userId}
                firstName={appointment.appointmentOfUserPet.firstName}
                lastName={appointment.appointmentOfUserPet.lastName}
                email={appointment.appointmentOfUserPet.email}
                petName={appointment.appointmentToPet.petName}
                age={appointment.appointmentToPet.age}
                breed={appointment.appointmentToPet.breed}
                weight={appointment.appointmentToPet.weight}
                type={appointment.appointmentToPet.type}
                gender={appointment.appointmentToPet.gender}
                color={appointment.appointmentToPet.color}
                appointmentDay={appointment.appointmentDay}
                petImage={appointment.petImage}
                time="06:30 PM"
                onClickJoin={() => handleSocketConnection(appointment.id)}
                canJoin={appointment.id === appointmentIdToBeJoined ? appointment.canJoin : false}
                isConnected={true}
                disconnect={handleDisconnect}
              />
            );
          })}
      </div>
    </>
  );
};

export default Appointments;
