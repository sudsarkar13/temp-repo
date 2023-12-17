import React from 'react';
import '../styles/App.css';

const Footer = () => {
  const year = new Date().getFullYear(); // Get the current year
  return (
    <footer className="footer">
      <p>
        <b>&copy; Copyright protected by QuizBuzz {year} </b>
      </p>
    </footer>
  );
};

export default Footer;
