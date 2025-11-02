import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsItem from './NewsItem';

describe('NewsItem Component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    imgUrl: 'https://test.com/image.jpg',
    newsUrl: 'https://test.com/article',
    author: 'John Doe',
    date: '2023-11-02T12:00:00Z',
    source: 'Test Source'
  };

  test('renders article with all props', () => {
    render(<NewsItem {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Test Source/)).toBeInTheDocument();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.imgUrl);
    
    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toHaveAttribute('href', mockProps.newsUrl);
  });

  test('handles missing props gracefully', () => {
    render(<NewsItem />);
    
    expect(screen.getByText(/Unknown Author/)).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'NewsTanki');
  });
});