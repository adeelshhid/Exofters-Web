import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VSM from './VSM';

describe('VSM Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <VSM />
      </BrowserRouter>
    );
  });

  test('renders hero title and subtitle', () => {
    expect(screen.getByText(/Run your store with clarity/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Grow with confidence/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Built for businesses that are going places/i)).toBeInTheDocument();
  });

  test('renders dashboard preview stats', () => {
    expect(screen.getByText(/PKR 48.6k/i)).toBeInTheDocument();
    expect(screen.getByText('126')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText(/Everything in control/i)).toBeInTheDocument();
    expect(screen.getByText(/1,284 this month/i)).toBeInTheDocument();
  });

  test('renders 3 core feature capabilities', () => {
    expect(screen.getByText(/Know your stock/i)).toBeInTheDocument();
    expect(screen.getByText(/Serve customers better/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Grow with confidence/i).length).toBe(2);
  });

  test('renders 3 steps process', () => {
    expect(screen.getByText(/Create your store/i)).toBeInTheDocument();
    expect(screen.getByText(/Run your day/i)).toBeInTheDocument();
    expect(screen.getByText(/Move forward/i)).toBeInTheDocument();
  });

  test('renders target industries trust strip', () => {
    expect(screen.getByText(/Retail Stores/i)).toBeInTheDocument();
    expect(screen.getByText(/Wholesale/i)).toBeInTheDocument();
    expect(screen.getByText(/Pharmacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Agro-Vet/i)).toBeInTheDocument();
  });

  test('renders multi-platform download cards', () => {
    expect(screen.getByText(/Google Play Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Apple App Store/i)).toBeInTheDocument();
    expect(screen.getByText(/VSM Cloud Web App/i)).toBeInTheDocument();
  });

  test('allows hovering chart bars to inspect daily values', () => {
    const bars = screen.getAllByTitle(/PKR/i);
    expect(bars.length).toBe(7);
    fireEvent.mouseEnter(bars[0].parentElement);
    expect(screen.getByText(/PKR 22,400/i)).toBeInTheDocument();
  });
});
