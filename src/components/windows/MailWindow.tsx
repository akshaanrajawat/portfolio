import { Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface MailWindowProps {
  onSent: () => void;
}

const MailWindow = ({ onSent }: MailWindowProps) => {
  const { toast, dismiss } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/akshaanrajawat@gmail.com", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send");

      const created = toast({
        title: "Mail sent",
        description: (
          <div className="flex items-center gap-3 p-4 text-black">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
            <span>Will get back to you soon.</span>
          </div>
        ),
        className: "xp-alert p-0 w-[320px]",
        duration: 60000,
      });

      created.update({
        id: created.id,
        action: (
          <ToastAction altText="OK" asChild>
            <button
              className="mx-auto mb-3 px-4 py-1 xp-alert-ok"
              onClick={() => dismiss(created.id)}
            >
              OK
            </button>
          </ToastAction>
        ),
      });

      form.reset();
      onSent();
    } catch (err) {
      toast({
        title: "Mail failed",
        description: "Please try again in a moment.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
        <p className="text-muted-foreground">
          Send me a message and I'll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} method="POST" className="space-y-4">
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
          value="https://akshaan-portfolio.vercel.app/"
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
