import { clinicsMockData, Clinic } from "../../constant/dummyData"; // Import dummy data
import { Link } from "react-router-dom";

interface DoctorListProps {
  ClinicsList?: Clinic[];
  heading?: string;
}

const ClinicList: React.FC<DoctorListProps> = ({
  ClinicsList = clinicsMockData,
  heading = "Popular Clinics",
}) => {
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">{heading}</h2>

      <div
        className="grid grid-cols-2 
        sm:grid-cols-2 md:grid-cols-3
        gap-7 mt-4
        lg:grid-cols-4"
      >
        {ClinicsList.length > 0
          ? ClinicsList.map((clinic, index) => (
              <div
                className="border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary
                hover:shadow-sm transition-all ease-in-out"
                key={index}
              >
                <img
                  src={clinic.image}
                  alt="doctor"
                  width={500}
                  height={200}
                  className="h-[200px] w-full object-cover rounded-lg"
                />
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2
                    className="text-[10px] bg-blue-100 p-1 rounded-full
                        px-2 text-primary"
                  >
                    {clinic.address}
                  </h2>
                  <h2 className="font-bold">{clinic.name}</h2>
                  <h2 className="text-gray-500 text-sm">
                    Phone: {clinic.phone}
                  </h2>
                  <h2 className="text-gray-500 text-sm">{clinic.address}</h2>
                  <Link to={"/details/" + clinic.id} className="w-full">
                    <h2
                      className="p-2 px-3 border-[1px] border-primary
                        text-primary rounded-full w-full text-center
                        text-[11px] mt-2
                        cursor-pointer 
                        hover:bg-primary hover:text-white"
                    >
                      Book Now
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                className="h-[220px] bg-slate-200 
            w-full rounded-lg animate-pulse"
                key={index}
              />
            ))}
      </div>
    </div>
  );
};

export default ClinicList;
