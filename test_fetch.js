fetch("http://localhost:8000/api/v1/health")
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
