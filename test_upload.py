import numpy as np
from PIL import Image
img = Image.fromarray(np.random.randint(0, 255, (28, 28), dtype=np.uint8))
img.save("dummy_test.png")
