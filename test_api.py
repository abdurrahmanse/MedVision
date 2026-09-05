import requests
with open('test.jpg', 'rb') as f:
    res = requests.post('http://127.0.0.1:8000/api/v1/predictions', files={'image': f})
    print(res.status_code)
    print(res.text)
