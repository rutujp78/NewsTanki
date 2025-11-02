import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import News from './News';

describe('News component', () => {
  // 🧩 Mock for the setProgress function passed from App.js useState
  const mockSetProgress = jest.fn();

  const defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 6,
    apiKey: 'test-api-key',
    setProgress: mockSetProgress, // passed from parent component
  };

  const mockResponse = {
    status: 'ok',
    totalResults: 1,
    articles: [
      {
        title: 'Test Title',
        description: 'Test Description',
        urlToImage: 'https://example.com/image.jpg',
        url: 'https://example.com/article',
        author: 'Jane Doe',
        publishedAt: '2025-11-02T10:00:00Z',
        source: { name: 'Example Source' },
      },
    ],
  };

  beforeEach(() => {
    mockSetProgress.mockClear();

    // Mock fetch globally for each test
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    global.fetch = mockFetch;
    window.fetch = mockFetch;
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    delete global.fetch;
    delete window.fetch;
  });

  it('fetches and displays news articles', async () => {
    render(<News {...defaultProps} />);

    const articleTitle = await screen.findByText('Test Title');
    expect(articleTitle).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // verify fetch call and query params
    expect(global.fetch).toHaveBeenCalled();
    const calledUrl = global.fetch.mock.calls[0][0];
    expect(calledUrl).toContain(`apiKey=${defaultProps.apiKey}`);
    expect(calledUrl).toContain(`country=${defaultProps.country}`);
    expect(calledUrl).toContain(`category=${defaultProps.category}`);
  });

  it('calls setProgress during fetch lifecycle', async () => {
    render(<News {...defaultProps} />);

    // Wait until all progress calls have completed
    await waitFor(() => expect(mockSetProgress).toHaveBeenCalledWith(100));

    // Check expected progress values were called in lifecycle
    expect(mockSetProgress).toHaveBeenCalledWith(10);
    expect(mockSetProgress).toHaveBeenCalledWith(30);
    expect(mockSetProgress).toHaveBeenCalledWith(70);
  });

  it('handles fetch failure gracefully', async () => {
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error('network error'));
    global.fetch = mockFetch;
    window.fetch = mockFetch;

    render(<News {...defaultProps} />);

    await waitFor(() => {
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('uses default props when missing values', async () => {
    render(<News setProgress={mockSetProgress} apiKey="k" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const calledUrl = global.fetch.mock.calls[0][0];
    expect(calledUrl).toContain('country=in');
    expect(calledUrl).toContain('category=general');
  });
});
