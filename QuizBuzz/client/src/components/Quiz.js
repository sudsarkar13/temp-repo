import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import Questions from './Questions';
import { PushAnswer } from '../hooks/setResult';

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';

// redux store import
import { useSelector, useDispatch } from 'react-redux';

export default function Quiz() {

  // const trace = useSelector(state => state.questions.trace);
  const { check, setchecked } = useState(undefined);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(queue)
  })

  // Previous button event handler
  function onPrev() {
    console.log('On prev click')
    if (trace > 0) {
      // update the trace value by one using moveNextAction
      dispatch(MovePrevQuestion());
    }
  }
  // Next button event handler
  function onNext() {
    // console.log('On next click')
    if (trace < queue.length) {
      // update the trace value by one using moveNextAction
      dispatch(MoveNextQuestion());
      dispatch(PushAnswer(check))
    }
  }

  // reset the value of the checked variable
  setchecked(undefined)

  // Option seletor event handler
  function onChecked(check) {
    console.log(check)
    setchecked(check)
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>QuizBuzz</h1>

      {/* Display Questions */}
      <Questions onChecked={onChecked} />

      {/* Display Previous and Next buttons */}
      <div className='grid'>
        <button className='btn prev' onClick={onPrev}>Prev</button>
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}
