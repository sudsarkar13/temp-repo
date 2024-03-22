import React from "react";

const GoogleMap = () => {
	return (
		<div>
			{/* try */}
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.64765736030267!2d85.88814595948197!3d20.45029850321588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190db9d833ffe5:0xb8f3dba8fa084b07!2sMAA%20TARINE%20ELECTRICAL!5e0!3m2!1sen!2sin!4v1711142092803!5m2!1sen!2sin'
				width='300'
				height='200'
				style={{ border: "0" }}
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			></iframe>
		</div>
	);
};

export default GoogleMap;
