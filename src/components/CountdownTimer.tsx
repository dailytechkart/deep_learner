import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const STORAGE_KEY = 'countdown_target_date';

// Set target date to July 1st of current year
const getTargetDate = () => {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 6, 1); // Month is 0-based, so 6 = July

  // If July 1st has passed this year, set it for next year
  if (now > targetDate) {
    targetDate.setFullYear(now.getFullYear() + 1);
  }

  return targetDate;
};

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin: 1rem 0;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  align-items: baseline;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: clamp(45px, 8vw, 60px);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    min-width: clamp(40px, 6vw, 45px);
  }
`;

const TimeValue = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  padding: clamp(0.4rem, 1.5vw, 0.6rem);
  border-radius: 8px;
  min-width: clamp(40px, 7vw, 50px);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    min-width: clamp(35px, 5vw, 40px);
    padding: 0.4rem;
  }
`;

const TimeLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: clamp(0.6rem, 1.5vw, 0.75rem);
  margin-top: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const Separator = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  margin-top: 0.4rem;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Initialize timer with stored date or use July 1st
    const storedDate = localStorage.getItem(STORAGE_KEY);
    let targetDate: Date;

    if (storedDate) {
      const parsedDate = new Date(storedDate);
      // If stored date is in the past, get new target date
      targetDate = parsedDate < new Date() ? getTargetDate() : parsedDate;
    } else {
      targetDate = getTargetDate();
    }

    // Store the target date in localStorage
    localStorage.setItem(STORAGE_KEY, targetDate.toISOString());

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Clear the timer and localStorage when countdown ends
        clearInterval(timer);
        localStorage.removeItem(STORAGE_KEY);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TimerContainer>
      <TimeUnit>
        <TimeValue>{String(timeLeft.days).padStart(2, '0')}</TimeValue>
        <TimeLabel>Days</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{String(timeLeft.hours).padStart(2, '0')}</TimeValue>
        <TimeLabel>Hours</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{String(timeLeft.minutes).padStart(2, '0')}</TimeValue>
        <TimeLabel>Minutes</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{String(timeLeft.seconds).padStart(2, '0')}</TimeValue>
        <TimeLabel>Seconds</TimeLabel>
      </TimeUnit>
    </TimerContainer>
  );
};

export default CountdownTimer;
