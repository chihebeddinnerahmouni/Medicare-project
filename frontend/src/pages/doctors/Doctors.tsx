import * as React from "react";
// import DropDownFilter from "@/components/doctors/doctors/DropDownFilter";
import SpecialitiesCont from "@/containers/doctors/SpecialitiesCont";
import DoctorsCont from "@/containers/doctors/DoctorsCont";


const Doctors = () => {
  const [specialite, setSpecialite] = React.useState<number>(0);
  // const [array, setArray] = React.useState(array_test);
  const array = array_test

  return (
    <div className="mt-[60px] pt-10 px-4 md:px-10 lg:px-20 xl:max-w-[1700px] xl:mx-auto">
      <SpecialitiesCont specialite={specialite} setSpecialite={setSpecialite} array={array} />
       <DoctorsCont />
    </div>
  );
}

export default Doctors


const array_test = [
  {
    id: 1,
    name: "Dermatology",
    image: "/nurse.png",
  },
  {
    id: 2,
    name: "Cardiology",
    image: "/nurse.png",
  },
  {
    id: 3,
    name: "Neurology",
    image: "/nurse.png",
  },
  {
    id: 4,
    name: "Oncology",
    image: "/nurse.png",
  },
  {
    id: 5,
    name: "Pediatrics",
    image: "/nurse.png",
  },
];