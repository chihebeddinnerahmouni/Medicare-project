import { clinicsMockData, Clinic } from "../../constant/dummyData"; // Import dummy data
import ClinicCard from "../../components/ui/cards/ClinicCard";

interface DoctorListProps {
  ClinicsList?: Clinic[];
  heading?: string;
}

const ClinicList: React.FC<DoctorListProps> = ({
  ClinicsList = clinicsMockData,
  heading = "Popular Clinics",
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
        {ClinicsList.map((clinic, index) => (
          <ClinicCard key={index} item={clinic} />
        ))}
        
      </div>
    </section>
  );
};

export default ClinicList;
