import styled, { createGlobalStyle } from 'styled-components';

import { whatsappThemeColor } from './utils/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const AppHeader = styled.div`
  background-color: ${whatsappThemeColor};
  color: white;
  padding: 15px 20px;
  text-align: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
`;

const Header = styled.header`
  padding: 10px;
  display: flex;
  align-items: center;

  > *:first-child {
    flex: 1 1 auto;
  }

  @media (max-width: 699px) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5rem;
    }
  }

  @media (min-width: 700px) {
    > * + * {
      margin-left: 1rem;
    }
  }
`;

const WelcomeSection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  color: ${whatsappThemeColor};
  margin-bottom: 1rem;
`;

const WelcomeText = styled.p`
  margin-bottom: 2rem;
  color: #666;

  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const InstructionsList = styled.ol`
  list-style: none;
  padding: 0;
  text-align: left;

  li {
    background: #f5f5f5;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border-left: 4px solid ${whatsappThemeColor};

    @media (prefers-color-scheme: dark) {
      background: #363d41;
    }

    strong {
      color: ${whatsappThemeColor};
    }

    p {
      margin: 0.5rem 0 0 0;
      color: #666;

      @media (prefers-color-scheme: dark) {
        color: #aaa;
      }
    }
  }
`;

const Footer = styled.footer`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  color: #666;
  font-size: 14px;

  @media (prefers-color-scheme: dark) {
    border-top-color: #444;
    color: #aaa;
  }

  strong {
    color: ${whatsappThemeColor};
  }
`;

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 
      'Segoe UI Symbol', 'Noto Color Emoji';
    box-sizing: border-box;
    
    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
    }
  }

  body {
    margin: 0;
    color: #333;
  }

  a {
    text-decoration: none;
    color: ${whatsappThemeColor};
  }

  img,
  video,
  audio {
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: #262d31;
      color: #ccc;
    }
  }

  @media print {
    video, audio, ${Header}, ${AppHeader}, .menu-open-button {
      display: none !important;
    }
  }
`;

export {
  GlobalStyles,
  Container,
  AppHeader,
  Logo,
  Subtitle,
  Header,
  WelcomeSection,
  WelcomeTitle,
  WelcomeText,
  InstructionsList,
  Footer,
};
