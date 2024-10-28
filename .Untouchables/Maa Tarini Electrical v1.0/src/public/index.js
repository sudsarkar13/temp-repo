
        const tryRequire = (path) => {
        	try {
        	const image = require(`${path}`);
        	return image
        	} catch (err) {
        	return false
        	}
        };

        export default {
        
	questionMark: require('./questionMark.png'),
	HomePage_Background_1: tryRequire('./HomePage_Background_1.png') || require('./questionMark.png'),
	Background_Background_1: tryRequire('./Background_Background_1.png') || require('./questionMark.png'),
	Logo_Logo_1: tryRequire('./Logo_Logo_1.png') || require('./questionMark.png'),
	HomePage_Logo_1: tryRequire('./HomePage_Logo_1.png') || require('./questionMark.png'),
	HomePage_PhilipsLogo: tryRequire('./HomePage_PhilipsLogo.png') || require('./questionMark.png'),
	HomePage_HavellsLogo: tryRequire('./HomePage_HavellsLogo.png') || require('./questionMark.png'),
	HomePage_RRKabelLogo: tryRequire('./HomePage_RRKabelLogo.png') || require('./questionMark.png'),
	HomePage_DorekaLogo: tryRequire('./HomePage_DorekaLogo.png') || require('./questionMark.png'),
	HomePage_CromptonGreavesLogo: tryRequire('./HomePage_CromptonGreavesLogo.png') || require('./questionMark.png'),
	HomePage_PolycabWiresLogo: tryRequire('./HomePage_PolycabWiresLogo.png') || require('./questionMark.png'),
	HomePage_BajajElectricalsLogo: tryRequire('./HomePage_BajajElectricalsLogo.png') || require('./questionMark.png'),
	HomePage_VguardLogo: tryRequire('./HomePage_VguardLogo.png') || require('./questionMark.png'),
	HomePage_OrientElectricLogo: tryRequire('./HomePage_OrientElectricLogo.png') || require('./questionMark.png'),
	HomePage_FinolexCablesLogo: tryRequire('./HomePage_FinolexCablesLogo.png') || require('./questionMark.png'),
	HomePage_ABBLogo: tryRequire('./HomePage_ABBLogo.png') || require('./questionMark.png'),
	HomePage_DisplayBoard: tryRequire('./HomePage_DisplayBoard.png') || require('./questionMark.png'),
	HomePage_LipunBhai: tryRequire('./HomePage_LipunBhai.png') || require('./questionMark.png'),
	HomePage_HappyNewYear: tryRequire('./HomePage_HappyNewYear.png') || require('./questionMark.png'),
	HomePage_Logo_2: tryRequire('./HomePage_Logo_2.png') || require('./questionMark.png'),
	HomePage_Logo_3: tryRequire('./HomePage_Logo_3.png') || require('./questionMark.png'),
}