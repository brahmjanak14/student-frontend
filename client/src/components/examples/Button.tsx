import Button from '../Button';
import { ArrowRight, Download, Share2, Phone, Mail } from 'lucide-react';

export default function ButtonExample() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Button Component Examples</h2>
        
        <div className="space-y-8">
          {/* Variants */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="gradient">Gradient Button</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-xl font-semibold mb-4">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Start Assessment
              </Button>
              <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                Download PDF
              </Button>
              <Button variant="secondary" icon={<Share2 className="w-4 h-4" />}>
                Share Report
              </Button>
              <Button variant="ghost" icon={<Phone className="w-4 h-4" />}>
                Call Us
              </Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-xl font-semibold mb-4">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button loading>Loading...</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Full Width</h3>
            <div className="max-w-md">
              <Button fullWidth variant="gradient" size="lg" icon={<Mail className="w-5 h-5" />}>
                Get Full Eligibility Report
              </Button>
            </div>
          </div>

          {/* Interactive Demo */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Interactive Demo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => console.log('Primary button clicked')}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Check Eligibility
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => console.log('Secondary button clicked')}
                icon={<Phone className="w-5 h-5" />}
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}