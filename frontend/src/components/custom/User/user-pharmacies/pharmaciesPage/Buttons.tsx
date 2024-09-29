

const Buttons = ({Icon, onClick}: any) => {
  return (
    <button className="w-[42px] h-[42px] rounded-50 border-1 border-mainGreen flex items-center justify-center text-[18px]" onClick={onClick}>
      <Icon className="text-mainGreen" />
    </button>
  )
}

export default Buttons
