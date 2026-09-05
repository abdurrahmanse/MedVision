export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About MedVision</h1>
      
      <section className="bg-white p-8 rounded-lg shadow-sm border mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Project</h2>
        <p className="text-gray-700 mb-4">
          MedVision is an end-to-end Machine Learning project built as an educational demonstration. 
          It illustrates the full lifecycle of a computer vision product: from data exploration and model training in PyTorch, 
          to building a FastAPI backend with PostgreSQL, all the way to this Next.js frontend.
        </p>
        <p className="text-gray-700">
          The dataset used is a tiny 100-image subset from MedMNIST (specifically the PneumoniaMNIST subset), 
          intended purely to demonstrate technical plumbing rather than create a robust clinical tool.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">Disclaimer</h2>
        <p className="text-gray-700 font-medium">
          This system is completely unfit for medical diagnosis. It is trained on an artificially small dataset 
          for educational purposes. Do not use this application to make healthcare decisions.
        </p>
      </section>
    </div>
  );
}
