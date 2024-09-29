

const Name = ({image, firstName, lastName}: any) => {
  return (
    <div className="flex items-center gap-3 border-1 border-mainGreen px-3 py-1 rounded-50">
          <img src={image} alt="nursePic" className="w-[40px] rounded-50" />
      <span className="text-darkGreen font-semibold">{firstName} {lastName}</span>
    </div>
  )
}

export default Name
