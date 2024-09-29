
import { doctorsMockData, Doctor } from "../../constant/dummyData"; // Import dummy data
import { Link } from "react-router-dom";



interface DoctorListProps {
  doctorList?: Doctor[];
  heading?: string;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctorList = doctorsMockData,
  heading = "Popular Doctors",
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
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
            <div
                className="border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary
                hover:shadow-sm transition-all ease-in-out"
                key={index}
            >
                <div className="relative h-[200px] w-full">
                    <img
                        src={doctor.image}
                        alt="doctor"
                        width={500}
                        height={200}
                        content="doctor"
                        className="h-full w-full object-contain rounded-lg"
                    />
                    <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 rounded-br-lg">
                        {doctor.category}
                    </div>
                </div>
                <div className="mt-3 items-baseline flex flex-col gap-1">
                    <h2 className="font-bold">{doctor.name}</h2>
                    <h2 className="text-primary text-sm">
                        {doctor.year_of_experience} Years of Experience
                    </h2>
                    <h2 className="text-gray-500 text-sm">{doctor.address}</h2>
                    <Link to={"/details/" + doctor.id} className="w-full">
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

export default DoctorList;