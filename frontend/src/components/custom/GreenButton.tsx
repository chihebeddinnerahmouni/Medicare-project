

const GreenButton = ({text, onClick}: any) => {
  return (
    <button className="w-full bg-mainGreen h-[54px] rounded-15 shadow-hardShadow text-white text-[18px] font-medium" onClick={onClick}>
      {text}
    </button>
  )
}

export default GreenButton
