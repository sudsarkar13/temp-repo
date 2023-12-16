import React, { useEffect } from 'react';
import '../styles/Main.css';
import Questions from './Questions';
import Footer from './footer';

// redux store import
import { useSelector } from 'react-redux';

export default function Quiz() {

  const state = useSelector(state => state)

  useEffect(() => {
    console.log(state)
  })

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
      <Footer />
    </div>
  )
}
