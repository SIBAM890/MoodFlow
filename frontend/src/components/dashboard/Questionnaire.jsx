import React, { useState } from 'react';

const Questionnaire = ({ onComplete, onCancel }) => {
    // 1. QUESTION BANKS
    const burnoutQuestions = [
        { id: "total_hours", question: "On an average day, how many total hours do you spend on digital devices outside of sleep?", category: "Usage Volume", options: ["0-2 hours", "3-5 hours", "6-8 hours", "9-12 hours", "12+ hours"] },
        { id: "content_category", question: "Which category best describes the majority of content you consumed today?", category: "Content Type", options: ["Social Media", "Short-form Videos", "News", "Entertainment", "Education", "Work/Professional", "Mixed"] },
        { id: "primary_intention", question: "What was your primary intention when you opened your most-used app today?", category: "Intent", options: ["To relax", "To learn", "To work", "To stay informed", "Habit/impulse", "Avoid boredom", "Emotional escape"] },
        { id: "time_slippage", question: "How often did your digital usage continue longer than you originally planned today?", category: "Behavioral Control", options: ["Never", "Once or twice", "Frequently", "Almost always"] },
        { id: "mental_engagement", question: "While consuming content, how mentally engaged were you most of the time?", category: "Cognitive Load", options: ["Highly focused", "Moderately engaged", "Passive scrolling", "Mentally exhausted/disengaged"] },
        { id: "emotional_state", question: "What emotional state best describes how you felt after extended screen use today?", category: "Emotional Outcome", options: ["Energized", "Neutral", "Slightly drained", "Anxious", "Low mood", "Overstimulated"] },
        { id: "goal_alignment", question: "Did the content you consumed today align with your personal or professional goals?", category: "Alignment", options: ["Strongly aligned", "Somewhat aligned", "Neutral", "Mostly misaligned", "Completely misaligned"] },
        { id: "switching_control", question: "How much control did you feel you had over stopping or switching apps when you wanted to?", category: "Agency", options: ["Complete control", "Mostly in control", "Some difficulty", "Very difficult", "No control"] },
        { id: "discomfort_scrolling", question: "Did you continue scrolling despite feeling tired, stressed, or emotionally uncomfortable?", category: "Compulsion", options: ["No", "Rarely", "Sometimes", "Often", "Almost always"] },
        { id: "usage_label", question: "If you had to classify today’s digital usage overall, how would you label it?", category: "Self-Reflection", options: ["Intentional and productive", "Balanced", "Mostly habitual", "Mostly escapist", "Doom-scrolling"] }
    ];

    const depressionQuestions = [
        { id: "phq1", question: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq2", question: "Feeling down, depressed, or hopeless?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq3", question: "Trouble falling or staying asleep, or sleeping too much?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq4", question: "Feeling tired or having little energy?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq5", question: "Poor appetite or overeating?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq6", question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq7", question: "Trouble concentrating on things, such as reading the newspaper or watching television?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq8", question: "Moving or speaking so slowly that other people could have noticed? Or the opposite?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "phq9", question: "Thoughts that you would be better off dead, or of hurting yourself in some way?", category: "Clinical PHQ-9 (Depression)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
    ];

    const anxietyQuestions = [
        { id: "gad1", question: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad2", question: "Not being able to stop or control worrying?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad3", question: "Worrying too much about different things?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad4", question: "Trouble relaxing?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad5", question: "Being so restless that it is hard to sit still?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad6", question: "Becoming easily annoyed or irritable?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: "gad7", question: "Feeling afraid, as if something awful might happen?", category: "Clinical GAD-7 (Anxiety)", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
    ];

    const [assessmentType, setAssessmentType] = useState(null); // null, 'burnout', 'depression', 'anxiety'
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(false);

    // Dynamic question selection based on state
    const currentQuestions = assessmentType === 'depression' ? depressionQuestions :
                             assessmentType === 'anxiety' ? anxietyQuestions :
                             burnoutQuestions;

    // 2. Interaction with Gemini (Re-routed to use local proxy or general string for demo)
    const askAI = async (transcript, type) => {
        // Fallback or explicit instruction set depending on type
        return `<p style="color:var(--indigo-600);font-weight:bold;">Clinical Assessment Analysis (${type.toUpperCase()} Protocol)</p><br>
        Based on your behavioral inputs, AutoFlow has generated a private reflection block.<br><br>
        <strong>Your Responses:</strong> ${transcript.substring(0, 100)}...<br><br>
        <strong>Recommendation:</strong> A highly structured clinical summary has been routed silently to your ledger file. Continue monitoring your sleep rhythms.`;
    };

    const handleOptionSelect = (option) => {
        const updatedResponses = { ...responses, [currentQuestions[currentIndex].id]: option };
        setResponses(updatedResponses);

        if (currentIndex < currentQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            submitToAI(updatedResponses);
        }
    };

    const submitToAI = async (finalResponses) => {
        setLoading(true);
        const transcript = Object.entries(finalResponses)
            .map(([id, val]) => `${id}: ${val}`)
            .join(" | ");
        
        // Simulating the AI call
        const aiResponse = await askAI(transcript, assessmentType);
        setLoading(false);
        if (onComplete) onComplete(aiResponse);
    };

    // 3. Inline Styles
    const styles = {
        container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-md)', fontFamily: "'Inter', sans-serif" },
        progressBar: { height: '8px', width: '100%', background: '#f0f0f0', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' },
        progressFill: { height: '100%', width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`, background: '#4F46E5', transition: 'width 0.4s ease' },
        selectionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' },
        checkBtn: { padding: '30px 20px', borderRadius: '16px', border: '2px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
        optionBtn: { padding: '1rem', border: '2px solid #e5e7eb', borderRadius: '12px', background: 'white', cursor: 'pointer', fontSize: '1rem', textAlign: 'left', transition: 'all 0.2s' }
    };

    // --- SELECTION UI ---
    if (!assessmentType) {
        return (
            <div style={styles.container}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>Clinical Digital Check-in</h2>
                    <p style={{ color: '#64748b' }}>Select the specific metric you would like AutoFlow to evaluate for you today.</p>
                </div>
                <div style={styles.selectionGrid}>
                    <button 
                        style={{...styles.checkBtn, borderTop: '6px solid #f59e0b'}}
                        onClick={() => setAssessmentType('burnout')}
                    >
                        <span>🔥</span>
                        Digital Burnout
                    </button>
                    <button 
                        style={{...styles.checkBtn, borderTop: '6px solid #3b82f6'}}
                        onClick={() => setAssessmentType('anxiety')}
                    >
                        <span>🌪️</span>
                        Anxiety Check (GAD-7)
                    </button>
                    <button 
                        style={{...styles.checkBtn, borderTop: '6px solid #8b5cf6'}}
                        onClick={() => setAssessmentType('depression')}
                    >
                        <span>🌧️</span>
                        Depression Check (PHQ-9)
                    </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={onCancel} style={{ padding: '10px 20px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>Cancel Check-in</button>
                </div>
            </div>
        );
    }

    // --- QUESTIONNAIRE UI ---
    if (loading) return (
        <div style={{...styles.container, textAlign: 'center', padding: '4rem'}}>
            <h2>Synthesizing your clinical reflection...</h2>
            <p>Spandan, AutoFlow is processing your behavioral patterns securely.</p>
        </div>
    );

    const currentQ = currentQuestions[currentIndex];

    return (
        <div style={styles.container}>
            <div style={styles.progressBar}><div style={styles.progressFill}></div></div>
            <span style={{ color: '#4F46E5', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{currentQ.category}</span>
            <h2 style={{ fontSize: '1.5rem', margin: '1rem 0 2rem 0', color: '#1f2937' }}>{currentQ.question}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {currentQ.options.map((opt, i) => (
                    <button 
                        key={i} style={styles.optionBtn}
                        onClick={() => handleOptionSelect(opt)}
                        onMouseOver={(e) => e.target.style.borderColor = '#4F46E5'}
                        onMouseOut={(e) => e.target.style.borderColor = '#e5e7eb'}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Previous</button>
                <span style={{ color: '#9ca3af' }}>{currentIndex + 1} of {currentQuestions.length}</span>
                <button onClick={() => setAssessmentType(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Back to Selection</button>
            </div>
        </div>
    );
};

export default Questionnaire;