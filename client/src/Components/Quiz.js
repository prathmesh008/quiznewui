import React, { useEffect, useState } from 'react'
import Questions from './Questions';
import { useSelector, useDispatch } from 'react-redux'
import { movenextquestion, moveprevquestion } from '../Hooks/Fetchquestions.js';
import { pushanswer } from '../Hooks/setresult.js';
import { Navigate } from 'react-router-dom'
import { useFetchQuestions } from '../Hooks/Fetchquestions.js';

function Quiz() {
  const [checked, setChecked] = useState(undefined);
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const [{ isLoading, apiData, serverError }] = useFetchQuestions();

  function onNext() {
    if (trace < queue.length) {
      dispatch(movenextquestion());

      if (result.length <= trace) dispatch(pushanswer(checked));
    }
    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      // If we are at the "frontier" (new question) and have an answer, save it before going back
      if (result.length <= trace && checked !== undefined) {
        dispatch(pushanswer(checked));
      }

      dispatch(moveprevquestion());
    }
  }

  function onchecked(check) {
    setChecked(check);
  }

  if (isLoading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <h3 className='text-light'>Loading Quiz...</h3>
    </div>
  )
  if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  if (result.length && result.length >= queue.length) {
    return <Navigate to="/result" replace={true} />
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz</h1>
      <Questions key={trace} onchecked={onchecked} onNext={onNext} />

      <div className='grid'>
        {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default Quiz
