import React from 'react'
import './HomePage.css'
import ImgAsset from '../public'
export default function HomePage () {
	return (
		<div className='HomePage_HomePage'>
			<div className='Background'>
				<img className='Background_1' src = {ImgAsset.HomePage_Background_1} />
			</div>
			<div className='Logo'>
				<img className='Logo_1' src = {ImgAsset.HomePage_Logo_1} />
				<span className='MAATARINIELECTRICALS'>MAA TARINI ELECTRICALS</span>
			</div>
			<div className='Navbar'>
				<div className='Navbarbase'/>
				<div className='Navigation'>
					<span className='HOME'>HOME</span>
					<span className='ABOUT'>ABOUT</span>
					<span className='PRODUCTS'>PRODUCTS</span>
					<span className='SHOP'>SHOP</span>
				</div>
				<span className='CONTACT'>CONTACT</span>
			</div>
			<div className='Address'>
				<span className='ShopNo4MaaTariniElectricalsPCSarkarLaneArunodayaNagarCuttackPin753012OdishaNearNandaGopalSweetStallPh919937884307'>Shop No.: 4, Maa Tarini Electricals, P.C. Sarkar Lane,<br/>Arunodaya Nagar, Cuttack, Pin-753012, Odisha,<br/>Near Nanda Gopal Sweet Stall, Ph-+91 9937884307</span>
			</div>
			<div className='Brands'>
				<div className='BrandDealers'/>
				<span className='Ourtrustedelectricalpartners'>Our trusted electrical partners</span>
				<img className='PhilipsLogo' src = {ImgAsset.HomePage_PhilipsLogo} />
				<img className='HavellsLogo' src = {ImgAsset.HomePage_HavellsLogo} />
				<img className='RRKabelLogo' src = {ImgAsset.HomePage_RRKabelLogo} />
				<img className='DorekaLogo' src = {ImgAsset.HomePage_DorekaLogo} />
				<img className='CromptonGreavesLogo' src = {ImgAsset.HomePage_CromptonGreavesLogo} />
				<img className='PolycabWiresLogo' src = {ImgAsset.HomePage_PolycabWiresLogo} />
				<img className='BajajElectricalsLogo' src = {ImgAsset.HomePage_BajajElectricalsLogo} />
				<img className='VguardLogo' src = {ImgAsset.HomePage_VguardLogo} />
				<img className='OrientElectricLogo' src = {ImgAsset.HomePage_OrientElectricLogo} />
				<img className='FinolexCablesLogo' src = {ImgAsset.HomePage_FinolexCablesLogo} />
				<img className='ABBLogo' src = {ImgAsset.HomePage_ABBLogo} />
			</div>
			<div className='Bannerv1'>
				<img className='DisplayBoard' src = {ImgAsset.HomePage_DisplayBoard} />
				<img className='LipunBhai' src = {ImgAsset.HomePage_LipunBhai} />
				<img className='HappyNewYear' src = {ImgAsset.HomePage_HappyNewYear} />
				<img className='Logo_2' src = {ImgAsset.HomePage_Logo_2} />
				<img className='Logo_3' src = {ImgAsset.HomePage_Logo_3} />
			</div>
			<div className='DotSlider'>
				<div className='Ellipse1'/>
				<div className='Ellipse2'/>
				<div className='Ellipse3'/>
			</div>
		</div>
	)
}