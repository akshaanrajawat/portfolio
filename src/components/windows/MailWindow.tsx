import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MailWindow = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
        <p className="text-muted-foreground">
          Send me a message and I'll get back to you soon.
        </p>
      </div>

      <form
        action="https://formsubmit.co/akshaanrajawat@gmail.com"
        method="POST"
        className="space-y-4"
      >
        {/* Hidden configuration for FormSubmit */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input
          type="hidden"
          name="_subject"
          value="📩 New message from your portfolio!"
        />
        <input
          type="hidden"
          name="_next"
          value="https://yourwebsite.com/thankyou"
        />

        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input name="name" type="text" required className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input name="email" type="email" required className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            name="message"
            required
            rows={6}
            className="w-full resize-none"
          />
        </div>

        <Button type="submit" className="w-full">
          <Send className="w-4 h-4 mr-2" /> Send Message
        </Button>
      </form>
    </div>
  );
};

export default MailWindow;
