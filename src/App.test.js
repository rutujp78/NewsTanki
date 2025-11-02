import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders NavBar and News components', () => {
    render(<App />);
    const navBarElement = screen.getByText('NewsTanki');
    expect(navBarElement).toBeInTheDocument();
    const newsElement = screen.getByText('NewsTanki - Top Recent General Headlines');
    expect(newsElement).toBeInTheDocument();

  });

  it('contains routes for all categories', () => {
    render(<App />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(9);
  });
});