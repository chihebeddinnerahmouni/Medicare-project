import { useNavigate } from "react-router-dom";

const Arrived = ({ name }: any) => {
    
    const navigate = useNavigate();
    const back = () => { 
        navigate("/");
    };

    return (
        <div className="w-full flex flex-col items-center">
          <button className="w-[37px] h-[37px] bg-[#D7DBE1] rounded-50 text-[23px] font-bold text-darkGreen self-end" onClick={back}>X</button>
          <p className="text-darkGreen font-medium text-[25px]">Super !</p>
          <p className="text-center text-[20px] font-medium text-secondaryWritingGrey">
            nous espérons que la pharmacie {name} vous aidera, n'oubliez pas de
            prendre soin de vous
          </p>
          <img
            src="/folded.png"
            alt="Thank you"
            className="w-[206px] mt-[57px]"
          />
    </div>);
}

export default Arrived
