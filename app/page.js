'use client';
import React, { useState, useEffect } from 'react';

// MASTER SELECTION OF YOUR LATEST PRACTICE QUESTIONS (301-437)
const INITIAL_TOPICS = ["Arunachal Pradesh GK", "Polity", "Geography", "History", "General Science & Tech"];
const INITIAL_QUESTIONS = [
  { id: '301', topic: 'History', question_text: 'The Ottoman Turks captured the city of Constantinople in which year?', options: ['1498', '1526', '1336', '1453'], correct_answer: '1453', explanation: 'This event marked the end of the Byzantine Empire.' },
  { id: '302', topic: 'Geography', question_text: 'Which Port of India is now officially known as Deendayal Port?', options: ['Kandla', 'Cochin', 'Mumbai', 'Marmagoa'], correct_answer: 'Kandla', explanation: 'Located in Gujarat, Kandla Port was renamed in 2017.' },
  { id: '303', topic: 'Geography', question_text: 'The Standard Meridian of India passes through which city?', options: ['Mirzapur', 'Lucknow', 'Delhi', 'Shillong'], correct_answer: 'Mirzapur', explanation: 'IST is calculated based on the 82.5°E longitude passing through Mirzapur.' },
  { id: '304', topic: 'Polity', question_text: 'What is the full form of the election-related term SVEEP?', options: ['Systematic Voters’ Education and Election Participation', 'Systematic Vocational Education', 'Systematic Voluntary Education', 'Systematic Voters’ Education and Electoral Participation'], correct_answer: 'Systematic Voters’ Education and Electoral Participation', explanation: 'Flagship program of the Election Commission of India for voter awareness.' },
  { id: '307', topic: 'Polity', question_text: 'In the Parliamentary System, the Prime Minister is the:', options: ['Head of the Nation', 'Head of the Constitution', 'Head of the Parliament', 'Head of the Government'], correct_answer: 'Head of the Government', explanation: 'The President is the titular head, whereas the PM holds executive power.' },
  { id: '309', topic: 'Polity', question_text: 'On which date did the Constituent Assembly adopt the Constitution of India?', options: ['26th November 1949', '26th November 1950', '26th January 1949', 'None of the above'], correct_answer: '26th November 1949', explanation: 'This date is celebrated across India as Constitution Day.' },
  { id: '313', topic: 'General Science & Tech', question_text: 'The disease typhoid is caused by which of the following?', options: ['Bacteria', 'Virus', 'Protozoa', 'Fungi'], correct_answer: 'Bacteria', explanation: 'It is caused by the bacterium Salmonella typhi.' },
  { id: '318', topic: 'General Science & Tech', question_text: 'What is the chemical formula for baking soda?', options: ['NaHCO3', 'NaOH', 'NaCOH3', 'NH4Cl'], correct_answer: 'NaHCO3', explanation: 'Its scientific chemical name is Sodium bicarbonate.' },
  { id: '335', topic: 'Arunachal Pradesh GK', question_text: 'In which district is the RIWATCH institute located in Arunachal Pradesh?', options: ['Lower Dibang Valley District', 'Namsai District', 'Lohit District', 'East Siang District'], correct_answer: 'Lower Dibang Valley District', explanation: 'RIWATCH preserves local heritage traditions.' },
  { id: '336', topic: 'Arunachal Pradesh GK', question_text: 'Ke-me-ha festival is celebrated by which community in Arunachal Pradesh?', options: ['Tangsa', 'Singpho', 'Idu-Mishmi', 'Miju Mishmi'], correct_answer: 'Idu-Mishmi', explanation: 'It is a harvest festival celebrated by the Idu-Mishmi people.' },
  { id: '337', topic: 'Arunachal Pradesh GK', question_text: 'Who is the first female Lt. Colonel from Arunachal Pradesh?', options: ['Ponung Doming', 'Niki Lego', 'Ipupu Mena', 'Techi Hanyir'], correct_answer: 'Ponung Doming', explanation: 'She made history in 2019 by attaining this army rank.' },
  { id: '338', topic: 'Arunachal Pradesh GK', question_text: 'What was the population density of Arunachal Pradesh as per the 2011 census?', options: ['10 persons/sq. km', '12 persons/sq. km', '17 persons/sq. km', '20 persons/sq. km'], correct_answer: '17 persons/sq. km', explanation: 'Arunachal has the lowest population density in India.' },
  { id: '342', topic: 'Arunachal Pradesh GK', question_text: 'The largest Buddhist Monastery in India is situated in:', options: ['Bodhgaya', 'Tawang', 'Dharmshala', 'Ladakh'], correct_answer: 'Tawang', explanation: 'Tawang Monastery is the largest in India.' },
  { id: '352', topic: 'Arunachal Pradesh GK', question_text: 'The river Brahmaputra is known by which name in Arunachal Pradesh?', options: ['Kameng', 'Siang', 'Tirap', 'Subansiri'], correct_answer: 'Siang', explanation: 'It is known as the Siang before joining the Brahmaputra system.' },
  { id: '357', topic: 'Arunachal Pradesh GK', question_text: 'The line that separates Arunachal Pradesh from Tibet is:', options: ['Curzon Line', 'Durand Line', 'McMahon Line', 'Maginot Line'], correct_answer: 'McMahon Line', explanation: 'Negotiated in 1914 as the official boundary.' },
  { id: '361', topic: 'General Science & Tech', question_text: '"Gemini", an AI chatbot, was developed by:', options: ['Google', 'Microsoft', 'Infosys', 'Tesla'], correct_answer: 'Google', explanation: 'It is Google next-generation advanced AI core model.' },
  { id: '402', topic: 'Arunachal Pradesh GK', question_text: 'Which is the highest peak in Arunachal Pradesh?', options: ['Kangto', 'Myodia', 'Tawang', 'Sela Pass'], correct_answer: 'Kangto', explanation: 'Kangto sits on the border and stands over 7,000 meters high.' },
  { id: '407', topic: 'Polity', question_text: 'Which Article of the Indian Constitution deals with the "Uniform Civil Code"?', options: ['Article 14', 'Article 22', 'Article 44', 'None of the above'], correct_answer: 'Article 44', explanation: 'It is part of the Directive Principles of State Policy.' },
  { id: '421', topic: 'Arunachal Pradesh GK', question_text: 'The Ita Fort at Arunachal Pradesh was built by:', options: ['Chutiya Kings', 'Koch Kings', 'Ahom Kings', 'Kachari Kings'], correct_answer: 'Chutiya Kings', explanation: 'It is an ancient brick fort located directly in Itanagar.' }
];

export default function ColorfulApssbPortal() {
  const [view, setView] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState(INITIAL_TOPICS[0]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    let timer;
    if (view === 'practice' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  const handleOptionClick = (questionId, option) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-pink-50 text-gray-900 p-4 font-sans">
      
      <header className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white p-6 rounded-2xl shadow-xl mb-6 flex justify-between items-center transform hover:scale-[1.01] transition-transform">
        <div>
          <h1 className="text-2xl font-black tracking-wider drop-shadow-md">🚀 FREE APSSB PORTAL</h1>
          <p className="text-xs font-medium opacity-90 tracking-wide mt-1">Empowering Poor & Ambitious Students with Free Smart-Work Learning</p>
        </div>
        <span className="hidden sm:inline-block bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-inner">
          ✨ 100% Free Forever
        </span>
      </header>

      <main className="max-w-4xl mx-auto">
        {view === 'home' && (
          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="md:col-span-1 bg-white p-5 rounded-2xl shadow-lg border border-purple-100">
              <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 mb-4 text-xs uppercase tracking-widest">
                📚 Study Core Topics
              </h3>
              <div className="space-y-2">
                {INITIAL_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTopic === topic 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transform translate-x-1' 
                        : 'hover:bg-purple-50 text-gray-600 hover:text-purple-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setSelectedAnswers({});
                    setTimeLeft(600);
                    setView('practice');
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black py-3.5 px-4 rounded-xl text-center text-xs shadow-md transform active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  ⚡ Start Practice Timer Mode
                </button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
                  {selectedTopic} High-Yield Summary
                </h2>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">APSSB Concept</span>
              </div>
              
              <div className="space-y-4">
                {INITIAL_QUESTIONS.filter(q => q.topic === selectedTopic).map((q) => (
                  <div key={q.id} className="p-4 bg-gradient-to-r from-slate-50 to-purple-50/30 rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">Question Q-{q.id}</span>
                    <p className="font-bold text-sm text-gray-800 mb-2">{q.question_text}</p>
                    <div className="bg-white p-3 rounded-lg border border-purple-100 text-xs text-gray-600 italic">
                      💡 <strong>Quick Fact:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'practice' && (
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-100 gap-4">
              <button 
                onClick={() => setView('home')} 
                className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors bg-purple-50 px-4 py-2 rounded-xl border border-purple-100"
              >
                ← Return to Safe Study Dashboard
              </button>
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-mono font-black px-5 py-2.5 rounded-xl text-sm shadow-md flex items-center gap-2">
                ⏰ TIME REMAINING: {formatTime(timeLeft)}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-base font-black text-gray-800 uppercase tracking-wide">Live Practice Assessment (Instant Check)</h3>
              
              {INITIAL_QUESTIONS.map((q, index) => {
                const userAnswer = selectedAnswers[q.id];
                const isAnswered = userAnswer !== undefined;

                return (
                  <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Q-{q.id}</span>
                      <span className="text-[11px] font-bold text-slate-400 italic">{q.topic}</span>
                    </div>
                    
                    <p className="font-bold text-sm mb-4 text-gray-800">{index + 1}. {q.question_text}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((option) => {
                        const isCorrectOption = option === q.correct_answer;
                        const isSelectedByMe = userAnswer === option;

                        let styleClass = "w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all border shadow-sm ";
                        
                        if (isAnswered) {
                          if (isCorrectOption) {
                            styleClass += "bg-emerald-500 text-white border-emerald-600 font-extrabold scale-[1.02] shadow-emerald-200";
                          } else if (isSelectedByMe) {
                            styleClass += "bg-rose-500 text-white border-rose-600 scale-[0.98]";
                          } else {
                            styleClass += "bg-white text-gray-300 border-gray-100 opacity-40 cursor-not-allowed";
                          }
                        } else {
                          styleClass += "bg-white hover:bg-purple-50 border-gray-200 hover:border-purple-400 text-gray-700 active:bg-purple-100";
                        }

                        return (
                          <button 
                            key={option} 
                            disabled={isAnswered}
                            onClick={() => handleOptionClick(q.id, option)}
                            className={styleClass}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 text-xs text-gray-700 shadow-sm">
                        ✨ <strong>Study Note:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
