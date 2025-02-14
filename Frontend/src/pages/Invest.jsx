import { ArrowRight, TrendingUp, Users, Wallet, BarChart3, Building2, Rocket, HandshakeIcon, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import the pattern SVG

const InvestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-Primary/5 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-Primary/80 text-white py-20">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(/pattern.svg)`,
            backgroundSize: '40px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shape the Future of Nigerian Commerce
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join us in building Africa&apos;s most innovative digital marketplace
            </p>
            <a 
              href="mailto:invest@9jamarket.com"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:-translate-y-1"
            >
              Connect With Our Team
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Growth Stats */}
      <div className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatsCard 
            icon={TrendingUp}
            title="20%+ Growth"
            description="Annual digital economy expansion in Nigeria"
          />
          <StatsCard 
            icon={Users}
            title="Millions"
            description="Of potential users ready to embrace digital commerce"
          />
          <StatsCard 
            icon={Wallet}
            title="Multiple"
            description="Revenue streams for sustainable growth"
          />
        </div>
      </div>

      {/* Why Invest Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Invest in 9ja Market?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BarChart3}
              title="Market Growth"
              description="Tap into Nigeria's rapidly expanding digital economy"
            />
            <FeatureCard
              icon={Building2}
              title="Scalable Model"
              description="Tech-driven platform built for exponential growth"
            />
            <FeatureCard
              icon={Rocket}
              title="Innovation"
              description="AI-powered features and seamless transactions"
            />
            <FeatureCard
              icon={HandshakeIcon}
              title="Partnerships"
              description="Strategic alliances with key industry players"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-Primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Be Part of Our Story?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you&apos;re an angel investor, venture capitalist, or strategic partner,
            we&apos;d love to discuss how we can work together to transform commerce in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:invest@9jamarket.com"
              className="inline-flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-white px-6 py-3 rounded-full transition-all"
            >
              <Mail className="w-5 h-5" />
              Email Investment Team
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-Primary text-Primary hover:bg-Primary/5 px-6 py-3 rounded-full transition-all"
            >
              Schedule a Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components with PropTypes
const StatsCard = ({ icon: Icon, title, description }) => (
  <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
    <Icon className="w-12 h-12 text-Primary mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

StatsCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white border border-gray-100 hover:border-Primary/20 transition-all">
    <Icon className="w-10 h-10 text-Primary mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InvestPage; 