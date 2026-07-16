"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Database,
  Cookie,
  Globe,
  Users,
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "1. Information We Collect",
      content: [
        "Personal information you provide: name, email address, phone number, shipping address.",
        "Payment information: processed securely through our payment partners.",
        "Usage data: how you interact with our website and services.",
        "Device information: browser type, IP address, and device details."
      ]
    },
    {
      icon: Lock,
      title: "2. How We Use Your Information",
      content: [
        "To process and fulfill your orders.",
        "To communicate with you about your orders and inquiries.",
        "To improve our products and services.",
        "To send you updates, promotions, and newsletters (only with your consent).",
        "To ensure the security and integrity of our platform."
      ]
    },
    {
      icon: Eye,
      title: "3. Information Sharing",
      content: [
        "We do not sell or rent your personal information to third parties.",
        "We may share information with trusted partners who assist in order fulfillment.",
        "We may disclose information if required by law or to protect legal rights.",
        "All third-party partners are bound by confidentiality agreements."
      ]
    },
    {
      icon: Database,
      title: "4. Data Security",
      content: [
        "We implement industry-standard security measures to protect your data.",
        "All transactions are encrypted using SSL technology.",
        "We regularly review and update our security practices.",
        "Access to personal data is restricted to authorized personnel only."
      ]
    },
    {
      icon: Cookie,
      title: "5. Cookies & Tracking",
      content: [
        "We use cookies to enhance your browsing experience.",
        "Cookies help us remember your preferences and understand site usage.",
        "You can control cookie settings through your browser preferences.",
        "Third-party analytics may use cookies for performance tracking."
      ]
    },
    {
      icon: Globe,
      title: "6. Your Rights",
      content: [
        "You have the right to access, update, or delete your personal data.",
        "You can opt-out of marketing communications at any time.",
        "You can request a copy of the data we hold about you.",
        "You can withdraw consent for data processing where applicable."
      ]
    },
    {
      icon: Users,
      title: "7. Children's Privacy",
      content: [
        "Our services are not directed at individuals under 18 years of age.",
        "We do not knowingly collect personal information from children.",
        "If we become aware of such data, we will take steps to remove it.",
        "Parents or guardians may contact us to address any concerns."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Privacy
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Introduction */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">Welcome to HillVogue</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At HillVogue, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your personal information when you visit our website or use 
                  our services. We are committed to protecting your data and ensuring transparency in how 
                  we handle it.
                </p>
              </div>

              <Separator />

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-12">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Updates Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Updates to This Policy</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or legal requirements. We encourage you to review this page periodically for any updates. 
                  Continued use of our services constitutes acceptance of any changes.
                </p>
              </div>

              <Separator />

              {/* Footer Note */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2026 HillVogue. All rights reserved.</p>
                <p>Your privacy matters to us.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}