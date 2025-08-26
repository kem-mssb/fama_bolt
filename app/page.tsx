import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Target, Clock, Shield, Microscope, BarChart3 } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Recommendations',
      description: 'Get intelligent equipment suggestions based on your specific analysis needs.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Precision Analysis',
      description: 'Access state-of-the-art failure analysis and material characterization equipment.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Turnaround',
      description: 'Choose from standard, expedited, or emergency analysis options to meet your timeline.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Professional analysis backed by experienced materials science experts.'
    }
  ]

  const analysisTypes = [
    'Electrical Verification',
    'Non-Destructive Inspection', 
    'Fault Localisation',
    'Physical Analysis',
    'Material Analysis'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              Next-Generation Analysis Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              AI-Powered
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Failure Analysis
              </span>
              Quotations
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Get intelligent equipment recommendations and instant quotations for your 
              failure analysis and material characterization needs. Our AI-driven platform 
              streamlines the entire process from problem description to final analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/analysis">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Start Analysis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Sample Reports
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Analysis Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">24h</div>
                <div className="text-sm text-muted-foreground">Emergency Service</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets expert knowledge to deliver precise, 
              reliable analysis results for your critical applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Analysis Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive failure analysis and material characterization 
              across multiple disciplines and industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                    <Microscope className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{type}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>
                    Advanced {type.toLowerCase()} techniques using state-of-the-art equipment 
                    and expert analysis protocols.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12">
            <BarChart3 className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Begin your analysis journey with our intelligent 4-step wizard. 
              Get accurate quotations and expert recommendations in minutes.
            </p>
            <Link href="/analysis">
              <Button size="lg" className="text-lg px-10 py-6">
                Start Your Analysis Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}