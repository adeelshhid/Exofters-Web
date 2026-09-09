import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Exofters app and Products navigation item', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const productsLinks = screen.getAllByText(/Products/i);
  expect(productsLinks.length).toBeGreaterThan(0);
});

