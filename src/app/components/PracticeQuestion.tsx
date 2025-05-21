'use client';

import React, { useState, useEffect } from 'react';
import { PracticeQuestion as QuestionType, UserPracticeProgress } from '../types/practice';
import { usePractice } from '../hooks/usePractice';
import styled from 'styled-components';

interface PracticeQuestionProps {
  question: QuestionType;
  onAnswerSubmit?: (isCorrect: boolean) => void;
}

const QuestionContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const QuestionTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a1a1a;
  margin: 0;
`;

const QuestionMeta = styled.div`
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 0.875rem;
`;

const QuestionDescription = styled.p`
  color: #4a4a4a;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button<{ selected?: boolean; correct?: boolean; incorrect?: boolean }>`
  padding: 12px 16px;
  border: 2px solid
    ${props => {
      if (props.correct) return '#4CAF50';
      if (props.incorrect) return '#f44336';
      if (props.selected) return '#2196F3';
      return '#e0e0e0';
    }};
  border-radius: 6px;
  background: ${props => {
    if (props.correct) return '#E8F5E9';
    if (props.incorrect) return '#FFEBEE';
    if (props.selected) return '#E3F2FD';
    return 'white';
  }};
  color: #1a1a1a;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => {
      if (props.correct) return '#4CAF50';
      if (props.incorrect) return '#f44336';
      if (props.selected) return '#2196F3';
      return '#bdbdbd';
    }};
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

const Explanation = styled.div<{ show: boolean }>`
  margin-top: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Timer = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

export const PracticeQuestion: React.FC<PracticeQuestionProps> = ({ question, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const { submitAnswer, getUserQuestionProgress } = usePractice();

  useEffect(() => {
    // Check if user has already answered this question
    const checkPreviousAnswer = async () => {
      const progress = await getUserQuestionProgress(question.id);
      if (progress) {
        setSelectedOption(progress.selectedOption);
        setIsAnswered(true);
        setShowExplanation(true);
      }
    };
    checkPreviousAnswer();
  }, [question.id, getUserQuestionProgress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isAnswered) {
      timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAnswered]);

  const handleOptionSelect = async (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === question.correctAnswer;
    setIsAnswered(true);
    setShowExplanation(true);

    const result = await submitAnswer(question.id, optionIndex, timeSpent);
    if (onAnswerSubmit && result) {
      onAnswerSubmit(result.isCorrect);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <QuestionContainer>
      <QuestionHeader>
        <QuestionTitle>{question.question}</QuestionTitle>
        <QuestionMeta>
          <span>{question.category}</span>
          <span>{question.difficulty}</span>
          <span>{question.points} points</span>
          {!isAnswered && <Timer>{formatTime(timeSpent)}</Timer>}
        </QuestionMeta>
      </QuestionHeader>

      <QuestionDescription>{question.question}</QuestionDescription>

      <OptionsList>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            selected={selectedOption === index}
            correct={isAnswered && index === question.correctAnswer}
            incorrect={isAnswered && selectedOption === index && index !== question.correctAnswer}
            onClick={() => handleOptionSelect(index)}
            disabled={isAnswered}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsList>

      <Explanation show={showExplanation}>
        <h4>Explanation:</h4>
        <p>{question.explanation}</p>
      </Explanation>
    </QuestionContainer>
  );
};
