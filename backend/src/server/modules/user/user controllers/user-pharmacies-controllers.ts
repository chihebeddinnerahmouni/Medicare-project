import patientModel from "../user-schema";
import pharmacyModel from "../../pharmacy/pharmacies-schema";
import e, { Request, Response } from "express";




// get all pharmacies
export const getAllPharmacies = async (req: Request, res: Response) => {
  try {
      
    const { location } = req.body;
      if (!location) return res.status(400).json({ message: "Location not found" });
      const pharmacies = await pharmacyModel.find(
        {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: location,
              },
              $maxDistance: 10000,
            },
          },
        }
      );


    if (!pharmacies) return res.status(404).json({ message: "no pharmacy found in 10km" });
      
      const allPharmacies: any = [];
      pharmacies.forEach((pharmacy) => {
          allPharmacies.push({
            name: pharmacy.name,
            location: pharmacy.location,
            phone: pharmacy.phone,
            workStatus: pharmacy.workStatus,
            address: pharmacy.address,
            doorPicture: pharmacy.doorPicture,
            codingAdress: pharmacy.codingAdress,
          });
      })

      res.status(200).json({message:"rana lgina hak", pharmacies: allPharmacies});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//_______________________________________________________________________________________________________________________

// get working pharmacies
export const getWorkingPharmacies = async (req: Request, res: Response) => { 
    try {
        const location = req.body.location;
        if (!location) return res.status(400).json({ message: "Location not found" });
        const pharmacies = await pharmacyModel.find(
          {
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: location,
                },
                $maxDistance: 5000,
              },
            },
            workStatus: true,
          }
        );
        if (!pharmacies) return res.status(404).json({ message: "no pharmacy found in 5km" });
        const workingPharmacies: any = [];
        pharmacies.forEach((pharmacy) => {
            workingPharmacies.push({
                name: pharmacy.name,
                location: pharmacy.location,
                phone: pharmacy.phone,
              workStatus: pharmacy.workStatus,
              address: pharmacy.address,
              doorPicture: pharmacy.doorPicture,
              codingAdress: pharmacy.codingAdress,

            });
        });
        res.status(200).json({ message: "rana lgina hak", pharmacies: workingPharmacies });
    } catch (error) {
        res.status(500).json({ message: "degat err", error });
    }   
}