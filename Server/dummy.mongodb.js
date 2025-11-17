use("db_clinic_managment")

const visitsToInsertWithTimestamps = [
  // Liam Miller (ID: 691a1789fdb4f29b62d819d4)
  {
    "patient": "691a1789fdb4f29b62d819d4",
    "tokenNo": "001",
    "registrationTime": "09:00 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Seasonal Allergic Rhinitis",
        "symptoms": "Runny nose, sneezing, itchy eyes for 3 days.",
        "medicines": [
          { "name": "Cetirizine", "dosage": "10 mg", "frequency": "Once daily", "duration": "7 days" }
        ],
        "notes": "Advised to avoid known allergens. Follow up if symptoms worsen.",
        "attachments": ["allergy_test_report_01.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T09:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T09:00:00.000Z")
  },
  // Olivia Jones (ID: 691a1789fdb4f29b62d819d5)
  {
    "patient": "691a1789fdb4f29b62d819d5",
    "tokenNo": "002",
    "registrationTime": "09:15 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Hypertension (Stage I)",
        "symptoms": "Mild headache in the mornings. Blood pressure recorded at 145/95 mmHg.",
        "medicines": [
          { "name": "Lisinopril", "dosage": "5 mg", "frequency": "Once daily", "duration": "Lifetime" },
          { "name": "Hydrochlorothiazide", "dosage": "12.5 mg", "frequency": "Once daily", "duration": "Lifetime" }
        ],
        "notes": "Counseled on lifestyle modifications (diet, exercise). Follow up in 4 weeks.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T09:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T09:15:00.000Z")
  },
  // Noah Garcia (ID: 691a1789fdb4f29b62d819d6)
  {
    "patient": "691a1789fdb4f29b62d819d6",
    "tokenNo": "003",
    "registrationTime": "09:30 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Pending",
    "medicalHistory": [
      {
        "diagnosis": "Routine Check-up",
        "symptoms": "No complaints. Requested general physical exam and blood work.",
        "medicines": [],
        "notes": "Ordered CBC, metabolic panel, and lipid profile. Awaiting lab results.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T09:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T09:30:00.000Z")
  },
  // Emma Wilson (ID: 691a1789fdb4f29b62d819d7)
  {
    "patient": "691a1789fdb4f29b62d819d7",
    "tokenNo": "004",
    "registrationTime": "09:45 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Acute Bronchitis Exacerbation",
        "symptoms": "Severe cough with thick sputum, shortness of breath, low-grade fever.",
        "medicines": [
          { "name": "Azithromycin", "dosage": "500 mg", "frequency": "Once daily", "duration": "5 days" },
          { "name": "Albuterol inhaler", "dosage": "2 puffs", "frequency": "Every 4-6 hours PRN", "duration": "As needed" }
        ],
        "notes": "Chest X-ray taken. Patient stable, advised rest and hydration. Return immediately for worsening distress.",
        "attachments": ["chest_xray_report_04.jpg"]
      }
    ],
    "createdAt": new Date("2025-11-16T09:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T09:45:00.000Z")
  },
  // Elijah Brown (ID: 691a1789fdb4f29b62d819d8)
  {
    "patient": "691a1789fdb4f29b62d819d8",
    "tokenNo": "005",
    "registrationTime": "10:00 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Type 2 Diabetes Mellitus (Controlled)",
        "symptoms": "Review of home glucose readings. HbA1c is 6.8%.",
        "medicines": [
          { "name": "Metformin", "dosage": "500 mg", "frequency": "Twice daily", "duration": "Ongoing" }
        ],
        "notes": "Dietitian consult scheduled next week. Refilled current medication.",
        "attachments": ["glucose_log_05.xlsx"]
      }
    ],
    "createdAt": new Date("2025-11-16T10:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T10:00:00.000Z")
  },
  // Ava Davis (ID: 691a1789fdb4f29b62d819d9)
  {
    "patient": "691a1789fdb4f29b62d819d9",
    "tokenNo": "006",
    "registrationTime": "10:15 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Common Cold (Viral URI)",
        "symptoms": "Sore throat, mild fever, congestion started yesterday.",
        "medicines": [
          { "name": "Ibuprofen", "dosage": "400 mg", "frequency": "Every 6 hours PRN", "duration": "5 days" }
        ],
        "notes": "Symptomatic treatment advised. No antibiotics needed. Rest and fluids.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T10:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T10:15:00.000Z")
  },
  // William Rodriguez (ID: 691a1789fdb4f29b62d819da)
  {
    "patient": "691a1789fdb4f29b62d819da",
    "tokenNo": "007",
    "registrationTime": "10:30 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Congestive Heart Failure (Stable)",
        "symptoms": "Mild ankle edema, no acute respiratory distress.",
        "medicines": [
          { "name": "Furosemide", "dosage": "20 mg", "frequency": "Once daily", "duration": "Ongoing" },
          { "name": "Digoxin", "dosage": "0.125 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Reviewed fluid intake restrictions. Labs showed stable kidney function.",
        "attachments": ["ecg_report_07.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T10:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T10:30:00.000Z")
  },
  // Sophia Martinez (ID: 691a1789fdb4f29b62d819db)
  {
    "patient": "691a1789fdb4f29b62d819db",
    "tokenNo": "008",
    "registrationTime": "10:45 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Hypothyroidism",
        "symptoms": "Follow-up TSH levels are within target range.",
        "medicines": [
          { "name": "Levothyroxine", "dosage": "75 mcg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Dose adjustment not needed. Next follow-up in 6 months.",
        "attachments": ["thyroid_panel_08.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T10:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T10:45:00.000Z")
  },
  // James Hernandez (ID: 691a1789fdb4f29b62d819dc)
  {
    "patient": "691a1789fdb4f29b62d819dc",
    "tokenNo": "009",
    "registrationTime": "11:00 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Minor Ankle Sprain",
        "symptoms": "Twisted ankle during sports. Mild swelling and pain.",
        "medicines": [
          { "name": "Naproxen", "dosage": "220 mg", "frequency": "Twice daily PRN", "duration": "5 days" }
        ],
        "notes": "R.I.C.E. protocol advised (Rest, Ice, Compression, Elevation). Use crutches for 2 days.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T11:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T11:00:00.000Z")
  },
  // Isabella Lopez (ID: 691a1789fdb4f29b62d819dd)
  {
    "patient": "691a1789fdb4f29b62d819dd",
    "tokenNo": "010",
    "registrationTime": "11:15 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Severe Asthma Attack",
        "symptoms": "Wheezing, inability to speak full sentences, oxygen saturation 88%.",
        "medicines": [
          { "name": "Salbutamol nebulizer", "dosage": "2.5 mg", "frequency": "Stat", "duration": "N/A" },
          { "name": "Prednisolone", "dosage": "40 mg", "frequency": "Once daily", "duration": "7 days" }
        ],
        "notes": "Stabilized with nebulized treatment and oral steroids. Referred to ER for further observation.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T11:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T11:15:00.000Z")
  },
  // Benjamin Gonzalez (ID: 691a1789fdb4f29b62d819de)
  {
    "patient": "691a1789fdb4f29b62d819de",
    "tokenNo": "011",
    "registrationTime": "11:30 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Coronary Artery Disease",
        "symptoms": "Annual review. Reports no chest pain since last visit.",
        "medicines": [
          { "name": "Aspirin", "dosage": "81 mg", "frequency": "Once daily", "duration": "Ongoing" },
          { "name": "Atorvastatin", "dosage": "40 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Encouraged continuation of cardiac rehabilitation.",
        "attachments": ["lipid_profile_11.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T11:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T11:30:00.000Z")
  },
  // Mia Perez (ID: 691a1789fdb4f29b62d819df)
  {
    "patient": "691a1789fdb4f29b62d819df",
    "tokenNo": "012",
    "registrationTime": "11:45 AM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Acne Vulgaris",
        "symptoms": "Moderate breakouts on the face and back.",
        "medicines": [
          { "name": "Benzoyl Peroxide Wash", "dosage": "5%", "frequency": "Twice daily", "duration": "Ongoing" },
          { "name": "Doxycycline", "dosage": "100 mg", "frequency": "Once daily", "duration": "8 weeks" }
        ],
        "notes": "Follow-up with Dermatology in 2 months.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T11:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T11:45:00.000Z")
  },
  // Lucas Sanchez (ID: 691a1789fdb4f29b62d819e0)
  {
    "patient": "691a1789fdb4f29b62d819e0",
    "tokenNo": "013",
    "registrationTime": "12:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Medium",
    "status": "Pending",
    "medicalHistory": [
      {
        "diagnosis": "Gout (Flare-up)",
        "symptoms": "Severe pain and swelling in the big toe. Started 2 days ago.",
        "medicines": [
          { "name": "Colchicine", "dosage": "0.6 mg", "frequency": "Twice daily", "duration": "7 days" }
        ],
        "notes": "Blood work ordered to check uric acid levels. Advised to increase water intake.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T12:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T12:00:00.000Z")
  },
  // Charlotte Ramirez (ID: 691a1789fdb4f29b62d819e1)
  {
    "patient": "691a1789fdb4f29b62d819e1",
    "tokenNo": "014",
    "registrationTime": "12:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Osteoarthritis of the Knee",
        "symptoms": "Chronic knee pain, stiffness, worse in the morning.",
        "medicines": [
          { "name": "Meloxicam", "dosage": "7.5 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Physiotherapy referral provided. Discussed potential for knee replacement in the future.",
        "attachments": ["xray_knee_14.jpg"]
      }
    ],
    "createdAt": new Date("2025-11-16T12:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T12:15:00.000Z")
  },
  // Henry Torres (ID: 691a1789fdb4f29b62d819e2)
  {
    "patient": "691a1789fdb4f29b62d819e2",
    "tokenNo": "015",
    "registrationTime": "12:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Uncontrolled Atrial Fibrillation",
        "symptoms": "Palpitations, lightheadedness, fast irregular pulse (rate >150 bpm).",
        "medicines": [
          { "name": "Diltiazem", "dosage": "30 mg", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "Transferred immediately to the hospital for cardioversion. Needs urgent cardiology consult.",
        "attachments": ["ECG_Torres_15.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T12:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T12:30:00.000Z")
  },
  // Amelia Flores (ID: 691a1789fdb4f29b62d819e3)
  {
    "patient": "691a1789fdb4f29b62d819e3",
    "tokenNo": "016",
    "registrationTime": "12:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Iron Deficiency Anemia (Mild)",
        "symptoms": "Reports fatigue and pale skin.",
        "medicines": [
          { "name": "Ferrous Sulfate", "dosage": "325 mg", "frequency": "Once daily", "duration": "3 months" }
        ],
        "notes": "Advised to take iron with Vitamin C for better absorption. Follow-up CBC in 3 months.",
        "attachments": ["CBC_Flores_16.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T12:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T12:45:00.000Z")
  },
  // Alexander Rivera (ID: 691a1789fdb4f29b62d819e4)
  {
    "patient": "691a1789fdb4f29b62d819e4",
    "tokenNo": "017",
    "registrationTime": "01:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Chronic Migraine",
        "symptoms": "Reports 3 migraine episodes in the last month, successfully treated with abortive medication.",
        "medicines": [
          { "name": "Topiramate", "dosage": "50 mg", "frequency": "Twice daily", "duration": "Ongoing" },
          { "name": "Sumatriptan (PRN)", "dosage": "50 mg", "frequency": "As needed", "duration": "N/A" }
        ],
        "notes": "No changes to preventative therapy. Continue to log headache occurrences.",
        "attachments": ["headache_log_17.xlsx"]
      }
    ],
    "createdAt": new Date("2025-11-16T13:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T13:00:00.000Z")
  },
  // Evelyn Gomez (ID: 691a1789fdb4f29b62d819e5)
  {
    "patient": "691a1789fdb4f29b62d819e5",
    "tokenNo": "018",
    "registrationTime": "01:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Post-Stroke Rehabilitation",
        "symptoms": "Follow-up on physical therapy progress. Shows improvement in grip strength.",
        "medicines": [
          { "name": "Clopidogrel", "dosage": "75 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Continued physical and occupational therapy recommended. Home exercise plan reviewed.",
        "attachments": ["PT_progress_note_18.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T13:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T13:15:00.000Z")
  },
  // Daniel Díaz (ID: 691a1789fdb4f29b62d819e6)
  {
    "patient": "691a1789fdb4f29b62d819e6",
    "tokenNo": "019",
    "registrationTime": "01:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Tinea Corporis (Ringworm)",
        "symptoms": "Small, circular, red patch on the arm.",
        "medicines": [
          { "name": "Clotrimazole Cream", "dosage": "1%", "frequency": "Twice daily", "duration": "14 days" }
        ],
        "notes": "Advised on hygiene and keeping the area dry.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T13:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T13:30:00.000Z")
  },
  // Abigail Reyes (ID: 691a1789fdb4f29b62d819e7)
  {
    "patient": "691a1789fdb4f29b62d819e7",
    "tokenNo": "020",
    "registrationTime": "01:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Depression (Mild)",
        "symptoms": "Reports low mood, but has been adhering to therapy and medication.",
        "medicines": [
          { "name": "Sertraline", "dosage": "50 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Mental health screening updated. Continued therapy recommended.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T13:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T13:45:00.000Z")
  },
  // Matthew Ruiz (ID: 691a1789fdb4f29b62d819e8)
  {
    "patient": "691a1789fdb4f29b62d819e8",
    "tokenNo": "021",
    "registrationTime": "02:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Suspected Gastrointestinal Bleed",
        "symptoms": "Dark, tarry stools (melena), weakness, pallor.",
        "medicines": [
          { "name": "Pantoprazole", "dosage": "40 mg", "frequency": "Twice daily", "duration": "N/A" }
        ],
        "notes": "Immediate transfer to ER for endoscopy and blood transfusion. Contacted next of kin.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T14:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T14:00:00.000Z")
  },
  // Harper Vargas (ID: 691a1789fdb4f29b62d819e9)
  {
    "patient": "691a1789fdb4f29b62d819e9",
    "tokenNo": "022",
    "registrationTime": "02:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Urinary Tract Infection (UTI)",
        "symptoms": "Dysuria, frequent urination for 1 day.",
        "medicines": [
          { "name": "Nitrofurantoin", "dosage": "100 mg", "frequency": "Twice daily", "duration": "5 days" }
        ],
        "notes": "Urine sample sent for culture and sensitivity. Advised on hydration.",
        "attachments": ["urine_dipstick_22.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T14:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T14:15:00.000Z")
  },
  // Jack Mendoza (ID: 691a1789fdb4f29b62d819ea)
  {
    "patient": "691a1789fdb4f29b62d819ea",
    "tokenNo": "023",
    "registrationTime": "02:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Chronic Low Back Pain",
        "symptoms": "Reports intermittent pain, managed mostly with physical activity.",
        "medicines": [
          { "name": "Tylenol (PRN)", "dosage": "500 mg", "frequency": "As needed", "duration": "N/A" }
        ],
        "notes": "Discussed core strengthening exercises. No narcotics prescribed.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T14:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T14:30:00.000Z")
  },
  // Ella Castillo (ID: 691a1789fdb4f29b62d819eb)
  {
    "patient": "691a1789fdb4f29b62d819eb",
    "tokenNo": "024",
    "registrationTime": "02:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Recent Pneumonia Recovery",
        "symptoms": "Feeling much better, cough is mostly resolved. Follow-up chest X-ray clear.",
        "medicines": [],
        "notes": "Cleared for return to normal activities. Follow-up PRN.",
        "attachments": ["followup_cxr_24.jpg"]
      }
    ],
    "createdAt": new Date("2025-11-16T14:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T14:45:00.000Z")
  },
  // Gabriel Morales (ID: 691a1789fdb4f29b62d819ec)
  {
    "patient": "691a1789fdb4f29b62d819ec",
    "tokenNo": "025",
    "registrationTime": "03:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Conjunctivitis (Pink Eye)",
        "symptoms": "Redness, itching, and discharge in the left eye.",
        "medicines": [
          { "name": "Polymyxin B/Trimethoprim Ophthalmic Solution", "dosage": "1 drop", "frequency": "4 times daily", "duration": "7 days" }
        ],
        "notes": "Likely viral, but treated empirically for bacterial. Advised on hand washing.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T15:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T15:00:00.000Z")
  },
  // Avery Ortiz (ID: 691a1789fdb4f29b62d819ed)
  {
    "patient": "691a1789fdb4f29b62d819ed",
    "tokenNo": "026",
    "registrationTime": "03:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Anaphylaxis (Peanut Allergy)",
        "symptoms": "Facial swelling, hives, shortness of breath after accidental ingestion.",
        "medicines": [
          { "name": "Epinephrine auto-injector (EpiPen)", "dosage": "0.3 mg", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "Epinephrine administered. Transferred to ER for observation. Prescribed a new EpiPen.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T15:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T15:15:00.000Z")
  },
  // Carter Chavez (ID: 691a1789fdb4f29b62d819ee)
  {
    "patient": "691a1789fdb4f29b62d819ee",
    "tokenNo": "027",
    "registrationTime": "03:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Mild Anxiety Disorder",
        "symptoms": "Occasional panic attacks, currently well-managed.",
        "medicines": [
          { "name": "Escitalopram", "dosage": "10 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Reviewed coping strategies. Therapy sessions ongoing.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T15:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T15:30:00.000Z")
  },
  // Scarlett Guerrero (ID: 691a1789fdb4f29b62d819ef)
  {
    "patient": "691a1789fdb4f29b62d819ef",
    "tokenNo": "028",
    "registrationTime": "03:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Rheumatoid Arthritis",
        "symptoms": "Reports slight increase in morning stiffness.",
        "medicines": [
          { "name": "Methotrexate", "dosage": "15 mg", "frequency": "Once weekly", "duration": "Ongoing" }
        ],
        "notes": "Ordered joint imaging. Continued DMARD therapy.",
        "attachments": ["rheumatoid_factor_28.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T15:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T15:45:00.000Z")
  },
  // Ethan Herrera (ID: 691a1789fdb4f29b62d819f0)
  {
    "patient": "691a1789fdb4f29b62d819f0",
    "tokenNo": "029",
    "registrationTime": "04:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Contact Dermatitis",
        "symptoms": "Red, itchy rash on the wrist from a new watch band.",
        "medicines": [
          { "name": "Hydrocortisone Cream", "dosage": "1%", "frequency": "Twice daily", "duration": "7 days" }
        ],
        "notes": "Advised to discontinue use of the irritating material.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T16:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T16:00:00.000Z")
  },
  // Madison Molina (ID: 691a1789fdb4f29b62d819f1)
  {
    "patient": "691a1789fdb4f29b62d819f1",
    "tokenNo": "030",
    "registrationTime": "04:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Chronic Kidney Disease (Stage 3)",
        "symptoms": "Routine lab work showed GFR stable at 45 mL/min.",
        "medicines": [
          { "name": "Folic Acid", "dosage": "1 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Discussed low-sodium, low-potassium diet. Nephrology follow-up in 3 months.",
        "attachments": ["BMP_Molina_30.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T16:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T16:15:00.000Z")
  },
  // Logan Peña (ID: 691a1789fdb4f29b62d819f2)
  {
    "patient": "691a1789fdb4f29b62d819f2",
    "tokenNo": "031",
    "registrationTime": "04:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Aortic Dissection (Suspected)",
        "symptoms": "Sudden onset severe tearing chest and back pain. BP is 180/100 mmHg.",
        "medicines": [
          { "name": "Esmolol IV", "dosage": "Titrated", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "Code activated. Rushed to surgical team. Requires immediate imaging.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T16:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T16:30:00.000Z")
  },
  // Chloe Cabrera (ID: 691a1789fdb4f29b62d819f3)
  {
    "patient": "691a1789fdb4f29b62d819f3",
    "tokenNo": "032",
    "registrationTime": "04:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Acute Pharyngitis (Strep ruled out)",
        "symptoms": "Sore throat and mild difficulty swallowing.",
        "medicines": [
          { "name": "Acetaminophen", "dosage": "500 mg", "frequency": "Every 4-6 hours PRN", "duration": "5 days" }
        ],
        "notes": "Rapid strep test negative. Symptomatic treatment advised.",
        "attachments": ["rapid_strep_32.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T16:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T16:45:00.000Z")
  },
  // Owen Soto (ID: 691a1789fdb4f29b62d819f4)
  {
    "patient": "691a1789fdb4f29b62d819f4",
    "tokenNo": "033",
    "registrationTime": "05:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Prostate Cancer (Follow-up)",
        "symptoms": "PSA level stable at 1.2 ng/mL. No new symptoms.",
        "medicines": [
          { "name": "Bicalutamide", "dosage": "50 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Continued monitoring (Active Surveillance). Next PSA test in 6 months.",
        "attachments": ["PSA_test_33.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T17:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T17:00:00.000Z")
  },
  // Zoey Velasquez (ID: 691a1789fdb4f29b62d819f5)
  {
    "patient": "691a1789fdb4f29b62d819f5",
    "tokenNo": "034",
    "registrationTime": "05:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Mild Insomnia",
        "symptoms": "Reports sleeping better with current regimen.",
        "medicines": [
          { "name": "Melatonin", "dosage": "3 mg", "frequency": "At bedtime PRN", "duration": "Ongoing" }
        ],
        "notes": "Reviewed sleep hygiene techniques.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T17:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T17:15:00.000Z")
  },
  // Jackson Maldonado (ID: 691a1789fdb4f29b62d819f6)
  {
    "patient": "691a1789fdb4f29b62d819f6",
    "tokenNo": "035",
    "registrationTime": "05:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Viral Gastroenteritis",
        "symptoms": "Nausea, vomiting, and diarrhea started suddenly 6 hours ago.",
        "medicines": [
          { "name": "Ondansetron", "dosage": "4 mg", "frequency": "Every 8 hours PRN", "duration": "3 days" }
        ],
        "notes": "Advised on clear liquid diet and hydration (Oral Rehydration Solution).",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T17:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T17:30:00.000Z")
  },
  // Lily Rios (ID: 691a1789fdb4f29b62d819f7)
  {
    "patient": "691a1789fdb4f29b62d819f7",
    "tokenNo": "036",
    "registrationTime": "05:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Diabetic Ketoacidosis (DKA) (Suspected)",
        "symptoms": "Deep, rapid breathing, severe dehydration, blood glucose >400 mg/dL.",
        "medicines": [
          { "name": "Normal Saline IV", "dosage": "1 L", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "ER transfer for insulin drip and aggressive fluid resuscitation.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T17:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T17:45:00.000Z")
  },
  // Caleb Delgado (ID: 691a1789fdb4f29b62d819f8)
  {
    "patient": "691a1789fdb4f29b62d819f8",
    "tokenNo": "037",
    "registrationTime": "06:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Pre-employment Physical",
        "symptoms": "Healthy, no chronic medical issues.",
        "medicines": [],
        "notes": "Physical exam passed. Form completed and signed.",
        "attachments": ["pre_employment_form_37.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T18:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T18:00:00.000Z")
  },
  // Aria Guzman (ID: 691a1789fdb4f29b62d819f9)
  {
    "patient": "691a1789fdb4f29b62d819f9",
    "tokenNo": "038",
    "registrationTime": "06:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Otitis Media (Ear Infection)",
        "symptoms": "Pain and pressure in the right ear.",
        "medicines": [
          { "name": "Amoxicillin", "dosage": "500 mg", "frequency": "Three times daily", "duration": "10 days" }
        ],
        "notes": "Tympanic membrane is red and bulging. Full course of antibiotics advised.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T18:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T18:15:00.000Z")
  },
  // Ryan Silva (ID: 691a1789fdb4f29b62d819fa)
  {
    "patient": "691a1789fdb4f29b62d819fa",
    "tokenNo": "039",
    "registrationTime": "06:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Peripheral Artery Disease",
        "symptoms": "Reports worsening claudication (leg pain with walking).",
        "medicines": [
          { "name": "Cilostazol", "dosage": "100 mg", "frequency": "Twice daily", "duration": "Ongoing" }
        ],
        "notes": "Ordered Ankle-Brachial Index (ABI) test. Vascular consult requested.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T18:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T18:30:00.000Z")
  },
  // Grace Vega (ID: 691a1789fdb4f29b62d819fb)
  {
    "patient": "691a1789fdb4f29b62d819fb",
    "tokenNo": "040",
    "registrationTime": "06:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Sunburn (First Degree)",
        "symptoms": "Red, painful skin on shoulders.",
        "medicines": [
          { "name": "Aloe Vera Gel", "dosage": "Apply generously", "frequency": "Three times daily", "duration": "As needed" }
        ],
        "notes": "Advised on sunscreen use and hydration.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T18:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T18:45:00.000Z")
  },
  // Samuel Mora (ID: 691a1789fdb4f29b62d819fc)
  {
    "patient": "691a1789fdb4f29b62d819fc",
    "tokenNo": "041",
    "registrationTime": "07:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Septic Shock (Suspected)",
        "symptoms": "High fever, hypotension (BP 80/50 mmHg), confusion.",
        "medicines": [
          { "name": "Broad-spectrum Antibiotics IV", "dosage": "Standard dose", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "Labs drawn (lactate, blood cultures). Aggressive fluid and vasopressor support started. ER transfer.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T19:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T19:00:00.000Z")
  },
  // Zoe Pacheco (ID: 691a1789fdb4f29b62d819fd)
  {
    "patient": "691a1789fdb4f29b62d819fd",
    "tokenNo": "042",
    "registrationTime": "07:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Pelvic Inflammatory Disease (PID)",
        "symptoms": "Lower abdominal pain, fever, and abnormal discharge.",
        "medicines": [
          { "name": "Ceftriaxone IM", "dosage": "250 mg", "frequency": "Single dose", "duration": "N/A" },
          { "name": "Doxycycline", "dosage": "100 mg", "frequency": "Twice daily", "duration": "14 days" }
        ],
        "notes": "Advised sexual partner notification. Follow-up in 3 days.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T19:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T19:15:00.000Z")
  },
  // Leo Rojas (ID: 691a1789fdb4f29b62d819fe)
  {
    "patient": "691a1789fdb4f29b62d819fe",
    "tokenNo": "043",
    "registrationTime": "07:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Fractured Clavicle (Non-Displaced)",
        "symptoms": "Fell off bike. Severe pain over the collarbone.",
        "medicines": [
          { "name": "Tramadol", "dosage": "50 mg", "frequency": "Every 6 hours PRN", "duration": "7 days" }
        ],
        "notes": "Sling immobilization applied. Orthopedic referral for follow-up.",
        "attachments": ["clavicle_xray_43.jpg"]
      }
    ],
    "createdAt": new Date("2025-11-16T19:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T19:30:00.000Z")
  },
  // Nora Aguilar (ID: 691a1789fdb4f29b62d819ff)
  {
    "patient": "691a1789fdb4f29b62d819ff",
    "tokenNo": "044",
    "registrationTime": "07:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Osteoporosis Screening",
        "symptoms": "Follow-up DEXA scan results reviewed.",
        "medicines": [
          { "name": "Calcium/Vitamin D Supplement", "dosage": "1200 mg/800 IU", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "T-score is -1.5 (Osteopenia). Advised on weight-bearing exercises.",
        "attachments": ["DEXA_scan_44.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T19:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T19:45:00.000Z")
  },
  // Julian Mendez (ID: 691a1789fdb4f29b62d81a00)
  {
    "patient": "691a1789fdb4f29b62d81a00",
    "tokenNo": "045",
    "registrationTime": "08:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "GERD (Gastroesophageal Reflux Disease)",
        "symptoms": "Reports heartburn is well-controlled with medication.",
        "medicines": [
          { "name": "Omeprazole", "dosage": "20 mg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Reviewed diet and avoidance of late-night eating.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T20:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T20:00:00.000Z")
  },
  // Stella Cruz (ID: 691a1789fdb4f29b62d81a01)
  {
    "patient": "691a1789fdb4f29b62d81a01",
    "tokenNo": "046",
    "registrationTime": "08:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Emergency",
    "priority": "Critical",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Acute Myocardial Infarction (STEMI)",
        "symptoms": "Crushing substernal chest pain, radiating to the left arm. ST elevation on ECG.",
        "medicines": [
          { "name": "Aspirin", "dosage": "325 mg", "frequency": "Stat", "duration": "N/A" },
          { "name": "Nitroglycerin SL", "dosage": "0.4 mg", "frequency": "Stat", "duration": "N/A" }
        ],
        "notes": "Code STEMI activated. Immediate transfer for cardiac catheterization.",
        "attachments": ["ECG_Cruz_46.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T20:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T20:15:00.000Z")
  },
  // Asher Ramos (ID: 691a1789fdb4f29b62d81a02)
  {
    "patient": "691a1789fdb4f29b62d81a02",
    "tokenNo": "047",
    "registrationTime": "08:30 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Chronic Obstructive Pulmonary Disease (COPD)",
        "symptoms": "Stable condition. Follow-up spirometry improved slightly.",
        "medicines": [
          { "name": "Tiotropium Inhaler", "dosage": "18 mcg", "frequency": "Once daily", "duration": "Ongoing" }
        ],
        "notes": "Reviewed proper inhaler technique. Discussed flu shot.",
        "attachments": ["spirometry_47.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T20:30:00.000Z"),
    "updatedAt": new Date("2025-11-16T20:30:00.000Z")
  },
  // Eliza Mejia (ID: 691a1789fdb4f29b62d81a03)
  {
    "patient": "691a1789fdb4f29b62d81a03",
    "tokenNo": "048",
    "registrationTime": "08:45 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Walk-in",
    "priority": "Low",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Mild Tension Headache",
        "symptoms": "Dull ache across the forehead, started after a long workday.",
        "medicines": [
          { "name": "Tylenol", "dosage": "500 mg", "frequency": "As needed", "duration": "N/A" }
        ],
        "notes": "Advised on stress management and posture.",
        "attachments": []
      }
    ],
    "createdAt": new Date("2025-11-16T20:45:00.000Z"),
    "updatedAt": new Date("2025-11-16T20:45:00.000Z")
  },
  // Eli Marquez (ID: 691a1789fdb4f29b62d81a04)
  {
    "patient": "691a1789fdb4f29b62d81a04",
    "tokenNo": "049",
    "registrationTime": "09:00 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Follow-up",
    "priority": "Medium",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Hyponatremia (Corrected)",
        "symptoms": "Sodium level returned to normal (138 mEq/L).",
        "medicines": [],
        "notes": "Discontinued fluid restriction. Follow-up labs in 1 week.",
        "attachments": ["electrolyte_panel_49.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T21:00:00.000Z"),
    "updatedAt": new Date("2025-11-16T21:00:00.000Z")
  },
  // Violet Lara (ID: 691a1789fdb4f29b62d81a05)
  {
    "patient": "691a1789fdb4f29b62d81a05",
    "tokenNo": "050",
    "registrationTime": "09:15 PM",
    "registrationDate": "2025-11-16T00:00:00.000Z",
    "appointmentType": "Scheduled",
    "priority": "High",
    "status": "Completed",
    "medicalHistory": [
      {
        "diagnosis": "Glaucoma",
        "symptoms": "Intraocular pressure is stable.",
        "medicines": [
          { "name": "Latanoprost Ophthalmic Solution", "dosage": "1 drop", "frequency": "Once daily (PM)", "duration": "Ongoing" }
        ],
        "notes": "Continued use of eye drops. Next visual field test in 6 months. Ophthalmology consult.",
        "attachments": ["IOP_reading_50.pdf"]
      }
    ],
    "createdAt": new Date("2025-11-16T21:15:00.000Z"),
    "updatedAt": new Date("2025-11-16T21:15:00.000Z")
  }
];

// db.patientvisits.deleteMany({})
db.patientvisits.insertMany(visitsToInsertWithTimestamps)

// db.patientvisits.find()
