import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';

const hldDiagram = `flowchart TD\n  UI[\"React SPA (Chat UI)\"]\n  State[\"State Management (Redux/Zustand/Context)\"]\n  WS[\"WebSocket Client\"]\n  API[\"REST API Client\"]\n  Cache[\"Local Storage / IndexedDB\"]\n  Service[\"Service Layer (Hooks/Utils)\"]\n  Router[\"React Router\"]\n  Theme[\"ThemeProvider\"]\n\n  UI --> State\n  UI --> Router\n  UI --> Theme\n  State --> Service\n  Service --> WS\n  Service --> API\n  State --> Cache\n  WS <--> API\n`;

const dataModelDiagram = `erDiagram\n  ChatState {\n    string currentUserId\n    array chats\n    string selectedChatId\n    object typingStatus\n    object unreadCounts\n    object fileUploads\n  }\n  Chat {\n    string id\n    string name\n    array participants\n    array messages\n    object lastMessage\n    bool isGroup\n  }\n  Message {\n    string id\n    string chatId\n    string senderId\n    string content\n    string type\n    datetime timestamp\n    string status\n    array reactions\n    object fileMeta\n  }\n  User {\n    string id\n    string name\n    string avatar\n    string status\n    datetime lastSeen\n  }\n  ChatState ||--o{ Chat : manages\n  Chat ||--o{ Message : contains\n  Chat ||--o{ User : has\n  Message ||--o{ User : sentBy\n`;

const keyFlowsDiagram = `sequenceDiagram\n  participant User\n  participant UI as Chat UI\n  participant State as StateMgr\n  participant WS as WebSocket\n  participant API\n  User->>UI: Type message\n  UI->>State: Update input state\n  User->>UI: Press Send\n  UI->>State: Optimistically add message\n  State->>WS: Emit 'message:send'\n  WS-->>State: Ack (messageId, status)\n  State->>UI: Update message status\n  WS-->>State: 'message:new' (from others)\n  State->>UI: Add incoming message\n  UI->>State: Scroll, show unread badge\n`;

const section = (title: string, children: ReactNode) => (
  <section style={{ margin: '0 0 4.5rem 0' }}>
    <h2
      style={{
        fontSize: '2.15rem',
        fontWeight: 700,
        margin: '3.5rem 0 1.5rem 0',
        color: '#222',
        fontFamily: 'inherit',
        lineHeight: 1.18,
        letterSpacing: '-0.01em',
        textAlign: 'left',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        fontSize: '1.22rem',
        color: '#222',
        lineHeight: 1.85,
        fontFamily: 'inherit',
      }}
    >
      {children}
    </div>
  </section>
);

const listStyles: React.CSSProperties = {
  margin: '0 0 2.2rem 0',
  paddingLeft: 0,
  fontSize: '1.22rem',
  lineHeight: 1.85,
  color: '#222',
  fontFamily: 'inherit',
  listStyle: 'none',
};
const liStyles: React.CSSProperties = {
  marginBottom: 18,
  paddingLeft: 32,
  position: 'relative',
  fontSize: '1.22rem',
  lineHeight: 1.85,
  color: '#222',
  fontFamily: 'inherit',
  minHeight: 28,
  display: 'flex',
  alignItems: 'flex-start',
};
const bulletStyles: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  left: 0,
  top: 10,
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: '#bbb',
  marginRight: 16,
  display: 'inline-block',
  flexShrink: 0,
};
const olStyles: React.CSSProperties = {
  margin: '0 0 2.2rem 0',
  paddingLeft: 28,
  fontSize: '1.22rem',
  lineHeight: 1.85,
  color: '#222',
  fontFamily: 'inherit',
  listStyle: 'decimal',
};

const codeBlockStyles: React.CSSProperties = {
  fontFamily:
    "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: '1.08rem',
  background: '#f6f6f6',
  color: '#222',
  borderRadius: 8,
  padding: '1.2em 1.5em',
  margin: '2.2rem 0',
  overflowX: 'auto',
  lineHeight: 1.7,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

function CustomUl({ children }: { children: ReactNode }) {
  return (
    <ul style={listStyles}>
      {React.Children.map(children, (li, i) =>
        React.isValidElement(li)
          ? React.cloneElement(li, {
              style: { ...liStyles, ...li.props.style },
              children: (
                <>
                  <span style={bulletStyles} />
                  <span>{li.props.children}</span>
                </>
              ),
            })
          : li,
      )}
    </ul>
  );
}

function CustomCodeBlock({ children }: { children: ReactNode }) {
  return <pre style={codeBlockStyles}>{children}</pre>;
}

const ChatAppAnswer = () => (
  <article
    style={{
      background: '#f5f5f3',
      minHeight: '100vh',
      padding: 0,
      fontFamily: 'Charter, Georgia, Cambria, Times, serif',
      color: '#222',
    }}
  >
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        background: '#fff',
        padding: '4.5rem 2rem 5rem 2rem',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <header style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
        <p
          style={{
            color: '#666',
            fontSize: '1.28rem',
            margin: '0',
            maxWidth: 540,
            lineHeight: 1.7,
            fontFamily: 'inherit',
          }}
        >
          A modern, production-grade chat application architecture for web and
          mobile, with a focus on frontend engineering, real-time UX, and
          scalable state management.
        </p>
      </header>
      {section(
        '1. Clarifying Questions',
        <CustomUl>
          <li>
            What browsers/devices must be supported? (mobile, desktop, PWA?)
          </li>
          <li>Should the app work offline or with flaky connections?</li>
          <li>What accessibility (a11y) standards are required?</li>
          <li>What is the expected message volume per user/session?</li>
          <li>What is the max group size and message length?</li>
          <li>What are the branding/theming requirements?</li>
          <li>Should the UI support dark mode and localization?</li>
          <li>What analytics/tracking is needed?</li>
        </CustomUl>,
      )}
      {section(
        '2. Requirements',
        <>
          <strong>Frontend Functional:</strong>
          <CustomUl>
            <li>
              Real-time chat UI (1:1, group, unread badges, typing indicators)
            </li>
            <li>Optimistic UI for sending messages</li>
            <li>File/image upload with preview and progress</li>
            <li>Emoji/reactions, message editing/deleting</li>
            <li>Responsive, accessible, themeable UI</li>
            <li>Message search, infinite scroll, virtualization</li>
            <li>Presence/online status, last seen, avatars</li>
            <li>Push notifications, sound/vibration alerts</li>
            <li>Offline support (PWA, service worker, local cache)</li>
          </CustomUl>
          <strong style={{ display: 'block', marginTop: 18 }}>
            Frontend Non-Functional:
          </strong>
          <CustomUl>
            <li>
              Fast load time, smooth transitions, &lt;100ms message latency
            </li>
            <li>Works on all major browsers/devices</li>
            <li>WCAG 2.1 accessibility, keyboard navigation</li>
            <li>Secure against XSS, CSRF, input validation</li>
          </CustomUl>
          <strong style={{ display: 'block', marginTop: 18 }}>
            Backend (API/WebSocket contract only):
          </strong>
          <CustomUl>
            <li>REST endpoints for auth, chat, file upload</li>
            <li>WebSocket events for real-time messaging</li>
          </CustomUl>
        </>,
      )}
      {section(
        '3. High-Level Frontend Architecture',
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '3rem 0 2.5rem 0',
            }}
          >
            <div style={{ maxWidth: 700, width: '100%' }}>
              <Mermaid chart={hldDiagram} />
            </div>
            <div
              style={{
                color: '#888',
                fontSize: '1.08rem',
                marginTop: 22,
                textAlign: 'center',
                fontFamily: 'inherit',
              }}
            >
              Frontend app structure: SPA, state, service layer, WebSocket/API
              clients, theming, routing.
            </div>
          </div>
          <p style={{ margin: 0 }}>
            The frontend is a React SPA using state management
            (Redux/Zustand/Context), a service layer for API/WebSocket, and
            local cache for offline support. UI is modular, themeable, and
            responsive. All real-time events are handled via WebSocket client,
            with optimistic UI and error handling.
          </p>
        </>,
      )}
      {section(
        '4. Component Breakdown',
        <>
          <p style={{ margin: '0 0 2.2rem 0' }}>
            The UI follows a modern messenger-style layout with a three-panel
            design: sidebar, chat list, and chat thread. Each component is built
            for performance, accessibility, and real-time updates.
          </p>
          <CustomUl>
            <li>
              <strong>Sidebar:</strong>
              <ul style={{ ...listStyles, marginTop: 12 }}>
                <li style={liStyles}>
                  User profile with avatar, status, and quick actions
                </li>
                <li style={liStyles}>Navigation menu with icons and labels</li>
                <li style={liStyles}>Theme switcher and settings access</li>
                <li style={liStyles}>
                  Collapsible on mobile with smooth transitions
                </li>
              </ul>
            </li>
            <li>
              <strong>Chat List:</strong>
              <ul style={{ ...listStyles, marginTop: 12 }}>
                <li style={liStyles}>Search bar with instant filtering</li>
                <li style={liStyles}>
                  Chat preview cards with avatar, name, last message
                </li>
                <li style={liStyles}>Unread badge with count and highlight</li>
                <li style={liStyles}>
                  Online status indicators and typing status
                </li>
                <li style={liStyles}>Virtualized list for performance</li>
              </ul>
            </li>
            <li>
              <strong>Chat Thread:</strong>
              <ul style={{ ...listStyles, marginTop: 12 }}>
                <li style={liStyles}>
                  Header with chat info, actions, and participants
                </li>
                <li style={liStyles}>
                  Message bubbles with timestamps and status
                </li>
                <li style={liStyles}>
                  Support for text, images, files, and emoji
                </li>
                <li style={liStyles}>Message reactions and reply threads</li>
                <li style={liStyles}>Infinite scroll with loading states</li>
              </ul>
            </li>
            <li>
              <strong>Message Input:</strong>
              <ul style={{ ...listStyles, marginTop: 12 }}>
                <li style={liStyles}>Rich text editor with formatting</li>
                <li style={liStyles}>File upload with drag-and-drop</li>
                <li style={liStyles}>Emoji picker and quick reactions</li>
                <li style={liStyles}>Voice message recording</li>
                <li style={liStyles}>Typing indicator and send button</li>
              </ul>
            </li>
            <li>
              <strong>Notifications:</strong>
              <ul style={{ ...listStyles, marginTop: 12 }}>
                <li style={liStyles}>Toast notifications for new messages</li>
                <li style={liStyles}>Browser push notifications</li>
                <li style={liStyles}>Sound and vibration alerts</li>
                <li style={liStyles}>Notification preferences</li>
              </ul>
            </li>
          </CustomUl>
          <div style={{ marginTop: '2.2rem' }}>
            <strong>Key UI Features:</strong>
            <CustomUl>
              <li>Responsive design with mobile-first approach</li>
              <li>Dark/light theme with smooth transitions</li>
              <li>Accessible keyboard navigation and screen reader support</li>
              <li>Optimistic UI updates for instant feedback</li>
              <li>Loading skeletons and error states</li>
              <li>Touch-friendly interactions and gestures</li>
            </CustomUl>
          </div>
        </>,
      )}
      {section(
        '5. Frontend State Model',
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '3rem 0 2.5rem 0',
            }}
          >
            <div style={{ maxWidth: 700, width: '100%' }}>
              <Mermaid chart={dataModelDiagram} />
            </div>
            <div
              style={{
                color: '#888',
                fontSize: '1.08rem',
                marginTop: 22,
                textAlign: 'center',
                fontFamily: 'inherit',
              }}
            >
              Frontend state shape: chat list, messages, typing, unread,
              uploads, user info.
            </div>
          </div>
          <p style={{ margin: 0 }}>
            State is managed globally (Redux/Zustand/Context) and locally
            (component state). All chat, message, typing, unread, and file
            upload data is normalized for fast updates and rendering. Local
            cache (IndexedDB) is used for offline support.
          </p>
        </>,
      )}
      {section(
        '6. Key UI Flows',
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '3rem 0 2.5rem 0',
            }}
          >
            <div style={{ maxWidth: 700, width: '100%' }}>
              <Mermaid chart={keyFlowsDiagram} />
            </div>
            <div
              style={{
                color: '#888',
                fontSize: '1.08rem',
                marginTop: 22,
                textAlign: 'center',
                fontFamily: 'inherit',
              }}
            >
              UI flow: send/receive message, optimistic update, unread badge,
              typing, real-time events.
            </div>
          </div>
          <ol style={olStyles}>
            <li style={liStyles}>
              User types and sends a message; UI updates optimistically.
            </li>
            <li style={liStyles}>
              WebSocket emits event; backend acks and updates status.
            </li>
            <li style={liStyles}>
              Incoming messages update state and UI in real time.
            </li>
            <li style={liStyles}>
              Unread badges, typing indicators, and notifications update
              instantly.
            </li>
          </ol>
        </>,
      )}
      {section(
        '7. Bottlenecks & Tradeoffs',
        <CustomUl>
          <li>WebSocket reconnection, message ordering, and error handling</li>
          <li>Virtualized list performance for large chats</li>
          <li>Optimistic UI rollback on failure</li>
          <li>File upload progress, preview, and error states</li>
          <li>Accessibility for all interactive elements</li>
          <li>State sync between tabs/devices</li>
          <li>Security: XSS, CSRF, input validation</li>
        </CustomUl>,
      )}
      {section(
        '8. Advanced/Optional Considerations',
        <CustomUl>
          <li>PWA: offline mode, background sync, push notifications</li>
          <li>Custom themes, dark mode, localization</li>
          <li>Analytics: user engagement, error tracking</li>
          <li>Testing: unit, integration, E2E (Jest, Cypress, Playwright)</li>
          <li>Frontend monitoring: Sentry, LogRocket, performance metrics</li>
          <li>
            Minimal backend: API/WebSocket contract, auth, file upload endpoint
          </li>
        </CustomUl>,
      )}
      {section(
        '9. Example Code Block',
        <CustomCodeBlock>{`
// Example: Send message with optimistic UI
const handleSend = (content) => {
  const tempId = uuid();
  addMessage({ id: tempId, content, status: 'sending' });
  ws.emit('message:send', { content }, (ack) => {
    updateMessageStatus(tempId, ack.status);
  });
};
        `}</CustomCodeBlock>,
      )}
    </div>
  </article>
);

export default ChatAppAnswer;
