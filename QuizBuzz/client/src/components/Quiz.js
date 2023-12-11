import React from 'react';


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

      <div className='grid'>
        <button className='btn prev' onClick={onPrev}>Previous</button>
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}
