import dotenv from "dotenv";
import patientModel from "../user-schema";
import { Request, Response, request } from "express";
import handlePasswordStrength from "../../../helper functions/check-password-strength";
import isFieldMissing from "../../../helper functions/is-missing-field";
import handleExistingUser from "../../../helper functions/check-execisting-user-phemna";
import sendinSignupEmail from "../../../helper functions/sending-Signup-email";
import crypto from "crypto";
import findByEmail from "../../../helper functions/find-by-email";
import fs from "fs";
import axios from "axios";
import {
  IDemndeNurseRaquest,
  // demandeNurseRaquestModel,
} from "../../Requests/reservations-utils";
import nurseModel from "../../nurse/nurse-schema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";


dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user: any;
      session: any;
    }
  }
}


// signup ngrok
// export const signupPatientClerk = async (req: Request, res: Response) => {
//   try {

//     const data = req.body.data;
//     const { first_name, last_name, id } = data;
//     const email = data.email_addresses[0].email_address;
//     const firstName = first_name;
//     const lastName = last_name;
//     const name = firstName + " " + lastName ;
//     const type = "patient";

    

//     const user = await patientModel.create({
//       name,
//       email,
//       type,
//       firstName,
//       lastName,
//       id,
//     });
     
//     res.json({ message: "Patient created successfully"});


//   }
//   catch (error) {
//     res
//       .status(400)
//       .json({ message: "degat mtrenjistrach marhh", error: error });
//   }
// };

//______________________________________________________________________________________


//signup
export const signupPatient = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const fields = [firstName, lastName, email, phone, password];
    const name = firstName + " " + lastName + " " + phone;
    const userID = uuidv4();
    const type = "patient";

    if (isFieldMissing(fields)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!handlePasswordStrength(res, password)) {
      return;
    }

    if (await handleExistingUser(res, email, name, phone)) {
      return;
    }

    const verificationCode = crypto.randomBytes(10).toString("hex");
    const nurse = patientModel.create({
      name,
      email,
      phone,
      password,
      type,
      firstName,
      lastName,
      verificationCode,
      userID,
    });
    sendinSignupEmail(res, email, type, name);
  } catch (error) {
    res
      .status(400)
      .json({ message: "degat mtrenjistrach marhh", error: error });
  }
};

//______________________________________________________________________________________

//get profile
export const getPatientProfile = async (req: Request, res: Response) => {
  try {
    // const id = req.user.id;
    // const user = await patientModel.findById(id);
    const userID = req.user;
    const user = await patientModel.findOne({ userID });
    if (!user) return res.status(400).send("Cannot find nurse profile");
    const resUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    res.json(user);
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//update password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { password } = req.body;
    if (!handlePasswordStrength(res, password)) return;
    const user = await patientModel.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find patient to reset password" });
    //const isMatch = await bcrypt.compare(oldPassword, user.password);
    //if (!isMatch) return res.status(201).json({ message: "your password is incorrect" });
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//update profile
export const updatePatientProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { name, email, phone } = req.body;
    const user = await patientModel.findById(id);
    if (!user)
      return res.status(400).send("Cannot find Patient to update profile");

    if (await handleExistingUser(res, email, name, phone)) return;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    await user.save();
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.send("error" + err);
  }
};

//______________________________________________________________________________________

//update email
export const updatePatientEmail = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { email, phone, name } = req.body;
    const user = await patientModel.findById(id);
    if (!user)
      return res.status(400).send("Cannot find patient to update email");

    const exdoctorexuser = await patientModel.findOne({ email });
    if (await findByEmail(res, email)) return;
    //if (await handleExistingUser(res, email, name, phone)) return;

    await sendinSignupEmail(res, email, user.type, user.name);

    user.verified = false;
    user.email = email;
    await user.save();
  } catch (err) {
    res.send("error" + err);
  }
};

//______________________________________________________________________________________

//update password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;
    const user = await patientModel.findById(id);
    if (!user)
      return res
        .status(401)
        .json({ message: "Cannot find patient to reset password" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(201).json({ message: "your password is incorrect" });
    if (!handlePasswordStrength(res, newPassword)) return;
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong", error: error });
  }
};

//______________________________________________________________________________________

//update profile picture
export const updatePatientProfilePicture = async (
  req: Request,
  res: Response
) => {
  const user = await patientModel.findById(req.user.id);
  if (!user) return res.status(404).json({ message: `User not found` });

  if (user.profilePicture) {
    fs.unlink(user.profilePicture, (err) => {
      if (err)
        console.error(
          `Failed to delete old picture at ${user.profilePicture}: `,
          err
        );
    });
  }

  user.profilePicture = req.file!.path;
  await user.save();
  res
    .status(200)
    .json({ message: `profilePicture updated successfully`, file: req.file! });
};

//_____________________________________________________________________________________

//get neaby nurses
export const getNearbyNurses = async (req: Request, res: Response) => {
  try {
    const mapkey = process.env.MAP_API_KEY;

    const { userLocation, service, subService } = req.body;

    const userID = req.user;
    const user = await patientModel.findOne({ userID });
    if (!user)
      return res.status(400).send("Cannot find patient to get nearby nurses");
    const fields = [userLocation, service, subService];
    if (isFieldMissing(fields))
      return res.status(400).send("All fields are required");

    user.location.coordinates = userLocation;

    if (user.patientStatus === "pending")
      return res
        .status(400)
        .json({
          message: `You already sent a request, thank you ${user.name}`,
        });

    //get nearby nurses
    const nearbyNurses = await nurseModel.find({
      workStatus: "free",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userLocation,
          },
          $maxDistance: 15000,
        },
      },
    });

    let nurseList: {   //declaration
      nurseName: string;
      nurseFirstName: string;
      nurseLastName: string;
      nurseRate: number;
      nurseLikes: number;
      nurseSpecialite: string;
      patientClients: number;
      price: number;
    }[] = [];
    let nurseListNames: string[] = []; //declaration
    let pricee = 499; // only for test...price will be calculated based on many dependencies

    for (let nurse of nearbyNurses) {
      pricee = pricee + 1;

      const nurseInfos = {  // tndz f response lluser hado homa li lginahm
        nurseName: nurse.name,
        nurseFirstName: nurse.firstName,
        nurseLastName: nurse.lastName,
        nurseRate: nurse.averageRating,
        nurseLikes: 80, // only for test...
        nurseSpecialite: nurse.specialite,
        patientClients: nurse.patientClients,
        price: pricee, // only for test...
      };
      nurseListNames.push(nurse.name);
      nurseList.push(nurseInfos);
      nurse.workStatus = "pending";
    }

    for (let nurse of nearbyNurses) {

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${userLocation[0]},${userLocation[1]}&destinations=${nurse.location.coordinates[0]},${nurse.location.coordinates[1]}&mode=driving&key=${mapkey}`
      );

      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      const request: IDemndeNurseRaquest = {  // tndz nurse document 
        firstName: user.firstName,
        lastName: user.lastName,
        patient: user.name,
        phone: user.phone,
        status: "pending",
        nursesRequested: nurseListNames,
        price: 500, // only for test...
        service: service,
        subService: subService,
        patientRate: user.averageRating,
        distance: distance,
        choosen: false,
        userPatient: 10, // only for test...
        time: duration,  
        location: {
          type: "Point",
          coordinates: userLocation,
        },
      };

      nurse.patientRequests.push(request);
      await nurse.save();
    }
    if (nurseList.length === 0)
      return res.status(250).json({ message: "Cannot find nearby nurses" });

    const UserRequest = {  // tji f user document
      patient: user.name,
      status: "pending",
      nursesRequested: nurseList,
      price: 500, //
      service: service,
      subService: subService,
      serviceNurse: "",
    };
    user.patientStatus = "pending";
    user.nurseRequest = UserRequest;
    await user.save();

    const requestData = {  // tndz f response + tndz ll nurse mb3d
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      patients: 10, // only for test... gdah man mra mrodh
      service: service,
      subService: subService,
      // distance: 2.6, only for test...
      // price: 500, only for test...
      patient: user.name,
      patientRate: user.averageRating,
      location: userLocation,
      phone: user.phone,
      // time: "25 min",  only for test
    };

    return res
      .status(200)
      .json({
        message: `thank you ${user.name}`,
        nurseList,
        requestData,
        nurseListNames,
      });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "degat Cannot get nearby nurses: ", error: error });
  }
};

//_____________________________________________________________________________________

//cancel request
export const cancelRequest = async (req: Request, res: Response) => { 
  try {
    const userID = req.user;
    const { nurseName } = req.body;

    const user = await patientModel.findOne({ userID });
    if (!user) return res.status(400).json({ message: "Cannot find patient to cancel request" });
    // const nurse = await nurseModel.findOne({ name: nurseName });
    // if (!nurse) return res.status(400).json({ message: "Cannot find nurse to cancel request" });

    user.patientStatus = false;
    user.nurseRequest = {};
    user.canceledNurse = user.canceledNurse + 1;
    // nurse.workStatus = "free";
    // nurse.patientRequests = [];
    await user.save();
    // await nurse.save();
    res.status(200).json({ message: `You cancelled ${nurseName}` });



  } catch (error) { 
    res.status(400).json({ message: "degat err cancelling request", error: error });
  }
}

//_____________________________________________________________________________________

//reset patient
export const resetPatient = async (req: Request, res: Response) => {
  try {
    const userID = req.user;
    const user = await patientModel.findOne({ userID });
    if (!user) return res.status(400).send("Cannot find patient to reset");
    user.patientStatus = false;
    user.nurseRequest = {};
    await user.save();
    res.json({ message: `Thank you ${user.name}, reseted successfully` });
  } catch (error) {
    res.status(405).send("Error occurred: " + error);
  }
};



//_____________________________________________________________________________________

// rate a nurse
export const rateNurse = async (req: Request, res: Response) => {
  try {
    const userID = req.user;
    const { rating, comment, nurseName, matchAgain } = req.body;


    const nurse = await nurseModel.findOne({ name: nurseName });
    if (!nurse) return res.status(400).json({ message: "Cannot find nurse to rate" });
    const user = await patientModel.findOne({ userID });
    if (!user) return res.status(400).json({ message: "Cannot find patient to rate" });

    if (!matchAgain) {
     if (!user.blacklist.includes(nurseName)) {
       user.blacklist.push(nurseName);
     }
    }

    if (rating !== 0) {
      const oldRatingNumber = nurse.ratingNumber;
      const oldRatingSum = nurse.ratingSum;
      const newRatingNumber = oldRatingNumber + 1;
      const newRatingSum = oldRatingSum + rating;
      const newAverageRating = (newRatingSum / newRatingNumber).toFixed(1);
      nurse.ratingNumber = newRatingNumber;
      nurse.ratingSum = newRatingSum;
      nurse.averageRating = Number(newAverageRating);
    }

    if (comment !== "") {
      const commentInNurse = {
        from: user.firstName + " " + user.lastName,
        comment: comment,
        name: user.name,
      };
      const commentInUser = {
        comment: comment,
        to: nurse.firstName + " " + nurse.lastName,
        name: nurseName,
      }

      nurse.patientComments.push(commentInNurse);
      user.comments.push(commentInUser);
      await nurse.save();
      await user.save();
    }
    res
      .status(200)
      .json({ message: `You rated ${nurseName} with ${rating} stars` });
  } catch (error) {
    res.status(400).json({ message: "Error rating nurse", error: error });
  }
};

//_____________________________________________________________________________________

//refuse a nurse
export const refuseNurse = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const user = await patientModel.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find patient to refuse nurse" });
    const nurseName = user.nurseRequest.serviceNurse;
    const nurse = await nurseModel.findOne({ name: nurseName });
    if (!nurse)
      return res.status(400).json({ message: "Cannot find nurse to refuse" });

    user.patientStatus = false;
    user.nurseRequest = {};
    nurse.workStatus = "free";
    nurse.patientRequests = [];
    await user.save();
    await nurse.save();
    res.status(200).json({ message: `You refused ${nurseName}` });
  } catch (error) {
    res
      .status(400)
      .json({ message: "degat Error refusing nurse", error: error });
  }
};

//_____________________________________________________________________________________

//choose a nurse
// export const chooseNurse = async (req: Request, res: Response) => {
//   try {
//     const id = req.user.id;
//     const { nurseName, service, subService, userLocation } = req.body;

//     const fields = [nurseName, service, subService, userLocation];
//     if (isFieldMissing(fields))
//       return res.status(400).json({ message: "All fields are required" });
//     const user = await patientModel.findById(id);
//     if (!user)
//       return res
//         .status(400)
//         .json({ message: "Cannot find patient to choose nurse" });
//     const nurse = await nurseModel.findOne({ name: nurseName });
//     if (!nurse)
//       return res.status(400).json({ message: "Cannot find nurse to choose" });

//     if (nurse.workStatus !== "free")
//       return res
//         .status(201)
//         .json({
//           message: `${nurse.name} is not available any more, please choose another one`,
//         });

//     const request: IDemndeNurseRaquest = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       patient: user.name,
//       nurse: nurseName,
//       status: "pending",
//       nursesRequested: [nurseName],
//       price: 500, //
//       service: service,
//       subService: subService,
//       patientRate: user.averageRating,
//       distance: 2.6, //
//       choosen: true,
//       location: {
//         type: "Point",
//         coordinates: userLocation,
//       },
//     };
//     nurse.patientRequests.push(request);
//     nurse.workStatus = "pending";

//     const UserRequest = {
//       patient: user.name,
//       status: "pending",
//       nursesRequested: [
//         {
//           nurseName: nurseName,
//           nurseRate: nurse.averageRating,
//           nurseLikes: 80, //
//           nurseSpecialite: nurse.specialite,
//           patientClients: 90, //
//         },
//       ],
//       price: 500, //
//       service: service,
//       subService: subService,
//       serviceNurse: "",
//     };
//     user.patientStatus = "pending";
//     user.nurseRequest = UserRequest;
//     await user.save();
//     await nurse.save();
//     res
//       .status(200)
//       .json({
//         message: `Request sent to ${nurseName} successfully, please wait for him to accept`,
//       });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error degat choosing nurse", error: error });
//   }
// };
