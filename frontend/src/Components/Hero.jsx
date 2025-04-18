import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-green-700 to-green-900 text-white">
      <div className="text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Stars of Nigeria Films Entertainment
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Join our community of talented artists and creators
        </p>
        <Link 
          to="/signup" 
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Hero;