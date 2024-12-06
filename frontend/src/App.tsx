import Footer from "./components/ui/Footer";
import "./App.css";
import 'ldrs/cardio'
import { Navigate, Outlet } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Navbar from "./components/ui/Navbar";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-cardio": any; 
    }
  }
}

function App() {
  const { isAuthenticated,  isLoading } = useKindeAuth();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-cardio
          size={"100px"}
          stroke={"5px"}
          color={"#199B8A"}
          transforme
        ></l-cardio>
      </div>
    );
  }
  else if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }
}


export default App;
