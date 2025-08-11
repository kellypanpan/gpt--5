import Layout from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEOHead
        title="Contact Us - GPT-5 AI"
        description="Get in touch with the GPT-5 AI team. We'd love to hear from you, whether you have a question, feedback, or a partnership proposal."
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground text-center mb-12">
              {t("contact.description")}
            </p>

            <Card>
              <CardHeader>
                <CardTitle>{t("contact.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("contact.nameLabel")}
                    </label>
                    <Input id="name" placeholder={t("contact.namePlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("contact.emailLabel")}
                    </label>
                    <Input id="email" type="email" placeholder={t("contact.emailPlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("contact.messageLabel")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t("contact.submitButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">{t("contact.infoTitle")}</h2>
              <p className="text-muted-foreground">
                {t("contact.infoEmail")}:{" "}
                <a href="mailto:support@gpt-5ai.com" className="text-primary hover:underline">
                  support@gpt-5ai.com
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                {t("contact.infoAddress")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact; 