import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Brain, Globe } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@/context/AuthContext";

export default function AboutUs() {
  const { authUser } = useAuthContext();
  const isAuthenticated = authUser ? true : false; // Adjusting based on the authUser state
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/'); // Adjust the path to match your routes
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About NewzSage</h1>

        <div className="prose prose-lg mb-12">
          <p className="lead text-xl text-muted-foreground">
            NewzSage is revolutionizing the way we consume and verify news, combining the power of AI with community insight to ensure authenticity in journalism.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <Shield className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p>
                To create a trusted platform where authentic voices can be heard and verified, empowering communities with reliable information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Community</h3>
              <p>
                A diverse network of local publishers, fact-checkers, and engaged readers working together to promote truthful journalism.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Brain className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
              <p>
                State-of-the-art machine learning models that analyze and verify news content, providing accuracy probability scores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Globe className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              <p>
                Making verified news accessible to everyone, bridging information gaps across communities worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Display Join Our Mission only when the user is not authenticated */}
        {!isAuthenticated && (
          <div className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="mb-6">
              Be part of the movement to make news more transparent and accountable. Whether you're a publisher, fact-checker, or reader, there's a place for you in our community.
            </p>
            <Button size="lg" onClick={handleNavigateToSignUp}>Get Started Today</Button>
          </div>
        )}
        
      </div>
    </div>
  );
}
