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
          appointment.map((val) => {
            return (
              <AppointmentCard
                key={val.id}
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
                onClickJoin={() => handleSocketConnection(val.id)}
                canJoin={val.id === appointmentIdToBeJoined ? val.canJoin : false}
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
