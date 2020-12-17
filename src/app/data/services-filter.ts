export const typeOfCare: any = [
  {
    name: 'Detoxification',
    value: 'DT',
  },
  {
    name: 'Transitional housing, halfway house, or sober home',
    value: 'HH',
  },
  {
    name: 'Substance use treatment',
    value: 'SA',
  },
];

export const serviceSettings = [
  {
    name: 'Hospital inpatient',
    value: 'HI',
  },
  {
    name: 'Outpatient',
    value: 'OP',
  },
  {
    name: 'Residential',
    value: 'RES',
  },
  {
    name: 'Hospital inpatient detoxification',
    value: 'HID',
  },
  {
    name: 'Hospital inpatient treatment',
    value: 'HIT',
  },
  {
    name: 'Outpatient detoxification',
    value: 'OD',
  },
  {
    name: 'Outpatient day treatment or partial hospitalization',
    value: 'ODT',
  },
  {
    name: 'Intensive outpatient treatment',
    value: 'OIT',
  },
  {
    name: 'Outpatient methadone/buprenorphine or naltrexone treatment',
    value: 'OMB',
  },
  {
    name: 'Regular outpatient treatment',
    value: 'ORT',
  },
  {
    name: 'Residential detoxification',
    value: 'RD',
  },
  {
    name: 'Long-term residential',
    value: 'RL',
  },
  {
    name: 'Short-term residential',
    value: 'RS',
  },
  {
    name: 'Telemedicine/telehealth',
    value: 'TELE',
  },
];

export const opioidTreatment = [
  {
    name: 'SAMHSA-certified Opioid Treatment Program',
    value: 'OTP',
  },
  {
    name: 'Prescribes buprenorphine',
    value: 'UB',
  },
  {
    name: 'Administers naltrexone',
    value: 'UN',
  },
  {
    name: 'Accepts clients on opioid medication but prescribed elsewhere',
    value: 'MOA',
  },
];

export const facilityOperation = [
  {
    name: 'U.S. Department of Veterans Affairs',
    value: 'VAMC',
  },
];
export const paymentInsuranceFunding = [
  {
    name: 'IHS/Tribal/Urban (ITU) funds',
    value: 'ITU',
  },
  {
    name: 'Medicare',
    value: 'MC',
  },
  {
    name: 'Medicaid',
    value: 'MD',
  },
  {
    name: 'Military insurance (e.g., TRICARE)',
    value: 'MI',
  },
  {
    name: 'No payment accepted',
    value: 'NP',
  },
  {
    name: 'Private health insurance',
    value: 'PI',
  },
  {
    name: 'Cash or self-payment',
    value: 'SF',
  },
  {
    name: 'State-financed health insurance plan other than Medicaid',
    value: 'SI',
  },
];

export const paymentAssistance = [
  {
    name: 'Payment assistance',
    value: 'PA',
  },
  {
    name: 'Sliding fee scale (fee is based on income and other factors)',
    value: 'SS',
  },
];

export const specialPrograms = [
  {
    name: 'Adolescents',
    value: 'AD',
  },
  {
    name: 'Transitional age young adults',
    value: 'TAY',
  },
  {
    name: 'Adult women',
    value: 'WN',
  },
  {
    name: 'Pregnant/postpartum women',
    value: 'PW',
  },
  {
    name: 'Adult men',
    value: 'MN',
  },
  {
    name: 'Seniors or older adults',
    value: 'SE',
  },
  {
    name: 'Lesbian, gay, bisexual, or transgender (LGBT) clients',
    value: 'GL',
  },
  {
    name: 'Veterans',
    value: 'VET',
  },
  {
    name: 'Active duty military',
    value: 'ADM',
  },
  {
    name: 'Military families',
    value: 'MF',
  },
  {
    name: 'Clients referred from the court/judicial system',
    value: 'CJ',
  },
  {
    name: 'Persons with co-occurring mental and substance use disorders',
    value: 'CO',
  },
  {
    name: 'Persons with HIV or AIDS',
    value: 'HV',
  },
  {
    name: 'Persons who have experienced sexual abuse',
    value: 'XA',
  },
  {
    name: 'Persons who have experienced intimate partner violence, domestic violence',
    value: 'DV',
  },
  {
    name: 'Persons who have experienced trauma',
    value: 'TRMA',
  },
];

export const otherAddictions = [
  {
    name: 'Treatment for gambling disorder',
    value: 'TGD',
  },
  {
    name: 'Treatment for internet use disorder',
    value: 'TID',
  },
];

export const ageGroupAccepted = [
  {
    name: 'Adults',
    value: 'ADLT',
  },
  {
    name: 'Children/adolescents',
    value: 'CHLD',
  },
  {
    name: 'Seniors (65 or older)',
    value: 'SNR',
  },
  {
    name: 'Young adults',
    value: 'YAD',
  },
];

export const genderAccepted = [
  {
    name: 'Female',
    value: 'FEM',
  },
  {
    name: 'Male',
    value: 'MALE',
  },
];

export const exclusiveServices = [
  {
    name: 'Methadone and buprenorphine clients only',
    value: 'BMO',
  },
  {
    name: 'Specially designed program for DUI/DWI clients',
    value: 'DU',
  },
  {
    name: 'Serves only DUI/DWI clients',
    value: 'DUO',
  },
  {
    name: 'Methadone clients only',
    value: 'MO',
  },
  {
    name: 'Serves Veterans only',
    value: 'VO',
  },
];
export const languageServices = [
  {
    name: 'Services for the deaf and hard of hearing',
    value: 'AH',
  },
];

export const americanIndianLanguages = [
  {
    name: 'Hopi',
    value: 'N13-Hopi',
  },
  {
    name: 'Lakota',
    value: 'N18-Lakota',
  },
  {
    name: 'Navajo',
    value: 'N23-Navajo',
  },
  {
    name: 'Ojibwa',
    value: 'N24-Ojibwa',
  },
  {
    name: 'Yupik',
    value: 'N40-Yupik',
  },
];

export const otherServiceLanguages = [
  {
    name: 'Spanish',
    value: 'SP-Spanish',
  },
  {
    name: 'Arabic',
    value: 'F4-Arabic',
  },
  {
    name: 'Any Chinese Language',
    value: 'F17-Any Chinese Language',
  },
  {
    name: 'Creole',
    value: 'F19-Creole',
  },
  {
    name: 'Farsi',
    value: 'F25-Farsi',
  },
  {
    name: 'French',
    value: 'F28-French',
  },
  {
    name: 'German',
    value: 'F30-German',
  },
  {
    name: 'Greek',
    value: 'F31-Greek',
  },
  {
    name: 'Hebrew',
    value: 'F35-Hebrew',
  },
  {
    name: 'Hindi',
    value: 'F36-Hindi',
  },
  {
    name: 'Hmong',
    value: 'F37-Hmong',
  },
  {
    name: 'Italian',
    value: 'F42-Italian',
  },
  {
    name: 'Japanese',
    value: 'F43-Japanese',
  },
  {
    name: 'Korean',
    value: 'F47-Korean',
  },
  {
    name: 'Polish',
    value: 'F66-Polish',
  },
  {
    name: 'Portuguese',
    value: 'F67-Portuguese',
  },
  {
    name: 'Russian',
    value: 'F70-Russian',
  },
  {
    name: 'Tagalog',
    value: 'F81-Tagalog',
  },
  {
    name: 'Vietnamese',
    value: 'F92-Vietnamese',
  },
];
