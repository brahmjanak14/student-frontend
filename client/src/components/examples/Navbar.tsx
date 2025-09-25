import Navbar from '../Navbar';

export default function NavbarExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Navbar Component</h2>
          <p className="text-gray-600">Glassmorphism navbar with rounded pill shape and centered navigation links</p>
        </div>
      </div>
    </div>
  );
}