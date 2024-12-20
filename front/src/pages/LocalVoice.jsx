import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { PenTool, Users } from 'lucide-react';
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
    categories: [''],
    images: [], // Start with an empty array for images
    videos: [], // Start with an empty array for videos
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

  // Function to handle file uploads to Cloudinary
  const uploadToCloudinary = (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset',  process.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary preset

    return fetch(process.env.VITE_CLOUDINARY_API_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        return data.secure_url; // Cloudinary URL
      })
      .catch((error) => {
        console.error('Error uploading to Cloudinary:', error);
        return null;
      });
  };

  // Function to handle file selection and upload
  const handleFileChange = async (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      const cloudinaryUrl = await uploadToCloudinary(file, type);
      if (cloudinaryUrl) {
        const updatedFiles = [...article[type]];
        updatedFiles[index] = cloudinaryUrl;
        setArticle((prev) => ({ ...prev, [type]: updatedFiles }));
      }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form data
    if (!article.title || !article.content) {
      console.error('Title and Content are required.');
      return;
    }
  
    // Prepare the payload
    const payload = {
      title: article.title,
      content: article.content,
      categories: article.categories.filter(category => category !== ''), // Remove empty categories
      imageUrls: article.images,
      videoUrls: article.videos,
    };
  
    // Add token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/v1/news/post` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting article:', errorData);
        return;
      }
  
      const responseData = await response.json();
      console.log('Article Submitted:', responseData);
  
      // Redirect after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
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
                      onChange={(e) => setArticle({ ...article, title: e.target.value })}
                      className="w-full p-3 border rounded-md"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      name="content"
                      value={article.content}
                      onChange={(e) => setArticle({ ...article, content: e.target.value })}
                      className="w-full p-3 border rounded-md"
                      placeholder="Write your article content here"
                      rows={6}
                    />
                  </div>

                  {/* Dynamic Category Fields */}
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

                  {/* Dynamic Image Upload Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    {article.images.map((image, index) => (
                      <div key={index} className="mb-3 flex items-center space-x-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, index, 'images')}
                          className="w-full p-3 border rounded-md"
                        />
                        {article.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInputField('images', index)}
                            className="text-red-500"
                          >
                            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => addInputField('images')}
                      className="flex items-center space-x-2"
                    >
                      <MdAddCircleOutline className="w-6 h-6" />
                      <span>Add Image</span>
                    </Button>
                  </div>

                  {/* Dynamic Video Upload Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Videos</label>
                    {article.videos.map((video, index) => (
                      <div key={index} className="mb-3 flex items-center space-x-2">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, index, 'videos')}
                          className="w-full p-3 border rounded-md"
                        />
                        {article.videos.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInputField('videos', index)}
                            className="text-red-500"
                          >
                            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => addInputField('videos')}
                      className="flex items-center space-x-2"
                    >
                      <MdAddCircleOutline className="w-6 h-6" />
                      <span>Add Video</span>
                    </Button>
                  </div>

                  <div className="mt-6">
                    <Button type="submit" className="w-full py-3">
                      Submit Article
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h3 className="text-xl font-semibold text-center">Please sign up to share your voice!</h3>
            <Button onClick={handleNavigateToSignUp} className="w-52 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Sign Up</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}