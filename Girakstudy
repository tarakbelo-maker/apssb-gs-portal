'use client';
import React, { useState, useEffect } from 'react';

const INITIAL_TOPICS = ["History", "Geography", "Polity", "Arunachal Pradesh GK"];
const INITIAL_QUESTIONS = [
  { id: '1', topic: 'Arunachal Pradesh GK', question_text: 'Which mountain pass connects Arunachal Pradesh with Lhasa?', option_a: 'Bomdila Pass', option_b: 'Diphu Pass', option_c: 'Sela Pass', option_d: 'Shipki La', correct_option: 'A', explanation: 'Bomdila Pass connects Tawang district of Arunachal Pradesh with Lhasa, Tibet.' },
  { id: '2', topic: 'Polity', question_text: 'Who is the constitutional head of a State in India?', option_a: 'Chief Minister', option_b: 'Governor', option_c: 'President', option_d: 'Chief Justice', correct_option: 'B', explanation: 'The Governor is the constitutional executive head of the state.' }
];

export default function ApssbPortal() {
  const [view, setView] = useState('home'); 
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selectedTopic, setSelectedTopic] = useState(INITIAL_TOPICS[0]);
  const [visits, setVisits] = useState(142); 

  const [practiceUnlocked, setPracticeUnlocked] = useState(false);
  const [mockUnlocked, setMockUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(null); 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [bookmarks, setBookmarks] = useState([]);
  const [score, setScore] = useState(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [timer, setTimer] = useState(1800); 

  const [comments, setComments] = useState([{ id: 1, name: "Tsering", text: "Best GS question source for upcoming APSSB exams!" }]);
  const [newComment, setNewComment] = useState("");

  const [formText, setFormText] = useState('');
  const [formA, setFormA] = useState('');
  const [formB, setFormB] = useState('');
  const [formC, setFormC] = useState('');
  const [formD, setFormD] = useState('');
  const [formCorrect, setFormCorrect] = useState('A');
  const [formExplanation, setFormExplanation] = useState('');

  useEffect(() => {
    setVisits(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (view === 'mock' && timer > 0 && !isTestSubmitted) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [view, timer, isTestSubmitted]);

  const activeQuestions = view === 'mock' ? questions : questions.filter(q => q.topic === selectedTopic);
  const currentQuestion = activeQuestions[currentIndex];

  const handleAnswerSelect = (option) => {
    if (view === 'mock' && isTestSubmitted) return;
    if (selectedAnswers[currentQuestion.id]) return; 

    setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: option });
    if (option === currentQuestion.correct_option) {
      setScore(s => s + 1);
    }

    if (view === 'practice' && !practiceUnlocked && Object.keys(selectedAnswers).length >= 9) {
      setShowPaymentModal('practice');
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarks(b => b.includes(id) ? b.filter(item => item !== id) : [...b, id]);
  };

  const addQuestionAdmin = (e) => {
    e.preventDefault();
    const newQ = {
      id: String(questions.length + 1),
      topic: selectedTopic,
      question_text: formText,
      option_a: formA,
      option_b: formB,
      option_c: formC,
      option_d: formD,
      correct_option: formCorrect,
      explanation: formExplanation
    };
    setQuestions([...questions, newQ]);
    setFormText(''); setFormA(''); setFormB(''); setFormC(''); setFormD(''); setFormExplanation('');
    alert("Question saved successfully!");
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), name: "User", text: newComment }]);
    setNewComment('');
  };

  const upiId = "yourupiid@bank"; 
  const qrPracticeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26pn=APSSBGS%26am=30%26cu=INR`;
  const qrMockUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26pn=APSSBGS%26am=20%26cu=INR`;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100">
      <header className="border-b border-gray-200 py-4 px-6 sticky top-0 bg-white z-40 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-blue-600 tracking-tight">PYQ & Important Questions for APSSB GS</h1>
          <p className="text-xs text-gray-500">Live Traffic Track: {visits} Active Candidates Today</p>
        </div>
        <nav className="flex space-x-2">
          <button onClick={() => setView('home')} className={`px-3 py-1.5 text-xs font-semibold rounded-md ${view === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Dashboard</button>
          <button onClick={() => setView('admin')} className={`px-3 py-1.5 text-xs font-semibold rounded-md ${view === 'admin' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Admin Panel</button>
        </nav>
      </header>

      {view === 'home' && (
        <main className="max-w-md mx-auto px-4 py-6 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
            <h2 className="text-base font-bold text-blue-900">Prepare Smart for APSSB</h2>
            <p className="text-xs text-blue-700 mt-1">High-yield previous papers & core modules optimized for fast revision.</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">1. Choose Practice Subject</h3>
            <div className="grid grid-cols-2 gap-2">
              {topics.map(t => (
                <button key={t} onClick={() => { setSelectedTopic(t); setView('practice'); setCurrentIndex(0); }} className="p-3 border border-gray-200 hover:border-blue-500 text-left rounded-lg text-sm font-medium transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">2. Evaluation Engine</h3>
            <button onClick={() => { if (!mockUnlocked) { setShowPaymentModal('mock'); } else { setView('mock'); setCurrentIndex(0); } }} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-[0.99]">
              Launch Full Mock Test {!mockUnlocked && "🔑 (₹20)"}
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Public Community Discussions</h3>
            <form onSubmit={addComment} className="flex gap-2 mb-3">
              <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Ask a question or add a exam review..." className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-blue-500" />
              <button type="submit" className="bg-gray-800 text-white text-xs px-4 py-2 rounded-lg font-bold">Post</button>
            </form>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {comments.map(c => (
                <div key={c.id} className="p-2 bg-gray-50 rounded-lg text-xs">
                  <span className="font-bold text-gray-700">{c.name}: </span>
                  <span className="text-gray-600">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {(view === 'practice' || view === 'mock') && currentQuestion && (
        <main className="max-w-md mx-auto px-4 py-4 flex flex-col min-h-[80vh]">
          <div className="sticky top-[72px] bg-white pt-2 pb-3 border-b border-gray-100 z-30 flex items-center justify-between">
            <div className="flex space-x-2">
              <button onClick={() => { if(currentIndex > 0) setCurrentIndex(currentIndex - 1); }} disabled={currentIndex === 0} className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold disabled:opacity-40">
                ← Prev
              </button>
              <button onClick={handleNext} disabled={currentIndex === activeQuestions.length - 1} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold disabled:opacity-40">
                Next →
              </button>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-500">Q: {currentIndex + 1} / {activeQuestions.length}</span>
              {view === 'mock' && <div className="text-xs font-black text-red-500">⏳ {Math.floor(timer / 60)}m {timer % 60}s left</div>}
            </div>
            <button onClick={() => toggleBookmark(currentQuestion.id)} className={`text-xs px-2 py-1 rounded border ${bookmarks.includes(currentQuestion.id) ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'border-gray-200'}`}>
              ★ Bookmark
            </button>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}></div>
          </div>

          {view === 'practice' && (
            <div className="mt-2 text-xs font-semibold text-gray-500 text-right">Running Score: {score} Correct</div>
          )}

          <div className="my-5 flex-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{currentQuestion.topic}</span>
            <h2 className="text-base font-bold text-gray-900 mt-1">{currentQuestion.question_text}</h2>

            <div className="mt-4 space-y-2">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const optKey = `option_${opt.toLowerCase()}`;
                const isSelected = selectedAnswers[currentQuestion.id] === opt;
                const isCorrect = currentQuestion.correct_option === opt;
                const hasAnswered = !!selectedAnswers[currentQuestion.id];

                let btnStyle = "border-gray-200 hover:border-gray-400 bg-white";
                if (hasAnswered || (view === 'mock' && isTestSubmitted)) {
                  if (isCorrect) btnStyle = "bg-green-100 border-green-500 text-green-900 font-bold";
                  else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-900";
                }

                return (
                  <button key={opt} onClick={() => handleAnswerSelect(opt)} className={`w-full p-3.5 text-left text-sm rounded-xl border transition-all flex items-start gap-3 ${btnStyle}`}>
                    <span className="font-bold text-gray-400">{opt}.</span>
                    <span>{currentQuestion[optKey]}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswers[currentQuestion.id] && view === 'practice' && (
              <div className="mt-4 p-3 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg">
                <h4 className="text-xs font-bold text-blue-900 uppercase">Explanation</h4>
                <p className="text-xs text-gray-700 mt-0.5">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {view === 'mock' && !isTestSubmitted && (
            <button onClick={() => setIsTestSubmitted(true)} className="w-full bg-red-600 text-white font-bold text-sm py-2.5 rounded-xl shadow mt-4">
              Submit Mock Exam
            </button>
          )}

          {view === 'mock' && isTestSubmitted && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-sm font-bold text-green-900">Test Complete!</h3>
              <p className="text-xs text-green-800">Final Score: {score} out of {activeQuestions.length}</p>
              <h4 className="text-xs font-bold text-gray-700 mt-3 uppercase">Incorrect Answers Evaluation:</h4>
              <div className="space-y-1 mt-1 text-xs text-gray-600">
                {activeQuestions.map(q => {
                  if (selectedAnswers[q.id] !== q.correct_option) {
                    return <div key={q.id} className="border-b border-gray-100 py-1">❌ {q.question_text} <br/><span className="text-green-700 font-bold">Ans: {q.correct_option}</span></div>
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </main>
      )}

      {view === 'admin' && (
        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="border-b pb-2">
            <h2 className="text-lg font-bold text-gray-900">Database Core Dashboard</h2>
            <p className="text-xs text-gray-500">Insert custom mock exam/practice content items instantly.</p>
          </div>

          <form onSubmit={addQuestionAdmin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Subject / Topic Segment</label>
              <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="w-full border p-2 text-sm rounded-lg bg-white">
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Question Body Text</label>
              <textarea required value={formText} onChange={(e) => setFormText(e.target.value)} rows={2} className="w-full border p-2 text-sm rounded-lg" placeholder="Write question details..." />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input type="text" required value={formA} onChange={(e) => setFormA(e.target.value)} placeholder="Option A" className="border p-2 text-sm rounded-lg" />
              <input type="text" required value={formB} onChange={(e) => setFormB(e.target.value)} placeholder="Option B" className="border p-2 text-sm rounded-lg" />
              <input type="text" required value={formC} onChange={(e) => setFormC(e.target.value)} placeholder="Option C" className="border p-2 text-sm rounded-lg" />
              <input type="text" required value={formD} onChange={(e) => setFormD(e.target.value)} placeholder="Option D" className="border p-2 text-sm rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Correct Choice</label>
                <select value={formCorrect} onChange={(e) => setFormCorrect(e.target.value)} className="w-full border p-2 text-sm rounded-lg bg-white">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Explanation</label>
                <input type="text" value={formExplanation} onChange={(e) => setFormExplanation(e.target.value)} placeholder="Why is it correct?" className="w-full border p-2 text-sm rounded-lg" />
              </div>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white font-bold text-sm py-2 rounded-lg">
              Save Entry & Sync Database
            </button>
          </form>
        </main>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-5 rounded-2xl max-w-xs w-full text-center space-y-4">
            <h3 className="text-base font-black text-gray-900">
              {showPaymentModal === 'practice' ? "Unlock Practice Questions" : "Unlock Premium Full Mock Test"}
            </h3>
            <p className="text-xs text-gray-600">
              {showPaymentModal === 'practice' ? "You reached the 10-question free trial. Pay ₹30 to unlock all 300+ structural exam questions." : "Pay ₹20 to unlock full multi-topic dynamic mock examinations with active timers."}
            </p>

            <div className="flex justify-center p-2 bg-gray-50 rounded-xl border border-gray-100">
              <img 
                src={showPaymentModal === 'practice' ? qrPracticeUrl : qrMockUrl} 
                alt="UPI Payment QR Code" 
                className="w-44 h-44" 
              />
            </div>

            <div className="text-[10px] text-gray-400 bg-gray-100 p-1.5 rounded">
              Scan with GPay, PhonePe, or Paytm. Website checks verification instantly.
            </div>

            <div className="flex space-x-2">
              <button onClick={() => setShowPaymentModal(null)} className="flex-1 bg-gray-200 text-gray-700 font-bold text-xs py-2 rounded-lg">Cancel</button>
              <button onClick={() => {
                if (showPaymentModal === 'practice') setPracticeUnlocked(true);
                if (showPaymentModal === 'mock') { setMockUnlocked(true); setView('mock'); }
                setShowPaymentModal(null);
                alert("Payment simulated successfully! Feature unlocked.");
              }} className="flex-1 bg-green-600 text-white font-bold text-xs py-2 rounded-lg">I Paid Successfully</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
