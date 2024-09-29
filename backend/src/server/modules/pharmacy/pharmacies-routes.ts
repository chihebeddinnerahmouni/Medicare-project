import express from "express";
import {
  createPharmacy,
  getAllPharmacies,
  login,
  toOnline,
  toOffline,
  updateLocation,
  updateDoorPicture,
//   geocodeLocation,
} from "./pharmacies-controllers";
import idAuthGuard from "../../../../utils/id-auth-guard";
import upload from "../../helper functions/multer-configs-to-images";


const router = express.Router();

// sign up
router.post('/sign-up', createPharmacy);

// get all pharmacies
router.get('/all', getAllPharmacies);

// login
router.post('/login', login);

// go online
router.post('/to-online', idAuthGuard, toOnline);

// go offline
router.post('/to-offline', idAuthGuard, toOffline);

// update location
router.put('/update-location', idAuthGuard, updateLocation);

// update door picture
router.put('/update-door-picture', idAuthGuard, upload.single('doorPic'), updateDoorPicture);

// geocode all
// router.get("/geocode-all", geocodeLocation);


module.exports = router;