import {useEffect, useContext} from 'react';
// import map from '@/assets/images/map.jpg';
import { useState } from 'react';
import axios from 'axios';
import PharmaciesList from '@/components/custom/User/user-pharmacies/pharmaciesPage/PharmaciesList';
import AllOpenButtoms from '@/components/custom/User/user-pharmacies/pharmaciesPage/AllOpenButtoms';
import { UserDataContext } from '../UserRoot';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  // LoadScript,
  Marker,
  useJsApiLoader

} from "@react-google-maps/api";




interface Pharmacy {
  name: string;
  codingAdress: string;
  workStatus: boolean;
  phone: string;
  location: any;
  doorPicture: string;
}

const AllPharmaciesPage = () => {

  const host = import.meta.env.VITE_HOST;
  const mapKey = import.meta.env.VITE_MAP_API_KEY;


  // get all pharmacies
  const getAllPharmacies = () => {
    setOption("all");
 axios
   .post(`${host}/patients/get-all-pharmacies`, { location: location })
   .then((res) => {
     setPharmacies(res.data.pharmacies);
     setAllPharmacies(res.data.pharmacies);
     const newLocations = res.data.pharmacies.map((pharmacy: Pharmacy) => {
       // console.log(pharmacy.location.coordinates[0], pharmacy.location.coordinates[1])
       return {
         lat: pharmacy.location.coordinates[0],
         lng: pharmacy.location.coordinates[1],
       };
     });
     setLocations(newLocations);
   })
   .catch((error) => {
     console.log(error);
   });
  }

  // get open pharmacies
  const getOpenPharmacies = () => { 
    setOption("open");
  }


  const selectMarker = () => { 
    if (selectedPosition) {
      const selectedPharmacy = pharmacies.find((pharmacy: Pharmacy) => pharmacy.location.coordinates[0] === (selectedPosition as any).lat && pharmacy.location.coordinates[1] === (selectedPosition as any).lng);
      setOnePharmacy(selectedPharmacy);
      setIsCardDown(false);
    }
  }

  const choosenByMarker = (location: any) => {
    const selectedPharmacy = pharmacies.find((pharmacy: Pharmacy) => pharmacy.location.coordinates[0] === location.lat && pharmacy.location.coordinates[1] === location.lng);
    setOnePharmacy(selectedPharmacy);
    navigate("/user-pharmacy/one-pharmacy");
  }
  
  const { onePharmacy, setOnePharmacy } = useContext(UserDataContext);
  const [option, setOption] = useState('all');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [allPharmacies, setAllPharmacies] = useState<Pharmacy[]>([]);
  const location = [36.213538, 5.442781];
  const [isCardDown, setIsCardDown] = useState(false);
  // const locations = [] as any[];
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Object>();
  //  const translationValue = "470";
  const navigate = useNavigate();
  
 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey
  });
 

 // get all pharmacies in 1st mount
  useEffect(() => { 
    if (allPharmacies.length === 0) getAllPharmacies();
  }, [])

  // change the list
  useEffect(() => {
     if (option === 'all') {
       setPharmacies(allPharmacies)
       const newLocations = allPharmacies.map((pharmacy: Pharmacy) => {
         // console.log(pharmacy.location.coordinates[0], pharmacy.location.coordinates[1])
         return {
           lat: pharmacy.location.coordinates[0],
           lng: pharmacy.location.coordinates[1],
         };
       });
       setLocations(newLocations);
     } else {
       const openPharmacies = allPharmacies.filter((pharmacy: Pharmacy) => pharmacy.workStatus === true);
      const newLocations = openPharmacies.map((pharmacy: Pharmacy) => {
        // console.log(pharmacy.location.coordinates[0], pharmacy.location.coordinates[1])
        return {
          lat: pharmacy.location.coordinates[0],
          lng: pharmacy.location.coordinates[1],
        };
      });
      setLocations(newLocations);
       setPharmacies(openPharmacies);
     }
  }, [option])

  // selected marker
  useEffect(() => {
    selectMarker();
   }, [selectedPosition])

  // in case back set locations
  useEffect(() => {
    if (!onePharmacy) {
      const newLocations = pharmacies.map((pharmacy: Pharmacy) => {
       return {lat: pharmacy.location.coordinates[0],lng: pharmacy.location.coordinates[1],};
     });
     setLocations(newLocations);
    }
  }, [onePharmacy])

  // down the card
  const cardMove = () => {
    setIsCardDown(!isCardDown);
  }

  
if (!isLoaded) return <p className='mt-[100px]'>Loading</p>;
  
  
  return (
    //  <div className="w-full mt-80 relative overflow-hidden" style={{ backgroundImage: `url(${map})`, backgroundPosition:'center' , backgroundSize:'cover', minHeight: 'calc(100vh - 80px)'}}> 
      <div className="w-full mt-80 relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)'}}>
         <GoogleMap
           mapContainerStyle={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
             center={{ lat:36.153200, lng:5.407970}}
             zoom={13}
       >
         {locations.map((location, index) => (
           <Marker key={index} position={location} onClick={()=> choosenByMarker(location)}/>
        ))}
      </GoogleMap> 
      

      <div className={`card pt-[18px] flex flex-col items-center px-[18px] border-1 border-mainGreen bg-white absolute bottom-0 left-[50%] translate-x-[-50%] rounded-tr-20 rounded-tl-20 ${isCardDown ? `translate-y-[470px]` : ''}`} style={{ width: 'calc(100% - 30px)' }}>
        <button className='move border-2 w-[50px] border-darkGreen' onClick={cardMove}></button>
      <p className='w-full mt-2 font-medium text-mainWritingGrey pl-[20px] text-[20px]'>Pharmacies</p>
        <div className="buttoms">
          <AllOpenButtoms option={option} setOption={setOption} open={getOpenPharmacies} all={getAllPharmacies} />
        </div>  
        <div className="pharmacies w-full mt-[38px] mb-2 rounded-10 max-h-[380px] overflow-auto">
              <PharmaciesList pharmaciees={pharmacies} setOnePharmacy={setOnePharmacy} />
        </div> {/* pharmacies */}
     </div> {/* card */}
    </div>
  )
}

export default AllPharmaciesPage
