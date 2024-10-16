'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Upload, Building, Cpu, Award, Paintbrush, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HomeIdentifierLanding() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<{
    type: string;
    color: string;
    condition: string;
    insuranceNote: string;
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const aboutAiRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        analyzeHome()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeHome = () => {
    // Simulating API call with a timeout
    setTimeout(() => {
      const types = ['Victorian', 'Modern', 'Colonial', 'Ranch', 'Craftsman']
      const colors = ['White', 'Beige', 'Gray', 'Blue', 'Green']
      const conditions = ['Excellent', 'Good', 'Fair', 'Needs Repair']
      const insuranceNotes = [
        'Low risk, standard policy recommended',
        'Moderate risk, consider additional coverage',
        'High risk, comprehensive policy advised'
      ]
      setAnalysisResult({
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        insuranceNote: insuranceNotes[Math.floor(Math.random() * insuranceNotes.length)]
      })
    }, 2000)
  }

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about-ai' && aboutAiRef.current) {
        aboutAiRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check on initial load

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between border-b bg-white dark:bg-gray-800">
        <Link className="flex items-center justify-center" href="#">
          <div className="bg-blue-600 text-white p-2 rounded-full mr-2">
            <Home className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            HomeID
          </span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about-ai">
            About AI
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Comprehensive Home Analysis
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock insights about your home&#39;s style, color, condition, and insurance considerations with our cutting-edge AI technology.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-bold text-lg border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                  >
                    <Upload className="mr-2 h-5 w-5" /> Upload Home Image
                  </Button>
                </div>
              </div>
              {uploadedImage && (
                <div className="mt-8 space-y-4">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded home"
                    width={300}
                    height={300}
                    className="rounded-lg mx-auto shadow-lg"
                  />
                  {analysisResult ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                      <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
                      <ul className="space-y-2 text-left">
                        <li><strong>Type:</strong> {analysisResult.type}</li>
                        <li><strong>Color:</strong> {analysisResult.color}</li>
                        <li><strong>Condition:</strong> {analysisResult.condition}</li>
                        <li><strong>Insurance Note:</strong> {analysisResult.insuranceNote}</li>
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xl font-semibold animate-pulse">Analyzing image...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-gray-600 dark:text-gray-300">Simply upload a photo of your home.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                  <Cpu className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                <p className="text-gray-600 dark:text-gray-300">Our AI processes the image, identifying key features.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full mb-4">
                  <Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Identify</h3>
                <p className="text-gray-600 dark:text-gray-300">Receive a comprehensive analysis of your home.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insure</h3>
                <p className="text-gray-600 dark:text-gray-300">Get insights for insurance considerations.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Award className="h-6 w-6 text-yellow-500 mr-2" />
                    <span>Industry-leading accuracy in home analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Paintbrush className="h-6 w-6 text-yellow-500 mr-2" />
                    <span>Detailed color and condition assessment</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-6 w-6 text-yellow-500 mr-2" />
                    <span>Valuable insights for insurance considerations</span>
                  </li>
                  <li className="flex items-center">
                    <Cpu className="h-6 w-6 text-yellow-500 mr-2" />
                    <span>Advanced AI technology for comprehensive results</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://source.unsplash.com/random/800x600?house,architecture"
                  alt="Various home styles"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section ref={aboutAiRef} id="about-ai" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">About Our AI</h2>
            <div className="prose dark:prose-invert max-w-none">
              <h3>Uncovering Architectural Styles with Precision</h3>
              <p>
                At HomeID, we leverage state-of-the-art artificial intelligence to bring you insights into architectural styles like never before. Our AI technology is designed to analyze the unique features of any home, from the smallest details to overarching design principles, delivering accurate style identification in seconds.
              </p>

              <h3>How Our AI Works</h3>
              <ol>
                <li><strong>Image Processing:</strong> Our system starts by scanning the image you upload, using advanced image recognition techniques to detect key architectural elements such as roof shapes, window placements, and facade styles.</li>
                <li><strong>Data Analysis:</strong> The AI compares these elements against an extensive database of architectural styles. By identifying patterns and features, it determines the most likely architectural classification for your home.</li>
                <li><strong>Result Delivery:</strong> Within moments, you&#39;ll receive a detailed result that outlines your house&#39;s style, along with information on the historical and design characteristics of that style.</li>
              </ol>

              <h3>Why Our AI Stands Out</h3>
              <ul>
                <li><strong>High Accuracy:</strong> Our AI is trained on thousands of images and architectural data points, achieving industry-leading accuracy in identifying house styles across diverse regions and periods.</li>
                <li><strong>Comprehensive Style Database:</strong> From classic Victorian to modern minimalist, our database covers a wide range of architectural styles, ensuring your home&#39;s unique style is recognized.</li>
                <li><strong>Constant Learning:</strong> The AI continually improves as it processes more images, adapting to new trends and styles in architecture. This makes it a robust tool for both historical architecture and modern designs.</li>
              </ul>

              <h3>Technology Behind the Scenes</h3>
              <p>
                Our AI uses a blend of machine learning algorithms, including convolutional neural networks (CNNs) for image recognition and classification, and natural language processing (NLP) for data enrichment. By combining these technologies, our system delivers fast, reliable, and detailed insights about architectural styles, creating a seamless experience for users.
              </p>

              <h3>Privacy & Security</h3>
              <p>
                We take your privacy seriously. Any image you upload is processed securely and is not stored or shared without your consent. Our AI ensures that your data remains private and protected, while still delivering cutting-edge results.
              </p>

              <h3>Meet the Team</h3>
              <p>
                Our AI has been developed by a dedicated team led by Raghavan Srinivas and Rohit Naidu. With years of experience in their respective fields, they have built a tool that not only identifies architectural styles but also educates users on the rich history and diversity of home design.
              </p>

              <h3>Ready to Explore?</h3>
              <p>
                Discover the style behind your home today with HomeID. Whether you&#39;re a homeowner, architect, or design enthusiast, our AI offers a quick and easy way to learn more about architecture.
              </p>
            
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 HomeID. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}