import { doctorsMockData, Doctor } from "../../constant/dummyData"; // Import dummy data
// import { Link } from "react-router-dom";
import CardInfo from "../../components/ui/cards/CardInfo";



interface DoctorListProps {
  doctorList?: Doctor[];
  heading?: string;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctorList = doctorsMockData,
  heading = "Popular Doctors",
}) => {
  return (
    <section>
      <h2 className="font-bold text-xl xl:text-2xl">{heading}</h2>

      <div
        className="grid grid-cols-2 
        sm:grid-cols-2 md:grid-cols-3
        gap-7 mt-4
        lg:grid-cols-4"
      >
        {/* <CardInfo list={doctorList} type="doctors" /> */}
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
              <CardInfo key={index} item={doctor} type="doctors" />
            ))
          : [1, 2, 3, 4, 5, 6].map((index) => (
              <div
                className="h-[220px] bg-slate-200 
            w-full rounded-lg animate-pulse"
                key={index}
              />
            ))}
      </div>
    </section>
  );
};

export default DoctorList;