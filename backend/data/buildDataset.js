const fs = require('fs');
const path = require('path');

const additionalTerms = [
  // Constitutional Law additions
  {
    word: "Doctrine of Eclipse",
    pronunciation: "/ˈdɒktrɪn ɒv ɪˈklɪps/",
    category: "Constitutional Law",
    simpleMeaning: "A constitutional rule where a pre-constitutional law violating Fundamental Rights is not dead, but remains dormant/shadowed and becomes active again if the constitutional restriction is removed.",
    definition: "A constitutional doctrine providing that pre-constitutional laws inconsistent with Fundamental Rights are not void ab initio, but remain in a dormant, non-enforceable state (overshadowed by the eclipse) and become operative again if a constitutional amendment removes the conflict.",
    example: "The Supreme Court applied the Doctrine of Eclipse to hold that the pre-1950 statutory motor transport monopoly became enforceable again after constitutional amendments permitted state monopolies.",
    relatedLaws: "Article 13(1) of Constitution of India / Bhikaji Narain Dhakras v. State of M.P. (1955)",
    relatedTerms: ["Doctrine of Severability", "Judicial Review", "Ultra Vires", "Basic Structure Doctrine"],
    keyElements: [
      "Applies primarily to pre-constitutional laws under Article 13(1)",
      "Law is not permanently dead, but merely moribund/sleeping against citizens",
      "Lifting the constitutional shadow revives statutory enforceability automatically"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Doctrine of Pith and Substance",
    pronunciation: "/ˈdɒktrɪn ɒv pɪθ ænd ˈsʌbstəns/",
    category: "Constitutional Law",
    simpleMeaning: "A rule used by courts to determine the true nature and character of a law to decide whether Parliament or a State Legislature had the power to make it.",
    definition: "A constitutional doctrine used to examine the true purpose and essential substance of an impugned enactment when it incidentally encroaches upon a legislative field reserved for another legislative body under the Seventh Schedule.",
    example: "The state law regulating moneylenders was held constitutionally valid under the Doctrine of Pith and Substance even though it incidentally affected promissory notes.",
    relatedLaws: "Article 246 & Seventh Schedule of Constitution of India / State of Bombay v. F.N. Balsara (1951)",
    relatedTerms: ["Judicial Review", "Ultra Vires", "Separation of Powers", "Delegated Legislation"],
    keyElements: [
      "Focuses on the true substance and core objective of the legislation rather than incidental side effects",
      "Prevents invalidation of legitimate statutes due to minor incidental overlap",
      "Preserves the federal distribution of legislative powers under the Seventh Schedule"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Criminal Law additions
  {
    word: "Defamation (Criminal)",
    pronunciation: "/ˌdɛfəˈmeɪʃən/",
    category: "Criminal Law",
    simpleMeaning: "The criminal offence of knowingly publishing false and harmful statements against a person to damage their reputation in society.",
    definition: "Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person.",
    example: "The politician faced trial for criminal defamation after making unsubstantiated corruption allegations in a press conference.",
    relatedLaws: "Section 356 of Bharatiya Nyaya Sanhita (BNS), 2023 (formerly IPC Sec. 499 & 500) / Subramanian Swamy v. Union of India (2016)",
    relatedTerms: ["Tort", "Mens Rea", "Freedom of Press", "Sub Judice"],
    keyElements: [
      "Requires imputation made with intention or knowledge of causing reputational harm",
      "Recognizes 10 statutory exceptions including truth for public good, public conduct of public servants, and fair criticism",
      "Punishable with simple imprisonment up to 2 years, or fine, or both, or community service under BNS"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Kidnapping vs Abduction",
    pronunciation: "/ˈkɪdnæpɪŋ vɜːrsəs æbˈdʌkʃən/",
    category: "Criminal Law",
    simpleMeaning: "Kidnapping is taking away a minor or person of unsound mind without guardian consent; Abduction is forcibly or deceitfully compelling any person to go from any place.",
    definition: "Kidnapping from lawful guardianship is taking or enticing a minor (under 18) without guardian consent (substantive offence), whereas Abduction involves compelling by force or deceitful means any person to go from any place (auxiliary act punishable when combined with criminal intent).",
    example: "Taking the 15-year-old from school without parental knowledge constituted kidnapping, whereas forcing an adult into a car at gunpoint for ransom constituted abduction.",
    relatedLaws: "Sections 137 to 140 of Bharatiya Nyaya Sanhita (BNS), 2023 (formerly IPC Sec. 359-369)",
    relatedTerms: ["Culpable Homicide", "Mens Rea", "POCSO Act", "Actus Reus"],
    keyElements: [
      "Kidnapping is restricted to minors (under 18) or persons of unsound mind; Abduction applies to persons of any age",
      "Consent of the minor is immaterial in kidnapping from lawful guardianship",
      "Abduction requires physical force or deceitful inducement coupled with a specific criminal purpose"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Criminal Procedure additions
  {
    word: "Inquest Report",
    pronunciation: "/ˈɪnkwɛst rɪˈpɔːrt/",
    category: "Criminal Procedure",
    simpleMeaning: "An official inquiry report prepared by police or an executive magistrate to determine the apparent cause of an unnatural, sudden, or suspicious death.",
    definition: "A statutory inquiry and written report prepared by a police officer or magistrate regarding the apparent cause of death in cases of suicide, homicide, fatal accidents, or sudden death under suspicious circumstances.",
    example: "The Executive Magistrate conducted an inquest report at the hospital within 4 hours of the suspicious custodial death.",
    relatedLaws: "Sections 194, 195 & 196 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly CrPC Sec. 174-176)",
    relatedTerms: ["First Information Report (FIR)", "Investigation", "Charge Sheet", "Remand"],
    keyElements: [
      "Aimed strictly at determining apparent cause of death, visible marks, and wounds on the body",
      "Mandatory magistrate inquest in cases of custodial death or death of a woman within 7 years of marriage",
      "Does not determine who committed the crime, which is the subject of main investigation"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Compounding of Offences",
    pronunciation: "/kəmˈpaʊndɪŋ ɒv əˈfɛnsɪz/",
    category: "Criminal Procedure",
    simpleMeaning: "A legal settlement between the victim and accused where the victim agrees to drop charges in exchange for compromise or compensation, leading to acquittal.",
    definition: "A statutory process in criminal procedure whereby the victim and accused settle a compoundable criminal dispute with or without court permission, resulting in a formal judicial acquittal of the accused.",
    example: "The victim of simple hurt compounded the case after receiving an apology and payment of medical expenses from the accused.",
    relatedLaws: "Section 359 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (formerly CrPC Sec. 320)",
    relatedTerms: ["Plea Bargaining", "Lok Adalat", "Bail", "Summary Trial"],
    keyElements: [
      "Only offences specifically enumerated in the statutory table can be compounded",
      "Produces the legal effect of a full acquittal of the accused",
      "Non-compoundable serious felonies cannot be settled even if the victim consents"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Civil Law additions
  {
    word: "Injuria Sine Damno",
    pronunciation: "/ɪnˈdʒʊəriə ˈsaɪni ˈdæmnoʊ/",
    category: "Civil Law",
    simpleMeaning: "The violation of an absolute legal right of a person that gives them the right to sue, even if they suffered zero actual financial or physical loss.",
    definition: "A Latin maxim meaning 'injury without actual damage', establishing that an infringement of an absolute private legal right gives rise to a valid cause of action for damages, even if no monetary loss or physical harm occurred.",
    example: "In Ashby v. White, the returning officer who wrongfully prevented a registered voter from casting his ballot was held liable despite no financial loss.",
    relatedLaws: "Law of Torts & Civil Jurisprudence / Ashby v. White (1703) / Bhim Singh v. State of J&K (1985)",
    relatedTerms: ["Damnum Sine Injuria", "Cause of Action", "Tort", "Damages"],
    keyElements: [
      "Actionable per se without requiring proof of actual financial damage",
      "Focuses on vindicating and upholding constitutional and legal rights",
      "Exemplified in unlawful detention, trespass to land, and denial of voting rights"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Declaratory Decree",
    pronunciation: "/dɪˈklærətəri dɪˈkriː/",
    category: "Civil Law",
    simpleMeaning: "A formal court judgment that officially declares a person's legal rights, status, or title to property to remove doubt or dispute.",
    definition: "A judicial decree passed by a civil court conclusively declaring the plaintiff's title to any legal character or property right against persons who deny or are interested in denying such right.",
    example: "The adopted son filed a suit for a declaratory decree to establish his lawful title as the sole legal heir to the estate.",
    relatedLaws: "Section 34 & Section 35 of Specific Relief Act, 1963",
    relatedTerms: ["Specific Performance", "Injunction", "Decree", "Cause of Action"],
    keyElements: [
      "Discretionary relief granted to clarify and stabilize disputed legal rights",
      "Plaintiff must establish an existing legal character or title to property",
      "Plaintiff must also claim consequential relief if able to do so (proviso to Sec. 34)"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Civil Procedure additions
  {
    word: "Framing of Issues",
    pronunciation: "/ˈfreɪmɪŋ ɒv ˈɪʃuːz/",
    category: "Civil Procedure",
    simpleMeaning: "The crucial stage in a civil lawsuit where the judge identifies and writes down the exact points of disagreement between the plaintiff and defendant to be decided during trial.",
    definition: "The judicial formulation by the court of specific points of dispute (issues of fact and issues of law) arising when a material proposition of fact or law is affirmed by one party and denied by the other in their pleadings.",
    example: "The trial judge framed three substantive issues: whether the sale agreement was genuine, whether time was of essence, and whether the buyer was ready and willing.",
    relatedLaws: "Order XIV of Code of Civil Procedure (CPC), 1908",
    relatedTerms: ["Plaint", "Written Statement", "Res Judicata", "Cause of Action"],
    keyElements: [
      "Determines the scope, boundaries, and evidence permissible during the entire trial",
      "Issues of law touching court jurisdiction can be tried as preliminary issues under Order XIV Rule 2",
      "Court may amend or strike out issues at any stage before passing a decree"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Execution of Decree",
    pronunciation: "/ˌɛksɪˈkjuːʃən ɒv dɪˈkriː/",
    category: "Civil Procedure",
    simpleMeaning: "The formal legal enforcement process where the court uses police or bailiffs to compel a losing party to carry out the judgment (such as paying money or handing over property).",
    definition: "The procedural mechanism by which a decree-holder enforces the terms and directions of a final civil court decree or order through attachment of property, arrest/detention, or appointment of a receiver.",
    example: "When the defaulting debtor refused to pay the awarded sum, the decree-holder filed an execution petition under Order XXI to attach the commercial bank accounts.",
    relatedLaws: "Sections 36 to 74 & Order XXI of Code of Civil Procedure (CPC), 1908",
    relatedTerms: ["Decree", "Ex-Parte Decree", "Injunction", "Attachment Before Judgment"],
    keyElements: [
      "Governed comprehensively by Order XXI CPC, the largest procedural code in civil law",
      "Modes include delivery of property, attachment and sale, arrest and civil detention, and receivership",
      "Enforces the decree against the judgment-debtor or their legal representatives"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Law of Evidence additions
  {
    word: "Confession",
    pronunciation: "/kənˈfɛʃən/",
    category: "Law of Evidence",
    simpleMeaning: "An admission made by an accused person stating or suggesting that they committed the crime.",
    definition: "A direct or indirect admission made at any time by a person charged with a crime, stating or suggesting the inference that they committed that crime.",
    example: "The judicial confession recorded by the Magistrate under statutory safeguards was admitted as key prosecution evidence.",
    relatedLaws: "Sections 22 to 24 of Bharatiya Sakshya Adhiniyam (BSA), 2023 (formerly Sec. 24-30 IEA)",
    relatedTerms: ["Admission", "Dying Declaration", "Hostile Witness", "Burden of Proof"],
    keyElements: [
      "Confessions made to police officers are strictly inadmissible in court under Indian law",
      "Must be voluntary and recorded before a Judicial Magistrate under Section 183 BNSS",
      "Discovery of facts resulting from information given in custody is admissible under Section 23 BSA"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Res Gestae",
    pronunciation: "/reɪz ˈdʒɛstiː/",
    category: "Law of Evidence",
    simpleMeaning: "Spontaneous statements or acts made so closely connected to the crime/event that they form part of the same continuous transaction and are admissible as evidence.",
    definition: "A Latin rule of evidence referring to facts that, though not directly in issue, are so connected with a fact in issue as to form part of the same transaction, making spontaneous utterances and concurrent acts admissible.",
    example: "The screams of eyewitnesses calling out the getaway vehicle's number plate during the robbery were admitted as part of res gestae.",
    relatedLaws: "Section 4 of Bharatiya Sakshya Adhiniyam (BSA), 2023 (formerly Sec. 6 Indian Evidence Act)",
    relatedTerms: ["Dying Declaration", "Electronic Evidence", "Burden of Proof", "Admission"],
    keyElements: [
      "Statements must be spontaneous, contemporaneous with the act, and leave no room for concoction",
      "Forms a recognized common-law exception to the rule against hearsay evidence",
      "Applies across both civil disputes and criminal prosecutions"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Contract Law additions
  {
    word: "Coercion",
    pronunciation: "/koʊˈɜːrʃən/",
    category: "Contract Law",
    simpleMeaning: "Forcing someone into signing a contract by committing or threatening to commit an unlawful act, or unlawfully detaining property.",
    definition: "The committing, or threatening to commit, any act forbidden by criminal law, or the unlawful detaining, or threatening to detain, any property, to the prejudice of any person whatever, with the intention of causing any person to enter into an agreement.",
    example: "The property transfer agreement was voidable because the seller was forced to sign under threat of bodily harm.",
    relatedLaws: "Section 15 & Section 19 of Indian Contract Act, 1872 / Chikham Amiraju v. Seshamma",
    relatedTerms: ["Undue Influence", "Consensus Ad Idem", "Void Contract", "Breach of Contract"],
    keyElements: [
      "Involves physical threats, criminal intimidation, or unlawful detention of property",
      "Renders the resulting contract voidable at the option of the coerced party",
      "Threat need not proceed directly from the party to the contract or be directed at the contracting party"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Novation",
    pronunciation: "/noʊˈveɪʃən/",
    category: "Contract Law",
    simpleMeaning: "The substitution of an existing contract with a brand new contract, or replacing an old contracting party with a new one by mutual consent.",
    definition: "The act of replacing an existing valid obligation or contract with a new contract, or substituting a new debtor or creditor in place of an old one, which completely extinguishes the original contract.",
    example: "The bank agreed to a novation where the parent conglomerate assumed all debt obligations of its subsidiary, releasing the subsidiary from liability.",
    relatedLaws: "Section 62 of Indian Contract Act, 1872",
    relatedTerms: ["Breach of Contract", "Consensus Ad Idem", "Doctrine of Frustration", "Indemnity"],
    keyElements: [
      "Requires unanimous agreement and consensus ad idem of all old and new parties",
      "Completely discharges and extinguishes the liabilities under the original contract",
      "Must take place before the breach of the original contract occurs"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Tort Law additions
  {
    word: "Nuisance (Public and Private)",
    pronunciation: "/ˈnjuːsəns/",
    category: "Tort Law",
    simpleMeaning: "Unlawful interference with a person's enjoyment of their land (Private Nuisance) or an act that causes injury or danger to the public at large (Public Nuisance).",
    definition: "An unlawful and unreasonable interference with a person's use or enjoyment of land or some right connected therewith (Private Nuisance in tort), or an act causing common injury, danger, or annoyance to the general public (Public Nuisance).",
    example: "The factory operating heavy machinery at 3 AM was restrained by an injunction for causing private noise nuisance to neighbouring residents.",
    relatedLaws: "Law of Torts & Section 270 of Bharatiya Nyaya Sanhita (BNS) / Section 152 of BNSS (formerly CrPC Sec. 133)",
    relatedTerms: ["Tort", "Injunction", "Absolute Liability", "Damages"],
    keyElements: [
      "Private Nuisance protects peaceful enjoyment of real property",
      "Public Nuisance affects the health, safety, or comfort of the community at large",
      "Remedies include injunctions, damages, and executive magistrate removal orders"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Res Ipsa Loquitur",
    pronunciation: "/reɪz ˈɪpsə ˈloʊkwɪtər/",
    category: "Tort Law",
    simpleMeaning: "A Latin rule meaning 'the thing speaks for itself'—when an accident could only happen through negligence, negligence is presumed without direct proof.",
    definition: "A doctrine of evidence in tort law meaning 'the thing speaks for itself', allowing the court to infer negligence from the very nature of the accident or injury when the instrumentality was under the defendant's exclusive control.",
    example: "When a surgical sponge was left inside a patient during surgery, res ipsa loquitur shifted the burden to the surgical team to explain the absence of negligence.",
    relatedLaws: "Law of Torts / Municipal Corporation of Delhi v. Subhagwanti (1966)",
    relatedTerms: ["Tort", "Absolute Liability", "Strict Liability", "Burden of Proof"],
    keyElements: [
      "Instrumentality causing harm was under the exclusive management and control of the defendant",
      "Accident is of a kind that does not ordinarily occur without negligence",
      "Shifts the burden to the defendant to prove that the accident occurred without fault"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Property Law additions
  {
    word: "Rule Against Perpetuity",
    pronunciation: "/ruːl əˈɡɛnst ˌpɜːrpəˈtjuːɪti/",
    category: "Property Law",
    simpleMeaning: "A property law rule that stops a person from tying up property ownership through endless future generations, requiring interests to vest within a specific lifetime plus minority.",
    definition: "A statutory rule prohibiting the creation of property transfers that delay the vesting of ownership beyond the lifetime of one or more living persons and the minority (18 years) of some unborn person.",
    example: "The property trust clause attempting to postpone absolute ownership to great-great-grandchildren was void under the rule against perpetuity.",
    relatedLaws: "Section 14 of Transfer of Property Act, 1882",
    relatedTerms: ["Doctrine of Lis Pendens", "Title Deed", "Mortgage", "Intestate Succession"],
    keyElements: [
      "Ensures property remains alienable and marketable in commerce rather than permanently tied up",
      "Maximum permissible postponement is 'life or lives in being + minority of ultimate beneficiary'",
      "Vesting cannot be postponed to an unborn person without transferring the entire remaining interest"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Encumbrance Certificate",
    pronunciation: "/ɪnˈkʌmbrəns sərˈtɪfɪkət/",
    category: "Property Law",
    simpleMeaning: "An official government document issued by the sub-registrar showing whether a property has any registered mortgages, legal disputes, or unpaid bank loans against it.",
    definition: "A mandatory evidentiary document issued by the Sub-Registrar's Office registering all registered property transactions (sales, mortgages, leases, attachments) over a specified period to verify clean and clear title.",
    example: "Before finalizing the land purchase, the buyer secured a 30-year Encumbrance Certificate (EC) from the sub-registrar to confirm zero pending bank mortgages.",
    relatedLaws: "Registration Act, 1908 & Transfer of Property Act, 1882",
    relatedTerms: ["Title Deed", "Mortgage", "Doctrine of Lis Pendens", "RERA Act"],
    keyElements: [
      "Essential component of legal due diligence in real estate purchases",
      "Reflects all registered transactions and registered mortgage charges on the property",
      "Form 15 issued if encumbrances exist; Nil Encumbrance Certificate (Form 16) issued if clear"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Family Law additions
  {
    word: "Mutual Consent Divorce",
    pronunciation: "/ˈmjuːtʃuəl kənˈsɛnt dɪˈvɔːrs/",
    category: "Family Law",
    simpleMeaning: "A quick and dignified divorce process where both husband and wife mutually agree that they cannot live together and jointly petition the family court to dissolve the marriage.",
    definition: "A streamlined statutory procedure where both spouses jointly petition the Family Court for dissolution of marriage on the grounds that they have lived separately for one year or more, cannot live together, and have mutually agreed to dissolve the marriage.",
    example: "After settling alimony and child custody terms amicably, the couple obtained a decree of divorce by mutual consent.",
    relatedLaws: "Section 13B of Hindu Marriage Act, 1955 & Section 28 of Special Marriage Act, 1954 / Amardeep Singh v. Harveen Kaur (2017)",
    relatedTerms: ["Alimony", "Restitution of Conjugal Rights", "Child Custody", "Streedhan"],
    keyElements: [
      "Requires joint petition filed by both husband and wife",
      "Statutory 6-month cooling-off period between First and Second Motion can be waived by courts if settlement is complete",
      "Avoids lengthy, acrimonious fault-based matrimonial trials"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Mehr (Dower)",
    pronunciation: "/mɛər/",
    category: "Family Law",
    simpleMeaning: "A mandatory sum of money or property that a Muslim husband promises or pays to his wife upon marriage as a mark of respect and financial security.",
    definition: "A mandatory sum of money or other property which the wife is entitled to receive from the husband in consideration of marriage under Islamic law, serving as a financial safeguard for the wife.",
    example: "The family court directed the husband to pay the deferred Mehr of ₹5,00,000 upon the pronouncement of divorce.",
    relatedLaws: "Muslim Personal Law (Shariat) Application Act, 1937 & Muslim Women (Protection of Rights on Divorce) Act, 1986",
    relatedTerms: ["Alimony", "Streedhan", "Maintenance", "Dissolution of Marriage"],
    keyElements: [
      "Constitutes the absolute statutory and religious property right of the Muslim wife",
      "Categorized into Prompt Mehr (payable immediately on marriage) and Deferred Mehr (payable upon divorce or death)",
      "Wife can retain possession of husband's estate until unpaid dower debt is fully satisfied"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Company Law additions
  {
    word: "Memorandum of Association (MoA)",
    pronunciation: "/ˌmɛməˈrændəm ɒv əˌsoʊsiˈeɪʃən/",
    category: "Company / Corporate Law",
    simpleMeaning: "The fundamental legal charter of a company that defines its name, registered office, capital, and the exact business activities it is allowed to do.",
    definition: "The primary constitutional charter of a company defining its core object clauses, scope of legal existence, authorized share capital, and external powers beyond which it cannot legally act.",
    example: "The board called an extraordinary general meeting to amend the object clause of the Memorandum of Association to enter the renewable energy sector.",
    relatedLaws: "Section 4 & Section 13 of Companies Act, 2013",
    relatedTerms: ["Doctrine of Ultra Vires", "Articles of Association (AoA)", "Corporate Veil", "National Company Law Tribunal (NCLT)"],
    keyElements: [
      "Contains mandatory clauses: Name, Registered Office, Objects, Liability, Capital, and Association",
      "Defines the boundary line between the company and external contracting parties",
      "Any contract outside the object clause is ultra vires and void"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Articles of Association (AoA)",
    pronunciation: "/ˈɑːrtɪkəlz ɒv əˌsoʊsiˈeɪʃən/",
    category: "Company / Corporate Law",
    simpleMeaning: "The internal rulebook of a company governing daily operations, voting rights of shareholders, director duties, and board procedures.",
    definition: "The subordinate constitutional document containing internal regulations, bylaws, and governance rules for managing the internal affairs, director powers, and shareholder rights of a company.",
    example: "Under the company's Articles of Association, the appointment of an independent managing director required a 75% special resolution vote.",
    relatedLaws: "Section 5 & Section 14 of Companies Act, 2013",
    relatedTerms: ["Memorandum of Association (MoA)", "Corporate Veil", "Oppression and Mismanagement", "Independent Director"],
    keyElements: [
      "Subordinate to the Companies Act and Memorandum of Association",
      "Governs internal administration, allotment of shares, board meetings, and voting powers",
      "Can be altered by passing a special resolution in a general meeting of shareholders"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Commercial Law additions
  {
    word: "Limited Liability Partnership (LLP)",
    pronunciation: "/ˈlɪmɪtɪd ˌlaɪəˈbɪlɪti ˈpɑːrtnərʃɪp/",
    category: "Commercial Law",
    simpleMeaning: "A hybrid business structure combining the operational flexibility of a partnership with the limited liability protection of a corporate company.",
    definition: "A corporate business vehicle that provides the benefits of limited liability to its partners while allowing them the flexibility of organizing internal management on the basis of a mutually agreed partnership agreement.",
    example: "The three corporate lawyers established an LLP to run their legal consultancy with individual liability protection.",
    relatedLaws: "Limited Liability Partnership Act, 2008",
    relatedTerms: ["Corporate Veil", "Promissory Note", "Commercial Court", "Breach of Contract"],
    keyElements: [
      "Separate legal entity with perpetual succession distinct from its partners",
      "Partners are not personally liable for the wrongful acts or negligence of other partners",
      "Governed by the registered LLP Agreement and regulated by the Ministry of Corporate Affairs"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Letter of Credit (LC)",
    pronunciation: "/ˈlɛtər ɒv ˈkrɛdɪt/",
    category: "Commercial Law",
    simpleMeaning: "A financial guarantee from a bank promising that a seller will receive payment for goods once verified shipping documents are submitted.",
    definition: "A contractual commitment issued by a bank at the request of a buyer, guaranteeing that payment will be made to the seller upon presentation of strictly compliant shipping and trade documents.",
    example: "The international copper importer opened an irrevocable Letter of Credit with the state bank to secure the shipment from Australia.",
    relatedLaws: "Uniform Customs and Practice for Documentary Credits (UCP 600) & Negotiable Instruments Act",
    relatedTerms: ["Unpaid Seller", "Promissory Note", "Banker's Lien", "SARFAESI Act"],
    keyElements: [
      "Banks deal in documents, not goods (Principle of Autonomy of LC)",
      "Strict compliance of presentation documents is mandatory before payment release",
      "Courts rarely grant injunctions against encashment of irrevocable LCs except in cases of egregious fraud"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Consumer Law additions
  {
    word: "Central Consumer Protection Authority (CCPA)",
    pronunciation: "/ˈsɛntrəl kənˈsjuːmər prəˈtɛkʃən ɔːˈθɒrɪti/",
    category: "Consumer Law",
    simpleMeaning: "A national government regulatory body with wide powers to investigate unfair trade practices, recall unsafe products, and fine misleading advertisements.",
    definition: "A statutory regulatory body established under the Consumer Protection Act, 2019, empowered to promote, protect, and enforce consumer rights as a class, investigate violations, order product recalls, and penalize false endorsements.",
    example: "The CCPA issued a ₹10 lakh penalty against the beverage company for circulating false advertisements claiming miraculous immunity boosting.",
    relatedLaws: "Sections 10 to 27 of Consumer Protection Act, 2019",
    relatedTerms: ["Product Liability", "Unfair Trade Practice", "Deficiency in Service", "Misleading Advertisement"],
    keyElements: [
      "Equipped with an Investigative Wing headed by a Director-General to conduct search and seizure",
      "Can initiate class action suits on behalf of consumers before Consumer Commissions",
      "Imposes penalties on manufacturers, endorsers, and publishers of misleading advertisements"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Labour Law additions
  {
    word: "Layoff",
    pronunciation: "/ˈleɪɒf/",
    category: "Labour and Employment Law",
    simpleMeaning: "The temporary inability of an employer to give work to employees due to shortage of power, raw materials, or machine breakdown, requiring 50% compensation.",
    definition: "The failure, refusal or inability of an employer on account of shortage of coal, power or raw materials, or the accumulation of stocks or breakdown of machinery, to give employment to a workman whose name is on the muster roll.",
    example: "Due to the power grid failure, the textile mill declared a three-day layoff and paid 50% basic wages as layoff compensation.",
    relatedLaws: "Section 2(kkk) & Section 25C of Industrial Disputes Act, 1947 / Industrial Relations Code, 2020",
    relatedTerms: ["Retrenchment", "Industrial Dispute", "Gratuity", "Workman"],
    keyElements: [
      "Temporary suspension of work, not permanent termination of employment",
      "Requires payment of 50% of basic wages and dearness allowance as statutory compensation",
      "Distinguished from permanent retrenchment"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Industrial Dispute",
    pronunciation: "/ɪnˈdʌstrɪəl dɪˈspjuːt/",
    category: "Labour and Employment Law",
    simpleMeaning: "Any legal conflict or disagreement between employers and workers (or among workers) regarding wages, working conditions, or dismissal.",
    definition: "Any dispute or difference between employers and employers, or between employers and workmen, or between workmen and workmen, which is connected with the employment or non-employment, or the terms of employment or conditions of labour.",
    example: "The labour union raised an industrial dispute before the conciliation officer demanding revised safety allowances.",
    relatedLaws: "Section 2(k) of Industrial Disputes Act, 1947 & Industrial Relations Code, 2020",
    relatedTerms: ["Retrenchment", "Layoff", "Internal Complaints Committee (ICC)", "Collective Bargaining"],
    keyElements: [
      "Must involve a collective body of workmen or be espoused by a recognized trade union (except individual discharge under Sec. 2A)",
      "Conciliation proceedings are mandatory before strike or adjudication",
      "Adjudicated by Labour Courts, Industrial Tribunals, and National Tribunals"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Intellectual Property Law additions
  {
    word: "Geographical Indication (GI Tag)",
    pronunciation: "/ˌdʒiːəˈɡræfɪkəl ˌɪndɪˈkeɪʃən/",
    category: "Intellectual Property Law",
    simpleMeaning: "A legal sign or tag given to products that come from a specific geographical place and possess unique qualities or reputation due to that origin (like Darjeeling Tea).",
    definition: "An intellectual property right used to identify agricultural, natural, or manufactured goods originating in a definite territory, where a given quality, reputation, or other characteristic is essentially attributable to its geographical origin.",
    example: "Producers of Darjeeling tea obtained a GI tag to prevent foreign sellers from marketing counterfeit teas under that prestigious regional name.",
    relatedLaws: "Geographical Indications of Goods (Registration and Protection) Act, 1999",
    relatedTerms: ["Passing Off", "Patent", "Trade Secret", "Trademark Infringement"],
    keyElements: [
      "Protects community/collective heritage rather than a single corporate owner",
      "Valid for 10 years and renewable periodically indefinitely",
      "Examples include Basmati Rice, Kancheepuram Silk, Mysore Sandal Soap, and Alphonsa Mangoes"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Trade Secret",
    pronunciation: "/treɪd ˈsiːkrɪt/",
    category: "Intellectual Property Law",
    simpleMeaning: "Confidential and commercially valuable business information, formulas, or methods that give a company a competitive edge and are kept secret.",
    definition: "Confidential commercial information, formulas, algorithms, customer lists, or manufacturing processes that derive independent economic value from not being generally known and are subject to reasonable secrecy measures.",
    example: "The beverage formula was protected as an unpatented trade secret under strict non-disclosure agreements with senior food scientists.",
    relatedLaws: "Common Law Breach of Confidence & Section 27 of Indian Contract Act, 1872 / Specific Relief Act",
    relatedTerms: ["Patent", "Passing Off", "Fair Dealing", "Non-Disclosure Agreement (NDA)"],
    keyElements: [
      "Does not expire after 20 years like patents; lasts as long as absolute secrecy is maintained",
      "Protected in India through contracts (NDAs), equity, and tortious breach of confidence",
      "Unauthorized misappropriation can be restrained through injunctions and damages"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Cyber Law additions
  {
    word: "Digital Signature",
    pronunciation: "/ˈdɪdʒɪtəl ˈsɪɡnətʃər/",
    category: "Cyber Law",
    simpleMeaning: "A secure cryptographic electronic stamp that legally authenticates the identity of a sender and verifies that the digital document was not altered.",
    definition: "An electronic signature generated using asymmetric cryptosystems and hash functions, legally authenticating an electronic record under the Information Technology Act.",
    example: "The managing director used a Class 3 Digital Signature Certificate to sign and submit the company's annual financial filings on the MCA portal.",
    relatedLaws: "Sections 2(p), 3 & 15 of Information Technology Act, 2000 & BSA Sec. 61",
    relatedTerms: ["Electronic Evidence", "Data Privacy", "Cyber Law", "Affidavit"],
    keyElements: [
      "Enjoys statutory presumption of authenticity under the Law of Evidence",
      "Issued by licensed Certifying Authorities (CAs) under the Controller of Certifying Authorities (CCA)",
      "Guarantees authentication, non-repudiation, and message integrity"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Banking and Financial Law additions
  {
    word: "Non-Performing Asset (NPA)",
    pronunciation: "/nɒn pərˈfɔːrmɪŋ ˈæsɛt/",
    category: "Banking and Financial Law",
    simpleMeaning: "A loan or advance where interest or installment payments have remained overdue and unpaid for more than 90 days.",
    definition: "A loan or advance credit facility granted by a bank or financial institution where principal or interest payments remain past due and unpaid for a statutory threshold period of 90 days.",
    example: "When the commercial borrower missed three consecutive quarterly EMIs, the bank classified the ₹15 crore loan as a Non-Performing Asset.",
    relatedLaws: "SARFAESI Act, 2002 & RBI Prudential Norms on Income Recognition and Asset Classification (IRAC)",
    relatedTerms: ["SARFAESI Act", "Cheque Bounce", "Banker's Lien", "Debt Recovery Tribunal (DRT)"],
    keyElements: [
      "Triggered after 90 days of continuous default under RBI regulations",
      "Sub-categorized into Sub-standard, Doubtful, and Loss assets based on recovery risk",
      "Mandatory prerequisite before initiating SARFAESI enforcement or DRT recovery actions"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Debt Recovery Tribunal (DRT)",
    pronunciation: "/dɛt rɪˈkʌvəri traɪˈbjuːnəl/",
    category: "Banking and Financial Law",
    simpleMeaning: "A specialized tribunal set up for fast recovery of unpaid debts and loans of ₹20 lakhs or more owed to banks and financial institutions.",
    definition: "A dedicated statutory judicial body constituted under the Recovery of Debts and Bankruptcy Act, 1993, with exclusive summary jurisdiction to adjudicate and recover debts of ₹20 lakhs or above due to banks and financial institutions.",
    example: "The national bank filed an Original Application (OA) before the DRT Delhi to recover an outstanding ₹4 crore commercial credit facility.",
    relatedLaws: "Recovery of Debts and Bankruptcy Act, 1993 (RDB Act) & SARFAESI Act, 2002",
    relatedTerms: ["SARFAESI Act", "Non-Performing Asset (NPA)", "Banker's Lien", "National Company Law Tribunal (NCLT)"],
    keyElements: [
      "Exclusive jurisdiction for bank debts of ₹20 lakhs and above, barring regular civil courts",
      "Appeals lie to the Debt Recovery Appellate Tribunal (DRAT)",
      "Empowered to issue recovery certificates and order attachment of debtor assets"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Tax Law additions
  {
    word: "Tax Deducted at Source (TDS)",
    pronunciation: "/tæks dɪˈdʌktɪd æt sɔːrs/",
    category: "Tax Law",
    simpleMeaning: "A system where the person paying money (like salary, rent, or commission) deducts tax upfront and deposits it directly with the government on behalf of the payee.",
    definition: "A direct tax collection mechanism under which the payer is statutorily mandated to deduct income tax at specified rates from payments (such as salaries, rent, professional fees, or contract sums) and remit it to the Central Government on behalf of the payee.",
    example: "The corporate client deducted 10% TDS under Section 194J while settling the legal advisor's professional consultation invoice.",
    relatedLaws: "Chapter XVII-B (Sections 192 to 206) of Income Tax Act, 1961",
    relatedTerms: ["Input Tax Credit (ITC)", "Tax Evasion vs Tax Avoidance", "Direct Tax", "Assessment Year"],
    keyElements: [
      "Operates on the principle of 'pay as you earn'",
      "Payer must issue Form 16 / 16A TDS certificates to the payee",
      "Payee can claim credit for deducted TDS while filing their annual income tax return"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Administrative Law additions
  {
    word: "Delegated Legislation",
    pronunciation: "/ˈdɛlɪɡeɪtɪd ˌlɛdʒɪsˈleɪʃən/",
    category: "Administrative Law",
    simpleMeaning: "Rules, regulations, and bylaws made by government executive departments under powers granted to them by an Act of Parliament.",
    definition: "Law-making power delegated by the primary legislature (Parliament/State Assembly) to executive authorities, administrative agencies, or local bodies to frame detailed rules, regulations, and notifications within the parent statute's framework.",
    example: "The Ministry of Road Transport framed motor vehicle emission standards under powers of delegated legislation granted by the parent Motor Vehicles Act.",
    relatedLaws: "Administrative Law Principles / In re Delhi Laws Act Case (1951)",
    relatedTerms: ["Ultra Vires", "Judicial Review", "Speaking Order", "Audi Alteram Partem"],
    keyElements: [
      "Cannot delegate essential legislative functions or core policy-making powers",
      "Subordinate rules must strictly conform to the parent statute; excess is ultra vires",
      "Subject to parliamentary scrutiny and constitutional judicial review"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Doctrine of Proportionality",
    pronunciation: "/ˈdɒktrɪn ɒv prəˌpɔːrʃəˈnæləti/",
    category: "Administrative Law",
    simpleMeaning: "A legal principle ensuring that government actions or penalties are not excessively harsh and must be proportionate to the objective or offence.",
    definition: "A judicial review doctrine requiring that administrative actions, executive restrictions on fundamental rights, or disciplinary penalties must maintain a reasonable and balanced relationship with the statutory objective, avoiding excessive or arbitrary measures.",
    example: "The Supreme Court set aside the dismissal of a clerk for a one-day unauthorized absence, holding the termination disproportionately harsh under the Doctrine of Proportionality.",
    relatedLaws: "Article 14 & Article 21 of Constitution / Modern Dental College v. State of M.P. (2016)",
    relatedTerms: ["Judicial Review", "Ultra Vires", "Audi Alteram Partem", "Wednesbury Unreasonableness"],
    keyElements: [
      "Examines whether the measure was necessary, suitable, and the least intrusive means to achieve the legitimate aim",
      "Prohibits executive overreach (using a sledgehammer to crack a nut)",
      "Standard test applied in constitutional challenges to state surveillance and citizen restrictions"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Environmental Law additions
  {
    word: "National Green Tribunal (NGT)",
    pronunciation: "/ˈnæʃənəl ɡriːn traɪˈbjuːnəl/",
    category: "Environmental Law",
    simpleMeaning: "A specialized environmental court in India dedicated to fast-track adjudication of environmental disputes and forest conservation cases.",
    definition: "A specialized statutory judicial body established under the National Green Tribunal Act, 2010, for the effective and expeditious disposal of cases relating to environmental protection, conservation of forests, and enforcement of legal environmental rights.",
    example: "The NGT imposed an immediate ban on illegal sand mining along the riverbed and directed the polluter to pay environmental compensation.",
    relatedLaws: "National Green Tribunal Act, 2010",
    relatedTerms: ["Polluter Pays Principle", "Precautionary Principle", "Public Trust Doctrine", "Sustainable Development"],
    keyElements: [
      "Mandated to dispose of environmental applications within 6 months of filing",
      "Applies the Polluter Pays Principle, Precautionary Principle, and Sustainable Development",
      "Appeals against NGT orders lie directly to the Supreme Court of India"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Environmental Impact Assessment (EIA)",
    pronunciation: "/ɪnˌvaɪrənˈmɛntəl ˈɪmpækt əˈsɛsmənt/",
    category: "Environmental Law",
    simpleMeaning: "A mandatory scientific study and public consultation conducted before starting large industrial/infrastructure projects to evaluate environmental consequences.",
    definition: "A statutory planning and decision-making process under environmental regulations that evaluates the likely environmental consequences of a proposed industrial, infrastructure, or mining project before granting environmental clearance.",
    example: "The port expansion project was stayed by the court because the developer failed to conduct a mandatory public hearing during the EIA process.",
    relatedLaws: "Environment (Protection) Act, 1986 & EIA Notification, 2006",
    relatedTerms: ["National Green Tribunal (NGT)", "Precautionary Principle", "Polluter Pays Principle", "Public Trust Doctrine"],
    keyElements: [
      "Mandates screening, scoping, public consultation, and appraisal before project commencement",
      "Public hearings ensure local community participation and grievance recording",
      "Non-compliance with EIA conditions invalidates environmental clearance"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Human Rights Law additions
  {
    word: "National Human Rights Commission (NHRC)",
    pronunciation: "/ˈnæʃənəl ˈhjuːmən raɪts kəˈmɪʃən/",
    category: "Human Rights Law",
    simpleMeaning: "An independent statutory body in India established to investigate human rights violations and recommend relief for victims.",
    definition: "An independent statutory institution established under the Protection of Human Rights Act, 1993, responsible for the protection, promotion, and inquiry into human rights violations by public servants.",
    example: "The NHRC initiated an inquiry into police excess during a civilian protest and recommended ₹5 lakhs interim compensation for the victim.",
    relatedLaws: "Protection of Human Rights Act, 1993 (PHRA)",
    relatedTerms: ["Custodial Violence", "Legal Aid", "Right to Speedy Trial", "Right to Dignity"],
    keyElements: [
      "Headed by a former Chief Justice of India or Supreme Court Judge",
      "Vested with powers of a Civil Court to summon witnesses and requisition public records",
      "Inspects prisons, detention centers, and submits annual reports to Parliament"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Right to Speedy Trial",
    pronunciation: "/raɪt tuː ˈspiːdi ˈtraɪəl/",
    category: "Human Rights Law",
    simpleMeaning: "The fundamental constitutional right of every accused person to have their criminal case investigated and tried without unreasonable delay.",
    definition: "A constitutional fundamental right implicit in Article 21 guaranteeing that every accused is entitled to a fair, just, and expeditious criminal investigation and trial without unjustified state delay.",
    example: "The High Court quashed the 14-year-old pending prosecution of a petty offence citing violation of the right to a speedy trial.",
    relatedLaws: "Article 21 of Constitution / Hussainara Khatoon v. Home Secretary, Bihar (1979) / AR Antulay v. RS Nayak (1992)",
    relatedTerms: ["Legal Aid", "Custodial Violence", "Bail", "Default Bail"],
    keyElements: [
      "Derived from the Magna Carta and embedded as an essential component of Article 21 personal liberty",
      "Long unjustified delays violate constitutional due process and may justify quashing of proceedings or bail grant",
      "Imposes a duty on the State to maintain adequate judicial infrastructure"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Arbitration additions
  {
    word: "Arbitration Agreement",
    pronunciation: "/ˌɑːrbɪˈtreɪʃən əˈɡriːmənt/",
    category: "Arbitration and Alternative Dispute Resolution",
    simpleMeaning: "A written agreement between parties to submit their current or future disputes to private arbitration instead of going to a regular court.",
    definition: "An agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them in respect of a defined legal relationship, whether contractual or not.",
    example: "Clause 24 of the commercial software contract contained a mandatory arbitration agreement specifying New Delhi as the seat of arbitration.",
    relatedLaws: "Section 7 & Section 8 of Arbitration and Conciliation Act, 1996",
    relatedTerms: ["Arbitral Award", "Mediation", "Lok Adalat", "Specific Performance"],
    keyElements: [
      "Must be in writing (clause in contract or separate agreement / exchange of emails)",
      "Section 8 mandates civil courts to refer parties to arbitration if a valid agreement exists",
      "Principle of Kompetenz-Kompetenz empowers the arbitral tribunal to rule on its own jurisdiction"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Section 34 (Setting Aside Arbitral Award)",
    pronunciation: "/ˈsɛkʃən ˈθɜːrti fɔːr/",
    category: "Arbitration and Alternative Dispute Resolution",
    simpleMeaning: "The limited legal procedure in court to challenge and cancel an arbitral award on specific grounds like fraud, bias, or violation of public policy.",
    definition: "A statutory recourse under the Arbitration and Conciliation Act whereby an aggrieved party may petition a court to set aside an arbitral award exclusively on narrow grounds such as incapacity, lack of notice, patent illegality, or conflict with the public policy of India.",
    example: "The infrastructure developer filed a Section 34 petition in the High Court asserting that the arbitral award suffered from patent illegality.",
    relatedLaws: "Section 34 of Arbitration and Conciliation Act, 1996 / Associate Builders v. DDA (2015)",
    relatedTerms: ["Arbitral Award", "Arbitration Agreement", "Mediation", "Decree"],
    keyElements: [
      "Court does not act as a regular appellate court and cannot re-appreciate factual evidence",
      "Application must be filed within a strict limitation window of 3 months (+ 30 days grace)",
      "Grounds strictly limited to jurisdictional errors, breach of natural justice, and public policy violation"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Court and Judicial additions
  {
    word: "Contempt of Court",
    pronunciation: "/kənˈtɛmpt ɒv kɔːrt/",
    category: "Court and Judicial Terms",
    simpleMeaning: "Disobeying a court's lawful orders (Civil Contempt) or publicly insulting, scandalizing, or obstructing the administration of justice (Criminal Contempt).",
    definition: "Conduct that defies the authority, justice, and dignity of the court, categorized into Civil Contempt (wilful disobedience of any judgment or order) and Criminal Contempt (scandalizing the court, prejudicing judicial proceedings, or obstructing justice).",
    example: "The industrialist faced criminal contempt proceedings for making defamatory public allegations alleging bribery against the sitting High Court bench.",
    relatedLaws: "Contempt of Courts Act, 1971 & Articles 129 and 215 of Constitution of India",
    relatedTerms: ["Sub Judice", "Injunction", "Judicial Review", "Stare Decisis"],
    keyElements: [
      "Civil Contempt involves wilful disobedience of court orders or breach of an undertaking given to court",
      "Criminal Contempt involves scandalizing or lowering the authority of courts",
      "Supreme Court and High Courts possess inherent constitutional powers as Courts of Record to punish for contempt"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Per Incuriam",
    pronunciation: "/pɜːr ɪnˈkjʊəriæm/",
    category: "Court and Judicial Terms",
    simpleMeaning: "A Latin term meaning 'through lack of care'—a judicial decision passed in ignorance of an existing statute or binding precedent, making it non-binding.",
    definition: "A Latin legal term meaning 'through inadvertence or lack of care', referring to a judicial decision rendered in ignorance or forgetfulness of a binding statutory provision or a decision of a higher or coordinate bench, depriving it of precedential value.",
    example: "The division bench held that the earlier single-judge ruling was passed per incuriam as it failed to consider the amended provisions of the Limitation Act.",
    relatedLaws: "Doctrine of Precedent & Article 141 jurisprudence / Siddharam Satlingappa Mhetre v. State of Maharashtra",
    relatedTerms: ["Stare Decisis", "Ratio Decidendi", "Obiter Dicta", "Judicial Review"],
    keyElements: [
      "Applies when a court overlooks a binding statute or higher bench precedent",
      "A judgment rendered per incuriam does not operate as binding precedent under stare decisis",
      "Enables subsequent benches to disregard the erroneous ruling without formal overruling"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Legal Documents additions
  {
    word: "Plaint",
    pronunciation: "/pleɪnt/",
    category: "Legal Documents and Proceedings",
    simpleMeaning: "The initial written legal document filed by a plaintiff in a civil court to start a lawsuit, stating the facts and claims.",
    definition: "A formal written pleading instituted by a plaintiff in a competent civil court setting out the facts, cause of action, jurisdiction, valuation, and specific legal reliefs claimed against the defendant.",
    example: "The plaintiff filed a plaint in the district civil court claiming title declaration and possession of the commercial showroom.",
    relatedLaws: "Order VII of Code of Civil Procedure (CPC), 1908",
    relatedTerms: ["Cause of Action", "Written Statement", "Affidavit", "Vakalatnama"],
    keyElements: [
      "Must clearly disclose the cause of action and date of accrual",
      "Must state property valuation and affix appropriate statutory court fees",
      "Subject to rejection under Order VII Rule 11 if no cause of action is disclosed or suit is barred by law"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Written Statement (WS)",
    pronunciation: "/ˈrɪtən ˈsteɪtmənt/",
    category: "Legal Documents and Proceedings",
    simpleMeaning: "The formal written defence document filed by a defendant in court answering each allegation made in the plaintiff's lawsuit.",
    definition: "A formal pleading filed by the defendant in response to the plaintiff's plaint, containing specific denials of factual allegations, legal objections, counter-claims, and set-offs.",
    example: "The defendant filed his Written Statement within the statutory 30-day period denying all allegations of contractual breach.",
    relatedLaws: "Order VIII of Code of Civil Procedure (CPC), 1908",
    relatedTerms: ["Plaint", "Framing of Issues", "Ex-Parte Decree", "Res Judicata"],
    keyElements: [
      "Must be filed within 30 days of summons service (extendable up to 90/120 days under strict conditions)",
      "Denials must be specific; vague or evasive denials are legally deemed admissions under Order VIII Rule 5",
      "May include a claim for Set-Off or a Counter-Claim against the plaintiff"
    ],
    isPopular: true,
    isTermOfDay: false
  },

  // Juvenile / Child Law additions
  {
    word: "Juvenile Justice Board (JJB)",
    pronunciation: "/ˈdʒuːvənaɪl ˈdʒʌstɪs bɔːrd/",
    category: "Juvenile / Child Law",
    simpleMeaning: "A specialized judicial panel consisting of a Magistrate and two social workers that conducts inquiries for children accused of offences.",
    definition: "A statutory district-level judicial body constituted under the Juvenile Justice Act, comprising a Principal Magistrate and two social workers (at least one woman), to adjudicate cases involving children in conflict with law.",
    example: "The 16-year-old was produced before the Juvenile Justice Board for inquiry and counseling rather than a standard prison remand.",
    relatedLaws: "Section 4 & Section 7 of Juvenile Justice (Care and Protection of Children) Act, 2015",
    relatedTerms: ["Child in Conflict with Law (CCL)", "POCSO Act", "Child Welfare Committee (CWC)", "Guardian Ad Litem"],
    keyElements: [
      "Focuses on rehabilitation, reformation, and social reintegration rather than retributive punishment",
      "Inquiry must be completed within 4 months",
      "Can order community service, counseling, or stay in a Special Home for a maximum of 3 years"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Child Welfare Committee (CWC)",
    pronunciation: "/tʃaɪld ˈwɛlfɛər kəˈmɪti/",
    category: "Juvenile / Child Law",
    simpleMeaning: "A statutory committee in every district that functions as a bench of magistrates to look after and protect abandoned, orphaned, or abused children.",
    definition: "A statutory district-level body constituted under the Juvenile Justice Act, possessing the powers of a Judicial Magistrate, tasked with the care, protection, rehabilitation, and adoption clearance of children in need of care and protection.",
    example: "The rescued child labourer was produced before the Child Welfare Committee, which ordered temporary placement in a children's home and initiated family tracing.",
    relatedLaws: "Sections 27 to 30 of Juvenile Justice Act, 2015",
    relatedTerms: ["Child in Conflict with Law (CCL)", "POCSO Act", "Juvenile Justice Board (JJB)", "Guardian Ad Litem"],
    keyElements: [
      "Exercises exclusive authority over 'children in need of care and protection' (abandoned, orphaned, abused, or exploited)",
      "Functions as a bench of magistrates with civil court powers",
      "Declares orphaned children 'legally free for adoption' through CARA"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Motor Vehicle Law additions
  {
    word: "Third-Party Insurance",
    pronunciation: "/ˈθɜːrdˌpɑːrti ɪnˈʃʊərəns/",
    category: "Motor Vehicle Law",
    simpleMeaning: "Mandatory motor vehicle insurance that covers financial liability for death, injury, or property damage caused to third-party persons on the road.",
    definition: "A statutory mandatory insurance policy covering the legal liability of the vehicle owner against third parties for death, bodily injury, or damage to third-party property arising out of the use of the vehicle in a public place.",
    example: "The commercial bus had valid third-party insurance, ensuring the insurer covered the ₹25 lakh compensation awarded to the injured pedestrian.",
    relatedLaws: "Sections 145 to 164 of Motor Vehicles Act, 1988 (as amended in 2019)",
    relatedTerms: ["Motor Accident Claims Tribunal (MACT)", "Good Samaritan Protection", "Tort", "Strict Liability"],
    keyElements: [
      "Strictly mandatory for all motor vehicles operating on public roads under Section 146",
      "Insurance company cannot escape third-party liability due to driver license technicalities",
      "Provides structured no-fault compensation under Section 164 for death (₹5 lakhs) and grievous hurt (₹2.5 lakhs)"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Hit and Run Solatium Scheme",
    pronunciation: "/hɪt ænd rʌn səˈleɪʃiəm skiːm/",
    category: "Motor Vehicle Law",
    simpleMeaning: "A government compensation fund that provides immediate financial relief to victims or families in road accidents where the offending vehicle escapes unidentified.",
    definition: "A statutory government compensation scheme under the Motor Vehicles Act providing guaranteed solatium compensation to victims or legal heirs in hit-and-run motor accidents where the offending vehicle remains untraceable.",
    example: "The family of the pedestrian killed in a hit-and-run midnight accident received ₹2,00,000 under the statutory Solatium Scheme.",
    relatedLaws: "Section 161 of Motor Vehicles Act, 1988 & Compensation to Victims of Hit and Run Motor Accidents Scheme, 2022",
    relatedTerms: ["Motor Accident Claims Tribunal (MACT)", "Good Samaritan Protection", "Third-Party Insurance", "Tort"],
    keyElements: [
      "Provides enhanced statutory compensation: ₹2,00,000 for death and ₹50,000 for grievous hurt",
      "Claims processed quickly through District Solatium Claim Inquiry Officers (SDMs)",
      "Funded through the Motor Vehicles Accident Fund administered by the Central Government"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Real Estate Law additions
  {
    word: "Occupation Certificate (OC)",
    pronunciation: "/ˌɒkjʊˈpeɪʃən sərˈtɪfɪkət/",
    category: "Real Estate Law",
    simpleMeaning: "An official permit from the municipal corporation certifying that a new building was constructed according to approved plans and is safe for residents to move in.",
    definition: "A statutory document issued by the local municipal planning authority certifying that a newly constructed building complies with sanctioned building plans, fire safety norms, and civic regulations, making it lawful and safe for human habitation.",
    example: "The homebuyer refused to take flat possession until the builder obtained the mandatory Occupation Certificate (OC) from the municipal corporation.",
    relatedLaws: "Section 2(zf) & Section 11(4)(b) of Real Estate (Regulation and Development) Act, 2016 (RERA) & Municipal Laws",
    relatedTerms: ["RERA Act", "Carpet Area", "Completion Certificate", "Title Deed"],
    keyElements: [
      "Mandatory before a builder can legally hand over possession to flat buyers",
      "Without an OC, municipal authorities can disconnect civic water, electricity, and sewerage connections",
      "Builder faces financial interest penalties under RERA for offering possession without an OC"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Completion Certificate (CC)",
    pronunciation: "/kəmˈpliːʃən sərˈtɪfɪkət/",
    category: "Real Estate Law",
    simpleMeaning: "A municipal certificate verifying that a real estate construction project has been completely finished in compliance with building codes.",
    definition: "A statutory certificate issued by the competent local authority certifying that the real estate project has been developed and completed according to the sanctioned plan, layout, and specifications.",
    example: "The developer submitted the Completion Certificate to RERA to initiate the transfer of common areas to the apartment owners' association.",
    relatedLaws: "Section 2(q) & Section 17 of Real Estate (Regulation and Development) Act, 2016 (RERA)",
    relatedTerms: ["Occupation Certificate (OC)", "RERA Act", "Carpet Area", "Title Deed"],
    keyElements: [
      "Certifies completion of the entire project or specific phase according to building standards",
      "Enables the builder to execute registered conveyance deeds in favour of allottees",
      "Triggers the promoter's statutory duty to hand over management to the resident welfare association"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Insolvency and Bankruptcy additions
  {
    word: "Committee of Creditors (CoC)",
    pronunciation: "/kəˈmɪti ɒv ˈkrɛdɪtərz/",
    category: "Insolvency and Bankruptcy",
    simpleMeaning: "The decision-making body of financial lenders (banks) that controls a bankrupt company during insolvency and votes to approve or reject rescue plans.",
    definition: "The supreme decision-making body in a Corporate Insolvency Resolution Process (CIRP) under IBC, comprising all financial creditors of the corporate debtor, responsible for evaluating and approving resolution plans.",
    example: "The Committee of Creditors approved the steel conglomerate's takeover plan by an 88% voting majority.",
    relatedLaws: "Sections 21, 24 & 30(4) of Insolvency and Bankruptcy Code (IBC), 2016 / K. Sashidhar v. Indian Overseas Bank (2019)",
    relatedTerms: ["Corporate Insolvency Resolution Process (CIRP)", "Moratorium (IBC)", "Resolution Professional (RP)", "National Company Law Tribunal (NCLT)"],
    keyElements: [
      "Composed exclusively of Financial Creditors (homebuyers are recognized as financial creditors)",
      "Approval of a resolution plan requires a minimum 66% voting majority",
      "The 'commercial wisdom of the CoC' is supreme and largely non-justiciable before courts"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Resolution Professional (RP)",
    pronunciation: "/ˌrɛzəˈluːʃən prəˈfɛʃənəl/",
    category: "Insolvency and Bankruptcy",
    simpleMeaning: "A licensed insolvency expert appointed by court to take over management of a bankrupt company and conduct its revival process.",
    definition: "A licensed insolvency professional appointed by the NCLT and confirmed by the Committee of Creditors to manage the operations, preserve assets, invite resolution plans, and conduct the insolvency resolution process of a corporate debtor.",
    example: "Upon appointment, the Resolution Professional took control of the company's manufacturing plants and bank accounts.",
    relatedLaws: "Sections 22 to 25 of Insolvency and Bankruptcy Code (IBC), 2016",
    relatedTerms: ["Corporate Insolvency Resolution Process (CIRP)", "Committee of Creditors (CoC)", "Moratorium (IBC)", "National Company Law Tribunal (NCLT)"],
    keyElements: [
      "Replaces the suspended Board of Directors and assumes all executive management powers",
      "Custodianship of company assets and business operations as a going concern",
      "Prepares information memorandum and coordinates with prospective resolution applicants"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // Media and Information Law additions
  {
    word: "Public Information Officer (PIO)",
    pronunciation: "/ˈpʌblɪk ˌɪnfərˈmeɪʃən ˈɒfɪsər/",
    category: "Media and Information Law",
    simpleMeaning: "A designated government officer responsible for receiving RTI requests and providing official information to citizens within 30 days.",
    definition: "A designated statutory officer appointed in every public authority under the Right to Information Act, responsible for receiving citizen applications and providing requested government records within statutory timelines.",
    example: "The PIO was penalized ₹25,000 by the Information Commission for failing to respond to the citizen's RTI query within 30 days.",
    relatedLaws: "Sections 5, 6, 7 & 20 of Right to Information Act, 2005",
    relatedTerms: ["Right to Information (RTI)", "Freedom of Press", "Central Information Commission (CIC)", "Administrative Law"],
    keyElements: [
      "Mandated to provide information within 30 days (or 48 hours for life and liberty matters)",
      "Faces personal financial penalties up to ₹25,000 under Section 20 for unjustified delay or refusal",
      "Assisted by Assistant Public Information Officers (APIOs) at sub-district levels"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Central Information Commission (CIC)",
    pronunciation: "/ˈsɛntrəl ˌɪnfərˈmeɪʃən kəˈmɪʃən/",
    category: "Media and Information Law",
    simpleMeaning: "The highest appellate authority in India for resolving citizen disputes regarding denied or delayed RTI requests against central government departments.",
    definition: "The apex statutory appellate body established under the RTI Act, 2005, possessing quasi-judicial powers to hear second appeals, adjudicate complaints, and enforce transparency against central public authorities.",
    example: "The CIC ordered the ministry to make public the environmental clearance audit reports for the river dam project.",
    relatedLaws: "Sections 12, 13, 18 & 19 of Right to Information Act, 2005",
    relatedTerms: ["Right to Information (RTI)", "Public Information Officer (PIO)", "Freedom of Press", "Judicial Review"],
    keyElements: [
      "Headed by the Chief Information Commissioner and up to 10 Information Commissioners",
      "Vested with civil court powers to summon officials, examine documents on oath, and inspect secret files",
      "Decisions are binding and final subject to High Court writ review under Article 226"
    ],
    isPopular: false,
    isTermOfDay: false
  },

  // General Legal Terms additions
  {
    word: "Mutatis Mutandis",
    pronunciation: "/mjuːˈtɑːtɪs mjuːˈtændɪs/",
    category: "General Legal Terms",
    simpleMeaning: "A Latin phrase meaning 'with the necessary changes having been made'—applying existing rules to a new situation with appropriate adaptations.",
    definition: "A Latin legal phrase meaning 'with the necessary modifications made', indicating that a legal rule, contract clause, or procedure applying to one set of circumstances applies equally to another with only necessary adjustments in detail.",
    example: "The commercial agreement provided that terms governing the initial contract would apply mutatis mutandis to the extended renewal period.",
    relatedLaws: "Statutory Interpretation & General Jurisprudence",
    relatedTerms: ["Prima Facie", "Bona Fide", "Mutuality", "Statutory Interpretation"],
    keyElements: [
      "Saves legislative and drafting repetition by adapting existing provisions to analogous situations",
      "Maintains the substance of the original law while modifying superficial details (like names and dates)",
      "Extensively used in procedural rules, cross-referencing statutes, and corporate contracts"
    ],
    isPopular: true,
    isTermOfDay: false
  },
  {
    word: "Modus Operandi",
    pronunciation: "/ˈmoʊdəs ˌɒpəˈrændi/",
    category: "General Legal Terms",
    simpleMeaning: "A Latin term meaning 'method of operating'—the distinct pattern or method of working used by a criminal or organization.",
    definition: "A Latin phrase meaning 'manner of operation', referring to a characteristic method or distinct pattern of criminal conduct that helps forensic investigators identify serial offenders or recurring fraudulent schemes.",
    example: "The cyber crime unit linked the seven ATM fraud cases by analyzing the suspects' unique skimming modus operandi.",
    relatedLaws: "Section 8 of Bharatiya Sakshya Adhiniyam, 2023 & Criminal Investigation Jurisprudence",
    relatedTerms: ["Mens Rea", "Actus Reus", "Criminal Conspiracy", "Electronic Evidence"],
    keyElements: [
      "Establishes a distinctive pattern, plan, or method of committing a crime",
      "Admissible under Law of Evidence to show motive, preparation, identity, or systematic conduct",
      "Crucial tool in forensic profiling and complex white-collar fraud prosecutions"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Ipso Facto",
    pronunciation: "/ˈɪpsoʊ ˈfæktoʊ/",
    category: "General Legal Terms",
    simpleMeaning: "A Latin phrase meaning 'by the very fact itself'—something that happens automatically as an inevitable direct result of an action or event.",
    definition: "A Latin legal phrase meaning 'by the fact itself', signifying that a specific legal consequence arises automatically from the occurrence of a certain act or fact without needing additional proof or separate determination.",
    example: "Upon being convicted of financial embezzlement, the director was ipso facto disqualified from holding office under the Companies Act.",
    relatedLaws: "General Jurisprudence & Companies Act, 2013",
    relatedTerms: ["Ab Initio", "De Jure vs De Facto", "Bona Fide", "Ultra Vires"],
    keyElements: [
      "Denotes automatic and immediate legal consequences without separate procedural orders",
      "Commonly found in statutory disqualification clauses, forfeiture terms, and bankruptcy triggers",
      "Distinguished from consequences that require judicial inquiry or discretionary declaration"
    ],
    isPopular: false,
    isTermOfDay: false
  },
  {
    word: "Ignorantia Juris Non Excusat",
    pronunciation: "/ɪɡnəˈrænʃiə ˈdʒʊərɪs nɒn ɛkˈskjuːzæt/",
    category: "General Legal Terms",
    simpleMeaning: "A timeless legal rule meaning 'ignorance of the law excuses not'—you cannot escape liability or punishment by claiming you did not know the law.",
    definition: "A fundamental common-law and statutory maxim establishing that ignorance of the law is no excuse, meaning that a person cannot defend an unlawful action by asserting they were unaware of the applicable law.",
    example: "The merchant who failed to pay mandatory GST could not avoid penalties by arguing ignorantia juris non excusat.",
    relatedLaws: "General Principles of Criminal and Civil Jurisprudence",
    relatedTerms: ["Mens Rea", "Bona Fide", "Modus Operandi", "Statutory Duty"],
    keyElements: [
      "Presumes that all citizens within the jurisdiction know the published laws of the land",
      "Protects the rule of law from easy, unverifiable claims of ignorance",
      "Distinguished from a genuine mistake of fact (which can serve as a valid legal defence)"
    ],
    isPopular: true,
    isTermOfDay: false
  }
];

// Read existing seedTerms.js
const currentPath = path.join(__dirname, 'seedTerms.js');
let currentTerms = [];
if (fs.existsSync(currentPath)) {
  currentTerms = require('./seedTerms.js');
}

// Combine and deduplicate
const allTerms = [...currentTerms];
const existingWords = new Set(allTerms.map(t => t.word.toLowerCase().trim()));

let addedCount = 0;
additionalTerms.forEach(item => {
  const norm = item.word.toLowerCase().trim();
  if (!existingWords.has(norm)) {
    allTerms.push(item);
    existingWords.add(norm);
    addedCount++;
  }
});

console.log("Newly added terms:", addedCount);

// Normalize all
const formattedTerms = allTerms.map((item) => ({
  ...item,
  categoryId: item.category.toLowerCase().replace(/[^a-z0-9]/g, ''),
  isPopular: typeof item.isPopular === 'boolean' ? item.isPopular : false,
  isTermOfDay: typeof item.isTermOfDay === 'boolean' ? item.isTermOfDay : false,
}));

// Validate
const catMap = {};
formattedTerms.forEach(t => {
  catMap[t.category] = (catMap[t.category] || 0) + 1;
  // Ensure required fields
  if (!t.word || !t.simpleMeaning || !t.definition || !t.example || !t.category || !t.relatedLaws || !Array.isArray(t.keyElements) || !Array.isArray(t.relatedTerms)) {
    console.error("Malformed term:", t);
    process.exit(1);
  }
});

console.log("Final total unique terms:", formattedTerms.length);
console.log("Categories covered:", Object.keys(catMap).length);
console.log("Category breakdown:\n", catMap);

const fileHeader = `/**
 * Comprehensive Indian Legal Dictionary Seed Dataset
 * LAW-SYNCc Legal Jurisprudence System
 * Total Terms: ${formattedTerms.length}
 * Total Categories: ${Object.keys(catMap).length}
 */

const seedTerms = ${JSON.stringify(formattedTerms, null, 2)};

module.exports = seedTerms;
`;

fs.writeFileSync(currentPath, fileHeader, 'utf8');
console.log("seedTerms.js successfully updated and verified!");
