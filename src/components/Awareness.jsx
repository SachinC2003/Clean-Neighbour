import React from 'react';

const Awareness = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <header className="bg-blue-500 text-white py-4 w-full">
        <h1 className="text-3xl text-center font-bold">Garbage Cleaning Awareness</h1>
      </header>
      <main className="container mx-auto py-8">
        <section className="text-lg text-gray-800 ml-10">
          <p className='ml-10'>Welcome to our website dedicated to raising awareness about garbage cleaning.</p>
          <p className="mt-4"><strong>1. Why It Matters:</strong> Garbage cleaning isn't just about tidying up our surroundings; it's about safeguarding our planet. Proper waste management helps prevent pollution, protects wildlife, and preserves natural resources for future generations.</p>
          <p className="mt-4"><strong>2. Impact of Improper Disposal:</strong> When garbage isn't disposed of properly, it can end up in our oceans, rivers, and forests, causing harm to marine life and ecosystems. Landfills emit harmful greenhouse gases, contributing to climate change.</p>
          <p className="mt-4"><strong>3. Reduce, Reuse, Recycle:</strong> The mantra of waste management! By reducing our consumption, reusing items whenever possible, and recycling materials, we can minimize the amount of waste sent to landfills and conserve resources.</p>
          <p className="mt-4"><strong>4. Community Action:</strong> Everyone can play a role in garbage cleaning efforts. Participate in local cleanup events, properly sort your waste for recycling, and advocate for sustainable practices in your community.</p>
          <p className="mt-4"><strong>5. Educational Resources:</strong> Explore our website for more in-depth articles, tips, and resources on garbage cleaning, recycling, and environmental conservation. Together, let's work towards a cleaner and healthier planet!</p>
        </section>
      </main>
      <footer className="bg-gray-300 text-gray-600 text-center py-4">
        <p>&copy; 2024 Garbage Cleaning Awareness</p>
      </footer>
    </div>
  );
};

export default Awareness;