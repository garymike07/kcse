// KCSE Dynamic Exam Simulator - JavaScript

// Application State
class KCSEApp {
  constructor() {
    this.currentPage = 'dashboard';
    this.currentExam = null;
    this.currentQuestion = 0;
    this.examTimer = null;
    this.examStartTime = null;
    this.examDuration = 0;
    this.userAnswers = {};
    this.flaggedQuestions = new Set();
    this.userData = this.loadUserData();
    this.examHistory = this.loadExamHistory();
    this.achievements = this.loadAchievements();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadDashboard();
    this.hideLoadingScreen();
    this.updateKCSECountdown();
    this.updateStudyStreak();
    this.loadMotivationalQuote();
    
    // Update countdown every hour
    setInterval(() => this.updateKCSECountdown(), 3600000);
    
    // Update daily quote
    setInterval(() => this.loadMotivationalQuote(), 86400000);
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.currentTarget.dataset.page;
        this.navigateToPage(page);
      });
    });

    // Subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const subject = e.currentTarget.dataset.subject;
        this.quickStartExam(subject);
      });
    });

    // Challenge button
    document.querySelector('.challenge-btn')?.addEventListener('click', () => {
      this.startDailyChallenge();
    });

    // Exam generation
    document.querySelector('.generate-exam-btn')?.addEventListener('click', () => {
      this.generateCustomExam();
    });

    // Recommendation buttons
    document.querySelectorAll('.rec-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.recommendation-card');
        this.startRecommendedExam(card);
      });
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

    // Tab controls
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        this.switchTab(e.currentTarget, tabName);
      });
    });

    // Profile actions
    document.querySelector('.save-profile-btn')?.addEventListener('click', () => {
      this.saveProfile();
    });

    document.querySelector('.export-data-btn')?.addEventListener('click', () => {
      this.exportData();
    });

    document.querySelector('.reset-data-btn')?.addEventListener('click', () => {
      this.resetData();
    });

    // Practice buttons
    document.querySelectorAll('.practice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const weakness = e.target.closest('.weakness-item');
        this.practiceWeakness(weakness);
      });
    });

    // Tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tool = e.target.closest('.tool-card');
        this.openTool(tool);
      });
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

  // Data Management
  loadUserData() {
    const defaultData = {
      name: '',
      form: '4',
      school: '',
      subjects: ['mathematics', 'english', 'kiswahili', 'biology'],
      studyGoal: 60,
      notificationTime: '19:00',
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true
      }
    };
    
    const saved = localStorage.getItem('kcse_user_data');
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  }

  saveUserData() {
    localStorage.setItem('kcse_user_data', JSON.stringify(this.userData));
  }

  loadExamHistory() {
    const saved = localStorage.getItem('kcse_exam_history');
    return saved ? JSON.parse(saved) : [];
  }

  saveExamHistory() {
    localStorage.setItem('kcse_exam_history', JSON.stringify(this.examHistory));
  }

  loadAchievements() {
    const saved = localStorage.getItem('kcse_achievements');
    return saved ? JSON.parse(saved) : [];
  }

  saveAchievements() {
    localStorage.setItem('kcse_achievements', JSON.stringify(this.achievements));
  }

  // Navigation
  navigateToPage(pageName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Update pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(`${pageName}-page`).classList.add('active');

    this.currentPage = pageName;

    // Load page-specific content
    switch (pageName) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'analytics':
        this.loadAnalytics();
        break;
      case 'profile':
        this.loadProfile();
        break;
    }
  }

  // Dashboard Functions
  loadDashboard() {
    this.updateWelcomeMessage();
    this.updateQuickStats();
    this.updateRecentActivity();
    this.updateSubjectProgress();
  }

  updateWelcomeMessage() {
    const welcomeEl = document.getElementById('welcome-message');
    const dateEl = document.getElementById('current-date');
    
    const name = this.userData.name || 'Student';
    const now = new Date();
    const timeOfDay = this.getTimeOfDay(now.getHours());
    
    welcomeEl.textContent = `Good ${timeOfDay}, ${name}!`;
    dateEl.textContent = now.toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getTimeOfDay(hour) {
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  updateKCSECountdown() {
    const countdownEl = document.getElementById('kcse-countdown');
    const kcseDate = new Date(new Date().getFullYear(), 10, 1); // November 1st
    
    // If KCSE has passed this year, show next year's
    if (kcseDate < new Date()) {
      kcseDate.setFullYear(kcseDate.getFullYear() + 1);
    }
    
    const now = new Date();
    const timeDiff = kcseDate - now;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    countdownEl.textContent = `${days} days`;
  }

  updateQuickStats() {
    const streakEl = document.getElementById('study-streak');
    const avgScoreEl = document.getElementById('avg-score');
    const achievementsEl = document.getElementById('achievements-count');
    
    streakEl.textContent = this.calculateStudyStreak();
    avgScoreEl.textContent = this.calculateAverageScore() + '%';
    achievementsEl.textContent = this.achievements.length;
  }

  calculateStudyStreak() {
    const today = new Date().toDateString();
    const lastStudy = localStorage.getItem('kcse_last_study_date');
    
    if (lastStudy === today) {
      return parseInt(localStorage.getItem('kcse_study_streak') || '1');
    }
    
    return 0;
  }

  updateStudyStreak() {
    const today = new Date().toDateString();
    const lastStudy = localStorage.getItem('kcse_last_study_date');
    const currentStreak = parseInt(localStorage.getItem('kcse_study_streak') || '0');
    
    if (lastStudy !== today) {
      const newStreak = lastStudy === new Date(Date.now() - 86400000).toDateString() 
        ? currentStreak + 1 
        : 1;
      
      localStorage.setItem('kcse_study_streak', newStreak.toString());
      localStorage.setItem('kcse_last_study_date', today);
      
      // Check for streak achievements
      this.checkStreakAchievements(newStreak);
    }
  }

  calculateAverageScore() {
    if (this.examHistory.length === 0) return 0;
    
    const total = this.examHistory.reduce((sum, exam) => sum + exam.percentage, 0);
    return Math.round(total / this.examHistory.length);
  }

  updateRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    const recentExams = this.examHistory.slice(-3).reverse();
    
    activityList.innerHTML = recentExams.map(exam => `
      <div class="activity-item">
        <div class="activity-icon">📝</div>
        <div class="activity-info">
          <p><strong>${this.capitalizeFirst(exam.subject)} ${exam.type || 'Exam'}</strong> completed</p>
          <span class="activity-time">${this.formatTimeAgo(exam.date)}</span>
        </div>
        <div class="activity-score">${exam.percentage}%</div>
      </div>
    `).join('');
  }

  updateSubjectProgress() {
    document.querySelectorAll('.subject-card').forEach(card => {
      const subject = card.dataset.subject;
      const subjectExams = this.examHistory.filter(exam => exam.subject === subject);
      
      if (subjectExams.length > 0) {
        const latestScore = subjectExams[subjectExams.length - 1].percentage;
        const scoreEl = card.querySelector('p');
        const progressEl = card.querySelector('.progress-fill');
        
        scoreEl.textContent = `Last score: ${latestScore}%`;
        progressEl.style.width = `${latestScore}%`;
      }
    });
  }

  loadMotivationalQuote() {
    const quotes = [
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Success is where preparation and opportunity meet.", author: "Bobby Unser" },
      { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    document.getElementById('daily-quote').textContent = randomQuote.text;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
  }

  // Exam Generation and Management
  async generateCustomExam() {
    const subjects = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);
    const topics = document.getElementById('custom-topics').value;
    const numQuestions = parseInt(document.getElementById('custom-questions').value);
    const totalMarks = parseInt(document.getElementById('custom-marks').value);
    const difficulty = document.getElementById('difficulty-select').value;
    const duration = parseInt(document.getElementById('duration-select').value);
    const questionType = document.getElementById('question-type-select').value;

    if (subjects.length === 0) {
      alert('Please select at least one subject.');
      return;
    }

    this.showLoadingMessage('Generating your custom exam...');

    try {
      const examData = await this.generateExamWithAI({
        subjects,
        topics,
        numQuestions,
        totalMarks,
        difficulty,
        duration,
        questionType
      });

      this.startExam(examData);
    } catch (error) {
      console.error('Error generating exam:', error);
      alert('Failed to generate exam. Please try again.');
    } finally {
      this.hideLoadingMessage();
    }
  }

  async generateExamWithAI(params) {
    // Simulate AI exam generation
    // In a real implementation, this would call an AI API
    
    const subjectNames = {
      mathematics: 'Mathematics',
      english: 'English',
      kiswahili: 'Kiswahili',
      biology: 'Biology',
      chemistry: 'Chemistry',
      physics: 'Physics',
      history: 'History',
      geography: 'Geography',
      cre: 'Christian Religious Education'
    };

    const questions = [];
    const questionsPerSubject = Math.ceil(params.numQuestions / params.subjects.length);

    for (const subject of params.subjects) {
      const subjectQuestions = await this.generateSubjectQuestions(
        subject, 
        questionsPerSubject, 
        params.difficulty,
        params.questionType,
        params.topics
      );
      questions.push(...subjectQuestions);
    }

    // Shuffle questions
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return {
      id: this.generateId(),
      title: params.subjects.length === 1 
        ? `${subjectNames[params.subjects[0]]} Practice Exam`
        : 'Mixed Subjects Exam',
      subjects: params.subjects,
      difficulty: params.difficulty,
      duration: params.duration,
      totalMarks: params.totalMarks,
      questions: questions.slice(0, params.numQuestions),
      type: 'custom'
    };
  }

  async generateSubjectQuestions(subject, count, difficulty, questionType, topics) {
    // Sample question templates for different subjects
    const questionTemplates = {
      mathematics: [
        {
          type: 'mcq',
          question: 'Solve for x: 2x + 5 = 13',
          options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
          correct: 0,
          marks: 2,
          explanation: '2x + 5 = 13, so 2x = 8, therefore x = 4'
        },
        {
          type: 'calculation',
          question: 'Find the area of a circle with radius 7 cm. (Use π = 22/7)',
          marks: 4,
          answer: '154 cm²',
          explanation: 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²'
        }
      ],
      english: [
        {
          type: 'essay',
          question: 'Write a composition about "The importance of education in modern society"',
          marks: 20,
          guidelines: 'Your composition should be 350-450 words and include an introduction, body, and conclusion.'
        },
        {
          type: 'comprehension',
          question: 'Read the passage below and answer the questions that follow.',
          passage: 'Education is the foundation of progress...',
          marks: 10
        }
      ],
      biology: [
        {
          type: 'mcq',
          question: 'Which organelle is responsible for photosynthesis in plant cells?',
          options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'],
          correct: 1,
          marks: 1,
          explanation: 'Chloroplasts contain chlorophyll and are the sites of photosynthesis'
        }
      ]
    };

    const templates = questionTemplates[subject] || questionTemplates.mathematics;
    const questions = [];

    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      questions.push({
        ...template,
        id: this.generateId(),
        subject: subject,
        number: i + 1
      });
    }

    return questions;
  }

  quickStartExam(subject) {
    this.navigateToPage('exams');
    document.getElementById('subject-select').value = subject;
    
    // Auto-generate a quick exam
    setTimeout(() => {
      this.generateCustomExam();
    }, 500);
  }

  startRecommendedExam(card) {
    const title = card.querySelector('h4').textContent;
    const meta = card.querySelector('.rec-meta').textContent;
    
    // Parse recommendation and generate appropriate exam
    this.showLoadingMessage('Preparing recommended exam...');
    
    setTimeout(() => {
      const examData = this.createRecommendedExam(title, meta);
      this.startExam(examData);
      this.hideLoadingMessage();
    }, 2000);
  }

  createRecommendedExam(title, meta) {
    // Create exam based on recommendation
    return {
      id: this.generateId(),
      title: title,
      subjects: ['mathematics'], // Default for demo
      difficulty: 'intermediate',
      duration: 45,
      totalMarks: 60,
      questions: this.generateSampleQuestions(15),
      type: 'recommended'
    };
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
    this.updateStudyStreak();
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
      this.saveExamResult(results, timeTaken);
      this.showResults(results);
      this.checkAchievements(results);
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

  saveExamResult(results, timeTaken) {
    const examRecord = {
      id: this.generateId(),
      examId: results.examId,
      date: new Date().toISOString(),
      subject: this.currentExam.subjects[0] || 'mixed',
      title: this.currentExam.title,
      type: this.currentExam.type,
      difficulty: this.currentExam.difficulty,
      duration: this.currentExam.duration,
      timeTaken: timeTaken,
      totalQuestions: results.totalQuestions,
      answeredQuestions: results.answeredQuestions,
      correctAnswers: results.correctAnswers,
      totalMarks: results.totalMarks,
      marksScored: results.marksScored,
      percentage: results.percentage,
      grade: results.grade,
      strengths: results.strengths,
      weaknesses: results.weaknesses
    };

    this.examHistory.push(examRecord);
    this.saveExamHistory();
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

  // Analytics Functions
  loadAnalytics() {
    this.updateOverallProgress();
    this.loadSubjectPerformanceChart();
    this.loadProgressTimelineChart();
    this.loadTopicHeatmap();
    this.loadStrengthsAndWeaknesses();
  }

  updateOverallProgress() {
    const avgScore = this.calculateAverageScore();
    document.querySelector('.progress-value').textContent = `${avgScore}%`;
    
    // Update predicted grade
    const predictedGrade = this.calculateGrade(avgScore);
    document.querySelector('.predicted-grade').textContent = predictedGrade;
    
    // Update study time (mock data)
    const studyTime = this.calculateWeeklyStudyTime();
    document.querySelector('.time-value').textContent = studyTime;
  }

  calculateWeeklyStudyTime() {
    // Mock calculation based on exam history
    const recentExams = this.examHistory.filter(exam => {
      const examDate = new Date(exam.date);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return examDate > weekAgo;
    });
    
    const totalMinutes = recentExams.reduce((sum, exam) => sum + exam.duration, 0);
    return (totalMinutes / 60).toFixed(1);
  }

  loadSubjectPerformanceChart() {
    const ctx = document.getElementById('subject-performance-chart');
    if (!ctx) return;

    const subjects = ['Mathematics', 'English', 'Kiswahili', 'Biology', 'Chemistry', 'Physics'];
    const scores = subjects.map(subject => {
      const subjectExams = this.examHistory.filter(exam => 
        exam.subject.toLowerCase() === subject.toLowerCase());
      return subjectExams.length > 0 
        ? subjectExams.reduce((sum, exam) => sum + exam.percentage, 0) / subjectExams.length
        : 0;
    });

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: subjects,
        datasets: [{
          label: 'Performance',
          data: scores,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  loadProgressTimelineChart() {
    const ctx = document.getElementById('progress-timeline-chart');
    if (!ctx) return;

    const last30Days = [];
    const scores = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      last30Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const dayExams = this.examHistory.filter(exam => {
        const examDate = new Date(exam.date);
        return examDate.toDateString() === date.toDateString();
      });
      
      const avgScore = dayExams.length > 0 
        ? dayExams.reduce((sum, exam) => sum + exam.percentage, 0) / dayExams.length
        : null;
      
      scores.push(avgScore);
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: last30Days,
        datasets: [{
          label: 'Average Score',
          data: scores,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  loadTopicHeatmap() {
    const heatmapContainer = document.getElementById('topic-heatmap');
    if (!heatmapContainer) return;

    const topics = [
      'Algebra', 'Geometry', 'Calculus', 'Statistics',
      'Grammar', 'Literature', 'Composition', 'Comprehension',
      'Cell Biology', 'Genetics', 'Ecology', 'Evolution',
      'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'
    ];

    heatmapContainer.innerHTML = topics.map(topic => {
      const performance = Math.floor(Math.random() * 100); // Mock data
      const color = this.getHeatmapColor(performance);
      
      return `
        <div class="heatmap-cell" style="background-color: ${color}" title="${topic}: ${performance}%">
          <span class="topic-name">${topic}</span>
          <span class="topic-score">${performance}%</span>
        </div>
      `;
    }).join('');
  }

  getHeatmapColor(performance) {
    if (performance >= 80) return '#10b981';
    if (performance >= 60) return '#f59e0b';
    if (performance >= 40) return '#ef4444';
    return '#6b7280';
  }

  loadStrengthsAndWeaknesses() {
    // Mock data for strengths and weaknesses
    const strengths = [
      { subject: 'Biology', topic: 'Cell Structure', score: 95 },
      { subject: 'English', topic: 'Comprehension', score: 88 }
    ];

    const weaknesses = [
      { subject: 'Mathematics', topic: 'Algebra', score: 65 },
      { subject: 'Chemistry', topic: 'Organic Chemistry', score: 58 }
    ];

    // Update strengths
    const strengthsList = document.querySelector('.strengths-list');
    if (strengthsList) {
      strengthsList.innerHTML = strengths.map(strength => `
        <div class="strength-item">
          <div class="strength-icon">🧬</div>
          <div class="strength-info">
            <h5>${strength.subject} - ${strength.topic}</h5>
            <p>Consistently scoring ${strength.score}%+ in this topic</p>
            <div class="strength-score">Mastery: ${strength.score}%</div>
          </div>
        </div>
      `).join('');
    }

    // Update weaknesses
    const weaknessesList = document.querySelector('.weaknesses-list');
    if (weaknessesList) {
      weaknessesList.innerHTML = weaknesses.map(weakness => `
        <div class="weakness-item">
          <div class="weakness-icon">🔢</div>
          <div class="weakness-info">
            <h5>${weakness.subject} - ${weakness.topic}</h5>
            <p>Need more practice with this topic</p>
            <div class="weakness-score">Current: ${weakness.score}%</div>
            <button class="practice-btn">Practice Now</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Profile Functions
  loadProfile() {
    // Load user data into form
    document.getElementById('student-name').value = this.userData.name || '';
    document.getElementById('student-form').value = this.userData.form || '4';
    document.getElementById('student-school').value = this.userData.school || '';
    document.getElementById('study-goal').value = this.userData.studyGoal || 60;
    document.getElementById('notification-time').value = this.userData.notificationTime || '19:00';

    // Update subject preferences
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = this.userData.subjects.includes(checkbox.value);
    });

    // Update achievements
    this.updateAchievementsDisplay();
  }

  saveProfile() {
    this.userData.name = document.getElementById('student-name').value;
    this.userData.form = document.getElementById('student-form').value;
    this.userData.school = document.getElementById('student-school').value;
    this.userData.studyGoal = parseInt(document.getElementById('study-goal').value);
    this.userData.notificationTime = document.getElementById('notification-time').value;

    this.userData.subjects = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);

    this.saveUserData();
    alert('Profile saved successfully!');
  }

  exportData() {
    const data = {
      userData: this.userData,
      examHistory: this.examHistory,
      achievements: this.achievements,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `kcse-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }

  resetData() {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.clear();
      location.reload();
    }
  }

  // Achievement System
  checkAchievements(results) {
    const newAchievements = [];

    // First exam achievement
    if (this.examHistory.length === 1) {
      newAchievements.push({
        id: 'first-exam',
        name: 'First Exam',
        description: 'Completed your first practice exam',
        icon: '🏆',
        dateUnlocked: new Date().toISOString()
      });
    }

    // High score achievements
    if (results.percentage >= 90) {
      newAchievements.push({
        id: 'excellent-score',
        name: 'Excellence',
        description: 'Scored 90% or higher on an exam',
        icon: '⭐',
        dateUnlocked: new Date().toISOString()
      });
    }

    // Subject mastery
    if (results.percentage >= 85) {
      newAchievements.push({
        id: `${results.subject}-master`,
        name: 'Subject Master',
        description: `Mastered ${this.capitalizeFirst(results.subject)}`,
        icon: '📚',
        dateUnlocked: new Date().toISOString()
      });
    }

    // Add new achievements
    newAchievements.forEach(achievement => {
      if (!this.achievements.find(a => a.id === achievement.id)) {
        this.achievements.push(achievement);
        this.showAchievementNotification(achievement);
      }
    });

    if (newAchievements.length > 0) {
      this.saveAchievements();
    }
  }

  checkStreakAchievements(streak) {
    const streakAchievements = [
      { days: 7, name: '7-Day Streak', icon: '🔥' },
      { days: 14, name: '2-Week Warrior', icon: '💪' },
      { days: 30, name: 'Monthly Master', icon: '🏆' }
    ];

    streakAchievements.forEach(achievement => {
      if (streak >= achievement.days) {
        const achievementId = `streak-${achievement.days}`;
        if (!this.achievements.find(a => a.id === achievementId)) {
          const newAchievement = {
            id: achievementId,
            name: achievement.name,
            description: `Studied for ${achievement.days} consecutive days`,
            icon: achievement.icon,
            dateUnlocked: new Date().toISOString()
          };
          
          this.achievements.push(newAchievement);
          this.showAchievementNotification(newAchievement);
          this.saveAchievements();
        }
      }
    });
  }

  showAchievementNotification(achievement) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-text">
          <h4>Achievement Unlocked!</h4>
          <p>${achievement.name}</p>
        </div>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
      color: white;
      padding: 1rem;
      border-radius: 0.75rem;
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-in';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 5000);
  }

  updateAchievementsDisplay() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    if (!achievementsGrid) return;

    const allAchievements = [
      { id: 'first-exam', name: 'First Exam', description: 'Completed your first practice exam', icon: '🏆' },
      { id: 'streak-7', name: '7-Day Streak', description: 'Studied for 7 consecutive days', icon: '🔥' },
      { id: 'subject-master', name: 'Subject Master', description: 'Score 90%+ in any subject', icon: '📚' },
      { id: 'speed-demon', name: 'Speed Demon', description: 'Complete an exam in record time', icon: '⚡' }
    ];

    achievementsGrid.innerHTML = allAchievements.map(achievement => {
      const earned = this.achievements.find(a => a.id === achievement.id);
      return `
        <div class="achievement-badge ${earned ? 'earned' : ''}">
          <div class="badge-icon">${achievement.icon}</div>
          <div class="badge-info">
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Utility Functions
  switchTab(tabBtn, tabName) {
    // Update tab buttons
    tabBtn.parentElement.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    tabBtn.classList.add('active');

    // Update tab panels
    const tabContainer = tabBtn.closest('.detailed-analytics, .results-analysis');
    tabContainer.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    tabContainer.querySelector(`#${tabName}-tab`).classList.add('active');
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
        this.navigateToPage('analytics');
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

  startDailyChallenge() {
    // Generate a targeted challenge based on weak areas
    const weakSubjects = this.identifyWeakSubjects();
    const challengeSubject = weakSubjects[0] || 'mathematics';
    
    const challengeExam = {
      id: this.generateId(),
      title: 'Daily Challenge - ' + this.capitalizeFirst(challengeSubject),
      subjects: [challengeSubject],
      difficulty: 'intermediate',
      duration: 30,
      totalMarks: 40,
      questions: this.generateSampleQuestions(10),
      type: 'challenge'
    };

    this.startExam(challengeExam);
  }

  identifyWeakSubjects() {
    const subjectScores = {};
    
    this.examHistory.forEach(exam => {
      if (!subjectScores[exam.subject]) {
        subjectScores[exam.subject] = [];
      }
      subjectScores[exam.subject].push(exam.percentage);
    });

    const averages = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length
    }));

    return averages
      .sort((a, b) => a.average - b.average)
      .map(item => item.subject);
  }

  practiceWeakness(weaknessElement) {
    const subject = weaknessElement.querySelector('h5').textContent.split(' - ')[0].toLowerCase();
    this.quickStartExam(subject);
  }

  openTool(toolElement) {
    const toolName = toolElement.querySelector('h3').textContent;
    alert(`${toolName} feature coming soon!`);
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

