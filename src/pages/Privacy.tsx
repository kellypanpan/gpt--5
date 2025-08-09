import { SEOHead } from "@/components/SEOHead";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Download, Trash2, Mail } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "January 1, 2024";
  
  return (
    <Layout>
      <SEOHead 
        title="Privacy Policy - GPT-5 AI"
        description="Learn how GPT-5 AI collects, uses, and protects your personal information. Comprehensive privacy policy covering data collection, cookies, and your rights."
        keywords="privacy policy, data protection, GDPR, personal information, cookies"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                How we collect, use, and protect your information
              </p>
              <Badge variant="outline" className="mt-2">
                Last updated: {lastUpdated}
              </Badge>
            </div>

            <div className="space-y-8">
              
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    GPT-5 AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                    This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit 
                    our website <strong>gpt-5ai.com</strong> and use our AI-powered services.
                  </p>
                  <p className="font-semibold text-primary">
                    By using our services, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Account Information:</strong> Email address, name, profile picture (when you sign up via Google/GitHub)</li>
                      <li><strong>Payment Information:</strong> Billing details processed securely through our payment processor (Creem)</li>
                      <li><strong>Communication Data:</strong> Messages you send through our chat interface</li>
                      <li><strong>Profile Data:</strong> Subscription status, usage preferences, and account settings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Usage Data:</strong> Pages visited, features used, time spent on our platform</li>
                      <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
                      <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
                      <li><strong>Cookies:</strong> Session data, preferences, and analytics information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Your Information */}
              <Card>
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Service Provision</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Provide AI chat and tool services</li>
                        <li>• Process your requests and conversations</li>
                        <li>• Manage your account and subscriptions</li>
                        <li>• Send service-related notifications</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Platform Improvement</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Analyze usage patterns and trends</li>
                        <li>• Improve our AI models and responses</li>
                        <li>• Enhance user experience</li>
                        <li>• Prevent fraud and abuse</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    We <strong>do not sell</strong> your personal information. We may share your information only in these limited circumstances:
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Service Providers</h4>
                      <p className="text-sm text-muted-foreground">
                        Trusted third-party services that help us operate our platform (authentication, payments, analytics)
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Legal Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        When required by law, court order, or government request
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold">Business Transfers</h4>
                      <p className="text-sm text-muted-foreground">
                        In connection with a merger, acquisition, or sale of assets (with prior notice)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Encryption:</strong> Data encrypted in transit and at rest</li>
                      <li>• <strong>Access Controls:</strong> Limited access on need-to-know basis</li>
                      <li>• <strong>Regular Audits:</strong> Security assessments and updates</li>
                    </ul>
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Secure Infrastructure:</strong> SOC 2 compliant hosting</li>
                      <li>• <strong>Data Backups:</strong> Regular, encrypted backups</li>
                      <li>• <strong>Incident Response:</strong> Protocols for security breaches</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights (GDPR) */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Privacy Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Under GDPR and other privacy laws, you have the following rights:
                  </p>
                  
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Download className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Access & Portability</h4>
                        <p className="text-sm text-muted-foreground">Request a copy of your personal data in a portable format</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Trash2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Deletion</h4>
                        <p className="text-sm text-muted-foreground">Request deletion of your personal data (subject to legal requirements)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Rectification & Objection</h4>
                        <p className="text-sm text-muted-foreground">Correct inaccurate data or object to certain processing activities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border">
                    <p className="text-sm">
                      <strong>To exercise your rights:</strong> Contact us at{' '}
                      <a href="mailto:privacy@gpt-5ai.com" className="text-blue-600 hover:underline">
                        privacy@gpt-5ai.com
                      </a>{' '}
                      with your request and identity verification.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  
                  <div className="grid gap-3">
                    <div>
                      <h4 className="font-semibold">Essential Cookies</h4>
                      <p className="text-sm text-muted-foreground">Required for basic site functionality (authentication, security)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Functional Cookies</h4>
                      <p className="text-sm text-muted-foreground">Remember your preferences and settings</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Analytics Cookies</h4>
                      <p className="text-sm text-muted-foreground">Help us understand how you use our service (Google Analytics)</p>
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    You can control cookies through your browser settings. Note that disabling essential cookies may affect site functionality.
                  </p>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 text-sm">
                    <div>
                      <strong>Account Data:</strong> Retained while your account is active, plus 30 days after deletion
                    </div>
                    <div>
                      <strong>Chat History:</strong> Stored for service improvement; you can delete anytime
                    </div>
                    <div>
                      <strong>Payment Data:</strong> Retained per legal requirements (typically 7 years)
                    </div>
                    <div>
                      <strong>Analytics Data:</strong> Anonymized and retained for up to 26 months
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle>Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. 
                    If you are a parent and believe your child has provided us with personal information, please contact us at{' '}
                    <a href="mailto:privacy@gpt-5ai.com" className="text-blue-600 hover:underline">
                      privacy@gpt-5ai.com
                    </a>.
                  </p>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Your data may be processed in countries other than your own. We ensure adequate protection through:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                    <li>Standard Contractual Clauses approved by the European Commission</li>
                    <li>Adequacy decisions for certain countries</li>
                    <li>Certification schemes and codes of conduct</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Changes to Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    We may update this privacy policy from time to time. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                    <li>Posting the new policy on our website</li>
                    <li>Sending you an email notification</li>
                    <li>Displaying a prominent notice on our platform</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Changes take effect immediately upon posting. Your continued use constitutes acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    If you have questions about this privacy policy or our data practices, please contact us:
                  </p>
                  
                  <div className="grid gap-2 text-sm">
                    <div><strong>Email:</strong> <a href="mailto:privacy@gpt-5ai.com" className="text-blue-600 hover:underline">privacy@gpt-5ai.com</a></div>
                    <div><strong>Data Protection Officer:</strong> <a href="mailto:dpo@gpt-5ai.com" className="text-blue-600 hover:underline">dpo@gpt-5ai.com</a></div>
                    <div><strong>Website:</strong> <a href="https://gpt-5ai.com" className="text-blue-600 hover:underline">gpt-5ai.com</a></div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    This privacy policy is effective as of {lastUpdated} and applies to all information collected by GPT-5 AI.
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

export default Privacy;