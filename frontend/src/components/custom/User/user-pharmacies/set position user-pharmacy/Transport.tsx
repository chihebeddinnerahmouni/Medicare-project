import { FaCar } from "react-icons/fa";
import { MdOutlineDirectionsWalk } from "react-icons/md";




const Transport = ({
  transportType,
  setTransportType,
}: any) => {
  
console.log(transportType)

  return (
    <div className="flex items-center justify-evenly">
      <button
        className={`${
          transportType === "car"
            ? "text-mainWritingGrey"
            : "text-secondaryWritingGrey"
        } flex items-center justify-center w-[64px] h-[32px] rounded-10 text-[23px]`}
        style={
          transportType === "car"
            ? { backgroundColor: "rgba(25, 155, 138, 0.2)" }
            : {}
        }
        onClick={() => {
          setTransportType("car");
        }}
      >
        <FaCar className={``} />
      </button>

      <button
        className={`${
          transportType !== "car"
            ? "text-mainWritingGrey"
            : "text-secondaryWritingGrey"
        } flex items-center justify-center w-[64px] h-[32px] rounded-10 text-[23px]`}
        style={
          transportType !== "car"
            ? { backgroundColor: "rgba(25, 155, 138, 0.2)" }
            : {}
        }
        onClick={() => {
          setTransportType("walk");
        }}
      >
        <MdOutlineDirectionsWalk className={``} />
      </button>
    </div>
  );
};

export default Transport;
