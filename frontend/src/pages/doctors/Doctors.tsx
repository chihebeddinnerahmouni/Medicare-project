import * as React from "react";
// import DropDownFilter from "@/components/doctors/doctors/DropDownFilter";
import SpecialitiesCont from "@/containers/doctors/SpecialitiesCont";
import DoctorsCont from "@/containers/doctors/DoctorsCont";
import Pagination from "@mui/material/Pagination";


const Doctors = () => {
  const [specialite, setSpecialite] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  // const [array, setArray] = React.useState(array_test);
  const array = array_test
    const mainColor = "#199B8A";


  return (
    <div className="mt-[60px] pt-10 px-4 md:px-10 lg:px-20 xl:max-w-[1700px] xl:mx-auto">
      <SpecialitiesCont
        specialite={specialite}
        setSpecialite={setSpecialite}
        array={array}
      />
      <DoctorsCont />
      <div className="pag w-full flex justify-center my-10">
        <Pagination
          count={10}
          page={currentPage}
          onChange={(_event, value) => setCurrentPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "gray",
              "&.Mui-selected": {
                backgroundColor: mainColor,
                color: "white",
              },
            },
          }}
        />
      </div>
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