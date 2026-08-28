export const legalCategories = [
  { id: "all", name: "All Categories", count: 18, icon: "Scale" },
  { id: "criminal", name: "Criminal Law", count: 4, icon: "ShieldAlert" },
  { id: "constitutional", name: "Constitutional Law", count: 3, icon: "Landmark" },
  { id: "civil", name: "Civil & Tort Law", count: 4, icon: "FileText" },
  { id: "corporate", name: "Corporate & Contract", count: 3, icon: "Briefcase" },
  { id: "family", name: "Family Law", count: 2, icon: "HeartHandshake" },
  { id: "cyber", name: "Cyber Law & Tech", count: 2, icon: "Lock" }
];

export const sampleLegalTerms = [
  {
    id: "1",
    word: "Bail",
    pronunciation: "/beɪl/",
    category: "Criminal Law",
    categoryId: "criminal",
    simpleMeaning: "A temporary release of an accused person from jail while waiting for their trial, often requiring a security deposit or bond.",
    definition: "The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money is lodged to guarantee their appearance in court.",
    example: "The Magistrate granted regular bail to the accused after the defense attorney proved the defendant was not a flight risk.",
    relatedLaws: "Code of Criminal Procedure (CrPC) Sec. 436, 437, 439 / Bharatiya Nagarik Suraksha Sanhita (BNSS)",
    relatedTerms: ["Anticipatory Bail", "Surety", "Cognizable Offence", "Remand"],
    keyElements: [
      "Secures court attendance of the accused without pre-trial incarceration",
      "Types include Regular Bail, Interim Bail, and Anticipatory Bail",
      "Granted as a matter of right in bailable offences"
    ],
    isPopular: true,
    isTermOfDay: true
  },
  {
    id: "2",
    word: "Habeas Corpus",
    pronunciation: "/ˌheɪbiəs ˈkɔːrpəs/",
    category: "Constitutional Law",
    categoryId: "constitutional",
    simpleMeaning: "A powerful court order to produce a detained individual before a judge to ensure their detention is lawful.",
    definition: "A Latin term meaning 'you shall have the body'. A prerogative writ commanding a detaining authority to bring a prisoner into court so the court may determine whether the detention is lawful.",
    example: "A Habeas Corpus petition was filed in the High Court when a citizen was held in police custody beyond 24 hours without a judicial magistrate's order.",
    relatedLaws: "Article 32 (Supreme Court) & Article 226 (High Courts) of the Constitution of India",
    relatedTerms: ["Prerogative Writ", "Mandamus", "Certiorari", "Illegal Detention"],
    keyElements: [
      "Protects individual liberty against arbitrary state action",
      "Can be filed by the detainee or by any friend/relative on their behalf",
      "Fundamental constitutional remedy that cannot be easily suspended"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "3",
    word: "Affidavit",
    pronunciation: "/ˌæfɪˈdeɪvɪt/",
    category: "Civil & Tort Law",
    categoryId: "civil",
    simpleMeaning: "A formal written statement of facts made under oath, signed in the presence of a legal authority like a Notary or Magistrate.",
    definition: "A written declaration or statement of facts confirmed by the oath or affirmation of the party making it, taken before an officer having legal authority to administer oaths.",
    example: "The plaintiff submitted a sworn affidavit verifying the timeline of events and attaching copies of disputed contracts.",
    relatedLaws: "Order XIX of the Civil Procedure Code (CPC), 1908 & Notaries Act",
    relatedTerms: ["Deposition", "Oath", "Notary Public", "Perjury"],
    keyElements: [
      "Must state facts within the personal knowledge of the deponent",
      "False statements in an affidavit constitute the punishable offense of perjury",
      "Must be verified and stamped by a licensed Notary or Commissioner"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "4",
    word: "Tort",
    pronunciation: "/tɔːrt/",
    category: "Civil & Tort Law",
    categoryId: "civil",
    simpleMeaning: "A civil wrong (such as negligence, defamation, or trespass) that causes harm to someone and entitles them to claim financial compensation.",
    definition: "A breach of a duty imposed by law which gives rise to a civil right of action for unliquidated damages, distinct from a breach of contract or criminal wrong.",
    example: "When a customer slipped on an unmarked wet floor in the supermarket, she filed a tort suit for damages due to negligence.",
    relatedLaws: "Law of Torts / Consumer Protection Act, 2019 / Common Law Precedents",
    relatedTerms: ["Negligence", "Damages", "Strict Liability", "Defamation"],
    keyElements: [
      "Involves a civil injury rather than a criminal prosecution",
      "The primary remedy is monetary damages (compensation) rather than imprisonment",
      "Requires establishing a legal duty of care, breach of duty, and resulting damage"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "5",
    word: "Anticipatory Bail",
    pronunciation: "/ænˌtɪsɪˈpeɪtəri beɪl/",
    category: "Criminal Law",
    categoryId: "criminal",
    simpleMeaning: "Bail obtained in advance by someone who expects they might be arrested for a non-bailable offense.",
    definition: "A pre-arrest judicial direction issued by a Sessions Court or High Court directing that in the event of an arrest, the person shall be released on bail.",
    example: "Suspecting a politically motivated false complaint, the executive applied for anticipatory bail before the Sessions Court.",
    relatedLaws: "Section 438 of the Code of Criminal Procedure (CrPC) / Sec. 482 BNSS",
    relatedTerms: ["Bail", "Non-Bailable Offence", "FIR", "Arrest Warrant"],
    keyElements: [
      "Applied before any actual arrest takes place",
      "Exclusive jurisdiction lies with the Court of Session and High Court",
      "Prevents harassment and frivolous custody in politically sensitive disputes"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "6",
    word: "Mens Rea",
    pronunciation: "/ˌmɛnz ˈreɪə/",
    category: "Criminal Law",
    categoryId: "criminal",
    simpleMeaning: "The guilty mind or criminal intention needed to prove someone committed a crime.",
    definition: "A Latin term signifying the mental element of intention or knowledge that must accompany an actus reus (guilty act) to constitute a crime in criminal jurisprudence.",
    example: "The prosecution argued that the suspect bought the poison three days earlier, establishing clear mens rea for premeditated murder.",
    relatedLaws: "General Principles of Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)",
    relatedTerms: ["Actus Reus", "Intention", "Negligence", "Strict Liability"],
    keyElements: [
      "Expressed in the legal maxim: 'Actus non facit reum nisi mens sit rea'",
      "Requires criminal intent, knowledge, recklessness, or gross negligence",
      "Exceptions include strict liability offenses like traffic violations or statutory food safety"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "7",
    word: "Locus Standi",
    pronunciation: "/ˌloʊkəs ˈstændaɪ/",
    category: "Constitutional Law",
    categoryId: "constitutional",
    simpleMeaning: "The legal right or ability of a person to bring a lawsuit or be heard in a court of law.",
    definition: "The right or capacity to bring an action or to appear in a court on a particular matter based on having a sufficient legal interest in the subject matter.",
    example: "In Public Interest Litigation (PIL), the Supreme Court relaxed the traditional rule of locus standi to allow public-spirited citizens to represent underprivileged victims.",
    relatedLaws: "Article 32 of the Constitution / Public Interest Litigation Jurisprudence",
    relatedTerms: ["Public Interest Litigation", "Aggrieved Party", "Jurisdiction", "Maintainability"],
    keyElements: [
      "Ensures courts deal with genuine grievances rather than abstract queries",
      "Strictly enforced in private civil suits",
      "Liberalized in constitutional public interest cases"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "8",
    word: "Injunction",
    pronunciation: "/ɪnˈdʒʌŋkʃən/",
    category: "Civil & Tort Law",
    categoryId: "civil",
    simpleMeaning: "A court order that forces someone to stop doing a specific harmful act, or compels them to carry out an obligation.",
    definition: "An equitable judicial order that commands a party to refrain from doing a specific act (prohibitory) or requires them to take specific affirmative action (mandatory).",
    example: "The property owner obtained an interim temporary injunction preventing the neighbor from cutting down trees on the disputed boundary.",
    relatedLaws: "Specific Relief Act, 1963 (Sections 36-42) & CPC Order XXXIX",
    relatedTerms: ["Stay Order", "Specific Performance", "Contempt of Court", "Interim Relief"],
    keyElements: [
      "Can be temporary (interim) during the lawsuit or perpetual (permanent) after final decree",
      "Requires showing prima facie case, balance of convenience, and irreparable injury",
      "Violation results in civil contempt and property attachment"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "9",
    word: "Indemnity",
    pronunciation: "/ɪnˈdɛmnɪti/",
    category: "Corporate & Contract",
    categoryId: "corporate",
    simpleMeaning: "A legal promise where one party agrees to cover the financial loss or legal liability incurred by another party.",
    definition: "A contract by which one party promises to save the other from loss caused to him by the conduct of the promisor himself, or by the conduct of any other person.",
    example: "The software vendor included an indemnity clause to protect the client against any copyright infringement claims by third parties.",
    relatedLaws: "Section 124 & 125 of the Indian Contract Act, 1872",
    relatedTerms: ["Guarantee", "Damages", "Liability", "Warranty"],
    keyElements: [
      "Two parties: Indemnifier (who promises protection) and Indemnity-holder (who is protected)",
      "Covers all costs, damages, and compromise settlements incurred in good faith",
      "Fundamental risk mitigation tool in commercial and corporate contracts"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "10",
    word: "Liquidated Damages",
    pronunciation: "/ˈlɪkwɪdeɪtɪd ˈdæmɪdʒɪz/",
    category: "Corporate & Contract",
    categoryId: "corporate",
    simpleMeaning: "A predetermined amount of money specified in a contract that must be paid if one party breaks the agreement.",
    definition: "A genuine pre-estimate of loss agreed upon by parties at the time of contract execution to be paid in the event of a breach.",
    example: "The construction agreement specified liquidated damages of $1,000 for each day of delay past the project completion deadline.",
    relatedLaws: "Section 74 of the Indian Contract Act, 1872",
    relatedTerms: ["Penalty", "Unliquidated Damages", "Breach of Contract", "Specific Performance"],
    keyElements: [
      "Saves the court time by avoiding complex damages calculations post-breach",
      "Must represent a reasonable pre-estimate rather than an oppressive punitive penalty",
      "Enforceable to the extent of actual loss proved up to the stipulated limit"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "11",
    word: "Alimony",
    pronunciation: "/ˈælɪməni/",
    category: "Family Law",
    categoryId: "family",
    simpleMeaning: "Financial support that a court orders a person to pay regularly to their spouse after separation or divorce.",
    definition: "A court-ordered allowance that one spouse is legally required to pay for the other spouse's maintenance and support following a legal separation or divorce.",
    example: "The Family Court ordered permanent alimony based on the husband's income, standard of living, and duration of marriage.",
    relatedLaws: "Section 25 of the Hindu Marriage Act, 1955 / Special Marriage Act / CrPC Section 125",
    relatedTerms: ["Maintenance", "Child Custody", "Dissolution of Marriage", "Judicial Separation"],
    keyElements: [
      "Can be interim (during legal proceedings) or permanent (awarded at final decree)",
      "Determined by financial needs, earning capacity, and marital lifestyle",
      "Subject to modification upon significant change in economic circumstances"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "12",
    word: "Phishing",
    pronunciation: "/ˈfɪʃɪŋ/",
    category: "Cyber Law & Tech",
    categoryId: "cyber",
    simpleMeaning: "A fraudulent attempt by cybercriminals to trick people into revealing sensitive passwords, OTPs, or credit card details through fake messages or emails.",
    definition: "A fraudulent attempt to obtain sensitive information such as usernames, passwords, and financial details by disguising oneself as a trustworthy entity in electronic communication.",
    example: "The cyber cell registered a case under the IT Act against fraudsters who deployed phishing emails mimicking a national bank portal.",
    relatedLaws: "Section 66C & 66D of the Information Technology Act, 2000 & IPC Sec. 420",
    relatedTerms: ["Identity Theft", "Cybercrime", "Data Privacy", "Spoofing"],
    keyElements: [
      "Involves electronic impersonation and deception for unlawful gain",
      "Punishable with imprisonment up to 3 years and financial fines",
      "Encompasses email phishing, smishing (SMS), and vishing (voice calls)"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "13",
    word: "Data Privacy",
    pronunciation: "/ˈdeɪtə ˈpraɪvəsi/",
    category: "Cyber Law & Tech",
    categoryId: "cyber",
    simpleMeaning: "The legal right of individuals to control how their personal information is collected, stored, and shared online.",
    definition: "The legal framework and branch of law concerning the appropriate handling, processing, protection, and storage of personal data and confidential information.",
    example: "Under the new Data Protection Act, tech companies face severe penalties if they process user data without explicit consent.",
    relatedLaws: "Digital Personal Data Protection Act, 2023 (DPDP) / GDPR / IT Act Sec. 43A",
    relatedTerms: ["Consent", "Data Fiduciary", "Right to Privacy", "Cyber Security"],
    keyElements: [
      "Recognized as a Fundamental Right under Article 21 (Puttaswamy Judgment)",
      "Requires explicit notice and consent before personal data processing",
      "Enforces data minimization, purpose limitation, and right to erasure"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "14",
    word: "Sub Judice",
    pronunciation: "/sʌb ˈdʒuːdɪsi/",
    category: "Constitutional Law",
    categoryId: "constitutional",
    simpleMeaning: "A matter that is currently under judicial consideration and therefore prohibited from public discussion that could bias the trial.",
    definition: "A Latin legal doctrine meaning 'under a judge', referring to a case that is actively ongoing in a court of law and where public prejudgment is restricted to prevent prejudice to a fair trial.",
    example: "The minister declined to comment on the land dispute, stating that the subject matter was sub judice before the High Court.",
    relatedLaws: "Contempt of Courts Act, 1971 & Article 19(2) reasonable restrictions",
    relatedTerms: ["Contempt of Court", "Judicial Review", "Trial by Media", "Fair Trial"],
    keyElements: [
      "Protects the integrity of active legal proceedings from external bias",
      "Violations may trigger criminal contempt of court",
      "Balances freedom of speech with the constitutional guarantee of a fair trial"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "15",
    word: "Cognizable Offence",
    pronunciation: "/ˈkɒɡnɪzəbəl əˈfɛns/",
    category: "Criminal Law",
    categoryId: "criminal",
    simpleMeaning: "A serious crime where a police officer can arrest the suspect immediately without needing an arrest warrant from a court.",
    definition: "An offence for which a police officer may, in accordance with the First Schedule or under any other law for the time being in force, arrest without warrant and start an investigation without court permission.",
    example: "Because armed robbery is a cognizable offence, the police registered a First Information Report (FIR) and arrested the suspects immediately.",
    relatedLaws: "CrPC Section 2(c), Section 154 / BNSS Section 2(g)",
    relatedTerms: ["Non-Cognizable Offence", "FIR", "Arrest Warrant", "Investigation"],
    keyElements: [
      "Applies to serious crimes like murder, theft, kidnapping, and rape",
      "Mandates immediate registration of a formal FIR under Section 154",
      "Police possess full statutory powers to investigate without prior judicial authorization"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "16",
    word: "Force Majeure",
    pronunciation: "/ˌfɔːrs mæˈʒɜːr/",
    category: "Corporate & Contract",
    categoryId: "corporate",
    simpleMeaning: "An unforeseeable, extraordinary event (like a natural disaster, war, or epidemic) that frees both parties from liability for failing to perform a contract.",
    definition: "A contractual clause allocating risk when an unforeseeable event beyond the reasonable control of the parties prevents them from fulfilling contract obligations.",
    example: "The airline invoked the force majeure clause to cancel charter flights during the volcano eruption without incurring breach penalties.",
    relatedLaws: "Section 56 (Doctrine of Frustration) of the Indian Contract Act, 1872",
    relatedTerms: ["Doctrine of Frustration", "Act of God", "Breach of Contract", "Impossibility"],
    keyElements: [
      "Requires an unforeseeable, external, and unavoidable event",
      "Relieves the affected party from performance or liability for damages",
      "Requires timely notice and mitigation of damages where possible"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    id: "17",
    word: "Res Judicata",
    pronunciation: "/ˌreɪz ˌdʒuːdɪˈkɑːtə/",
    category: "Civil & Tort Law",
    categoryId: "civil",
    simpleMeaning: "A rule that once a dispute has been definitively decided by a competent court, the same parties cannot sue each other again over the same issue.",
    definition: "A matter that has been adjudicated by a competent court and may not be pursued further by the same parties ('a thing decided').",
    example: "The judge dismissed the new property claim because the same title dispute was conclusively settled five years ago between the same family members.",
    relatedLaws: "Section 11 of the Civil Procedure Code (CPC), 1908",
    relatedTerms: ["Estoppel", "Finality of Judgment", "Double Jeopardy", "Civil Procedure"],
    keyElements: [
      "Brings finality to litigation and prevents unending harassment",
      "Requires identical parties, same subject matter, and decision on merits by a competent court",
      "Applies to both civil suits and writ petitions"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    id: "18",
    word: "Guardian Ad Litem",
    pronunciation: "/ˈɡɑːrdiən æd ˈlaɪtɛm/",
    category: "Family Law",
    categoryId: "family",
    simpleMeaning: "A neutral person or lawyer appointed by a court to represent the best interests of a child or incapacitated person during a legal dispute.",
    definition: "A guardian appointed by a court to look after the interests of an infant, child, or legally incompetent person during a specific lawsuit.",
    example: "In the contested custody battle, the judge appointed a Guardian Ad Litem to advocate solely for the 7-year-old child's safety and education.",
    relatedLaws: "Order XXXII of the Civil Procedure Code (CPC) & Guardians and Wards Act, 1890",
    relatedTerms: ["Child Custody", "Ward", "Next Friend", "Parental Rights"],
    keyElements: [
      "Appointed specifically for the duration and purpose of litigation ('ad litem')",
      "Prioritizes the best interest and welfare of the child above parental conflict",
      "Submits unbiased evaluation reports directly to the judge"
    ],
    isPopular: false,
    isTermOfDay: false
  }
];
