
import InfosComp from './InfosComp'
import Buttons from './Buttons'
import { FaPhone } from 'react-icons/fa'
import { FaDirections } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '@/user/UserRoot'
import { useContext } from 'react'


interface Pharmacy {
  name: string;
  codingAdress: string;
  workStatus: boolean;
  phone: string;
  location: any;
  doorPicture: string;
}





const PharmaciesList = ({ pharmaciees, setOnePharmacy }: any) => {

  const navigate = useNavigate();
  // const { setOnePharmacy } = useContext(UserDataContext);




  const details = (pharmacy: Pharmacy) => { setOnePharmacy(pharmacy); navigate("/user-pharmacy/one-pharmacy") }
const phone = () => { console.log("phone") }
  const direction = (pharmacy : any) => {
    console.log("direction")
    setOnePharmacy(pharmacy);
    navigate("/user-pharmacy/set-details");
    // navigate("/anaaaaa");
  }
  

  return (
  <>
     {pharmaciees.map((pharmacy: Pharmacy, index: number) => {
       return (
                  <div key={index}>
                  <div className="all flex items-center justify-between" key={index}>
                    <div className="infos inline-flex items-center justify-between" onClick={()=>details(pharmacy)}>
                      <InfosComp image={pharmacy.doorPicture} name={pharmacy.name} location={pharmacy.codingAdress} status={pharmacy.workStatus ? "ouverte" : "fermeé"} />
                    </div>
                      <div className="buttons flex gap-2 ">
                        <Buttons Icon={FaPhone} onClick={phone} />
                        <Buttons Icon={FaDirections} onClick={()=>direction(pharmacy)} />
                      </div>  
                     </div>
           {index < pharmaciees.length - 1 && <hr className="w-full border-t-1 border-secondaryWritingGrey my-2" />}
                </div>)
              })}
</>)}

export default PharmaciesList
