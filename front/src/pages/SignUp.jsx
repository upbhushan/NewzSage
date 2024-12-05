import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Importing the Auth Context
import { Checkbox } from "../components/ui/checkbox"; // Importing Checkbox from Shadcn

export default function SignUp() {
  const { refreshAuthUser } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    government_id: '', // New field for government ID
    includeGovernmentId: false, // Checkbox state
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext(); // Accessing setAuthUser from the context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log('Updated formData:', { ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      includeGovernmentId: !prev.includeGovernmentId,
    }));
    // console.log('Include Government ID:', !formData.includeGovernmentId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      if (formData.includeGovernmentId) {
        payload.government_id = formData.government_id;
      }

      // console.log('Submitting payload:', payload);

      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // console.log('API Response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);

        refreshAuthUser();

        // Decode the token to extract user information
        const decodedToken = jwtDecode(data.token);

        setAuthUser({
          id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
        });

        navigate('/landingpage'); // Redirect to dashboard after successful signup
      } else {
        setError(data.message || 'Sign up failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeGovernmentId"
                  checked={formData.includeGovernmentId}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="includeGovernmentId">Provide Government ID</Label>
              </div>

              {formData.includeGovernmentId && (
                <div className="space-y-2">
                  <Label htmlFor="government_id">Government ID</Label>
                  <Input
                    id="government_id"
                    name="government_id"
                    type="text"
                    required={formData.includeGovernmentId}
                    value={formData.government_id}
                    onChange={handleInputChange}
                    className="block w-full"
                  />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-black hover:bg-gray-800">
                Sign Up
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <Link to="/signin" className="px-2 bg-white text-gray-500 hover:text-blue-500">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
