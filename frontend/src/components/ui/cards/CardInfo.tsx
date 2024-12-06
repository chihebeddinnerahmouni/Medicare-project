interface Item {
  id: number;
  name: string;
  image: string;
  experience: number;
  address: string;
  specialite: string;
}

interface CardInfoProps {
  item: Item;
  type: string;
}

const CardInfo = ({ item, type }: CardInfoProps) => {
  return (
    <>
            <div
              className="border-[1px] rounded-lg p-3 flex flex-col cursor-pointer relative shadow-md transition-all ease-in-out duration-200
              hover:border-primary hover:shadow-sm"
            >
              {item.specialite && (
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 rounded-br-lg">
                  {item.specialite}
                </div>
              )}
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
                  <h2 className="font-bold xl:text-lg">
                    {type === "nurses" && "Nr. "}
                    {type === "doctors" && "Dr. "}
                    {item.name}
                  </h2>
                  <h2 className="text-primary text-sm">
                    {item.experience} Years of Experience
                  </h2>
                  <h2 className="text-gray-500 text-sm ">{item.address}</h2>
                </div>
              </div>
            </div>
        
    </>
  );
};

export default CardInfo;
