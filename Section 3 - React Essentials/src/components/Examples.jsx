import { useState } from 'react';
import { EXAMPLES } from '../data'; 
import Section from './Section.jsx';
import TabButton from './TabButton.jsx';
import Tabs from './Tabs.jsx';
import './Examples.css';
import './TabContent.css';

export default function Examples() {
  const [ selectedTopic, setSelectedTopic ] = useState(); 

  let tabContent = !selectedTopic ? (
  <p id="tab-content">"Please select a topic"</p>
  ) : (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        {EXAMPLES[selectedTopic].code}
      </pre>
    </div>
  );

  function handleClick(clickedButton) {
    setSelectedTopic(clickedButton);
  };

  return (
    <Section title="Examples" id='examples'>
      <Tabs 
      buttons = {
        <>
          <TabButton 
          isSelected={selectedTopic === "components"} 
          onClick={() => handleClick("components")} 
          text="Components"
          />
          <TabButton 
          isSelected={selectedTopic === "jsx"} 
          onClick={() => handleClick("jsx")} 
          text="JSX"
          />
          <TabButton 
          isSelected={selectedTopic === "props"} 
          onClick={() => handleClick("props")} 
          text="Props"
          />
          <TabButton 
          isSelected={selectedTopic === "state"} 
          onClick={() => handleClick("state")} 
          text="State"
          />
        </>
      }
    >
      {tabContent}
    </Tabs>
      <menu></menu>
  </Section>
  )
}