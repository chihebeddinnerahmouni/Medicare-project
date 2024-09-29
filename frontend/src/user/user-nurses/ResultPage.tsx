import { UserDataContext } from "../UserRoot"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import WaitToBeAccepted from "./WaitToBeAccepted"



const ResultPage = () => {

    const navigate = useNavigate()
    const { resultStatus } = useContext(UserDataContext);


    if (resultStatus === 0) return <div className="mt-80">loading...</div>
    if (resultStatus === 200) return <WaitToBeAccepted />
    if (resultStatus === 250) return <div className="mt-80">no nurse found</div>


  return (
    <div>
      
    </div>
  )
}

export default ResultPage
