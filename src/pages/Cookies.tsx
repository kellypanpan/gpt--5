import { SEOHead } from "@/components/SEOHead";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Shield, BarChart3, Wrench } from "lucide-react";

const Cookies = () => {
  const lastUpdated = "January 1, 2024";
  
  return (
    <Layout>
      <SEOHead 
        title="Cookie Policy - GPT-5 AI"
        description="Learn about how GPT-5 AI uses cookies and similar technologies. Manage your cookie preferences and understand data collection."
        keywords="cookie policy, cookies, tracking, data collection, preferences"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Cookie className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">Cookie Policy</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                How we use cookies and similar technologies
              </p>
              <Badge variant="outline" className="mt-2">
                Last updated: {lastUpdated}
              </Badge>
            </div>

            <div className="space-y-8">

              {/* Quick Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Quick Summary</h3>
                      <p className="text-sm text-blue-700 mb-3">
                        We use cookies to make our service work better for you. Essential cookies are required for basic functionality, 
                        while optional cookies help us improve your experience and understand how you use our service.
                      </p>
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Cookie Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What are Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us remember your preferences, keep you signed in, and understand how you use our service.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Similar Technologies We Use</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Local Storage:</strong> Browser storage for your preferences and settings</li>
                      <li><strong>Session Storage:</strong> Temporary storage that expires when you close your browser</li>
                      <li><strong>Web Beacons:</strong> Small tracking pixels in emails and web pages</li>
                      <li><strong>Analytics Scripts:</strong> Code that helps us understand website usage</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Types of Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Essential Cookies */}
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      <h4 className="font-semibold text-red-700">Essential Cookies (Required)</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies are necessary for our website to function properly. You cannot disable them.
                    </p>
                    <div className="grid gap-2">
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Authentication Cookies</div>
                        <div className="text-gray-600">Keep you signed in to your account</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: Session or 30 days</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Security Cookies</div>
                        <div className="text-gray-600">Protect against fraud and security threats</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: Session</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Load Balancing</div>
                        <div className="text-gray-600">Direct your requests to the right servers</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: Session</div>
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold text-blue-700">Functional Cookies (Optional)</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies enhance your experience by remembering your preferences.
                    </p>
                    <div className="grid gap-2">
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Language Preferences</div>
                        <div className="text-gray-600">Remember your preferred language</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 1 year</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">UI Preferences</div>
                        <div className="text-gray-600">Remember sidebar state and layout preferences</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 6 months</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Chat History</div>
                        <div className="text-gray-600">Store your recent conversations locally</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 30 days</div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold text-green-700">Analytics Cookies (Optional)</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies help us understand how you use our service so we can improve it.
                    </p>
                    <div className="grid gap-2">
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Google Analytics</div>
                        <div className="text-gray-600">Track website usage and performance</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 26 months</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Feature Usage</div>
                        <div className="text-gray-600">Understand which features are most popular</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 1 year</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="font-medium">Error Tracking</div>
                        <div className="text-gray-600">Help us identify and fix technical issues</div>
                        <div className="text-xs text-gray-500 mt-1">Duration: 30 days</div>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Third-Party Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Some cookies are set by third-party services we use to provide our service:
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Google Services</h4>
                        <Badge variant="outline">Analytics</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Google Analytics, OAuth authentication, and other Google services
                      </p>
                      <a 
                        href="https://policies.google.com/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Google Privacy Policy →
                      </a>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Supabase</h4>
                        <Badge variant="outline">Authentication</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Database and authentication services
                      </p>
                      <a 
                        href="https://supabase.com/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Supabase Privacy Policy →
                      </a>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Creem</h4>
                        <Badge variant="outline">Payments</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Payment processing and subscription management
                      </p>
                      <a 
                        href="https://creem.io/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Creem Privacy Policy →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Managing Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Managing Your Cookie Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Browser Settings</h4>
                    <p className="text-sm mb-3">
                      You can control cookies through your browser settings. However, disabling essential cookies may affect site functionality.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                      </div>
                      <div>
                        <strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data
                      </div>
                      <div>
                        <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                      </div>
                      <div>
                        <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Our Cookie Preferences</h4>
                    <p className="text-sm mb-3">
                      Use our cookie preference center to control which optional cookies we use:
                    </p>
                    
                    <Button variant="outline" className="w-full md:w-auto">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Cookie Preferences
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Opt-Out Links</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a 
                          href="https://tools.google.com/dlpage/gaoptout" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Google Analytics Opt-out →
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://optout.aboutads.info/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Digital Advertising Alliance Opt-out →
                        </a>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Cookie Consent */}
              <Card>
                <CardHeader>
                  <CardTitle>Cookie Consent and Legal Basis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Legal Basis for Cookie Use</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Essential Cookies:</strong> Legitimate interest (necessary for service provision)</li>
                      <li><strong>Functional Cookies:</strong> Your consent (can be withdrawn anytime)</li>
                      <li><strong>Analytics Cookies:</strong> Your consent (can be withdrawn anytime)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Consent Management</h4>
                    <p className="text-sm">
                      When you first visit our website, we'll ask for your consent to use optional cookies. 
                      You can change your preferences anytime using the cookie settings button or by contacting us.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cookie Notice</h4>
                    <p className="text-sm">
                      We display a cookie banner when you first visit our site. By continuing to use our service 
                      after seeing this notice, you consent to our use of cookies as described in this policy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    Some of our third-party cookie providers may transfer your data to countries outside your jurisdiction. 
                    These transfers are protected by:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Standard Contractual Clauses approved by data protection authorities</li>
                    <li>Adequacy decisions from the European Commission</li>
                    <li>Certification schemes like Privacy Shield successors</li>
                    <li>Your explicit consent for specific transfers</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Cookie Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    We may update this cookie policy to reflect changes in our practices or applicable laws. 
                    When we make material changes, we will:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Update the "Last updated" date at the top of this policy</li>
                    <li>Display a prominent notice on our website</li>
                    <li>Send you an email notification if you have an account</li>
                    <li>Request renewed consent for any new cookie types</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Contact Us About Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    If you have questions about our use of cookies or want to exercise your rights:
                  </p>
                  
                  <div className="grid gap-2 text-sm">
                    <div><strong>Email:</strong> <a href="mailto:privacy@gpt-5ai.com" className="text-blue-600 hover:underline">privacy@gpt-5ai.com</a></div>
                    <div><strong>Data Protection Officer:</strong> <a href="mailto:dpo@gpt-5ai.com" className="text-blue-600 hover:underline">dpo@gpt-5ai.com</a></div>
                    <div><strong>Subject Line:</strong> "Cookie Policy Inquiry"</div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    This cookie policy is effective as of {lastUpdated} and applies to all users of GPT-5 AI services.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;