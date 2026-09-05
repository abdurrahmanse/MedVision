import traceback
import sys

def mock_rich(e_str):
    if "[" in e_str:
        print("Markup error!")

