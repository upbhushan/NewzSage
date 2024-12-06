import React from 'react';
import { FaUsers, FaThumbsUp, FaComment, FaPoll, FaShareAlt } from 'react-icons/fa'; // Icons from react-icons
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CommunityInsights = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black">Community Insights</h1>
        <p className="text-lg text-gray-600 mt-2">Explore key metrics and interactions within our community.</p>
      </header>

      {/* Community Engagement Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-xl bg-gray-200 text-black">
          <CardHeader>
            <div className="flex items-center mb-4">
              <FaUsers className="text-4xl mr-4" />
              <CardTitle className="text-2xl">Active Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Over 10,000 active users engaging with content daily.
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="shadow-xl bg-gray-200 text-black">
          <CardHeader>
            <div className="flex items-center mb-4">
              <FaThumbsUp className="text-4xl mr-4" />
              <CardTitle className="text-2xl">Likes & Reactions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Over 25,000 likes on recent articles, showing strong community support.
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="shadow-xl bg-gray-200 text-black">
          <CardHeader>
            <div className="flex items-center mb-4">
              <FaComment className="text-4xl mr-4" />
              <CardTitle className="text-2xl">Comments & Discussions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Over 5,000 comments and discussions happening every week.
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>

      {/* Polls & Feedback Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-xl bg-gray-200 text-black">
          <CardHeader>
            <div className="flex items-center mb-4">
              <FaPoll className="text-4xl mr-4" />
              <CardTitle className="text-2xl">Community Polls</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              85% of users prefer more personalized content in future updates.
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="shadow-xl bg-gray-200 text-black">
          <CardHeader>
            <div className="flex items-center mb-4">
              <FaShareAlt className="text-4xl mr-4" />
              <CardTitle className="text-2xl">Content Sharing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Over 3,000 shares per month, spreading our content across multiple platforms.
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>

      {/* Key Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-black">Key Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-100 border rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our community has seen a <strong>25%</strong> growth in the last 3 months, with most growth from international users.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="p-6 bg-gray-100 border rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Content Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Articles on technology and community building receive the highest engagement, with users interacting in a variety of ways.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-lg text-gray-600 mt-12">
        <p>© 2024 Community Insights - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default CommunityInsights;
