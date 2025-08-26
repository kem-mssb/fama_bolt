'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Clock, DollarSign } from 'lucide-react'

export function ResultsStep() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Analysis Results & Quotation</CardTitle>
        <CardDescription>
          Your complete analysis quotation with equipment recommendations and cost breakdown.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Quotation Generation</h3>
          <p className="text-muted-foreground mb-6">
            Your analysis results and quotation will be displayed here with detailed cost breakdowns, 
            timeline estimates, and equipment specifications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            <div className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated Duration</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-muted/50">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Cost</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" disabled className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
            <Button disabled className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Request Analysis</span>
            </Button>
          </div>
          
          <Badge variant="secondary" className="mt-4 px-4 py-2">
            Coming Soon
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}