import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WaitlistForm from "@/components/ui/waitlist-form";
import FeatureCard from "@/components/feature-card";
import TestimonialCard from "@/components/testimonial-card";
import PricingCard from "@/components/pricing-card";
import { Button } from "@/components/ui/button";
import { BarChart, GraduationCap, AlertTriangle, PieChart, Lightbulb, Shield, Users } from "lucide-react";
import BuddySystem from "@/components/buddy-system"; // Import the new component
import { FeedbackVisualization } from '../components/feedback-visualization'; // Added import


const Home = () => {
  // Scroll to the section if the URL has a hash on initial load
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  const features = [
    {
      icon: BarChart,
      title: "User Activity Dashboard",
      description: "Comprehensive visualizations of how employees interact with new technology, allowing you to spot trends and patterns."
    },
    {
      icon: GraduationCap,
      title: "Proficiency Assessment",
      description: "Individual metrics to gauge user competence with specific features and workflows, highlighting areas for improvement."
    },
    {
      icon: AlertTriangle,
      title: "Struggle Point Identification",
      description: "Automatically detect where users consistently encounter difficulties, allowing for targeted interventions."
    },
    {
      icon: PieChart,
      title: "Adoption Analytics",
      description: "Measure technology adoption rates across your organization with clear metrics and visualizations."
    },
    {
      icon: Lightbulb,
      title: "Training Recommendations",
      description: "AI-powered suggestions for targeted training based on actual usage patterns and identified skill gaps."
    },
    {
      icon: Shield,
      title: "Privacy-Focused Monitoring",
      description: "Track only feature usage and technology interaction, never personal data or content. Keep employee trust intact."
    }
  ];

  const testimonials = [
    {
      rating: 5,
      content: "InsightAdopt has transformed our technology rollout process. We can now see exactly where users need help and provide targeted training. This has cut our support tickets by 40%.",
      author: {
        initials: "JD",
        name: "Jane Doe",
        title: "CIO, Global Tech Solutions"
      }
    },
    {
      rating: 5,
      content: "The privacy-focused approach was key for us. Our employees feel comfortable knowing we're only tracking feature usage, not personal data, and this has led to higher adoption rates overall.",
      author: {
        initials: "MS",
        name: "Michael Smith",
        title: "IT Director, Healthcare Systems"
      }
    },
    {
      rating: 4.5,
      content: "The visualizations and department comparisons have been invaluable for reporting to executive leadership. We can now show clear ROI on our technology investments.",
      author: {
        initials: "AR",
        name: "Amanda Rodriguez",
        title: "Digital Transformation Lead, Retail Inc."
      }
    }
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "$49",
      description: "Perfect for small teams just getting started with new technology rollouts.",
      features: [
        "Up to 50 users",
        "Basic analytics dashboard",
        "Weekly reports",
        "Email support"
      ],
      ctaText: "Join Waitlist",
      ctaLink: "#waitlist"
    },
    {
      title: "Professional",
      price: "$99",
      description: "Ideal for growing organizations with multiple technology initiatives.",
      features: [
        "Up to 250 users",
        "Advanced analytics & reporting",
        "Department comparisons",
        "Training recommendations",
        "Priority support"
      ],
      ctaText: "Join Waitlist",
      ctaLink: "#waitlist",
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex technology environments.",
      features: [
        "Unlimited users",
        "Custom integrations",
        "Advanced security features",
        "Dedicated account manager",
        "24/7 phone & email support"
      ],
      ctaText: "Contact Sales",
      ctaLink: "#contact"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-neutral sm:text-5xl md:text-6xl">
                  <span className="block">Smart User Adoption</span>
                  <span className="block text-primary">Analytics Platform</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Monitor employee technology adoption, identify struggling users, and deliver targeted training recommendations - all while respecting privacy.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Button asChild size="lg">
                      <a href="#waitlist">Get Early Access</a>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button asChild variant="outline" size="lg">
                      <a href="/dashboard">See Demo</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1"></div>
              <div className="flex-1 w-full bg-gray-50"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <img 
                className="relative rounded-lg shadow-lg" 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Analytics dashboard preview" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-neutral sm:text-4xl">
              Everything you need to boost technology adoption
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides comprehensive tools to monitor, analyze and improve how your employees interact with new technology.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-neutral sm:text-4xl">
              Powerful insights at your fingertips
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our intuitive dashboard makes it easy to monitor adoption, identify training needs, and drive technology ROI.
            </p>
          </div>

          <div className="mb-8">
  <h2 className="text-2xl font-bold mb-4">User Feedback Analysis</h2>
  <FeedbackVisualization />
</div>
<div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Buddy System Feature */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-neutral mb-4">Buddy System</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="h-24 w-24 text-primary" />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Connect experienced users with newcomers to facilitate smoother technology adoption through peer learning and support.
                </p>
              </div>
            </div>
            {/* Dashboard Preview Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-neutral mb-4">User Activity Overview</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="User activity dashboard" 
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Track active users, feature usage, and adoption trends across your organization with customizable date ranges.
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-neutral mb-4">Department Comparison</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Department comparison chart" 
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Compare adoption rates and proficiency metrics across different departments to identify areas needing additional support.
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-neutral mb-4">Training Recommendations</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Training recommendations" 
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  AI-powered suggestions for targeted training based on actual usage patterns and identified skill gaps.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild>
              <a href="/dashboard">See Full Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-3xl font-extrabold text-neutral sm:text-4xl sm:tracking-tight">
              Trusted by IT leaders
            </p>
          </div>
          <div className="mt-12">
            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  rating={testimonial.rating}
                  content={testimonial.content}
                  author={testimonial.author}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buddy System Section */}
      <BuddySystem/>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Pricing</h2>
            <p className="mt-1 text-3xl font-extrabold text-neutral sm:text-4xl sm:tracking-tight">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
              We're currently finalizing our pricing structure for launch. Join the waitlist to be notified about our special early adopter rates.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-neutral sm:text-4xl">
              Be the first to know when we launch
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Join our waitlist to get early access and exclusive launch offers. No spam, just important updates about Adaptify.
            </p>
            <WaitlistForm />
            <p className="mt-3 text-sm text-gray-500">
              We care about your data. Read our 
              <a href="#" className="font-medium text-primary underline ml-1">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your technology ROI?</span>
            <span className="block text-blue-200">Get started with InsightAdopt today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button asChild variant="secondary">
                <a href="#waitlist">Join Waitlist</a>
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
                <a href="/dashboard">See Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;