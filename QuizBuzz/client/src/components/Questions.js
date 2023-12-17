import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Custom Hook
import { useFetchQuestion } from '../hooks/FetchQuestion'

export default function Questions() {

    const [checked, setChecked] = useState(undefined)
    const [{ loading, apiData, serverError }] = useFetchQuestion()

    const questions = useSelector(state => state.questions.queue[state.questions.trace])

    useEffect(() => {
        console.log(questions)
    })

    useEffect(() => {
        // console.log(loading)
        // console.log(apiData)
        // console.log(serverError)
    })

    function onSelect() {
        setChecked(false)
        // console.log('radio button change')
    }

    if (loading) return <h3 className='text-light'>loading...</h3>
    if (serverError) return <h3 className='text-light'>{serverError || 'Unknown Error'}</h3>

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            {/* Display options */}
            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input type='radio' name='options' value={checked} id={`q${i}-option`} onChange={onSelect} />
                            <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                            <div className='check'></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
