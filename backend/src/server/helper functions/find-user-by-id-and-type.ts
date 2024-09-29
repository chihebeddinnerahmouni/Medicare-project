import doctormodel from "../modules/doctor/doctor-schema";
import patientModel from "../modules/user/user-schema";
import nurseModel from "../modules/nurse/nurse-schema";
import { Request, Response } from "express";

const findUserById = async (req: Request, res: Response, type: String, id: any) => {

    let model: any;

    if (type == "doctor") {
      model = doctormodel;
    } else if (type == "nurse") {
      model = nurseModel;
    } else if (type == "patient") {
      model = patientModel;
    }

    try {
        const user = await model!.findById(id);
        if (!user) return console.log("User not found");
        return user;
    } catch (error) {
        console.log({ message: "degat", err: error });
    }
}

export default findUserById;