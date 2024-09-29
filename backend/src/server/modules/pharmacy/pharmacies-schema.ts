import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IPharmacy {
  name: string;
  owner_first_name: string;
  owner_last_name: string;
  phone: number;
  email: string;
  // id: string;
  password: string;
  verificationCode: String | undefined;
  verified: boolean;
  type: string;
  //demandingNewPassword: Boolean;
  workStatus: Boolean;
  //token: string;
  //refreshToken: string;
  //tokenVersion: number;
  profilePicture: string;
  //coverPicture: string;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  doorPicture: string;
  codingAdress: string;
 // ratingNumber: number;
 // ratingSum: number;
 // averageRating: number;
 // comments: Array<object>;
}

const pharmacySchema = new mongoose.Schema<IPharmacy>({
    name: { type: String, required: true }, //*
    owner_first_name: { type: String, required: true },//
    owner_last_name: { type: String, required: true },//
    phone: { type: Number,required: true },//
    email: { type: String, required: true },//
    // id: { type: String , required: true, unique: true},
    password: { type: String, required: true },//
    type: { type: String, required: true }, //
    location: {
        type: { type: String, required: true },
        coordinates: { type: [Number], required: true, unique: true }, //*
  }, //
  address: { type: String, required: true },// 
  codingAdress: { type: String , required: true },//
    doorPicture: { type: String },  
    verificationCode: { type: String },
    verified: { type: Boolean, default: false },
    //demandingNewPassword: { type: Boolean, default: false },
    workStatus: { type: Boolean, default: false },
    //token: { type: String },
    //refreshToken: { type: String },
    //tokenVersion: { type: Number, default: 0 },
    profilePicture: { type: String },
    //coverPicture: { type: String }, 
    //ratingNumber: { type: Number },
    //ratingSum: { type: Number },
    //averageRating: { type: Number },
    //comments: { type: [Object] },
});
    
pharmacySchema.index({ location: '2dsphere' });

pharmacySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const PharmacyModel = mongoose.model<IPharmacy>("Pharmacy", pharmacySchema);
 
export default PharmacyModel;