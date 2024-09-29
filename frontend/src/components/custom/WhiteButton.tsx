

const WhiteButton = ({text, onClick}: any) => {
  return (
    <button className="w-full h-[54px] rounded-15 shadow-hardShadow text-mainGreen text-[18px] font-medium border-1 border-mainGreen" onClick={onClick}>
      {text}
    </button>
  )
}

export default WhiteButton;

