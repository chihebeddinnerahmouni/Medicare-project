import express from "express";
import {
  signupPatient,
  // signupPatient,
  getPatientProfile,
  resetPassword,
  updatePatientProfile,
  updatePatientEmail,
  updatePassword,
  updatePatientProfilePicture,
  getNearbyNurses,
  resetPatient,
  rateNurse,
  // chooseNurse,
  refuseNurse,
  cancelRequest
} from "./user controllers/user-nurse-controllers";
import {
  getAllPharmacies,
  getWorkingPharmacies
} from "./user controllers/user-pharmacies-controllers";
import authGuard from "../../../../utils/authGuard";
import idAuthGuard from "../../../../utils/id-auth-guard";
// import adminAuthGuard from "../middlewear/admin-authGuard";
import upload from "../../helper functions/multer-configs-to-images";





const router = express.Router();

//signup clerk
router.post("/sign-up", signupPatient);

//signup a patient
// router.post("/signup-patient", signupPatient);

//patient profile
router.get("/profile", idAuthGuard, getPatientProfile);

//reset password
router.put("/profile/reset-password", authGuard, resetPassword);

//update profile
router.put("/profile/update-profile", authGuard, updatePatientProfile);

//update email
router.put("/profile/update-email", authGuard, updatePatientEmail);

//update password
router.put("/profile/update-password", authGuard, updatePassword);

//update profile pic
router.put("/profile/update-profile-picture",
  upload.single("PatProfPic"),
  authGuard,
  updatePatientProfilePicture
);

//look for nearby nurses
router.post("/profile/nearby-nurses", idAuthGuard, getNearbyNurses);

// cancel a nurse request
router.put("/profile/cancel-request", idAuthGuard, cancelRequest);

//reset patient
router.put("/profile/reset-patient", idAuthGuard, resetPatient);


// rate a nurse
router.put("/profile/rate-nurse", idAuthGuard, rateNurse);

//refuse accepted nurse
router.put("/profile/refuse-nurse", authGuard, refuseNurse);

//choose another nurse
// router.put("/profile/choose-nurse", authGuard, chooseNurse);



// get nearby pharmacies
router.post("/get-all-pharmacies", getAllPharmacies);

// get nearby working pharmacies
router.post("/get-working-pharmacies", getWorkingPharmacies);



module.exports = router;
