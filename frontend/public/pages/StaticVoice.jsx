import React from 'react';
import { Button } from '@/components/ui/button';
import { MdPublish } from 'react-icons/md';
import { CheckCircle, Users, Share2, Globe } from 'lucide-react';

export default function StaticVoice() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Why Share News with LocalVoice?</h1>
        <p className="text-lg text-muted-foreground mb-12">
          LocalVoice is your platform for authentic, transparent, and impactful news sharing.
          By publishing through our platform, you contribute to a more informed community!
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Authentic Verification</h3>
            <p>
              Every piece of news shared through LocalVoice is verified by AI and community-driven voting to ensure its authenticity.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center text-center">
            <Users className="w-16 h-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Join a Global Community</h3>
            <p>
              Become part of a diverse network of readers, publishers, and fact-checkers, working together to ensure reliable journalism.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center text-center">
            <Share2 className="w-16 h-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Wide Reach</h3>
            <p>
              Your news reaches a global audience, ensuring that your voice is heard and recognized across multiple communities.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="flex flex-col items-center text-center">
            <Globe className="w-16 h-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
            <p>
              Contribute to a worldwide effort of making news more transparent and accountable, bridging information gaps across borders.
            </p>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Publish Your News?</h2>
          <p className="mb-6">
            Share your news and contribute to the movement of verified, transparent journalism.
            Join LocalVoice today and let your story be heard.
          </p>
          <Button 
            size="lg" 
            className="flex items-center justify-center gap-2" 
            onClick={() => window.location.href = '/sharevoice'}>
            <MdPublish className="w-5 h-5" /> Publish Now
          </Button>
        </div>
      </div>
    </div>
  );
}
