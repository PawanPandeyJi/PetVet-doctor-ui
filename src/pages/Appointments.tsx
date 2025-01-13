import { useGetAppointmentsQuery } from "../store/api/doctor-api";

const Appointments = () => {
  const { data } = useGetAppointmentsQuery();
  console.log(data);
  return <div>Appointments</div>;
};

export default Appointments;
