import React, { useState } from 'react';
import styled from 'styled-components';
import './TabView.css';

const TabView = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tab-view">
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
      <div className="tab-bar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`code tab-button ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Link = styled.a.attrs({
  className: "link b pointer mr2",
})``

const Footer = styled.div.attrs({
  className: "f6 code pa3 ph0-ns flex justify-between",
})``

export default TabView;
