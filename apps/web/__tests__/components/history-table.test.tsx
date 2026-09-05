import { render, screen } from '@testing-library/react';
import { HistoryTable } from 'components/features/history/history-table';

describe('History Table Rendering', () => {
  const mockPredictions = [
    {
      id: "1",
      predicted_class: "Normal",
      confidence: 0.95,
      model_version: "v1.0",
      created_at: "2024-01-01T10:00:00Z",
      image_url: "/test1.jpg"
    },
    {
      id: "2",
      predicted_class: "Pneumonia",
      confidence: 0.88,
      model_version: "v1.1",
      created_at: "2024-01-02T10:00:00Z",
      image_url: "/test2.jpg"
    }
  ];

  it('renders a table with all provided predictions', () => {
    render(<HistoryTable predictions={mockPredictions} />);
    
    // Check headers
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Prediction/i)).toBeInTheDocument();
    expect(screen.getByText(/Confidence/i)).toBeInTheDocument();
    expect(screen.getByText(/Version/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();

    // Check row 1
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('95.0%')).toBeInTheDocument();
    expect(screen.getByText('v1.0')).toBeInTheDocument();

    // Check row 2
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('88.0%')).toBeInTheDocument();
    expect(screen.getByText('v1.1')).toBeInTheDocument();
  });
});
