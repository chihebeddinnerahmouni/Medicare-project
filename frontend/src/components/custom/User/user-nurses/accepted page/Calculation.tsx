

const Calculation = ({Icon, text}: any) => {
  return (
    <div className="inline-flex items-center gap-2 px-[7px] py-2 border-1 border-mainGreen rounded-15 shadow-panelShadow">
      <Icon className="text-mainGreen text-2xl" />
      <p className="text-sm text-[#6D717A] font-medium">{text}</p>
    </div>
  );
}

export default Calculation
