import { Link, useLocation } from "wouter";
import { ChevronDown, Phone } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [location] = useLocation();

  const navItems = [
    { label: "Study Abroad", path: "/study-abroad", hasDropdown: true },
    { label: "Test Prep", path: "/test-prep", hasDropdown: true },
    { label: "Services", path: "/services", hasDropdown: true },
    { label: "Finance", path: "/finance", hasDropdown: true },
    { label: "More", path: "/more", hasDropdown: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-lg px-2 py-1" data-testid="link-home">
            <img 
              src="/attached_assets/pratham-international_1758821006563.png" 
              alt="Pratham International" 
              className="h-8 w-auto"
            />
            <span className="font-poppins font-semibold text-primary text-lg hidden md:block">
              Pratham International
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary px-2 py-2 ${
                  location === item.path 
                    ? "text-primary font-semibold" 
                    : "text-gray-700"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
          </div>

          {/* Right Side - Phone & CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+91 9876543210</span>
            </div>
            <Link 
              href="/eligibility" 
              className="bg-green-600 text-white hover-elevate active-elevate-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-md hover:bg-green-700"
              data-testid="button-get-started"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}