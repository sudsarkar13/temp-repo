import React from 'react';
import '../styles/Main.css';
import Questions from './Questions';


export default function Quiz() {

  // Previous button event handler
  function onPrev() {
    console.log('On prev click')
  }
  // Next button event handler
  function onNext() {
    console.log('On next click')
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>QuizBuzz</h1>

      {/* Display Questions */}
      <Questions />

      {/* Display Previous and Next buttons */}
      <div className='grid'>
        <button className='btn prev' onClick={onPrev}>Prev</button>
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}
