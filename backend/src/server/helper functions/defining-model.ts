import doctormodel from "../modules/doctor/doctor-schema";
import nurseModel from "../modules/nurse/nurse-schema";
import patientModel from "../modules/user/user-schema";




const definingModel = async (type: string) => { 
    interface UserModel {
      findById: (arg0: { id: any }) => Promise<any>;
    }
    let model: UserModel;
    if (type === "doctor") {
      model = doctormodel;
    }
    if (type === "nurse") {
      model = nurseModel;
    }
    if (type === "patient") {
      model = patientModel;
  }
  return model!;
}

export default definingModel;