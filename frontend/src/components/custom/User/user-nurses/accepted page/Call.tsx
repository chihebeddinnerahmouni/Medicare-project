import { FiPhone } from "react-icons/fi";

const Call = ({ firstName, lastName, phone }: {firstName: string, lastName:string, phone:number}) => {
  return (
    <div className="flex w-full items-center gap-[15px] justify-center">
      <div className="button p-4 flex justify-center items-center rounded-50" style={{ backgroundColor: 'rgba(25, 155, 138, 0.1)' }}>
        <button>
          <FiPhone className="text-mainGreen text-[32px]" />
        </button>
      </div>   
      <p className="text-mainWritingGrey font-semibold">Appelez {firstName} {lastName}</p>
    </div>
  );
};

export default Call;
