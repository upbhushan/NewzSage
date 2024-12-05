import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuthContext } from "@/context/AuthContext";


export default function PrivacyPolicy() {
    
  const { authUser } = useAuthContext();
  const isAuthenticated = authUser ? true : false; // Adjusting based on the authUser state
    const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/'); // Adjust the path to match your routes
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <Card>
          <CardContent className="p-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="prose prose-gray">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                  <p>
                    We collect information that you provide directly to us, including when you create an account, publish content, or interact with other users on our platform. This may include:
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Published content and interactions</li>
                    <li>Profile information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                  <p>
                    We use the collected information to:
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Provide and improve our services</li>
                    <li>Verify content authenticity</li>
                    <li>Maintain platform security</li>
                    <li>Communicate with users</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
                  <p>
                    We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. Our AI systems process data in compliance with international privacy standards.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Access your personal data</li>
                    <li>Request data correction</li>
                    <li>Delete your account</li>
                    <li>Opt-out of communications</li>
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {
            !isAuthenticated &&(
<div className="flex justify-center items-center bg-muted p-8 rounded-lg max-w-6xl mx-auto mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="mb-6">
              Be part of the movement to make news more transparent and accountable. Whether you're a publisher, fact-checker, or reader, there's a place for you in our community.
            </p>
            <Button size="lg" onClick={handleNavigateToSignUp}>Get Started Today</Button>
          </div>
        </div>
            )
        }
    </div>
  )
}

