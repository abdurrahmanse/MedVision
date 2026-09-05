from PIL import Image, ImageStat
import sys

def is_likely_xray(img_path):
    img = Image.open(img_path).convert("RGB")
    stat = ImageStat.Stat(img)
    
    # 1. Color check (Grayscale check)
    r_mean, g_mean, b_mean = stat.mean
    color_variance = abs(r_mean - g_mean) + abs(g_mean - b_mean) + abs(b_mean - r_mean)
    print(f"Color Variance: {color_variance}")
    
    if color_variance > 15:
        return False, "Image contains too much color to be an X-ray"
        
    # 2. Contrast check (X-rays have high contrast between air and bone)
    # stddev should be reasonably high
    r_std, g_std, b_std = stat.stddev
    avg_std = (r_std + g_std + b_std) / 3
    print(f"Standard Deviation (Contrast): {avg_std}")
    
    if avg_std < 20:
        return False, "Image contrast is too low to be an X-ray (too plain)"
        
    return True, "Valid"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(is_likely_xray(sys.argv[1]))
