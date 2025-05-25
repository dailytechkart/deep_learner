import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CountdownTimerProps {
  targetDate: Date;
}

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TimeValue = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.6rem;
  border-radius: 8px;
  min-width: 50px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TimeLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  margin-top: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const Separator = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.4rem;
`;

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

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
