import { create } from 'domain';
import pharmacyModel from './pharmacies-schema';
import e, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
//hlpers
import checkPasswordStrength from '../../helper functions/check-password-strength';
import isMissingField from '../../helper functions/is-missing-field';
import { createClient } from "@google/maps";
import dotenv from 'dotenv';

dotenv.config();

const mapKey = process.env.MAP_API_KEY;

const googleMapsClient = createClient({
  key: mapKey!,
  Promise: Promise,
});

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

// get all pharmacies
export const getAllPharmacies = async (req: Request, res: Response) => {
  try {
    const pharmacies = await pharmacyModel.find();
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(400).json({ message: 'Error getting pharmacies', error });
  }
};

//_______________________________________________________________________________________


//signup a pharmacy
export const createPharmacy = async (req: Request, res: Response) => {
    try {
        const { name, owner_first_name, owner_last_name, password, phone, email, location } = req.body;
        const type = 'pharmacy';
        const field = [name, owner_first_name, owner_last_name, password, phone, email, location];
        
        if (isMissingField(field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!checkPasswordStrength(res, password)) {
            return;
        }

                  const response = await googleMapsClient
                    .reverseGeocode({ latlng: location })
                    .asPromise();
                  const plusCode = (response.json as any).plus_code.global_code;

        const pharmacy = new pharmacyModel({
          name,
          owner_first_name,
          owner_last_name,
          password,
          phone,
          email,
          type,
          location: {
            type: "Point",
            coordinates: location,
          },
            address: response.json.results[0].formatted_address,
            codingAdress: plusCode,
        });
        await pharmacy.save();
        res.status(201).send({ message: `${req.body.name}'s pharmacy created successfully` });
    } catch (error) {
        res.status(400).send(error);
    }
}

//_______________________________________________________________________________________

//login a pharmacy (using mongodb _id as token)
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const pharmacy = await pharmacyModel.findOne({ email });
        if (!pharmacy) return res.status(404).json({ message: "pharmacy not found" });
        // if (!pharmacy.verified) return res.status(401).json({ message: "pharmacy not verified" });
        const isMatch = await bcrypt.compare(password, pharmacy.password);
        if (!isMatch) return res.status(400).json({ message: "please check ur email/password" });
        const token = pharmacy._id;
        res.status(200).json({ message: "pharmacy logged in successfully", token });
    } catch (error) { 
        res.status(400).json({ message: "degat err" , error});
    }
}

//_______________________________________________________________________________________

// to online
export const toOnline = async (req: Request, res: Response) => {
    try {
        const  id  = req.user;
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) return res.status(404).json({ message: "pharmacy not found" });
        pharmacy.workStatus = true;
        await pharmacy.save();
        res.status(200).json({ message: `${pharmacy.name} status changed successfully to online` });
    } catch (error) {
        res.status(400).json({ message: "degat err" , error});
    }
}

//_______________________________________________________________________________________


// to offline
export const toOffline = async (req: Request, res: Response) => {
    try {
        const  id  = req.user;
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) return res.status(404).json({ message: "pharmacy not found" });
        pharmacy.workStatus = false;
        await pharmacy.save();
        res.status(200).json({ message: `${pharmacy.name} status changed successfully to offline` });
    } catch (error) {
        res.status(400).json({ message: "degat err" , error});
    }
}

//_______________________________________________________________________________________

//update pharmacy location
export const updateLocation = async (req: Request, res: Response) => {
    try {
        const  id  = req.user;
        const { address } = req.body;
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) return res.status(404).json({ message: "pharmacy not found" });
        if (!address) return res.status(400).json({ message: "address is required" });
        pharmacy.address = address;
        await pharmacy.save();
        res.status(200).json({ message: `${pharmacy.name} location updated successfully` });
    } catch (error) {
        res.status(400).json({ message: "degat err" , error});
    }
}

//_______________________________________________________________________________________

//update pharmacy door picture
export const updateDoorPicture = async (req: Request, res: Response) => { 
    try {
        const id = req.user;
        // console.log(req.file);
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) return res.status(404).json({ message: "pharmacy not found" });
        pharmacy.doorPicture = req.file!.path;
        await pharmacy.save();
        res.status(200).json({ message: `${pharmacy.name} door picture updated successfully` });
    } catch (error) {
        res.status(400).json({ message: "degat err", error });
    }
}

//_______________________________________________________________________________________

// geocoding location



// export const geocodeLocation = async (req: Request, res: Response) => {
//   try {
    
//       const pharmacies = await pharmacyModel.find();

//       pharmacies.map(async (pharmacy) => { 
//           const location = pharmacy.location.coordinates;
//           const lat = location[0];
//           const lng = location[1];
//           const response = await googleMapsClient.reverseGeocode({ latlng: [lat, lng] }).asPromise();
//           const plusCode = (response.json as any).plus_code.global_code;
//           pharmacy.codingAdress = plusCode;
//           pharmacy.address = response.json.results[0].formatted_address;
//           await pharmacy.save();
//         })
//     res.status(200).json({ message: 'Location geocoded successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error geocoding location', error });
//   }
// };