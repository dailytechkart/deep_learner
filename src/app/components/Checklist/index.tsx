import React from 'react';
import styled from 'styled-components';

const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChecklistItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CheckIcon = styled.svg<{ checked: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  color: ${props => props.theme.colors.background};
  opacity: ${props => props.checked ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const Label = styled.span<{ checked: boolean }>`
  flex: 1;
  color: ${props => props.checked ? props.theme.colors.textSecondary : props.theme.colors.text};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  transition: all 0.2s ease;
`;

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  className?: string;
}

export default function Checklist({ items, onToggle, className }: ChecklistProps) {
  return (
    <ChecklistContainer className={className}>
      {items.map((item) => (
        <ChecklistItemWrapper key={item.id}>
          <Checkbox checked={item.completed} onClick={() => onToggle(item.id)}>
            <CheckIcon
              checked={item.completed}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </CheckIcon>
          </Checkbox>
          <Label checked={item.completed}>{item.text}</Label>
        </ChecklistItemWrapper>
      ))}
    </ChecklistContainer>
  );
} 