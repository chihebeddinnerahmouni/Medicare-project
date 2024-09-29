import convertToLocalServerPath from "@/utils/convert-path";
import { IoChevronBackCircle } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';


const BasicInfos = ({ pharmacy, onClick }: any) => {

  const navigate = useNavigate();
  


  return (
    <div className="w-full flex items-center gap-[10px] h-[80px]">
      <div className="image w-[87px] h-[80px] rounded-15 border-1 border-mainGreen overflow-hidden">
        <img
          src={convertToLocalServerPath(pharmacy.doorPicture)}
          alt="pharmacy door"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="infos h-full flex items-start justify-between flex-grow">
        <div className="texts flex flex-col justify-between h-full">
          <p className="text-[18px] text-darkGreen font-medium">
            {pharmacy.name}
          </p>
          <p className="text-secondaryWritingGrey font-medium">
            {pharmacy.codingAdress}
          </p>
          <p
            className={`${
              pharmacy.workStatus ? "text-mainGreen" : "text-red-500"
            }  font-medium`}
          >
            {pharmacy.workStatus ? "Ouverte" : "Fermé"}
          </p>
        </div>
        {/* texts */}

        <IoChevronBackCircle
          className="text-[35px] text-[#D7DBE1]"
          onClick={onClick}
        />
      </div>
      {/* infos */}
    </div>
  );
};

export default BasicInfos;





// const BasicInfos = ({ pharmacy, setOnePharmacy, setLocations }: any) => {
    
//   useEffect(() => { 
//     setLocations([{ lat: pharmacy.location.coordinates[0], lng: pharmacy.location.coordinates[1] }])
//   }, [pharmacy]);

// const navigate = useNavigate();


//   return (
//     <div className="w-full flex items-center gap-[10px] h-[80px]">
//       <div className="image w-[87px] h-[80px] rounded-15 border-1 border-mainGreen overflow-hidden">
//         <img
//           src={convertToLocalServerPath(pharmacy.doorPicture)}
//           alt="pharmacy door"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="infos h-full flex items-start justify-between flex-grow">
//         <div className="texts flex flex-col justify-between h-full">
//           <p className="text-[18px] text-darkGreen font-medium">{pharmacy.name}</p>
//           <p className="text-secondaryWritingGrey font-medium">{pharmacy.codingAdress}</p>
//           <p className={`${pharmacy.workStatus ? "text-mainGreen" : "text-red-500"}  font-medium`}>
//             {pharmacy.workStatus} hgk
//           </p>
//         </div>{/* texts */}

//         <IoChevronBackCircle className="text-[35px] text-[#D7DBE1]" onClick={() =>  setOnePharmacy({ state: false, data: {} }) }/>
                 
        
     
//       </div>
//       {/* infos */}
//     </div>
//   );
// }

// export default BasicInfos
