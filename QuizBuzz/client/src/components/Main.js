import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main.css';

export default function Main() {

  const inputRef = useRef(null)

  return (
    <div className='container'>
      <h1 className='title text-light'>QuizBuzz</h1>

      <ol>
        <li className='text-light'>Click on the "Start Quiz" button to start the quiz.</li>
        <li className='text-light'>You will be presented with a series of multiple-choice questions.</li>
        <li className='text-light'>Select the answer you think is correct by clicking on the radio button.</li>
        <li className='text-light'>Click on the "Next" button to go to the next question.</li>
        <li className='text-light'>Click on the "Previous" button to go to the previous question.</li>
        <li className='text-light'>Click on the "Submit" button to submit your answers.</li>
        <li className='text-light'>Click on the "View Results" button to view your results.</li>
      </ol>

      <form id='form'>
        <input ref={inputRef} className='userid' type='text' placeholder='Username*' required></input>
        <br />
        <input ref={inputRef} className='password' type='password' placeholder='Password*' required></input>
      </form>

      <div className='start'>
        <Link className='btn' to='quiz'>Start Quiz</Link>
      </div>
    </div>
  )
}
