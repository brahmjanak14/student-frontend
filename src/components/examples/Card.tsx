import Card from '../Card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function CardExample() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Card Component Examples</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Card */}
          <Card title="Basic Card" subtitle="Simple card with title and subtitle">
            <p className="text-gray-600">This is a basic card component with standard styling.</p>
          </Card>

          {/* Eligibility Result Cards */}
          <Card title="Eligible" className="border-green-200 bg-green-50" hover>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Congratulations!</p>
                <p className="text-sm text-green-600">85% Probability Score</p>
              </div>
            </div>
            <p className="text-green-700 text-sm">You meet the basic requirements for Canada study visa.</p>
          </Card>

          <Card title="Not Eligible" className="border-red-200 bg-red-50" hover>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">Requirements Not Met</p>
                <p className="text-sm text-red-600">45% Probability Score</p>
              </div>
            </div>
            <p className="text-red-700 text-sm">Some requirements need improvement before applying.</p>
          </Card>

          <Card title="Under Review" className="border-yellow-200 bg-yellow-50" hover>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">Needs Assessment</p>
                <p className="text-sm text-yellow-600">65% Probability Score</p>
              </div>
            </div>
            <p className="text-yellow-700 text-sm">Additional documentation may be required.</p>
          </Card>

          {/* Form Card */}
          <Card title="Contact Information" padding="md" className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter your email" />
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card padding="md" className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-gray-600 font-medium">Students Assessed</p>
          </Card>
        </div>
      </div>
    </div>
  );
}