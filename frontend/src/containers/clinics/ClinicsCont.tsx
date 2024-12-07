import ClinicCard from "@/components/ui/cards/ClinicCard"
import {
  clinicsMockData,
  // Clinic
} from "../../constant/dummyData";
// import { useState } from "react";

const ClinicsCont = () => {
  // const [clinicList, setClinicList] = useState<Clinic[]>(clinicsMockData);
  const clinicList = clinicsMockData;

  // console.log(doctorList);

  return (
    <div
      className="grid grid-cols-2 gap-7 mt-8
       md:grid-cols-3
      lg:grid-cols-4 lg:mt-10"
    >
      {clinicList.map((doctor, index) => (
        <ClinicCard key={index} item={doctor}  />
      ))}
      {clinicList.map((doctor, index) => (
        <ClinicCard key={index} item={doctor}/>
      ))}
    </div>
  );
};


export default ClinicsCont;
