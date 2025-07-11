import React from 'react';
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  CreditCard, 
  Clock,
  Shield,
  Smartphone,
  TrendingUp
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Order Management",
    description: "Streamline orders from multiple channels with real-time tracking and automated workflows.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Gain insights with comprehensive reports on sales, inventory, and customer behavior.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer Management",
    description: "Build stronger relationships with customer profiles, loyalty programs, and feedback tracking.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Inventory Control",
    description: "Never run out of supplies with automated stock monitoring and supplier integration.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payment Processing",
    description: "Accept all payment methods with secure, fast transactions and automated receipts.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Staff Scheduling",
    description: "Optimize workforce with intelligent scheduling, time tracking, and performance metrics.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security & Compliance",
    description: "Enterprise-grade security with PCI compliance and data protection standards.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile App",
    description: "Manage your cafe on-the-go with our intuitive mobile application for iOS and Android.",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Growth Analytics",
    description: "Identify growth opportunities with predictive analytics and market trend analysis.",
    color: "from-amber-500 to-amber-600"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Grow Your Cafe
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From small coffee shops to large cafe chains, our comprehensive platform adapts to your business needs
            and scales with your growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-amber-200"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Cafe?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful cafe owners who have streamlined their operations with CafeFlow.
              Start your free trial today!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Free 14-Day Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
