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
        </ul>
    </div>
  )
}
