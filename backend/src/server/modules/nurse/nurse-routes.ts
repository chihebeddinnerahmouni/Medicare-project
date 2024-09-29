import express from "express";
import {
  signupNurse,
  getAllNurses,
  deleteNurse,
  getNurseProfile,
  updatePassword,
  updateNurseProfile,
  updateNurseEmail,
  updateNurseProfilePicture,
  statusToWork,
  refusePatientRequests,
  acceptPatientRequests,
  serviceEnd,
  getRequest,
  statusToNotWork,
  ratePatient,
  resetNurse,
  cancelRequest,
} from "../nurse/nurse-controllers";
import authGuard from "../../../../utils/authGuard";
import idAuthGuard from "../../../../utils/id-auth-guard";
import upload from "../../helper functions/multer-configs-to-images";

const router = express.Router();

//signup
router.post("/signup-nurse",  signupNurse);

//get all nurses
router.get("/", getAllNurses);

//delete a nurse
router.delete("/delete", deleteNurse);

//nurse profile
router.get("/profile", idAuthGuard, getNurseProfile);

//update password
router.put("/profile/update-password", authGuard, updatePassword);

//update profile
router.put("/profile/update-profile", authGuard, updateNurseProfile);

//update email
router.put("/profile/update-email", authGuard, updateNurseEmail);

//update profile pic
router.put(
  "/profile/update-profile-picture",
  upload.single("NurProfPic"),
  authGuard,
  updateNurseProfilePicture
);

//change on work status
router.put("/profile/change-work-status", idAuthGuard, statusToWork);

//change status to not working
router.put("/profile/change-not-working", idAuthGuard, statusToNotWork);

//delete a patient request
router.put("/profile/refuse-request", idAuthGuard, refusePatientRequests);

//accept a patient request
router.put("/profile/accept-request", idAuthGuard, acceptPatientRequests);

//cancel a patient request
router.put("/profile/cancel-request", idAuthGuard, cancelRequest); 

// finish the nurse service
router.put("/profile/service-end", idAuthGuard, serviceEnd);

// get request
router.get("/profile/get-request", idAuthGuard, getRequest);

//rate a patient
router.put("/profile/rate-patient", idAuthGuard, ratePatient);

//reset nurse
router.put("/profile/reset-nurse", idAuthGuard, resetNurse);

module.exports = router;
