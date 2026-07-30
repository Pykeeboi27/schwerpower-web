import { Briefcase, Rocket, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: Rocket,
    title: "Service One",
    description:
      "Short description of the first service you offer and the value it provides to clients.",
  },
  {
    icon: ShieldCheck,
    title: "Service Two",
    description:
      "Short description of the second service you offer and the value it provides to clients.",
  },
  {
    icon: Briefcase,
    title: "Service Three",
    description:
      "Short description of the third service you offer and the value it provides to clients.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Your tagline goes here
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A short, compelling description of what your company does and why
          it matters, written to draw visitors further into the page.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">About Us</h2>
            <p className="mt-4 text-muted-foreground">
              Replace this with a paragraph about your company&apos;s
              mission, history, and what sets it apart from the competition.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Our Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              An overview of what you offer. Replace these cards with your
              actual services.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-6 text-primary" />
                  <CardTitle className="mt-2">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Get in Touch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have a question or want to work together? Send a message and
              we&apos;ll get back to you.
            </p>

            <form className="mt-8 flex flex-col gap-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Your name" name="name" />
                <Input placeholder="Your email" name="email" type="email" />
              </div>
              <Input placeholder="Message" name="message" />
              <Button type="submit" className="sm:w-fit sm:self-center">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
