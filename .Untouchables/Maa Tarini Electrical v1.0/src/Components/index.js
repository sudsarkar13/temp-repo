import React from 'react'
import {Link} from 'react-router-dom'
export default function __HomePage__ () {
    return (
	<div>
		<Link to='/HomePage'><div>HomePage</div></Link>
		<Link to='/Background'><div>Background</div></Link>
		<Link to='/Logo'><div>Logo</div></Link>
		<Link to='/Navbar'><div>Navbar</div></Link>
		<Link to='/DotSlider'><div>DotSlider</div></Link>
	</div>
	)
}