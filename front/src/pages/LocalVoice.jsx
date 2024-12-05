import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { PenTool, Users, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@/context/AuthContext"; // Assuming you have this for authentication context

export default function LocalVoice() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  // State for holding user input in the form
  const [article, setArticle] = useState({
    title: '',
    content: '',
    categories: [''], // Start with one input field for category
    imageUrls: [''], // Start with one input field for image
    videoUrls: [''], // Start with one input field for video
  });

  // Function to handle input changes for dynamic fields
  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    setArticle((prev) => {
      const updatedValues = [...prev[type]];
      updatedValues[index] = value;
      return { ...prev, [type]: updatedValues };
    });
  };

  // Function to add new input fields for categories, images, and videos
  const addInputField = (type) => {
    setArticle((prev) => {
      const newValues = [...prev[type], ''];
      return { ...prev, [type]: newValues };
    });
  };

  // Function to remove input fields for categories, images, and videos
  const removeInputField = (type, index) => {
    setArticle((prev) => {
      const newValues = prev[type].filter((_, i) => i !== index);
      return { ...prev, [type]: newValues };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle article submission
    console.log("Article Submitted", article);
    // You can integrate with an API to submit the article
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup'); // Adjust path based on your routes
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ShareVoice - Publish Your Voice</h1>

        <div className="prose prose-lg mb-12">
          <p className="text-xl text-muted-foreground">
            Welcome to LocalVoice, a platform where local voices are heard. Share your thoughts, news, and insights with your community.
          </p>
        </div>

        {/* Content creation form for logged-in users */}
        {authUser ? (
          <div className="grid md:grid-cols-1 gap-8 mb-16">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Create Your Article</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={article.title}
                      onChange={(e) => handleInputChange(e, 0, 'title')}
                      className="w-full p-3 border rounded-md"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      name="content"
                      value={article.content}
                      onChange={(e) => handleInputChange(e, 0, 'content')}
                      className="w-full p-3 border rounded-md"
                      placeholder="Write your article content here"
                      rows={6}
                    />
                  </div>

                  {/* Dynamic Category URL Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Categories</label>
                    {article.categories.map((category, index) => (
                      <div key={index} className="mb-3 flex items-center space-x-2">
                        <input
                          type="text"
                          name="categories"
                          value={category}
                          onChange={(e) => handleInputChange(e, index, 'categories')}
                          className="w-full p-3 border rounded-md"
                          placeholder="Enter category"
                        />
                        {article.categories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInputField('categories', index)}
                            className="text-red-500"
                          >
                            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => addInputField('categories')}
                      className="flex items-center space-x-2"
                    >
                      <MdAddCircleOutline className="w-6 h-6" />
                      <span>Add Category</span>
                    </Button>
                  </div>

                  {/* Dynamic Image URL Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URLs</label>
                    {article.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="mb-3 flex items-center space-x-2">
                        <input
                          type="url"
                          name="imageUrls"
                          value={imageUrl}
                          onChange={(e) => handleInputChange(e, index, 'imageUrls')}
                          className="w-full p-3 border rounded-md"
                          placeholder="Enter image URL"
                        />
                        {article.imageUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInputField('imageUrls', index)}
                            className="text-red-500"
                          >
                            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => addInputField('imageUrls')}
                      className="flex items-center space-x-2"
                    >
                      <MdAddCircleOutline className="w-6 h-6" />
                      <span>Add Image</span>
                    </Button>
                  </div>

                  {/* Dynamic Video URL Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URLs</label>
                    {article.videoUrls.map((videoUrl, index) => (
                      <div key={index} className="mb-3 flex items-center space-x-2">
                        <input
                          type="url"
                          name="videoUrls"
                          value={videoUrl}
                          onChange={(e) => handleInputChange(e, index, 'videoUrls')}
                          className="w-full p-3 border rounded-md"
                          placeholder="Enter video URL"
                        />
                        {article.videoUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInputField('videoUrls', index)}
                            className="text-red-500"
                          >
                            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => addInputField('videoUrls')}
                      className="flex items-center space-x-2"
                    >
                      <MdAddCircleOutline className="w-6 h-6" />
                      <span>Add Video</span>
                    </Button>
                  </div>

                  <Button type="submit" className="w-full">Publish Article</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6">
              Only registered users can publish articles. Join our platform and be part of the local voice revolution.
            </p>
            <Button size="lg" onClick={handleNavigateToSignUp}>Get Started Today</Button>
          </div>
        )}

        {/* Information about the platform */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <PenTool className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Create Content</h3>
              <p>
                Share your local insights, stories, and news with the community. It’s a place for everyone to be heard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Community</h3>
              <p>
                A vibrant community where voices are united for a cause—promoting truth and transparency in news.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
