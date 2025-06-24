import React from 'react';
import { MessageCircle, Mail, LifeBuoy, BookOpen } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const helpItems = [
    {
      icon: MessageCircle,
      title: "Account & Access",
      description: "Having trouble logging in or verifying your college ID? We’re here to sort it out quickly.",
    },
    {
      icon: LifeBuoy,
      title: "Facing a Bug?",
      description: "Found something not working as it should? Let us know so we can squash it fast.",
    },
    {
      icon: Mail,
      title: "Suggestions & Feedback",
      description: "Got ideas to improve CampusConnect? We’d love to hear from you.",
    },
    {
      icon: BookOpen,
      title: "Policies & Privacy",
      description: "Understand how we protect your data and what you agree to when using our platform.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600">Help Center</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Stuck somewhere? Whether it's a bug, a login issue, or just feedback — we’ve got your back.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {helpItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-sm text-gray-500">
          For urgent issues, reach us at{' '}
          <a href="mailto:support@campusconnect.app" className="text-primary-600 underline">
            support@campusconnect.app
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
