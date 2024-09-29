import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import LandingPage from "./all/LandingPage.tsx";
//user
import UserRoot from "./user/UserRoot.tsx";
import SetReqDetailsPage from "./user/user-nurses/SetReqDetailsPage.tsx";
import AcceptedPage from "./user/user-nurses/AcceptedPage.tsx";
import CancelPage from "./user/user-nurses/CancelPage.tsx";
import RatePage from "./user/user-nurses/RatePage.tsx";
import SignalPage from "./user/user-nurses/SignalPage.tsx";
import WaitToBeAccepted from "./user/user-nurses/WaitToBeAccepted.tsx";
import AllPharmaciesPage from "./user/user-parmacies/AllPharmaciesPage.tsx";
import SetPositionPage from "./user/user-parmacies/SetPositionPage.tsx";
import OnePharmacyPage from "./user/user-parmacies/OnePharmacyPage.tsx";
import TestPage from "./user/testPage.tsx";
import ResultPage from "./user/user-nurses/ResultPage.tsx";
import CanceledByNurse from "./user/user-nurses/CanceledByNurse.tsx";
import OnTheWay from "./user/user-parmacies/OnTheWay.tsx";
import Arrived from "./user/user-parmacies/Arrived.tsx";


//nurse
import NurseRoot from "./nurse/NurseRoot.tsx";
import NurseInActive from "./nurse/WorkStatusPage.tsx";
import NurseAccepted from "./nurse/NurseAccepted.tsx";
import NurseRatePage from "./nurse/NurseRatePage.tsx";
import NurseCancelPage from "./nurse/NurseCancelPage.tsx";
import CanceledByUser from "./nurse/Canceled-by-user.tsx";
import SignalePage from "./nurse/SignalePage.tsx";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      //users
      { path: "/user-nurse/set-details", element: <UserRoot> <SetReqDetailsPage /> </UserRoot>},
      { path: "/user-nurse/result", element: <UserRoot> <ResultPage /> </UserRoot>},
      { path: "/user-nurse/waiting", element: <UserRoot> <WaitToBeAccepted /> </UserRoot>},
      { path: "/user-nurse/accepted", element: <UserRoot> <AcceptedPage /> </UserRoot>},
      { path: "/user-nurse/cancel", element: <UserRoot> <CancelPage/></UserRoot> },
      { path: "/user-nurse/rating", element: <UserRoot><RatePage /></UserRoot> },
      { path: "/user-nurse/signal", element: <UserRoot><SignalPage /></UserRoot> },
      { path: "/user-nurse/canceled-by-nurse", element: <UserRoot><CanceledByNurse /></UserRoot> },
      { path: "/user-pharmacy/all-pharmacies", element: <UserRoot><AllPharmaciesPage /></UserRoot> },
      { path: "/user-pharmacy/one-pharmacy", element: <UserRoot><OnePharmacyPage /></UserRoot> },
      { path: "/user-pharmacy/set-details", element: <UserRoot><SetPositionPage /></UserRoot> },
      { path: "/user-pharmacy/show-directions", element: <UserRoot><OnTheWay /></UserRoot> },
      { path: "/user-pharmacy/arrived", element: <UserRoot><Arrived /></UserRoot> },

      
      //nurses
      // { path: "/nurse-profile", element:<NurseRoot><RatePage /></NurseRoot>  },
      { path: "/nurse-waiting", element:<NurseRoot><NurseInActive /></NurseRoot>  },
      { path: "/nurse-accepted", element:<NurseRoot><NurseAccepted /></NurseRoot>  },
      { path: "/nurse-feedback", element: <NurseRoot><NurseRatePage /></NurseRoot> },
      { path: "/nurse-cancel", element: <NurseRoot><NurseCancelPage /></NurseRoot> },
      { path: "/nurse-canceled-by-patient", element: <NurseRoot><CanceledByUser /></NurseRoot> },
      { path: "/nurse-signale", element: <NurseRoot><SignalePage /></NurseRoot> },
    ],
    
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);

// const frontendHost = "http://localhost:5173";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <KindeProvider
    // clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
    clientId="e031f86a2df74dc0a431f158698e0a4d"
    // domain={import.meta.env.VITE_KINDE_DOMAIN}
    domain="https://medicareapp.kinde.com"
    // redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
    redirectUri="http://localhost:5173"
    // redirectUri="https://ec24-105-103-0-120.ngrok-free.app/user-pharmacy/all-pharmacies"
    logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
  >
    <RouterProvider router={router} />
  </KindeProvider>
);
