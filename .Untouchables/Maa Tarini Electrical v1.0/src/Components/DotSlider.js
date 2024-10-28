import React from 'react'
import './DotSlider.css'
export default function DotSlider (props) {
	return (
		<div className={`DotSlider_DotSlider ${props.className}`}>
			<div className='Ellipse1'/>
			<div className='Ellipse2'/>
			<div className='Ellipse3'/>
		</div>
	)
}