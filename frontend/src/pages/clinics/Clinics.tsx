import ClinicsCont from "@/containers/clinics/ClinicsCont";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";



const Clinics = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
    const mainColor = "#199B8A";

  return (
    <div className="mt-[60px] pt-10 px-4 md:px-10 lg:px-20 xl:max-w-[1700px] xl:mx-auto">
      {/* <SpecialitiesCont
        specialite={specialite}
        setSpecialite={setSpecialite}
        array={array}
      /> */}
      <ClinicsCont />
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

export default Clinics
