import { nursesMockData, Nurse } from "../../constant/dummyData"; // Import dummy data
import CardInfo from "../../components/ui/cards/CardInfo";

interface DoctorListProps {
  NurseList?: Nurse[];
  heading?: string;
}

const NurseList: React.FC<DoctorListProps> = ({
  NurseList = nursesMockData,
  heading = "Popular Nurses",
}) => {


  return (
    <div className="mt-14">
      <h2 className="font-bold text-xl xl:text-2xl">{heading}</h2>

      <div
        className="grid grid-cols-2 
        sm:grid-cols-2 md:grid-cols-3
        gap-7 mt-4
        lg:grid-cols-4"
      >
        {/* <CardInfo list={NurseList} type={"nurses"} /> */}
        {NurseList.length > 0
          ? NurseList.map((nurse, index) => (
              <CardInfo key={index} item={nurse} type="nurses" />
            ))
          : [1, 2, 3, 4, 5, 6].map((index) => (
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

export default NurseList;
