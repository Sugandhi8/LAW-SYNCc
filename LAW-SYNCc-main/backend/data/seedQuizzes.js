const seedQuizzes = [
  {
    question: "What does the Latin term 'Habeas Corpus' literally mean in legal terminology?",
    options: [
      "You shall have the body",
      "To be informed of the cause",
      "By what authority",
      "We command"
    ],
    correctAnswer: 0,
    explanation: "'Habeas Corpus' literally translates to 'you shall have the body' in Latin. It is a constitutional writ used to demand that a prisoner be brought before a court to determine if their detention is lawful."
  },
  {
    question: "Which type of bail is sought when an individual anticipates they might be arrested for a non-bailable offense?",
    options: [
      "Interim Bail",
      "Anticipatory Bail",
      "Regular Bail",
      "Statutory Bail"
    ],
    correctAnswer: 1,
    explanation: "Anticipatory bail (under Section 438 of CrPC) is granted by a Sessions Court or High Court to an individual who fears arrest in a false or non-bailable case before the actual arrest occurs."
  },
  {
    question: "What essential element of a crime refers to the 'guilty mind' or criminal intention?",
    options: [
      "Actus Reus",
      "Res Judicata",
      "Mens Rea",
      "Locus Standi"
    ],
    correctAnswer: 2,
    explanation: "'Mens Rea' refers to the mental element of criminal intent or knowledge that, combined with the physical act ('Actus Reus'), constitutes a crime in criminal law."
  },
  {
    question: "In which type of offense can a police officer make an arrest WITHOUT a judicial warrant?",
    options: [
      "Non-Cognizable Offence",
      "Bailable Civil Breach",
      "Cognizable Offence",
      "Summary Suit"
    ],
    correctAnswer: 2,
    explanation: "In a Cognizable Offence (such as murder, robbery, or kidnapping), police officers have the legal authority to arrest suspects without a court warrant and register a First Information Report (FIR) immediately."
  },
  {
    question: "What does the legal principle 'Res Judicata' prohibit?",
    options: [
      "Appealing to a higher court",
      "Re-litigating a dispute that has already been definitively decided between the same parties",
      "Granting bail before the trial begins",
      "Submitting written testimony under oath"
    ],
    correctAnswer: 1,
    explanation: "'Res Judicata' ('a thing adjudicated') prevents the same parties from filing repeated lawsuits over an issue that has already received a final judgment from a competent court."
  },
  {
    question: "Which contractual clause excuses parties from liability when extraordinary events like natural disasters prevent contract performance?",
    options: [
      "Indemnity Clause",
      "Liquidated Damages Clause",
      "Force Majeure Clause",
      "Severability Clause"
    ],
    correctAnswer: 2,
    explanation: "A Force Majeure clause releases parties from obligations or penalties when an unforeseeable, catastrophic event beyond human control (such as war, floods, or pandemics) makes performance impossible."
  }
];

module.exports = seedQuizzes;
