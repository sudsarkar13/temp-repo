import React from 'react'

export default function Questions() {
  return (
    <div className='questions'>
        <h2 className='text-light'>Simple Question 1</h2>

        {/* Display options */}
        <ul>
            <li>
                <input type='radio' name='options' value={true} />
                <label>Option 1</label>
            </li>
        </ul>
    </div>
  )
}
