import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from './Products';

describe('Products Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
  });

  test('renders products hero title and lead', () => {
    expect(screen.getByText(/Our Flagship Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Exofters SaaS & Platforms/i)).toBeInTheDocument();
  });

  test('renders VSM flagship product card with links', () => {
    expect(screen.getByText(/VSM – Virtual Store Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore VSM Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Launch Web App/i)).toBeInTheDocument();
  });

  test('renders additional Exofters products', () => {
    expect(screen.getByText(/The Labour Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/BNPL Flight Booking Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/eTraffic System/i)).toBeInTheDocument();
  });
});
