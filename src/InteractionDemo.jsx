import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SVG = styled.svg`
  width: 100%;
`;

const Label = styled.text`
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 16px;
  fill: #4B5563;
`;

const Button = styled.rect`
  fill: ${props => props.isAnimating ? '#818CF8' : '#A5B4FC'};
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonText = styled.text`
  font-family: Arial, sans-serif;
  font-size: 14px;
  fill: white;
`;

const IntentionGroup = styled.g`
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s;
`;

const IntentionPath = styled.path`
  fill: none;
  stroke: ${props => props.color || '#6366F1'};
  stroke-width: 2;
`;

const IntentionText = styled.text`
  font-family: Arial, sans-serif;
  font-size: 12px;
  fill: ${props => props.color || '#6366F1'};
`;

const Cloud = styled.path`
  fill: ${props => props.color};
  transition: fill 1s;
`;

const DesignNode = styled.rect`
  fill: #FBBF24;
`;

const InteractionDemo = () => {
  const [ballColor, setBallColor] = useState('#EF4444');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntentions, setShowIntentions] = useState({
    humanToBall: false,
    ballToDesignNode: false,
    designNodeToBall: false,
    ballToHuman: false
  });

  const triggerAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setShowIntentions({
      humanToBall: false,
      ballToDesignNode: false,
      designNodeToBall: false,
      ballToHuman: false
    });

    setShowIntentions(prev => ({ ...prev, humanToBall: true }));
    
    setTimeout(() => {
      setShowIntentions(prev => ({ ...prev, ballToDesignNode: true }));
    }, 1500);
    
    setTimeout(() => {
      setShowIntentions(prev => ({ ...prev, designNodeToBall: true }));
    }, 3000);
    
    setTimeout(() => {
      setBallColor(ballColor === '#EF4444' ? '#10B981' : '#EF4444');
      setShowIntentions(prev => ({ ...prev, ballToHuman: true }));
    }, 4500);
    
    setTimeout(() => {
      setIsAnimating(false);
      setShowIntentions({
        humanToBall: false,
        ballToDesignNode: false,
        designNodeToBall: false,
        ballToHuman: false
      });
    }, 7500);
  };

  return (
    <Container>
      <SVG viewBox="0 0 800 400">
        {/* Title Labels */}
        <g>
          <path d="M 60 120 Q 110 120 160 120" stroke="#818CF8" strokeWidth="2" fill="none" />
          <path d="M 250 120 Q 300 120 350 120" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M 440 120 Q 490 120 540 120" stroke="#FBBF24" strokeWidth="2" fill="none" />
          
          <Label x="110" y="110" textAnchor="middle">Human Agent</Label>
          <Label x="300" y="110" textAnchor="middle">Cloud Object</Label>
          <Label x="490" y="110" textAnchor="middle">Design Node</Label>
        </g>

        {/* Human Agent Button */}
        <g onClick={triggerAnimation}>
          <Button 
            x="50"
            y="170"
            width="120"
            height="40"
            rx="5"
            isAnimating={isAnimating}
          />
          <ButtonText x="110" y="195" textAnchor="middle">
            Change Color
          </ButtonText>
        </g>

        {/* Human to Cloud Arrow and Label */}
        <IntentionGroup show={showIntentions.humanToBall}>
          <IntentionPath
            d="M 170 190 L 270 190"
            markerEnd="url(#arrowhead)"
          />
          <IntentionText x="220" y="210" textAnchor="middle">
            "Change color"
          </IntentionText>
        </IntentionGroup>

        {/* Cloud Object */}
        <Cloud
          d={`
            M 300 205
            c -4.5 0 -8.9 -0.6 -13.2 -1.7
            c -3.7 3.2 -8.5 5.2 -13.8 5.2
            c -11.6 0 -21 -9.4 -21 -21
            c 0 -4.4 1.4 -8.5 3.7 -11.9
            c -2.3 -3.4 -3.7 -7.5 -3.7 -11.9
            c 0 -11.6 9.4 -21 21 -21
            c 3.9 0 7.5 1.1 10.6 2.9
            c 4.3 -5.3 10.9 -8.7 18.4 -8.7
            c 13 0 23.5 10.5 23.5 23.5
            c 0 2.6 -0.4 5.1 -1.2 7.5
            c 7.8 3 13.2 10.5 13.2 19.4
            c 0 11.6 -9.4 21 -21 21
            c -5.3 0 -10.1 -2 -13.8 -5.2
            c -4.3 1.1 -8.7 1.7 -13.2 1.7
            z
          `}
          color={ballColor}
        />

        {/* Rest of the arrows and labels */}
        <IntentionGroup show={showIntentions.ballToDesignNode}>
          <IntentionPath
            d="M 330 190 L 430 190"
            markerEnd="url(#arrowhead)"
          />
          <IntentionText x="380" y="210" textAnchor="middle">
            "Request change"
          </IntentionText>
        </IntentionGroup>

        {/* Design Node */}
        <DesignNode 
          x="430" 
          y="150" 
          width="120" 
          height="80" 
          rx="5"
        />
        <text x="490" y="180" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="14">
          Set Color
        </text>
        <text x="490" y="200" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="10">
          toggleColor() {`{`}
        </text>
        <text x="490" y="215" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="10">
          {`  color = !color;`}
        </text>
        <text x="490" y="230" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="10">
          {`}`}
        </text>

        {/* Design Node to Cloud Arrow */}
        <IntentionGroup show={showIntentions.designNodeToBall}>
          <IntentionPath
            d="M 430 170 L 330 170"
            color="#10B981"
            markerEnd="url(#greenArrow)"
          />
          <IntentionText x="380" y="150" textAnchor="middle" color="#10B981">
            "Execute change"
          </IntentionText>
        </IntentionGroup>

        {/* Cloud to Human Arrow */}
        <IntentionGroup show={showIntentions.ballToHuman}>
          <IntentionPath
            d="M 270 170 L 170 170"
            color="#10B981"
            markerEnd="url(#greenArrow)"
          />
          <IntentionText x="220" y="150" textAnchor="middle" color="#10B981">
            "Color changed"
          </IntentionText>
        </IntentionGroup>

        {/* Arrowhead Definitions */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#6366F1" />
          </marker>
          <marker
            id="greenArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
          </marker>
        </defs>
      </SVG>
    </Container>
  );
};

export default InteractionDemo;