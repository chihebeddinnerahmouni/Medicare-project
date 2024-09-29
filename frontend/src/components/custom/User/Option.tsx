
const Option = ({ text, setReason, reason }: any) => {
    
    const checkbox = () => {
       setReason(!reason)
   }

    return (
<>
    <label className="flex gap-3">
          <input type="checkbox" onChange={checkbox}/>
          <span className={`reasontext ${reason ? 'text-mainGreen' : 'text-secondaryWritingGrey' } font-medium`}>{text}</span>
    </label>  
</>
  )
}

export default Option
