import CardInfo from "@/components/ui/cards/CardInfo";
import {
    doctorsMockData,
    // Doctor
} from "../../constant/dummyData"; 
// import { useState } from "react";


const DoctorsCont = () => {

    // const [doctorList, setDoctorList] = useState<Doctor[]>(doctorsMockData);
    const doctorList = doctorsMockData

    // console.log(doctorList);

  return (
    <div
      className="grid grid-cols-2 gap-7 mt-8 pb-10
       md:grid-cols-3
      lg:grid-cols-4 lg:mt-10"
    >
          {doctorList.map((doctor, index) => (
                <CardInfo key={index} item={doctor} type="doctors" />
          ))}
          {doctorList.map((doctor, index) => (
                <CardInfo key={index} item={doctor} type="doctors" />
          ))}
    </div>
  );
}

export default DoctorsCont
