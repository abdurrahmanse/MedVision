import { render, screen, fireEvent } from '@testing-library/react';
import { UploadZone } from 'components/features/predict/upload-zone';
import { vi } from 'vitest';

describe('UploadZone Component', () => {
  it('renders the upload instructions correctly', () => {
    render(<UploadZone onFileChange={() => {}} />);
    expect(screen.getByText(/Drop Chest X-Ray Here/i)).toBeInTheDocument();
    expect(screen.getByText(/PNG or JPG \(Max 5MB\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse Files/i)).toBeInTheDocument();
  });

  it('triggers onFileChange when a file is selected', () => {
    const handleFileChange = vi.fn();
    render(<UploadZone onFileChange={handleFileChange} />);
    
    // Select the actual <input type="file" /> element which is wrapped in a label containing "Browse Files"
    const fileInput = screen.getByLabelText(/Browse Files/i) as HTMLInputElement;
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });
});
