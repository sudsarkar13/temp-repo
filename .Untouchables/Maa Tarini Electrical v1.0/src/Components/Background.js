import React from 'react'
import './Background.css'
import ImgAsset from '../public'
export default function Background (props) {
	return (
		<div className={`Background_Background ${props.className}`}>
			<img className='Background_1' src = {ImgAsset.Background_Background_1} />
		</div>
	)
}