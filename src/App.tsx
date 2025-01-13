import { useState } from 'react';
import './App.css';
import avatarImage from '../public/avatar.png';
import wechatImage from '../public/wechat.jpg';
import { FiGithub, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { FiSun, FiMoon } from 'react-icons/fi';
const App = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-theme');
  };

  return (
    <div className={`content ${!isDark ? 'light-theme' : ''}`}>
      <button onClick={toggleTheme} className="theme-toggle" type="button">
        {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
      
      <div className="profile">
        <img src={avatarImage} alt="Your Profile" className="avatar" />
        <h1>xxnuo</h1>
        <p className="bio">全栈开发工程师</p>
        
        <div className="social-links">
          <a href="https://github.com/yourusername" className="social-button github" title="GitHub Profile" aria-label="GitHub Profile">
            <FiGithub size={24} />
          </a>
          <a href="https://twitter.com/yourusername" className="social-button twitter" title="Twitter Profile" aria-label="Twitter Profile">
            <FaXTwitter size={24} />
          </a>
          <a href="mailto:your.email@example.com" className="social-button email" title="Send Email" aria-label="Send Email">
            <FiMail size={24} />
          </a>
        </div>

        <div className="links">
          <a href="/blog" className="link-button">
            我的博客
          </a>
          <a href="/portfolio" className="link-button">
            作品集
          </a>
          <a href="/resume" className="link-button">
            简历
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
