# Dataset Card: PneumoniaMNIST (MedVision Educational Subset)

> **⚠️ CRITICAL DISCLAIMER:** 
> This dataset is used strictly for **educational and engineering demonstration purposes**. It is **not** to be used for clinical diagnosis, medical research, or real-world patient treatment. The metrics derived from this project do not represent real-world medical diagnostic performance.

## Dataset Overview
- **Dataset Name:** PneumoniaMNIST
- **Source:** [MedMNIST v3](https://medmnist.com/)
- **Task:** Binary Image Classification
- **Modality:** Chest X-Ray (CXR)
- **Image Format:** 28×28 pixels, Grayscale (1 channel)
- **Labels:** 
  - `0`: Normal (No Pneumonia)
  - `1`: Pneumonia

## Provenance and Preprocessing (Official MedMNIST)
The original images were sourced from a pediatric chest X-ray dataset. MedMNIST standardizes these medical images into a highly compressed, lightweight 28×28 format to make them accessible for rapid ML experimentation without heavy computational requirements.

## Splits (Official)
MedMNIST provides the following standardized splits:
- **Train:** 4,708 samples
- **Validation:** 524 samples
- **Test:** 624 samples

*(Note: For the MedVision Tiny ML project, we will use a highly constrained 100-image reproducible subset from the training split to optimize for end-to-end engineering velocity over clinical accuracy.)*

## License and Citation
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0).
- **Citation:** 
  > Jiancheng Yang, Rui Shi, Donglai Wei, Zequan Liu, Lin Zhao, Bilian Ke, Hanspeter Pfister, Bingbing Ni. "MedMNIST v2 - A large-scale lightweight benchmark for 2D and 3D biomedical image classification". Scientific Data, 2023.

