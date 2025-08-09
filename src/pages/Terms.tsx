import { SEOHead } from "@/components/SEOHead";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, Scale, Shield, CreditCard, Ban } from "lucide-react";

const Terms = () => {
  const lastUpdated = "January 1, 2024";
  
  return (
    <Layout>
      <SEOHead 
        title="Terms of Service - GPT-5 AI"
        description="Terms and conditions for using GPT-5 AI services. Learn about user responsibilities, service limitations, and legal agreements."
        keywords="terms of service, user agreement, legal terms, service conditions"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">Terms of Service</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Legal terms and conditions for using GPT-5 AI services
              </p>
              <Badge variant="outline" className="mt-2">
                Last updated: {lastUpdated}
              </Badge>
            </div>

            <div className="space-y-8">

              {/* Agreement Notice */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Important Legal Agreement</h3>
                      <p className="text-sm text-yellow-700">
                        By accessing and using GPT-5 AI services, you agree to be bound by these Terms of Service. 
                        If you do not agree to these terms, please do not use our services.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Description */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Service Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    GPT-5 AI ("Service," "we," "us," or "our") provides artificial intelligence-powered tools and services including:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>AI Chat Interface:</strong> Conversational AI for various tasks and queries</li>
                    <li><strong>Content Generation Tools:</strong> Writing assistance, code generation, and analysis</li>
                    <li><strong>Document Processing:</strong> PDF analysis and image interpretation</li>
                    <li><strong>Specialized Tools:</strong> Prompt engineering, script generation, and more</li>
                  </ul>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> We are an independent platform and are not affiliated with OpenAI or any specific AI model provider. 
                      Our service integrates various AI technologies to provide enhanced functionality.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* User Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>2. User Accounts and Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Requirements</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>You must be at least 13 years old to create an account</li>
                      <li>Users under 18 must have parental consent</li>
                      <li>Provide accurate and complete registration information</li>
                      <li>Maintain the security of your account credentials</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Account Responsibilities</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>You are responsible for all activities under your account</li>
                      <li>Notify us immediately of any security breaches</li>
                      <li>One account per person; sharing accounts is prohibited</li>
                      <li>We reserve the right to suspend or terminate accounts for violations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Acceptable Use */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    3. Acceptable Use Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Permitted Uses</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Educational and research purposes</li>
                      <li>Creative writing and content generation</li>
                      <li>Business and professional applications</li>
                      <li>Personal productivity and assistance</li>
                      <li>Learning and skill development</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Prohibited Uses</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Illegal Activities:</strong> Any content or activity that violates applicable laws</li>
                      <li><strong>Harmful Content:</strong> Harassment, threats, hate speech, or discriminatory content</li>
                      <li><strong>Misinformation:</strong> Deliberately creating or spreading false information</li>
                      <li><strong>Privacy Violations:</strong> Processing personal data of others without consent</li>
                      <li><strong>Intellectual Property:</strong> Infringing copyrights, trademarks, or other IP rights</li>
                      <li><strong>System Abuse:</strong> Attempting to bypass limitations, hack, or reverse engineer</li>
                      <li><strong>Commercial Misuse:</strong> Reselling access or using for competing services</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border">
                    <p className="text-sm text-red-800">
                      <strong>Enforcement:</strong> Violations may result in immediate account suspension or termination, 
                      and we may report illegal activities to appropriate authorities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription and Billing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    4. Subscription and Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Subscription Plans</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Free Plan:</strong> Limited daily conversations with basic features</li>
                      <li><strong>Pro Plan:</strong> Unlimited access with premium features (Monthly/Quarterly/Annual)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Billing Terms</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Subscriptions are billed in advance for the selected period</li>
                      <li>Auto-renewal unless cancelled before the next billing cycle</li>
                      <li>Price changes will be communicated 30 days in advance</li>
                      <li>No refunds for partial months except as legally required</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cancellation</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Cancel anytime through your account settings</li>
                      <li>Service continues until the end of your billing period</li>
                      <li>Cancelled accounts retain access to basic features</li>
                      <li>Data deletion available upon request after cancellation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Service Availability and Limitations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Availability</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>We aim for 99.9% uptime but cannot guarantee continuous availability</li>
                      <li>Maintenance windows may cause temporary service interruptions</li>
                      <li>Force majeure events may affect service availability</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Usage Limitations</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Rate limits may apply to prevent abuse</li>
                      <li>File upload size and type restrictions</li>
                      <li>Content length limitations for optimal performance</li>
                      <li>Fair usage policies for unlimited plans</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Content and IP */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Content and Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Your Content</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>You retain ownership of content you submit to our service</li>
                      <li>You grant us a license to process your content to provide services</li>
                      <li>You are responsible for ensuring you have rights to submitted content</li>
                      <li>We may use aggregated, anonymized data for service improvement</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">AI-Generated Content</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>AI-generated content is provided "as is" without warranties</li>
                      <li>You are responsible for reviewing and validating AI outputs</li>
                      <li>No guarantee of accuracy, originality, or fitness for purpose</li>
                      <li>Check for potential copyright issues in AI-generated content</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Our Intellectual Property</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Our platform, software, and services are our intellectual property</li>
                      <li>Trademarks, logos, and brand elements are protected</li>
                      <li>Reverse engineering or unauthorized copying is prohibited</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy and Data */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Privacy and Data Protection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Your privacy is important to us. Our data practices are governed by our{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>, 
                    which forms an integral part of these Terms of Service.
                  </p>
                  
                  <div className="grid gap-3 text-sm">
                    <div>
                      <strong>Data Processing:</strong> We process your data to provide and improve our services
                    </div>
                    <div>
                      <strong>Data Security:</strong> Industry-standard security measures protect your information
                    </div>
                    <div>
                      <strong>Your Rights:</strong> Access, portability, correction, and deletion rights under GDPR
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimers */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    8. Disclaimers and Warranties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-orange-900">
                    <h4 className="font-semibold mb-2">SERVICE PROVIDED "AS IS"</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>No warranties of accuracy, reliability, or completeness</li>
                      <li>AI outputs may contain errors, biases, or inaccuracies</li>
                      <li>Users must verify and validate all AI-generated content</li>
                      <li>No guarantee of uninterrupted or error-free service</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-orange-900">
                    <h4 className="font-semibold mb-2">NO PROFESSIONAL ADVICE</h4>
                    <p>
                      Our service does not provide legal, medical, financial, or professional advice. 
                      Consult qualified professionals for specialized guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    9. Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    To the maximum extent permitted by law:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                      <strong>Limitation:</strong> Our total liability for any claims will not exceed the amount 
                      you paid for our services in the 12 months preceding the claim
                    </li>
                    <li>
                      <strong>Exclusion:</strong> We are not liable for indirect, incidental, special, 
                      consequential, or punitive damages
                    </li>
                    <li>
                      <strong>User Responsibility:</strong> You are responsible for your use of our service 
                      and any consequences arising from such use
                    </li>
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Some jurisdictions do not allow limitation of liability for 
                      certain damages, so these limitations may not apply to you.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Indemnification */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Indemnification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    You agree to indemnify and hold harmless GPT-5 AI, its officers, directors, employees, 
                    and agents from any claims, damages, losses, or expenses arising from:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Your use or misuse of our services</li>
                    <li>Your violation of these Terms of Service</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Any content you submit or generate using our services</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ban className="h-5 w-5" />
                    11. Termination
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">By You</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Cancel your subscription anytime through account settings</li>
                      <li>Delete your account and data upon request</li>
                      <li>Cease using our services at any time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">By Us</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Immediate termination for material breaches of these terms</li>
                      <li>Suspension or termination for policy violations</li>
                      <li>30-day notice for convenience termination</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Effect of Termination</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Immediate cessation of service access</li>
                      <li>Data may be deleted after reasonable notice period</li>
                      <li>Outstanding payments remain due</li>
                      <li>Survival of certain clauses (liability, indemnification)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>12. Governing Law and Disputes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Governing Law</h4>
                    <p className="text-sm">
                      These terms are governed by the laws of [JURISDICTION], without regard to conflict of law principles.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li><strong>Direct Communication:</strong> Contact us first to resolve disputes informally</li>
                      <li><strong>Mediation:</strong> Non-binding mediation if direct resolution fails</li>
                      <li><strong>Binding Arbitration:</strong> Final resolution through arbitration</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Class Action Waiver</h4>
                    <p className="text-sm">
                      You agree to resolve disputes individually and waive participation in class actions or collective proceedings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* General Provisions */}
              <Card>
                <CardHeader>
                  <CardTitle>13. General Provisions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 text-sm">
                    <div>
                      <strong>Entire Agreement:</strong> These terms constitute the complete agreement between us
                    </div>
                    <div>
                      <strong>Severability:</strong> Invalid provisions do not affect the validity of remaining terms
                    </div>
                    <div>
                      <strong>No Waiver:</strong> Our failure to enforce terms does not waive our rights
                    </div>
                    <div>
                      <strong>Assignment:</strong> We may assign these terms; you may not without our consent
                    </div>
                    <div>
                      <strong>Force Majeure:</strong> Neither party is liable for delays due to circumstances beyond control
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="grid gap-2 text-sm">
                    <div><strong>Email:</strong> <a href="mailto:legal@gpt-5ai.com" className="text-blue-600 hover:underline">legal@gpt-5ai.com</a></div>
                    <div><strong>Support:</strong> <a href="mailto:support@gpt-5ai.com" className="text-blue-600 hover:underline">support@gpt-5ai.com</a></div>
                    <div><strong>Website:</strong> <a href="https://gpt-5ai.com" className="text-blue-600 hover:underline">gpt-5ai.com</a></div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    These Terms of Service are effective as of {lastUpdated} and apply to all users of GPT-5 AI services.
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

export default Terms;