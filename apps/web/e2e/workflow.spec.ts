import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('MedVision End-to-End Workflow', () => {
  test('Complete prediction lifecycle and history verification', async ({ page }) => {
    // 1. Open Next.js home page
    await page.goto('/');
    
    // Verify we are on the homepage
    await expect(page.locator('h1')).toContainText('Pneumonia AI');

    // 2. Navigate to Predict page
    await page.click('text=Upload & Predict');
    await expect(page.locator('h1').first()).toContainText('Predict');

    // 3. Upload image
    // Create a dummy image for testing if it doesn't exist
    const testImageDir = path.join(__dirname, 'fixtures');
    const testImagePath = path.join(testImageDir, 'test_xray.jpg');
    
    if (!fs.existsSync(testImageDir)) {
      fs.mkdirSync(testImageDir, { recursive: true });
    }
    
    if (!fs.existsSync(testImagePath)) {
      // Create a 100x100 white square image (valid JPEG base64)
      const base64Image = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCABkAGQBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
      fs.writeFileSync(testImagePath, Buffer.from(base64Image, 'base64'));
    }

    // Locate the file input and upload the file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('text=Browse Files');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(testImagePath);

    // 4. Click Predict
    // The "Run Prediction" button should appear after upload
    await expect(page.locator('button:has-text("Run Prediction")')).toBeVisible();
    await page.click('button:has-text("Run Prediction")');

    // 5. Wait for Prediction Result
    // The frontend should display "Diagnosis Result"
    await expect(page.locator('text=Diagnosis Result')).toBeVisible({ timeout: 10000 });
    
    // It should render either Normal or Pneumonia and a percentage
    const resultTitle = page.locator('h3', { hasText: /(Normal|Pneumonia)/ });
    await expect(resultTitle).toBeVisible();
    
    const confidenceRegex = /[0-9]{1,3}\.[0-9]%/;
    const confidenceText = page.locator('p', { hasText: confidenceRegex });
    await expect(confidenceText).toBeVisible();

    // 6. Verify in History
    await page.goto('/history');
    await expect(page.locator('h1').first()).toContainText('History');
    
    // The history table should now exist and contain our prediction
    await expect(page.locator('table')).toBeVisible();
    
    // The first row should contain the result (Normal or Pneumonia)
    const firstRowDiagnosis = page.locator('tbody tr').first().locator('td:nth-child(2)');
    await expect(firstRowDiagnosis).toContainText(/(Normal|Pneumonia)/);
  });
});
