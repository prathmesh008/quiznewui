import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** Custom Hook */
import { updateresult } from '../Hooks/setresult'
import { updateTimerAction } from '../Redux/Questionreducer'


export default function Questions({ onchecked, onNext }) {

    const [checked, setChecked] = useState(undefined)
    const { trace, answers, timers } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    // New State for Features
    const [timer, setTimer] = useState(10);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Ref to track current timer value for cleanup
    const timerRef = useRef(timer);

    // Update ref whenever timer changes
    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);

    // Save timer to Redux on unmount
    useEffect(() => {
        return () => {
            // Only save if not answered (or save 0 if answered, but logic below handles that)
            // Actually, we should just save whatever the current timer is.
            // If answered, timer is usually 0 or stopped.
            dispatch(updateTimerAction({ trace, timer: timerRef.current }));
        };
    }, [trace, dispatch]);

    // Reset state when question changes (trace changes)
    useEffect(() => {
        // Check if this question has already been answered in Redux
        const previouslyAnswered = result[trace];

        if (previouslyAnswered !== undefined) {
            setIsAnswered(true);
            setSelectedOption(previouslyAnswered);
            setShowExplanation(true);
            setTimer(0);
            setChecked(previouslyAnswered);
        } else {
            // Restore timer from Redux if available, else default to 10
            const savedTime = timers && timers[trace];
            setTimer(savedTime !== undefined ? savedTime : 10);

            setIsAnswered(false);
            setSelectedOption(null);
            setShowExplanation(false);
            setChecked(undefined);
        }
    }, [trace, result, timers]);

    // Timer Logic
    useEffect(() => {
        if (isAnswered) return;

        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            // Timeout
            handleTimeout();
        }
    }, [timer, isAnswered]);

    const handleTimeout = () => {
        setIsAnswered(true);
        setShowExplanation(true);
    };

    function onSelect(i) {
        if (isAnswered) return;

        onchecked(i)
        setChecked(i)
        setSelectedOption(i);
        setIsAnswered(true);
        setShowExplanation(true);

        dispatch(updateresult({ trace, checked: i }))
    }

    if (!questions) return null;

    const correctIndex = answers ? answers[trace] : -1;

    return (
        <div className='questions'>
            <div className="timer-container">
                <h3 className="text-light" style={{ color: timer < 4 ? 'red' : 'white' }}>
                    Time Remaining: {timer}s
                </h3>
            </div>

            <h2 className='text-light'>{questions?.question}</h2>

            {questions?.questionImage && (
                <div className="question-image">
                    <img src={questions.questionImage} alt="Question" style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '10px' }} />
                </div>
            )}

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => {
                        let liClass = '';
                        if (isAnswered) {
                            if (i === correctIndex) liClass = 'correct-option'; // Green
                            else if (i === selectedOption) liClass = 'wrong-option'; // Red
                            else liClass = 'disabled-option'; // Dimmed
                        }

                        return (
                            <li key={i} className={liClass} onClick={() => onSelect(i)} style={{ pointerEvents: isAnswered ? 'none' : 'auto' }}>
                                <input
                                    type="radio"
                                    value={false}
                                    name="options"
                                    id={`q${i}-option`}
                                    onChange={() => { }}
                                    checked={selectedOption === i}
                                    disabled={isAnswered}
                                />

                                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                                {questions.optionImages && questions.optionImages[i] && (
                                    <img src={questions.optionImages[i]} alt="Option" className="option-image" style={{ width: '50px', marginLeft: '10px' }} />
                                )}
                                <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                            </li>
                        )
                    })
                }
            </ul>

            {showExplanation && (
                <div className="explanation" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                    <h3 className="text-light">Explanation:</h3>
                    <p className="text-light">{questions?.explanation || "No explanation available."}</p>
                </div>
            )}
        </div>
    )
}