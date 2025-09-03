export default function PrivacyPolicyPage() {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  
          <p>
            ResumeCraft AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you use our application.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you build your resume. This includes your name, contact
            information, work experience, education, skills, and any other information you choose to provide.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">2. How We Use Your Information</h2>
          <p>
            The information you provide is used solely for the purpose of generating your resume. The conversation history and resume data are stored in your browser's local storage to allow you to continue your work across sessions. This data is not transmitted to our servers for storage.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">3. Disclosure of Your Information</h2>
          <p>
            We do not sell, trade, rent, or otherwise share your personal information with third parties for marketing purposes.
            Your resume data is processed by our AI model provider for the sole purpose of providing the resume-building service and is subject to their privacy policies. We do not permanently store your data on any third-party servers.
          </p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">4. Data Security</h2>
          <p>
            We are committed to protecting your data. As your information is stored locally on your device, the security of that data is primarily in your control. We do not have access to the resume data you create.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">5. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@resumecraft.ai.
          </p>
        </div>
      </div>
    );
  }
  