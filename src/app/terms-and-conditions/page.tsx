export default function TermsAndConditionsPage() {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  
          <p>
            Please read these terms and conditions carefully before using the ResumeCraft AI application (the "Service") operated
            by us.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">1. Conditions of Use</h2>
          <p>
            By using this Service, you certify that you have read and reviewed this Agreement and that you agree to comply with
            its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website
            accordingly. We only grant use and access of this Service, its products, and its services to those who have
            accepted its terms.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">2. Privacy Policy</h2>
          <p>
            Before you continue using our Service, we advise you to read our Privacy Policy regarding our user data
            collection. It will help you better understand our practices.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">3. User Account</h2>
          <p>
            As a user of this Service, you may be asked to register with us and provide private information. You are
            responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety
            and security of your identifying information.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">4. Limitation on Liability</h2>
          <p>
            We are not liable for any damages that may occur to you as a result of your misuse of our Service. We reserve
            the right to edit, modify, and change this Agreement at any time.
          </p>
  
          <h2 className="text-2xl font-semibold text-foreground pt-4">5. Governing Law</h2>
          <p>
            This Agreement is governed by the laws of the United States.
          </p>
        </div>
      </div>
    );
  }
  