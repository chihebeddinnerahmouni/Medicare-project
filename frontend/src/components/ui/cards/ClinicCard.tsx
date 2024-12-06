// import { Link } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  image: string;
  phone: string;
  address: string;
}

interface CardInfoProps {
  list: Item[];
}

const ClinicCard = ({ list }: CardInfoProps) => {
  return (
    <>
      {list.length > 0
        ? list.map((item, index) => (
            <div
              className="border-[1px] rounded-lg p-3 flex flex-col cursor-pointer relative shadow-md transition-all ease-in-out duration-200
              hover:border-primary hover:shadow-sm"
              key={index}
            >
              <img
                src={item.image}
                alt="image"
                className="h-[150px] w-full object-cover rounded-lg xl:h-[200px]"
              />
              <div className="mt-3 flex-grow flex flex-col justify-between xl:mt-5">
                <div className="top items-baseline flex flex-col gap-1.5 xl:gap-2">
                  <h2 className="text-[10px] bg-blue-100 p-1 rounded-full w-full text-primary ellipsesCss xl:px-2 xl:text-xs">
                    {item.address}
                  </h2>
                  <h2 className="font-bold xl:text-lg">{item.name}</h2>
                  <h2 className="text-gray-500 text-sm">
                    {item.phone}
                  </h2>
                  <h2 className="text-gray-500 text-sm ">{item.address}</h2>
                </div>
                {/* end of top */}
                {/* <Link to={"/details/" + item.id} className="w-full mt-3 xl:mt-5">
                  <h2
                    className="p-2 px-3 border-[1px] border-primary
                        text-primary rounded-full w-full text-center
                        text-[11px] mt-2
                        cursor-pointer 
                        hover:bg-primary hover:text-white"
                  >
                    Book Now
                  </h2>
                </Link> */}
              </div>
            </div>
          ))
        : [1, 2, 3, 4, 5, 6].map((index) => (
            <div
              className="h-[220px] bg-slate-200 
            w-full rounded-lg animate-pulse"
              key={index}
            />
          ))}
    </>
  );
};

export default ClinicCard;
