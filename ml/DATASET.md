# Dataset Card: PneumoniaMNIST Tiny Educational Subset

## Description
This dataset is a highly reduced subset of the [PneumoniaMNIST](https://medmnist.com/) dataset, intended strictly for educational and demonstration purposes.

## Provenance
- **Source**: MedMNIST v2
- **Original Source**: Kermany et al. (2018), "Identifying Medical Diagnoses and Treatable Diseases by Image-Based Deep Learning"
- **Task**: Binary Classification (Normal vs Pneumonia)

## Schema
- **Input**: 1-channel Grayscale image (resized to 28x28)
- **Classes**: `0` (Normal), `1` (Pneumonia)

## Limitations & Disclaimer
- **NOT FOR CLINICAL USE**: This model and dataset subset are fundamentally incapable of diagnosing real medical conditions.
- **SIZE**: It contains only 100 images per class for fast local reproducibility, rendering it statistically meaningless for real-world generalization.

## License
Creative Commons Attribution 4.0 International (CC BY 4.0).
