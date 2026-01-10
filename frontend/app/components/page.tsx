'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import {
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Palette,
  Layout,
  Code,
  Heart,
  Mail,
  Lock
} from 'lucide-react';

export default function ComponentsPage() {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Modern Design",
      description: "Clean, elegant UI with premium aesthetics"
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Responsive Layout",
      description: "Perfectly adapts to all screen sizes"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Friendly",
      description: "Easy to customize and extend"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <AnimatedWrapper type="fadeIn" delay={0.1}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">v1.0.0</Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-300 mb-6">
              Premium UI Components
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              A beautifully crafted design system that transforms your application into a premium product with elegant components and seamless interactions.
            </p>
          </div>
        </AnimatedWrapper>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Form Components */}
          <AnimatedWrapper type="slideIn" direction="left" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>Beautifully styled form elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="hello@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </AnimatedWrapper>

          {/* Input Variants */}
          <AnimatedWrapper type="slideIn" direction="right" delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Input Variants</CardTitle>
                <CardDescription>Different input styles and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="input-with-icon">Input with Icon</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input id="input-with-icon" className="pl-9" placeholder="Email address" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="select">Select an Option</Label>
                  <Select>
                    <SelectTrigger id="select">
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>

        {/* Badge Variants */}
        <AnimatedWrapper type="fadeIn" delay={0.4}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Multiple styles for different use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="accent">Accent</Badge>
              </div>
            </CardContent>
          </Card>
        </AnimatedWrapper>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedWrapper key={feature.title} type="slideIn" direction="up" delay={index * 0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <div className="text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedWrapper type="fadeIn" delay={0.6}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              Transform your application with our premium design system today.
            </p>
            <Button size="lg" className="px-8 py-3 text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
}