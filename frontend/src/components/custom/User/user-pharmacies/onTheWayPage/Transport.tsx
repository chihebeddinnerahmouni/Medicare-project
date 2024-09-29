import React from 'react'
import { MdOutlineDirectionsWalk } from "react-icons/md";
import { FaCar } from "react-icons/fa";







const Transport = ({ transport, setTransport }: any) => {
    


  return (
      <div className="flex justify-around">
          
     <button
        className={`${
          transport === "car"
            ? "text-mainWritingGrey"
            : "text-secondaryWritingGrey"
        } flex items-center justify-center w-[64px] h-[32px] rounded-10 text-[23px]`}
        style={
          transport === "car"
            ? { backgroundColor: "rgba(25, 155, 138, 0.2)" }
            : {}
        }
        onClick={() => {
          setTransport("car");
        }}
      >
        <FaCar className={``} />
      </button>


      <button
        className={`${
          transport !== "car"
            ? "text-mainWritingGrey"
            : "text-secondaryWritingGrey"
        } flex items-center justify-center w-[64px] h-[32px] rounded-10 text-[23px]`}
        style={
          transport !== "car"
            ? { backgroundColor: "rgba(25, 155, 138, 0.2)" }
            : {}
        }
        onClick={() => {
          setTransport("walk");
        }}
      >
        <MdOutlineDirectionsWalk className={``} />
      </button>
     
     
     

    </div>
  );
}

export default Transport
