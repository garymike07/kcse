// Data Structures for KCSE Content
const KCSE_CURRICULUM = {
  mathematics: {
    '1': ['Numbers', 'Algebraic Expressions', 'Rates, Ratio, Proportions and Percentage', 'Measurement', 'Linear Equations', 'Commercial Arithmetic', 'Geometry', 'Common Solids'],
    '2': ['Cubes and Cube Roots', 'Reciprocals', 'Indices and Logarithms', 'Gradients and Equations of Straight Lines', 'Reflection and Congruence', 'Rotation', 'Similarity and Enlargement', 'Trigonometry', 'Area of a Triangle', 'Quadratic Expressions and Equations', 'Linear Inequalities', 'Statistics', 'Angle Properties of a Circle', 'Vectors'],
    '3': ['Quadratic Expressions', 'Approximation and Errors', 'Trigonometry (Sine, Cosine Rule)', 'SURDS', 'Further Logarithms', 'Commercial Arithmetic (II)', 'Circles, Chords and Tangents', 'Matrices', 'Formulae and Variation', 'Sequences and Series', 'Vectors (II)', 'Binomial Expansion', 'Probability', 'Compound Proportions and Rates of Work'],
    '4': ['Matrices and Transformations', 'Statistics (II)', 'Loci', 'Trigonometry (III)', 'Three Dimensional Geometry', 'Longitudes and Latitudes', 'Linear Programming', 'Calculus (Differentiation and Integration)']
  },
  english: {
    '1': ['Elements of Grammar', 'Sentence structure', 'Functional Writing (e.g., Informal Letters)', 'Introduction to Oral Skills (e.g., Pronunciation)', 'Reading Skills'],
    '2': ['Advanced Grammar (e.g., Clauses)', 'Comprehension Skills', 'Functional Writing (e.g., Formal Letters, Reports)', 'Oral Skills (e.g., Dialogue, Listening Skills)', 'Introduction to Literature (Poetry, Short Stories)'],
    '3': ['Complex Grammatical Structures', 'Literary Analysis (Novel, Play)', 'Functional Writing (e.g., Memos, Emails)', 'Public Speaking Skills', 'Creative Writing (Narratives)'],
    '4': ['Nuances of Grammar and Syntax', 'In-depth analysis of Set Texts', 'Functional Writing (e.g., Speeches, Articles)', 'Advanced Oral Skills (Debate, Interviews)', 'Creative Writing (Argumentative, Expository)']
  },
  kiswahili: {
    '1': ['Sarufi ya Msingi', 'Uundaji wa Maneno', 'Kuandika Barua za Kirafiki', 'Ufahamu', 'Matumizi ya Lugha'],
    '2': ['Ngeli za Nomino', 'Vinyume na Visawe', 'Kuandika Ripoti', 'Ushairi wa Msingi', 'Matumizi ya Lugha'],
    '3': ['Sentensi Changamano', 'Fasihi Simulizi', 'Kuandika Hotuba', 'Uchambuzi wa Tamthilia', 'Matumizi ya Lugha'],
    '4': ['Mofolojia na Sintaksia', 'Uchambuzi wa Riwaya na Hadithi Fupi', 'Kuandika Makala', 'Fasihi Linganishi', 'Matumizi ya Lugha']
  },
  chemistry: {
    '1': ['Introduction to Chemistry', 'The Particulate Nature of Matter', 'Water and Hydrogen', 'Air and Combustion', 'Acids, Bases and Indicators'],
    '2': ['Structure of the Atom and The Periodic Table', 'Chemical Families', 'Structure and Bonding', 'Salts', 'Effect of Electric Current on Substances', 'Carbon and some of its Compounds'],
    '3': ['Gas Laws', 'The Mole Concept', 'Organic Chemistry I (Hydrocarbons)', 'Nitrogen and its Compounds', 'Sulphur and its Compounds', 'Chlorine and its Compounds'],
    '4': ['Acids, Bases and Salts (Quantitative analysis)', 'Energy Changes in Chemical and Physical Processes', 'Reaction Rates and Reversible Reactions', 'Electrochemistry', 'Metals', 'Organic Chemistry II (Alkanols and Alkanoic Acids)', 'Radioactivity']
  },
  biology: {
      '1': ["Introduction to Biology", "Classification I", "The Cell", "Cell Physiology", "Nutrition in Plants and Animals"],
      '2': ["Transport in Plants and Animals", "Respiration", "Gaseous Exchange", "Excretion and Homeostasis"],
      '3': ["Classification II", "Ecology", "Reproduction in Plants and Animals", "Growth and Development"],
      '4': ["Genetics", "Evolution", "Reception, Response, and Coordination in Plants and Animals", "Support and Movement in Plants and Animals"]
  },
  physics: {
      '1': ["Introduction to Physics", "Measurement I", "Force", "Pressure", "Particulate Nature of Matter", "Thermal Expansion"],
      '2': ["Measurement II", "Turning Effect of Force", "Equilibrium and Centre of Gravity", "Reflection at Curved Surfaces", "Magnetic Effect of an Electric Current"],
      '3': ["Gas Laws", "Thin Lenses", "Uniform Circular Motion", "Floating and Sinking", "Electromagnetic Spectrum", "Electromagnetic Induction"],
      '4': ["Cathode Rays and Cathode Ray Tube", "X-rays", "Photoelectric Effect", "Radioactivity", "Electronics"]
  },
  history: {
      '1': ["Introduction to History and Government", "Early Man", "Development of Agriculture", "The People of Kenya Up to the 19th Century", "Social, Economic and Political Organization of Kenyan Societies"],
      '2': ["Trade", "Development of Transport and Communication", "Development of Industry", "Urbanization", "Political Development in the 19th Century"],
      '3': ["European Invasion of Africa and the Process of Colonization", "Establishment of Colonial Rule in Kenya", "Colonial Administration", "Social and Economic Developments during the Colonial Period in Kenya", "Political Developments and Struggle for Independence in Kenya (1919-1963)"],
      '4': ["Formation, Structure and Functions of the Government of Kenya", "Citizenship", "National Integration", "Devolved Government", "Public Revenue and Expenditure in Kenya"]
  },
  geography: {
      '1': ["Introduction to Geography", "The Earth and the Solar System", "Weather", "Statistical Methods", "Fieldwork", "Minerals and Rocks", "Mining"],
      '2': ["Internal Land-Forming Processes", "External Land-Forming Processes", "Photography", "Map Work", "Climate"],
      '3': ["Agriculture", "Land Reclamation", "Fishing", "Wildlife and Tourism", "Energy"],
      '4': ["Industry", "Transport and Communication", "Trade", "Population", "Settlement", "Management and Conservation of the Environment"]
  },
  cre: {
      '1': ["Meaning of Christian Religious Education", "The Bible", "Creation and The Fall of Humankind", "Faith and God's Promises: Abraham", "The Sinai Covenant: Moses"],
      '2': ["Leadership in Israel: David and Solomon", "Loyalty to God: Elijah", "Selected Aspects in African Religious Heritage", "African Moral and Cultural Values"],
      '3': ["The Old Testament Prophecies About the Messiah", "The Infancy and Early Life of Jesus", "The Galilean Ministry", "The Journey to Jerusalem", "Jesus' Ministry in Jerusalem"],
      '4': ["The Holy Spirit", "The Unity of Believers", "Selected Christian Ethics", "Christian Approaches to Contemporary Issues"]
  },
  business: {
      '1': ["Introduction to Business Studies", "Business and its Environment", "Satisfaction of Human Wants", "Production", "Entrepreneurship"],
      '2': ["The Office", "Home Trade", "Forms of Business Units", "Government and Business", "Transport", "Communication"],
      '3': ["Warehousing", "Insurance", "Product Promotion", "Demand and Supply", "Theory of the Firm"],
      '4': ["Size and Location of a Firm", "Money and Banking", "Public Finance", "Inflation", "International Trade", "Economic Development and Planning"]
  },
  agriculture: {
      '1': ["Introduction to Agriculture", "Factors Influencing Agriculture", "Farm Tools and Equipment", "Crop Production (Land Preparation)", "Water Supply, Irrigation and Drainage"],
      '2': ["Soil Fertility I (Organic Manure)", "Livestock Production I (Common Breeds)", "Agricultural Economics I (Basic Concepts and Farm Records)"],
      '3': ["Crop Production IV (Field Practices)", "Livestock Health II (Diseases)", "Livestock Production III (Nutrition)", "Farm Power"],
      '4': ["Agricultural Economics IV (Farm Management)", "Agricultural Economics V (Marketing and Organizations)", "Agroforestry"]
  },
  computer: {
      '1': ["Introduction to Computers", "Computer Systems", "Operating Systems", "Data Representation"],
      '2': ["Word Processing", "Spreadsheets", "Databases"],
      '3': ["Desktop Publishing", "The Internet and E-mail", "Data Security and Controls"],
      '4': ["Data Processing", "Elementary Programming Principles", "Systems Development", "Impact of ICT on Society"]
  }
};

const KCSE_STRUCTURES = {
  mathematics: {
    '1': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Section A', marks: 50, questionCount: 16, description: 'Answer all questions.' }, { id: 'B', title: 'Section B', marks: 50, questionCount: 8, choose: 5, description: 'Answer any five questions.' }] },
    '2': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Section A', marks: 50, questionCount: 16, description: 'Answer all questions.' }, { id: 'B', title: 'Section B', marks: 50, questionCount: 8, choose: 5, description: 'Answer any five questions.' }] }
  },
  english: {
    '1': { title: 'Functional Skills', duration: 120, totalMarks: 60, sections: [{ id: '1', title: 'Functional Writing', marks: 20, questionCount: 1 }, { id: '2', title: 'Cloze Test', marks: 10, questionCount: 1 }, { id: '3', title: 'Oral Skills', marks: 30, questionCount: 1 }] },
    '2': { title: 'Comprehension, Literary Appreciation & Grammar', duration: 150, totalMarks: 80, sections: [{ id: '1', title: 'Comprehension', marks: 20, questionCount: 1 }, { id: '2', title: 'Excerpt from Set Text', marks: 25, questionCount: 1 }, { id: '3', title: 'Poetry', marks: 20, questionCount: 1 }, { id: '4', title: 'Grammar', marks: 15, questionCount: 1 }] },
    '3': { title: 'Creative Writing and Essays on Set Texts', duration: 150, totalMarks: 40, sections: [{ id: '1', title: 'Imaginative Composition', marks: 20, questionCount: 2, choose: 1 }, { id: '2', title: 'Essay on Set Text', marks: 20, questionCount: 3, choose: 1 }] }
  },
  kiswahili: {
    '1': { title: 'Insha', duration: 105, totalMarks: 40, sections: [{ id: 'A', title: 'Insha', questionCount: 2, choose: 1 }] },
    '2': { title: 'Lugha', duration: 150, totalMarks: 80, sections: [{ id: 'A', title: 'Ufahamu' }, { id: 'B', title: 'Ufupisho' }, { id: 'C', title: 'Matumizi ya Lugha' }, { id: 'D', title: 'Isimu Jamii' }] },
    '3': { title: 'Fasihi', duration: 150, totalMarks: 80, sections: [{ id: 'A', title: 'Fasihi Simulizi' }, { id: 'B', title: 'Riwaya' }, { id: 'C', title: 'Tamthilia' }, { id: 'D', title: 'Hadithi Fupi' }, { id: 'E', title: 'Ushairi' }] }
  },
  chemistry: {
    '1': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Theory', questionCount: 28, description: 'Answer all questions.' }] },
    '2': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Theory and Calculations', questionCount: 7, description: 'Answer all questions.' }] },
    '3': { duration: 135, totalMarks: 40, sections: [{ id: 'A', title: 'Practical', questionCount: 3, description: 'Answer all questions.' }] }
  },
  biology: {
    '1': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Theory', questionCount: 25, description: 'Answer all questions.' }] },
    '2': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Section A', marks: 40, questionCount: 5 }, { id: 'B', title: 'Section B', marks: 40, questionCount: 3, choose: 2 }] },
    '3': { duration: 135, totalMarks: 40, sections: [{ id: 'A', title: 'Practical', questionCount: 3, description: 'Answer all questions.' }] }
  },
  physics: {
    '1': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Theory', questionCount: 15, description: 'Answer all questions.' }] },
    '2': { duration: 120, totalMarks: 80, sections: [{ id: 'A', title: 'Section A', marks: 25, questionCount: 6 }, { id: 'B', title: 'Section B', marks: 55, questionCount: 5, choose: 3 }] },
    '3': { duration: 135, totalMarks: 40, sections: [{ id: 'A', title: 'Practical', questionCount: 2, description: 'Answer all questions.' }] }
  },
  history: {
      '1': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Section A: Kenyan History', marks: 25, questionCount: 4 }, { id: 'B', title: 'Section B: African History', marks: 45, questionCount: 3, choose: 2 }, { id: 'C', title: 'Section C: World History', marks: 30, questionCount: 3, choose: 2 }] },
      '2': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Section A: Government', marks: 25, questionCount: 4 }, { id: 'B', title: 'Section B: International Relations', marks: 45, questionCount: 3, choose: 2 }, { id: 'C', title: 'Section C: Specific Topics', marks: 30, questionCount: 3, choose: 2 }] }
  },
  geography: {
      '1': { duration: 165, totalMarks: 100, sections: [{ id: 'A', title: 'Section A', marks: 25, questionCount: 5 }, { id: 'B', title: 'Section B', marks: 75, questionCount: 5, choose: 3 }] },
      '2': { duration: 165, totalMarks: 100, sections: [{ id: 'A', title: 'Section A', marks: 25, questionCount: 5 }, { id: 'B', title: 'Section B', marks: 75, questionCount: 5, choose: 3 }] }
  },
  cre: {
      '1': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Answer any five questions.', questionCount: 6, choose: 5 }] },
      '2': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Answer any five questions.', questionCount: 6, choose: 5 }] }
  },
  business: {
    '1': { duration: 120, totalMarks: 100, sections: [{ id: 'A', title: 'Answer all questions', questionCount: 25 }] },
    '2': { duration: 150, totalMarks: 100, sections: [{ id: 'A', title: 'Answer any five questions', questionCount: 6, choose: 5 }] }
  },
  agriculture: {
    '1': { duration: 120, totalMarks: 90, sections: [{ id: 'A', marks: 30, questionCount: 15 }, {id: 'B', marks: 30, questionCount: 4 }, {id: 'C', marks: 30, questionCount: 3, choose: 2}] },
    '2': { duration: 120, totalMarks: 90, sections: [{ id: 'A', marks: 30, questionCount: 10 }, {id: 'B', marks: 20, questionCount: 3 }, {id: 'C', marks: 40, questionCount: 4, choose: 3}] },
    '3': { duration: 105, totalMarks: 40, sections: [{ id: 'A', title: 'Practical', questionCount: 3 }] }
  },
  computer: {
    '1': { duration: 150, totalMarks: 100, sections: [{ id: 'A', marks: 50, questionCount: 15 }, {id: 'B', marks: 50, questionCount: 5, choose: 3 }] },
    '2': { duration: 150, totalMarks: 50, sections: [{ id: 'A', title: 'Practical', questionCount: 2 }] }
  }
};

// Question Bank for KCSE Subjects
const QUESTION_BANK = {
  mathematics: [
    { topic: 'Numbers', type: 'mcq', question: 'What is the value of 2³ + 3²?', options: ['17', '12', '15', '25'], correct: 0, marks: 2 },
    { topic: 'Algebraic Expressions', type: 'calculation', question: 'Simplify the expression: 3(x + 2y) - 2(2x - y)', answer: '-x + 8y', marks: 3 },
    { topic: 'Linear Equations', type: 'calculation', question: 'Solve for y: 4y - 8 = 2y + 2', answer: 'y = 5', marks: 3 },
    { topic: 'Geometry', type: 'calculation', question: 'The angles of a triangle are in the ratio 1:2:3. Find the size of the largest angle.', answer: '90 degrees', marks: 3 },
    { topic: 'Calculus (Differentiation and Integration)', type: 'calculation', question: "Find the derivative of f(x) = 3x² + 7x - 2.", answer: "f'(x) = 6x + 7", marks: 4},
    { topic: 'Matrices', type: 'mcq', question: 'Given matrix A = [[2, 1], [3, 4]], find its determinant.', options: ['5', '11', '-5', '8'], correct: 0, marks: 2 },
    { topic: 'Trigonometry', type: 'calculation', question: 'If sin(θ) = 0.5, find θ for 0° < θ < 90°', answer: '30°', marks: 2 },
    { topic: 'Statistics', type: 'mcq', question: 'What is the mode of the following set of numbers: 2, 4, 5, 5, 6, 7?', options: ['2', '4', '5', '6'], correct: 2, marks: 1 }
  ],
  chemistry: [
    { topic: 'Introduction to Chemistry', type: 'mcq', question: 'Which of the following apparatus is most suitable for accurately measuring 25.0 cm³ of a solution?', options: ['Beaker', 'Measuring cylinder', 'Pipette', 'Conical flask'], correct: 2, marks: 1 },
    { topic: 'Acids, Bases and Indicators', type: 'mcq', question: 'Which of the following is a property of an acidic solution?', options: ['Has a pH greater than 7', 'Turns red litmus paper blue', 'Feels soapy', 'Reacts with metals to produce hydrogen gas'], correct: 3, marks: 1 },
    { topic: 'The Mole Concept', type: 'calculation', question: 'Calculate the number of moles in 36g of water (H₂O). (H=1, O=16)', answer: '2 moles', marks: 3 },
    { topic: 'Organic Chemistry I (Hydrocarbons)', type: 'mcq', question: 'What is the general formula for alkanes?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correct: 1, marks: 1 },
    { topic: 'Radioactivity', type: 'mcq', question: 'Which type of radiation is a high-energy electron?', options: ['Alpha particle', 'Beta particle', 'Gamma ray', 'Neutron'], correct: 1, marks: 1 },
    { topic: 'Structure and Bonding', type: 'mcq', question: 'What type of bonding is present in a diamond?', options: ['Ionic', 'Metallic', 'Covalent', 'Van der Waals'], correct: 2, marks: 1 }
  ],
  biology: [
    { topic: 'The Cell', type: 'mcq', question: 'Which organelle is known as the "powerhouse" of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Chloroplast'], correct: 2, marks: 1 },
    { topic: 'Nutrition in Plants and Animals', type: 'mcq', question: 'What is the primary function of bile in digestion?', options: ['Breaking down proteins', 'Emulsifying fats', 'Digesting carbohydrates', 'Absorbing vitamins'], correct: 1, marks: 1 },
    { topic: 'Genetics', type: 'short-answer', question: 'Define the term "phenotype".', answer: 'The observable physical properties of an organism.', marks: 2 },
    { topic: 'Ecology', type: 'mcq', question: 'Which of the following is a biotic factor in an ecosystem?', options: ['Sunlight', 'Temperature', 'Bacteria', 'Water'], correct: 2, marks: 1 }
  ],
  physics: [
    { topic: 'Force', type: 'calculation', question: 'A force of 20N acts on an object of mass 5kg. Calculate the acceleration.', answer: '4 m/s²', marks: 2 },
    { topic: 'Waves', type: 'mcq', question: 'Which of the following is a transverse wave?', options: ['Sound', 'Light', 'Ultrasound', 'Shockwave'], correct: 1, marks: 1 },
    { topic: 'Electronics', type: 'short-answer', question: 'What does the acronym LED stand for?', answer: 'Light Emitting Diode', marks: 1 },
    { topic: 'Thin Lenses', type: 'mcq', question: 'A converging lens is also known as a...', options: ['Concave lens', 'Convex lens', 'Plane mirror', 'Prism'], correct: 1, marks: 1 }
  ]
};

// KCSE Dynamic Exam Simulator - JavaScript

// Application State
class KCSEApp {
  constructor() {
    this.currentExam = null;
    this.currentQuestion = 0;
    this.examTimer = null;
    this.examStartTime = null;
    this.examDuration = 0;
    this.userAnswers = {};
    this.flaggedQuestions = new Set();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.hideLoadingScreen();
  }

  setupEventListeners() {
    // Exam generation
    document.querySelector('.generate-exam-btn')?.addEventListener('click', () => {
      this.generateCustomExam();
    });

    // Modal controls
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      this.closeModal();
    });

    // Exam controls
    document.getElementById('pause-timer')?.addEventListener('click', () => {
      this.pauseExam();
    });

    document.getElementById('submit-exam')?.addEventListener('click', () => {
      this.submitExam();
    });

    document.getElementById('prev-question')?.addEventListener('click', () => {
      this.previousQuestion();
    });

    document.getElementById('next-question')?.addEventListener('click', () => {
      this.nextQuestion();
    });

    // Results actions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.textContent.toLowerCase();
        this.handleResultsAction(action);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });

    // Auto-save answers
    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('answer-textarea') || 
          e.target.type === 'radio' || 
          e.target.type === 'checkbox') {
        this.autoSaveAnswer();
      }
    });

    // Prevent accidental page refresh during exam
    window.addEventListener('beforeunload', (e) => {
      if (this.currentExam && this.examTimer) {
        e.preventDefault();
        e.returnValue = 'You have an exam in progress. Are you sure you want to leave?';
        return e.returnValue;
      }
    });
  }

  // Exam Generation and Management
  async generateCustomExam() {
    const subject = document.getElementById('subject-select').value;
    const formLevel = document.getElementById('form-level-select').value;
    const paperType = document.getElementById('paper-type-select').value;

    this.showLoadingMessage('Generating your custom exam...');

    try {
      const examData = await this.generateExamWithAI({
        subject,
        formLevel,
        paperType
      });

      this.startExam(examData);
    } catch (error) {
      console.error('Error generating exam:', error);
      alert(`Failed to generate exam: ${error.message}. Please check the console for details.`);
    } finally {
      this.hideLoadingMessage();
    }
  }

  async generateExamWithAI(params) {
    const { subject, formLevel, paperType } = params;

    const paperStructure = KCSE_STRUCTURES[subject]?.[paperType];
    if (!paperStructure) {
        throw new Error(`Invalid paper structure for ${subject} Paper ${paperType}`);
    }

    const topics = KCSE_CURRICULUM[subject]?.[formLevel];
    if (!topics) {
        throw new Error(`Invalid curriculum for ${subject} Form ${formLevel}`);
    }

    const totalQuestions = paperStructure.sections.reduce((acc, section) => acc + (section.questionCount || 1), 0);

    const questions = await this.generateAIQuestions(
        subject,
        totalQuestions,
        topics
    );

    const subjectNames = {
      mathematics: 'Mathematics', english: 'English', kiswahili: 'Kiswahili',
      biology: 'Biology', chemistry: 'Chemistry', physics: 'Physics',
      history: 'History', geography: 'Geography', cre: 'Christian Religious Education',
      business: 'Business Studies', agriculture: 'Agriculture', computer: 'Computer Studies'
    };
    const subjectName = subjectNames[subject] || this.capitalizeFirst(subject);

    return {
        id: this.generateId(),
        title: `${subjectName} Paper ${paperType}`,
        subjects: [subject],
        difficulty: `Form ${formLevel}`,
        duration: paperStructure.duration,
        totalMarks: paperStructure.totalMarks,
        questions: questions,
        type: 'custom',
        structure: paperStructure
    };
  }

  async generateAIQuestions(subject, count, topics) {
    const allSubjectQuestions = QUESTION_BANK[subject] || [];
    if (allSubjectQuestions.length === 0) {
        console.warn(`No questions found in bank for subject: ${subject}`);
        return this.generateSampleQuestions(count);
    }

    // Filter questions that match the specific topics for the form level
    let topicSpecificQuestions = allSubjectQuestions.filter(q => topics.includes(q.topic));

    // Create a set of the questions we already have to avoid duplicates
    const selectedQuestions = new Set(topicSpecificQuestions.map(q => q.question));

    // If we don't have enough topic-specific questions, fill with other questions from the same subject
    if (topicSpecificQuestions.length < count) {
        const otherQuestions = allSubjectQuestions.filter(q => !selectedQuestions.has(q.question));
        const needed = count - topicSpecificQuestions.length;

        const shuffledOthers = otherQuestions.sort(() => 0.5 - Math.random());
        topicSpecificQuestions.push(...shuffledOthers.slice(0, needed));
    }

    // Shuffle the final list and slice to the exact count
    const finalQuestions = topicSpecificQuestions.sort(() => 0.5 - Math.random()).slice(0, count);

    // Assign question numbers
    return finalQuestions.map((q, index) => ({
        ...q,
        id: this.generateId(),
        number: index + 1,
        subject: subject,
    }));
  }

  generateSampleQuestions(count) {
    const sampleQuestions = [
      {
        id: 'q1',
        type: 'mcq',
        subject: 'mathematics',
        question: 'What is the value of x in the equation 3x - 7 = 14?',
        options: ['x = 5', 'x = 7', 'x = 9', 'x = 11'],
        correct: 1,
        marks: 2,
        explanation: '3x - 7 = 14, so 3x = 21, therefore x = 7'
      },
      {
        id: 'q2',
        type: 'mcq',
        subject: 'mathematics',
        question: 'Which of the following is a prime number?',
        options: ['15', '21', '23', '27'],
        correct: 2,
        marks: 1,
        explanation: '23 is only divisible by 1 and itself, making it a prime number'
      },
      {
        id: 'q3',
        type: 'calculation',
        subject: 'mathematics',
        question: 'Calculate the perimeter of a rectangle with length 12 cm and width 8 cm.',
        marks: 3,
        answer: '40 cm',
        explanation: 'Perimeter = 2(l + w) = 2(12 + 8) = 2(20) = 40 cm'
      }
    ];

    const questions = [];
    for (let i = 0; i < count; i++) {
      const template = sampleQuestions[i % sampleQuestions.length];
      questions.push({
        ...template,
        id: this.generateId(),
        number: i + 1
      });
    }

    return questions;
  }

  startExam(examData) {
    this.currentExam = examData;
    this.currentQuestion = 0;
    this.userAnswers = {};
    this.flaggedQuestions.clear();
    this.examStartTime = new Date();
    this.examDuration = examData.duration * 60; // Convert to seconds

    this.showExamModal();
    this.loadExamInterface();
    this.startExamTimer();
  }

  showExamModal() {
    const modal = document.getElementById('exam-modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  loadExamInterface() {
    // Update exam header
    document.getElementById('exam-title').textContent = this.currentExam.title;
    document.getElementById('exam-details').textContent = 
      `${this.capitalizeFirst(this.currentExam.difficulty)} • ${this.currentExam.duration} minutes • ${this.currentExam.totalMarks} marks`;

    // Generate question navigation
    this.generateQuestionNavigation();
    
    // Load first question
    this.loadQuestion(0);
  }

  generateQuestionNavigation() {
    const navContainer = document.getElementById('question-nav');
    navContainer.innerHTML = '';

    this.currentExam.questions.forEach((_, index) => {
      const btn = document.createElement('button');
      btn.className = 'question-number-btn';
      btn.textContent = index + 1;
      btn.addEventListener('click', () => this.goToQuestion(index));
      navContainer.appendChild(btn);
    });

    this.updateQuestionNavigation();
  }

  updateQuestionNavigation() {
    const buttons = document.querySelectorAll('.question-number-btn');
    buttons.forEach((btn, index) => {
      btn.classList.remove('current', 'answered', 'flagged');
      
      if (index === this.currentQuestion) {
        btn.classList.add('current');
      }
      
      if (this.userAnswers[index] !== undefined) {
        btn.classList.add('answered');
      }
      
      if (this.flaggedQuestions.has(index)) {
        btn.classList.add('flagged');
      }
    });
  }

  loadQuestion(questionIndex) {
    const question = this.currentExam.questions[questionIndex];
    if (!question) return;

    this.currentQuestion = questionIndex;

    // Update question header
    document.querySelector('.question-number').textContent = 
      `Question ${questionIndex + 1} of ${this.currentExam.questions.length}`;

    // Update flag button
    const flagBtn = document.querySelector('.flag-question');
    flagBtn.classList.toggle('flagged', this.flaggedQuestions.has(questionIndex));
    flagBtn.onclick = () => this.toggleFlag(questionIndex);

    // Load question content
    const questionContent = document.getElementById('current-question');
    questionContent.innerHTML = `
      <h4>${question.question}</h4>
      ${question.passage ? `<div class="passage">${question.passage}</div>` : ''}
      ${question.marks ? `<p class="marks-info">[${question.marks} marks]</p>` : ''}
    `;

    // Load answer area
    this.loadAnswerArea(question, questionIndex);

    // Update navigation buttons
    document.getElementById('prev-question').disabled = questionIndex === 0;
    document.getElementById('next-question').textContent = 
      questionIndex === this.currentExam.questions.length - 1 ? 'Finish' : 'Next →';

    this.updateQuestionNavigation();
  }

  loadAnswerArea(question, questionIndex) {
    const answerArea = document.getElementById('answer-area');
    const savedAnswer = this.userAnswers[questionIndex];

    switch (question.type) {
      case 'mcq':
        answerArea.innerHTML = `
          <div class="answer-options">
            ${question.options.map((option, i) => `
              <label class="answer-option ${savedAnswer === i ? 'selected' : ''}">
                <input type="radio" name="question-${questionIndex}" value="${i}" 
                       ${savedAnswer === i ? 'checked' : ''}>
                <span>${option}</span>
              </label>
            `).join('')}
          </div>
        `;
        break;

      case 'essay':
      case 'short-answer':
      case 'calculation':
        answerArea.innerHTML = `
          <textarea class="answer-textarea" placeholder="Type your answer here..." 
                    rows="${question.type === 'essay' ? '15' : '8'}">${savedAnswer || ''}</textarea>
          ${question.guidelines ? `<p class="guidelines">${question.guidelines}</p>` : ''}
        `;
        break;

      default:
        answerArea.innerHTML = `
          <textarea class="answer-textarea" placeholder="Type your answer here..." 
                    rows="8">${savedAnswer || ''}</textarea>
        `;
    }

    // Add event listeners for answer inputs
    answerArea.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('change', () => this.saveAnswer(questionIndex));
      input.addEventListener('input', () => this.saveAnswer(questionIndex));
    });
  }

  saveAnswer(questionIndex) {
    const question = this.currentExam.questions[questionIndex];
    let answer;

    if (question.type === 'mcq') {
      const selected = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
      answer = selected ? parseInt(selected.value) : undefined;
    } else {
      const textarea = document.querySelector('.answer-textarea');
      answer = textarea ? textarea.value.trim() : '';
      if (answer === '') answer = undefined;
    }

    if (answer !== undefined) {
      this.userAnswers[questionIndex] = answer;
    } else {
      delete this.userAnswers[questionIndex];
    }

    this.updateQuestionNavigation();
  }

  autoSaveAnswer() {
    this.saveAnswer(this.currentQuestion);
  }

  toggleFlag(questionIndex) {
    if (this.flaggedQuestions.has(questionIndex)) {
      this.flaggedQuestions.delete(questionIndex);
    } else {
      this.flaggedQuestions.add(questionIndex);
    }
    
    this.updateQuestionNavigation();
    
    const flagBtn = document.querySelector('.flag-question');
    flagBtn.classList.toggle('flagged', this.flaggedQuestions.has(questionIndex));
  }

  goToQuestion(questionIndex) {
    this.saveAnswer(this.currentQuestion);
    this.loadQuestion(questionIndex);
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.goToQuestion(this.currentQuestion - 1);
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.currentExam.questions.length - 1) {
      this.goToQuestion(this.currentQuestion + 1);
    } else {
      this.submitExam();
    }
  }

  startExamTimer() {
    this.updateTimerDisplay();
    
    this.examTimer = setInterval(() => {
      this.examDuration--;
      this.updateTimerDisplay();
      
      if (this.examDuration <= 0) {
        this.submitExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.examDuration / 60);
    const seconds = this.examDuration % 60;
    
    document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Warning colors
    const timerDisplay = document.querySelector('.timer-display');
    if (this.examDuration <= 300) { // 5 minutes
      timerDisplay.style.color = 'var(--error-color)';
    } else if (this.examDuration <= 600) { // 10 minutes
      timerDisplay.style.color = 'var(--warning-color)';
    }
  }

  pauseExam() {
    if (this.examTimer) {
      clearInterval(this.examTimer);
      this.examTimer = null;
      document.getElementById('pause-timer').textContent = '▶️';
    } else {
      this.startExamTimer();
      document.getElementById('pause-timer').textContent = '⏸️';
    }
  }

  async submitExam() {
    if (!confirm('Are you sure you want to submit your exam?')) {
      return;
    }

    this.saveAnswer(this.currentQuestion);
    
    if (this.examTimer) {
      clearInterval(this.examTimer);
      this.examTimer = null;
    }

    const examEndTime = new Date();
    const timeTaken = Math.round((examEndTime - this.examStartTime) / 1000);

    this.showLoadingMessage('Marking your exam...');

    try {
      const results = await this.markExam();
      this.showResults(results);
    } catch (error) {
      console.error('Error marking exam:', error);
      alert('Error marking exam. Please try again.');
    } finally {
      this.hideLoadingMessage();
    }
  }

  async markExam() {
    // Simulate AI marking
    const results = {
      examId: this.currentExam.id,
      totalQuestions: this.currentExam.questions.length,
      answeredQuestions: Object.keys(this.userAnswers).length,
      correctAnswers: 0,
      totalMarks: this.currentExam.totalMarks,
      marksScored: 0,
      percentage: 0,
      grade: 'E',
      questionResults: [],
      feedback: '',
      strengths: [],
      weaknesses: [],
      recommendations: []
    };

    // Mark each question
    for (let i = 0; i < this.currentExam.questions.length; i++) {
      const question = this.currentExam.questions[i];
      const userAnswer = this.userAnswers[i];
      const questionResult = await this.markQuestion(question, userAnswer);
      
      results.questionResults.push(questionResult);
      results.marksScored += questionResult.marksAwarded;
      
      if (questionResult.isCorrect) {
        results.correctAnswers++;
      }
    }

    results.percentage = Math.round((results.marksScored / results.totalMarks) * 100);
    results.grade = this.calculateGrade(results.percentage);
    results.feedback = await this.generateAIFeedback(results);

    return results;
  }

  async markQuestion(question, userAnswer) {
    const result = {
      questionId: question.id,
      userAnswer: userAnswer,
      correctAnswer: question.correct || question.answer,
      isCorrect: false,
      marksAwarded: 0,
      maxMarks: question.marks,
      feedback: ''
    };

    if (userAnswer === undefined) {
      result.feedback = 'No answer provided.';
      return result;
    }

    switch (question.type) {
      case 'mcq':
        result.isCorrect = userAnswer === question.correct;
        result.marksAwarded = result.isCorrect ? question.marks : 0;
        result.feedback = result.isCorrect 
          ? 'Correct answer!' 
          : `Incorrect. The correct answer is: ${question.options[question.correct]}`;
        break;

      case 'calculation':
        // Simple string matching for demo
        const userAnswerStr = userAnswer.toString().toLowerCase().replace(/\s/g, '');
        const correctAnswerStr = question.answer.toLowerCase().replace(/\s/g, '');
        result.isCorrect = userAnswerStr.includes(correctAnswerStr.replace(/[^\w]/g, ''));
        result.marksAwarded = result.isCorrect ? question.marks : Math.floor(question.marks * 0.3);
        result.feedback = result.isCorrect 
          ? 'Correct calculation!' 
          : `Partial credit awarded. Expected: ${question.answer}`;
        break;

      case 'essay':
      case 'short-answer':
        // Simulate AI marking based on length and keywords
        const wordCount = userAnswer.split(' ').length;
        const hasKeywords = this.checkKeywords(userAnswer, question.subject);
        
        if (wordCount >= 50 && hasKeywords) {
          result.marksAwarded = Math.floor(question.marks * 0.8);
          result.feedback = 'Good response with relevant content.';
        } else if (wordCount >= 20) {
          result.marksAwarded = Math.floor(question.marks * 0.6);
          result.feedback = 'Adequate response but could be more detailed.';
        } else {
          result.marksAwarded = Math.floor(question.marks * 0.3);
          result.feedback = 'Response too brief. More detail needed.';
        }
        break;
    }

    return result;
  }

  checkKeywords(answer, subject) {
    const keywords = {
      mathematics: ['equation', 'solve', 'calculate', 'formula', 'result'],
      english: ['analysis', 'character', 'theme', 'author', 'literary'],
      biology: ['cell', 'organism', 'function', 'process', 'system'],
      chemistry: ['reaction', 'compound', 'element', 'bond', 'molecule'],
      physics: ['force', 'energy', 'motion', 'wave', 'particle']
    };

    const subjectKeywords = keywords[subject] || [];
    const answerLower = answer.toLowerCase();
    
    return subjectKeywords.some(keyword => answerLower.includes(keyword));
  }

  calculateGrade(percentage) {
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'B-';
    if (percentage >= 40) return 'C+';
    if (percentage >= 30) return 'C';
    if (percentage >= 20) return 'C-';
    if (percentage >= 10) return 'D+';
    if (percentage >= 5) return 'D';
    return 'E';
  }

  async generateAIFeedback(results) {
    // Simulate AI-generated feedback
    const feedbackTemplates = [
      `Great job! You scored ${results.percentage}% on this exam. Your performance shows strong understanding of the concepts.`,
      `You scored ${results.percentage}% on this exam. There's room for improvement in some areas.`,
      `Your score of ${results.percentage}% indicates you need more practice with these topics.`
    ];

    let feedback = feedbackTemplates[Math.floor(results.percentage / 34)];
    
    if (results.percentage >= 80) {
      feedback += ' Keep up the excellent work!';
    } else if (results.percentage >= 60) {
      feedback += ' Focus on the areas where you lost marks to improve further.';
    } else {
      feedback += ' Consider reviewing the fundamental concepts and practicing more questions.';
    }

    return feedback;
  }

  showResults(results) {
    this.closeModal(); // Close exam modal
    
    // Update results modal
    document.getElementById('final-score').textContent = `${results.percentage}%`;
    document.getElementById('final-grade').textContent = results.grade;
    document.getElementById('correct-answers').textContent = 
      `${results.correctAnswers}/${results.totalQuestions}`;
    document.getElementById('marks-scored').textContent = 
      `${results.marksScored}/${results.totalMarks}`;
    
    const timeTaken = Math.round((new Date() - this.examStartTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    document.getElementById('time-taken').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Load AI feedback
    document.getElementById('ai-feedback').innerHTML = `
      <h4>Personalized Feedback</h4>
      <p>${results.feedback}</p>
    `;

    // Show results modal
    const modal = document.getElementById('results-modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('active');
      modal.style.display = 'none';
    });
    
    // Reset exam state
    this.currentExam = null;
    if (this.examTimer) {
      clearInterval(this.examTimer);
      this.examTimer = null;
    }
  }

  handleKeyboardShortcuts(e) {
    if (!this.currentExam) return;

    switch (e.key) {
      case 'ArrowLeft':
        if (e.ctrlKey) {
          e.preventDefault();
          this.previousQuestion();
        }
        break;
      case 'ArrowRight':
        if (e.ctrlKey) {
          e.preventDefault();
          this.nextQuestion();
        }
        break;
      case 'f':
        if (e.ctrlKey) {
          e.preventDefault();
          this.toggleFlag(this.currentQuestion);
        }
        break;
      case 'Enter':
        if (e.ctrlKey) {
          e.preventDefault();
          this.submitExam();
        }
        break;
    }
  }

  handleResultsAction(action) {
    switch (action) {
      case 'retake exam':
        this.closeModal();
        this.startExam(this.currentExam);
        break;
      case 'practice weak areas':
        this.closeModal();
        break;
      case 'download report':
        this.downloadExamReport();
        break;
    }
  }

  downloadExamReport() {
    // Generate PDF report (simplified)
    const reportData = {
      examTitle: this.currentExam.title,
      date: new Date().toLocaleDateString(),
      score: document.getElementById('final-score').textContent,
      grade: document.getElementById('final-grade').textContent,
      timeTaken: document.getElementById('time-taken').textContent
    };

    const reportContent = `
      KCSE Exam Report
      ================
      
      Exam: ${reportData.examTitle}
      Date: ${reportData.date}
      Score: ${reportData.score}
      Grade: ${reportData.grade}
      Time Taken: ${reportData.timeTaken}
      
      Generated by KCSE Dynamic Exam Simulator
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }

  showLoadingMessage(message) {
    const loadingEl = document.getElementById('loading-screen');
    loadingEl.querySelector('.loading-text').textContent = message;
    loadingEl.style.display = 'flex';
  }

  hideLoadingMessage() {
    document.getElementById('loading-screen').style.display = 'none';
  }

  hideLoadingScreen() {
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    }, 2000);
  }

  generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.kcseApp = new KCSEApp();
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
