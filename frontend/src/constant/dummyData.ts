// Define types for doctors, nurses, and clinics

export interface Doctor {
    id: number;
  name: string;
  image: string;
  experience: number;
  address: string;
  specialite: string;
}

export interface Nurse {
  id: number;
  name: string;
  image: string;
  experience: number;
  address: string;
  specialite: string;
}

export interface Clinic {
  id: number;
  name: string;
  image: string;
  phone: string;
  address: string;
}

// Mock data for doctors
export const doctorsMockData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ahmed Ben Salah",
    image: "/doctor1.jpg",
    specialite: "Cardiologue",
    experience: 15,
    address: "Rue Emir Abdelkader, Alger, Algérie",
  },
  {
    id: 2,
    name: "Dr. Fatima Ould Khelifa",
    image: "/doctor2.jpg",
    specialite: "Pédiatre",
    experience: 10,
    address: "Avenue Didouche Mourad, Oran, Algérie",
  },
  {
    id: 3,
    name: "Dr. Youssef Bouzid",
    image: "/doctor3.jpg",
    specialite: "Neurologue",
    experience: 20,
    address: "Route de Constantine, Annaba, Algérie",
  },
  {
    id: 4,
    name: "Dr. Imane Zighoud",
    image: "/doctor4.jpg",
    specialite: "Dermatologue",
    experience: 12,
    address: "Boulevard Zighoud Youcef, Constantine, Algérie",
  },
  {
    id: 5,
    name: "Dr. Karim El Hadj",
    image: "/doctor5.jpg",
    specialite: "Chirurgien",
    experience: 18,
    address: "Rue Frantz Fanon, Blida, Algérie",
  },
  {
    id: 6,
    name: "Dr. Amina Amrani",
    image: "/doctor6.jpg",
    specialite: "Gynécologue",
    experience: 8,
    address: "Rue Khemisti, Sétif, Algérie",
  },
];

// Mock data for nurses
export const nursesMockData: Nurse[] = [
  {
    id: 1,
    name: "Latifa Cherif",
    image: "/nurse1.jpg",
    experience: 6,
    address: "Rue Larbi Ben M'hidi, Alger, Algérie",
    specialite: "Infirmière en chef",
  },
  {
    id: 2,
    name: "Yamina Boualem",
    image: "/nurse2.webp",
    experience: 9,
    address: "Rue des Martyrs, Oran, Algérie",
    specialite: "Infirmière en chef",
  },
  {
    id: 3,
    name: "Rachida Djedid",
    image: "/nurse3.webp",
    experience: 4,
    address: "Boulevard Che Guevara, Constantine, Algérie",
    specialite: "Infirmière en chef",
  },
  {
    id: 4,
    name: "Salim Kader",
    image: "/nurse4.jpg",
    experience: 5,
    address: "Rue Ahmed Zabana, Tlemcen, Algérie",
    specialite: "Infirmière en chef",
  },
  {
    id: 5,
    name: "Meriem Lounis",
    image: "/nurse5.jpg",
    experience: 7,
    address: "Avenue Mohamed Khemisti, Annaba, Algérie",
    specialite: "Infirmière en chef",
  },
  {
    id: 6,
    name: "Sofiane Boudjellal",
    image: "/nurse6.jpg",
    experience: 8,
    address: "Rue Aissat Idir, Sétif, Algérie",
    specialite: "Infirmière en chef",
  },
];

// Mock data for clinics
export const clinicsMockData: Clinic[] = [
  {
    id: 1,
    name: "Clinique El Nour",
    image: "/clinic1.jpg",
    phone: "213-21-33-44-55",
    address: "Boulevard Mohamed V, Alger, Algérie",
  },
  {
    id: 2,
    name: "Clinique Ibn Sina",
    image: "/clinic2.jpeg",
    phone: "213-41-22-33-44",
    address: "Avenue de l'Indépendance, Oran, Algérie",
  },
  {
    id: 3,
    name: "Clinique Chiffa",
    image: "/clinic3.webp",
    phone: "213-31-66-77-88",
    address: "Rue Emir Abdelkader, Constantine, Algérie",
  },
  {
    id: 4,
    name: "Clinique Al Hayat",
    image: "/clinic4.jpg",
    phone: "213-38-55-66-77",
    address: "Boulevard de la Révolution, Annaba, Algérie",
  },
  {
    id: 5,
    name: "Clinique Al Fadjr",
    image: "/clinic5.jpg",
    phone: "213-25-44-55-66",
    address: "Rue Colonel Amirouche, Sétif, Algérie",
  },
  {
    id: 6,
    name: "Clinique Tadjmouati",
    image: "/clinic6.webp",
    phone: "213-27-33-44-55",
    address: "Rue Abane Ramdane, Blida, Algérie",
  },
];
