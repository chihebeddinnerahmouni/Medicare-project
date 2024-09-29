
function Header() {
  return (
    // <div className="w-full h-[80px] bg-slate-500 fixed top-0"></div>
    <div className="w-full h-[80px] bg-mainGreen fixed top-0 flex items-center justify-end px-6">
      <div className="bars flex flex-col gap-1">
        <div className="bar w-[40px] h-[5px] rounded-50 bg-white" ></div>
        <div className="bar w-[40px] h-[5px] rounded-50 bg-white" ></div>
        <div className="bar w-[40px] h-[5px] rounded-50 bg-white" ></div>
      </div>
    </div>
  )
}

export default Header