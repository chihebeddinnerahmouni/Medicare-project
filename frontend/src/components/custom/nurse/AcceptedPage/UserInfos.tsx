
import { FaUserNurse, FaStar, FaUserInjured } from "react-icons/fa";

const UserInfos = ({
  service,
  firstName,
  lastName,
  rate,
  patients,
  image
}: {
  service: string;
    firstName: string;
    lastName: string;
     rate: number;
        patients: number;
        image: string;
}) => {
  return (
    <div className="infos flex w-full gap-[19px]">
      <img
        src={image}
        alt="nurse"
        className="w-[105px] rounded-20 shadow-panelShadow"
      />
      <div className="infoos w-full h-[105px] flex flex-col">
        <div className="spacialite flex gap-[6px] items-center text-mainGreen font-medium bg-[#EFF2F9] flex-grow pl-3 py-1 rounded-10">
          <FaUserInjured />
          {service}
        </div>
        <p className="text-darkGreen font-medium ml-3 mt-[6px]">{firstName} {lastName}</p>
        <div className="stats flex gap-[10px] flex-grow items-end">
          <div className="State inline-flex flex-col items-center justify-end ml-[9px]">
            <FaStar className="text-sm text-mainGreen" />
            <span className="text-mainWritingGrey font-medium text-sm">
              {rate}
            </span>
          </div>
          <div className="State inline-flex flex-col items-center justify-end ml-[9px]">
            <FaUserNurse className="text-sm text-mainGreen" />
            <span className="text-mainWritingGrey font-medium text-sm">
              {patients}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfos;


