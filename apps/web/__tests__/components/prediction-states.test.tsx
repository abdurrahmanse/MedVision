import { render, screen } from '@testing-library/react';
import { PredictionResult } from 'components/features/predict/prediction-result';
import { ErrorAlert } from 'components/ui/error-alert';
import { LoadingState, EmptyState } from 'components/features/history/history-states';

describe('Prediction States', () => {
  it('renders loading state for history correctly', () => {
    render(<LoadingState />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<EmptyState />);
    expect(screen.getByText(/No records found/i)).toBeInTheDocument();
    expect(screen.getByText(/You haven't run any predictions yet/i)).toBeInTheDocument();
  });

  it('renders error state correctly via ErrorAlert', () => {
    render(<ErrorAlert title="Prediction Failed" message="Invalid image format" />);
    expect(screen.getByText('Prediction Failed')).toBeInTheDocument();
    expect(screen.getByText('Invalid image format')).toBeInTheDocument();
  });

  it('renders success prediction result correctly (Normal)', () => {
    const mockResult = {
      id: "123",
      predicted_class: "Normal",
      confidence: 0.98,
      model_version: "v1.0",
      created_at: new Date().toISOString(),
      image_url: "/test.jpg"
    };
    render(<PredictionResult result={mockResult} />);
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('98.0%')).toBeInTheDocument();
    expect(screen.getByText('v1.0')).toBeInTheDocument();
  });

  it('renders success prediction result correctly (Pneumonia)', () => {
    const mockResult = {
      id: "124",
      predicted_class: "Pneumonia",
      confidence: 0.855,
      model_version: "v1.0",
      created_at: new Date().toISOString(),
      image_url: "/test.jpg"
    };
    render(<PredictionResult result={mockResult} />);
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('85.5%')).toBeInTheDocument();
  });
});
