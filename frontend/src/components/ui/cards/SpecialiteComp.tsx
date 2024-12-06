import React from "react";

interface ShipTypeCompProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
  selected: number;
setSelected: (value: number) => void;
}

const SpecialiteComp: React.FC<ShipTypeCompProps> = ({
  item,
  selected,
  setSelected,
}) => {
  return (
    <div
      className={`flex pb-2 flex-col items-center justify-center gap-1 cursor-pointer lg:gap-2 ${
        selected !== item.id && "opacity-40"
      }`}
      onClick={() => setSelected(item.id)}
    >
      <img
        src={item.image}
        className="w-[25px] h-[25px] object-center object-cover rounded lg:w-[30px] lg:h-[30px]"
        alt="Type"
      />
      <p
        className={`text-[12px] font-medium text-nowrap lg:text-sm ${
          selected === item.id ? "text-writingMainDark" : "text-writingGrey"
        }`}
      >
        {item.name}
      </p>
    </div>
  );
};

export default SpecialiteComp;
