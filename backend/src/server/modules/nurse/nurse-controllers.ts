import { Request, Response } from "express";
import nurseModel from "../nurse/nurse-schema";
import patientModel from "../user/user-schema";
import dotenv from "dotenv";
import crypto from "crypto";
import handlePasswordStrength from "../../helper functions/check-password-strength";
import isFieldMissing from "../../helper functions/is-missing-field";
import handleExistingUser from "../../helper functions/check-execisting-user-phemna";
import sendinSignupEmail from "../../helper functions/sending-Signup-email";
import findByEmail from "../../helper functions/find-by-email";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";


dotenv.config();


declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}



// Signup nurse
export const signupNurse = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, specialite, password, sex } =
      req.body;
    const fields = [
      firstName,
      lastName,
      email,
      phone,
      specialite,
      password,
      sex,
    ];
    const type = "nurse";
    const nurseID = uuidv4();

    if (isFieldMissing(fields)) {
      return res.status(400).send("All fields are required");
    }

      const name = firstName + " " + lastName + " " + phone;

    if (!handlePasswordStrength(res, password)) {
      return;
    }

    if (await handleExistingUser(res, email, name, phone)) {
      return;
    }

    const verificationCode = crypto.randomBytes(10).toString("hex");
    const profilePicture =
      "C:\\Users\\Administrator\\Desktop\\backend\\src\\images\\default\\anonymous.png";
    const nurse = nurseModel.create({
      firstName,
      lastName,
      name,
      email,
      phone,
      specialite,
      password,
      type,
      verificationCode,
      profilePicture,
      sex,
      nurseID,
    });

    sendinSignupEmail(res, email, type, name);
  } catch (error) {
    res
      .status(400)
      .json({ message: "degat mtrenjistrach marhh", error: error });
  }
};

//______________________________________________________________________________________

//get all nurses
export const getAllNurses = async (req: Request, res: Response) => {
  try {
    const nurses = await nurseModel.find();
    res.status(200).json(nurses);
  } catch (error) {
    res.status(400).json({ message: "Error getting all nurses", error: error });
  }
};

//______________________________________________________________________________________

//delete a nurse
export const deleteNurse = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const nurse = await nurseModel.findOneAndDelete({ name });
    if (!nurse) return res.status(404).send("Cannot find nurse to delete");
    res.status(200).send("cbn merci");
  } catch (error) {
    res.status(400).json({ message: "Error deleting nurse", error: error });
  }
};

//______________________________________________________________________________________

//get profile
export const getNurseProfile = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res.status(400).json({ message: "Cannot find nurse profile" });
    const resUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      specialite: user.specialite,
    };
    res.json(user);
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//update password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { password } = req.body;
    if (!handlePasswordStrength(res, password)) return;
    const user = await nurseModel.findById(id);
    if (!user)
      return res.status(400).send("Cannot find nurse to reset password");
    user.password = password;
    await user.save();
    res.json({ message: "Password updated" });
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//update profile
export const updateNurseProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const field = req.body;
    const { email } = req.body;
    let name: any;
    let phone: any;
    const user = await nurseModel.findById(id);
    if (!user)
      return res.status(400).send("Cannot find doctor to update profile");

    if (await handleExistingUser(res, email, name, phone)) return;

    updateUserFields(user, field);

    await user.save();
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.send("error" + err);
  }
};
const updateUserFields = (user: any, fields: any) => {
  // teb3a l update profile
  const { name, email, phone, location, specialite } = fields;
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (location) user.location = location;
  if (specialite) user.specialite = specialite;
};

//______________________________________________________________________________________

//update email
export const updateNurseEmail = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { email, phone, name } = req.body;
    const user = await nurseModel.findById(id);
    if (!user) return res.status(400).send("Cannot find nurse to update email");

    const exdoctorexuser = await nurseModel.findOne({ email });
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

//update profile picture
export const updateNurseProfilePicture = async (
  req: Request,
  res: Response
) => {
  const user = await nurseModel.findById(req.user.id);
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

//______________________________________________________________________________________

export const searchPatient = async (req: Request, res: Response) => {
  try {
    const { name } = req.query; // Get the search query from the request
    const doctors = await patientModel.find({
      name: { $regex: `^${name}`, $options: "i" },
    });
    if (doctors.length === 0)
      return res.status(404).json({ message: "No doctor found" });
    return res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while searching for doctors",
        error: error,
      });
  }
};

//______________________________________________________________________________________

//change status to work using geoJson
export const statusToWork = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const { location } = req.body;
    if (!location)
      return res.status(400).json({ message: "Location is required" });
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to change status to work" });

    user.workStatus = "free";
    user.location = {
      type: "Point",
      coordinates: location,
    };
    await user.save();

    res.json({ message: `Status changed to work, thank you ${user.name}` });
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//delete a patient request
export const refusePatientRequests = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to delete a request" });
    const choosen = user.patientRequests[0].choosen;

    if (!choosen) {
      user.patientRequests = [];
      user.workStatus = "free";
      await user.save();
      return res
        .status(200)
        .json({ message: `Patient request deleted, thank you ${user.name}` });
    } else {
      const patientName = user.patientRequests[0].patient;
      const patient = await patientModel.findOne({ name: patientName });
      if (!patient)
        return res.status(400).json({ message: "Cannot find patient" });
      patient.patientStatus = false;
      patient.nurseRequest = {};
      user.patientRequests = [];
      user.workStatus = "free";
      await user.save();
      await patient.save();
      return res
        .status(200)
        .json({
          message: `${patient.name} request deleted after he chooses youuu!, thank you ${user.name}`,
        });
    }
  } catch (error) {
    res.send("error degat" + error);
  }
};

//______________________________________________________________________________________

//accept a patient request
export const acceptPatientRequests = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to accept a request" });
    const patientName = user.patientRequests[0].patient;
    const patient = await patientModel.findOne({ name: patientName });
    if (!patient)
      return res.status(400).json({ message: "Cannot find patient" });

    const nursesList = user.patientRequests[0].nursesRequested;

    for (let nur of nursesList) {
      if (nur === user.name) continue;
      const nurse = await nurseModel.findOne({ name: nur });
      if (!nurse)
        return res.status(400).json({ message: `Cannot find ${nur}` });
      if (
        nurse.workStatus === "pending" &&
        nurse.patientRequests[0].patient !== patientName
      )
        continue;
      nurse!.patientRequests = [];
      nurse!.workStatus = "free";
      await nurse!.save();
    }
    user.patientRequests[0].status = "accepted";
    user.workStatus = "busy";
    patient.patientStatus = true;
    patient.requestTo = [];
    patient.nurseRequest.serviceNurse = user.name;
    patient.nurseRequest.status = "accepted";
    patient.markModified("nurseRequest");
    await user.save();
    await patient.save();
    res.json({
      message: `you accept the request of ${patientName}, thank you ${
        user!.name
      }`,
    });
  } catch (error) {
    res.json({ message: "error degat " + error });
  }
};

//______________________________________________________________________________________

//cancel a patient request
export const cancelRequest = async (req: Request, res: Response) => { 
  try {
    const nurseID = req.user;
    const { patientName } = req.body;

    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to cancel a request" });
    // const patient = await patientModel.findOne({ name: patientName });
    // if (!patient)
    //   return res.status(400).json({ message: "Cannot find patient" });

    user.patientRequests = [];
    user.workStatus = "free";
    user.canceledRequests += 1;
    // patient.patientStatus = false;
    // patient.nurseRequest = {};
    await user.save();
    // await patient.save();
    res.json({
      message: `you cancel the request of ${patientName}, thank you ${
        user.name
      }`,
    });
  } catch (error) {
    res.json({ message: "error degat", error: error });
  }
}

//______________________________________________________________________________________

//finish the nurse
export const serviceEnd = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to finish the service" });
    const patientName = user.patientRequests[0].patient;
    const patient = await patientModel.findOne({ name: patientName });
    if (!patient)
      return res.status(400).json({ message: "Cannot find patient" });

    user.patientRequests = [];
    user.workStatus = "free";
    user.patientClients += 1;
    patient.patientStatus = false;
    patient.nurseRequest = {};
    patient.patientTimes += 1;
    await user.save();
    await patient.save();
    res.json({
      message: `Service ended with ${patientName}, thank you ${user.name}`,
    });
  } catch (error) {
    res.json({ message: "error degat", error: error });
  }
};

//______________________________________________________________________________________

//get request
export const getRequest = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to get request" });
    const request = user.patientRequests;
    res.status(200).send(request);
  } catch (error) {
    res.status(400).json({ message: "error degat", error: error });
  }
};

//______________________________________________________________________________________

//change status to not working
export const statusToNotWork = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to change status to not work" });
    user.workStatus = "off";
    await user.save();
    res.json({ message: `now u r out, thank you ${user.name}` });
  } catch (error) {
    res.status(400).json({ message: "error degat", error });
  }
};

//______________________________________________________________________________________

//rate a patient
export const ratePatient = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const { rating, patientName, comment, matchAgain } = req.body;

    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res
        .status(400)
        .json({ message: "Cannot find nurse to rate a patient" });
    const patient = await patientModel.findOne({ name: patientName });
    if (!patient)
      return res.status(400).json({ message: "Cannot find patient" });

    if (!matchAgain) {
      if (!user.blackList.includes(patientName)) {
        user.blackList.push(patientName);
      }
    }
    
    if (rating !== 0) {
      const oldRatingNumber = patient.ratingNumber;
      const oldRatingSum = patient.ratingSum;
      const newRatingNumber = oldRatingNumber + 1;
      const newRatingSum = oldRatingSum + rating;
      const newAverageRating = (newRatingSum / newRatingNumber).toFixed(1);
      patient.ratingNumber = newRatingNumber;
      patient.ratingSum = newRatingSum;
      patient.averageRating = Number(newAverageRating);
      await patient.save();
    }

    if (comment !== "") {
      const commentInNurse = {
        to: patient.firstName + " " + patient.lastName,
        comment: comment,
        patientName: patientName,
      };
      user.patientComments.push(commentInNurse);

      const commentInPatient = {
        from: user.firstName + " " + user.lastName,
        comment: comment,
        nurseName: user.name,
      }
      patient.comments.push(commentInPatient);

      await user.save();
      await patient.save();
    }

    res
      .status(200)
      .json({
        message: `Patient ${patientName} rated successfully, thank you ${user.name}`,
      });
  } catch (error) {
    res.status(400).json({ message: "error degat", error: error });
  }
};

//______________________________________________________________________________________

//reset nurse
export const resetNurse = async (req: Request, res: Response) => {
  try {
    const nurseID = req.user;
    const user = await nurseModel.findOne({nurseID});
    if (!user)
      return res.status(400).json({ message: "Cannot find nurse to reset" });
    user.patientRequests = [];
    user.workStatus = "free";
    await user.save();
    res.status(200).json({ message: `Nurse ${user.name} reset successfully` });
  } catch (error) {
    res.status(400).json({ message: "error degat", error: error });
  }
};
