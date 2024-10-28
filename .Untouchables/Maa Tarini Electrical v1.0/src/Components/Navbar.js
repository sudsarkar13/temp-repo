import React from 'react'
import './Navbar.css'
export default function Navbar (props) {
	return (
		<div className={`Navbar_Navbar ${props.className}`}>
			<div className='Navbarbase'/>
			<div className='Navigation'>
				<span className='HOME'>HOME</span>
				<span className='ABOUT'>ABOUT</span>
				<span className='PRODUCTS'>PRODUCTS</span>
				<span className='SHOP'>SHOP</span>
			</div>
			<span className='CONTACT'>CONTACT</span>
		</div>
	)
}