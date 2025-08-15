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
    const paperType = document.getElementById('paper-type-select').value;

    this.showLoadingMessage('Generating your custom exam...');

    try {
      const examData = await this.generateExamWithAI({
        subject,
        paperType
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

    let numQuestions;
    switch (params.paperType) {
        case '1':
            numQuestions = 20;
            break;
        case '2':
            numQuestions = 15;
            break;
        case '3':
            numQuestions = 5;
            break;
        default:
            numQuestions = 20;
    }

    const questions = await this.generateSubjectQuestions(
      params.subject,
      numQuestions,
      'kcse-mock',
      'mixed',
      ''
    );

    return {
      id: this.generateId(),
      title: `${subjectNames[params.subject]} Paper ${params.paperType}`,
      subjects: [params.subject],
      difficulty: 'KCSE Mock',
      duration: 180, // 3 hours
      totalMarks: 100,
      questions: questions,
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
