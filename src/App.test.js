import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Exofters app and VSM navigation item', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const vsmLinks = screen.getAllByText(/VSM/i);
  expect(vsmLinks.length).toBeGreaterThan(0);
});

