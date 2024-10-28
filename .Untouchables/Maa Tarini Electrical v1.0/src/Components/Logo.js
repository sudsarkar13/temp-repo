import React from 'react'
import './Logo.css'
import ImgAsset from '../public'
export default function Logo (props) {
	return (
		<div className={`Logo_Logo ${props.className}`}>
			<img className='Logo_1' src = {ImgAsset.Logo_Logo_1} />
			<span className='MAATARINIELECTRICALS'>MAA TARINI ELECTRICALS</span>
		</div>
	)
}