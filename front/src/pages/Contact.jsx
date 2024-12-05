import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import emailjs from 'emailjs-com'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "@/context/AuthContext";

export default function Contact() {
    
  const { authUser } = useAuthContext();
  const isAuthenticated = authUser ? true : false; // Adjusting based on the authUser state
    const navigate = useNavigate();

    const handleNavigateToSignUp = () => {
      navigate('/'); // Adjust the path to match your routes
    };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)
    setSuccessMessage('')
    setErrorMessage('')

    // Replace these with your own EmailJS IDs
    const serviceID = 'service_j35199l'
    const templateID = 'template_6tj9ob5'
    const userID = 'your_user_id'

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (response) => {
          setIsSending(false)
          setSuccessMessage('Your message has been sent successfully!')
          setFormData({ name: '', email: '', subject: '', message: '' })
        },
        (error) => {
          setIsSending(false)
          setErrorMessage('Something went wrong, please try again.')
        }
      )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@newzsage.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 8625971496</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Indian Institute of Information Technology, Nagpur (IIITN) <br /> Nagpur Rd, Waranga, Maharashtra 441108</span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                </Button>
                {successMessage && (
                  <div className="mt-4 text-green-500">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="mt-4 text-red-500">{errorMessage}</div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

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
  )
}
