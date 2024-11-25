
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-purple-700 via-indigo-800 to-black text-white font-sans">
   
      <header className="w-full h-[90vh] flex flex-col items-center justify-center text-center px-6 sm:px-16">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
          Build Secure <span className="text-yellow-400">RBAC Systems</span>
        </h1>
        <p className="text-lg sm:text-xl mt-4 text-gray-300 max-w-3xl">
          Simplify your role-based access control workflows with DevOps-inspired
          tools. Secure, scalable, and intuitive.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#features"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-white rounded-full shadow-lg hover:bg-white hover:text-black transition"
          >
            Learn More
          </a>
        </div>
      </header>

     
      <section id="features" className="w-full py-20 px-8 bg-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Secure</h3>
            <p className="text-gray-400">
              Implement enterprise-level security with seamless role-based
              controls.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Scalable</h3>
            <p className="text-gray-400">
              Designed to grow with your applications, ensuring reliable
              performance.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">User-Friendly</h3>
            <p className="text-gray-400">
              Intuitive interfaces to simplify RBAC management for all teams.
            </p>
          </div>
        </div>
      </section>

     
      <footer className="w-full bg-gray-900 py-6 text-center">
        <p className="text-sm text-gray-500">
          © 2024 RBAC
        </p>
      </footer>
    </div>
  );
}
