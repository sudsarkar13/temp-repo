import React, { useState } from 'react'

export default function Questions() {

    const [ checked, setChecked ] = useState(undefined)

    function onSelect() {
        setChecked(false)
        console.log('radio button change')
    }

  return (
    <div className='questions'>
        <h2 className='text-light'>Simple Question 1</h2>

        {/* Display options */}
        <ul>
            <li>
                <input type='radio' name='options' value={checked} id='q1-option' onChange={onSelect} />
                <label className='text-primary' htmlFor='q1-option'>Option </label>
                <div className='check'></div>
            </li>
            <li>
                <input type='radio' name='options' value={checked} id='q2-option' onChange={onSelect} />
                <label className='text-primary' htmlFor='q2-option'>Option </label>
                <div className='check'></div>
            </li>
            <li>
                <input type='radio' name='options' value={checked} id='q3-option' onChange={onSelect} />
                <label className='text-primary' htmlFor='q3-option'>Option </label>
                <div className='check'></div>
            </li>
            <li>
                <input type='radio' name='options' value={checked} id='q4-option' onChange={onSelect} />
                <label className='text-primary' htmlFor='q4-option'>Option </label>
                <div className='check'></div>
            </li>
        </ul>
    </div>
  )
}
