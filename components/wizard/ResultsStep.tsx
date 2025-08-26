'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FileText, Download, Clock, DollarSign, AlertTriangle, CheckCircle, TrendingUp, Target } from 'lucide-react'
import { useAnalysis } from '@/contexts/AnalysisContext'

export function ResultsStep() {
  const { state } = useAnalysis()
  const { formData } = state
  const { aiRecommendations, totalEstimatedCost, totalEstimatedDuration, selectedEquipment } = formData

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getUrgencyMultiplier = (urgencyLevel: string) => {
    const multipliers: Record<string, number> = {
      'Standard': 1.0,
      'Expedited': 1.5,
      'Emergency': 2.0
    }
    return multipliers[urgencyLevel] || 1.0
  }

  const baseCost = selectedEquipment.reduce((sum: number, eq: any) => sum + (eq.base_cost || 0), 0)
  const urgencyMultiplier = getUrgencyMultiplier(formData.urgencyLevel)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Total Cost</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {totalEstimatedCost ? formatCurrency(totalEstimatedCost) : 'N/A'}
            </div>
            {baseCost > 0 && (
              <div className="text-sm text-muted-foreground">
                Base: {formatCurrency(baseCost)} × {urgencyMultiplier}x ({formData.urgencyLevel})
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Duration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {totalEstimatedDuration ? `${totalEstimatedDuration} hours` : 'N/A'}
            </div>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg">Equipment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {selectedEquipment.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Analysis techniques selected
            </div>
          </CardContent>
        </Card>
      </div>
            <div className="text-sm text-muted-foreground">
      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Analysis Overview</span>
          </CardTitle>
          <CardDescription>
            Complete analysis quotation for your {formData.failureType?.toLowerCase()} failure investigation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Request Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-primary">Request Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material Type:</span>
                  <span className="font-medium">{formData.materialType || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Failure Type:</span>
                  <span className="font-medium">{formData.failureType || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency Level:</span>
                  <Badge variant={formData.urgencyLevel === 'Emergency' ? 'destructive' : formData.urgencyLevel === 'Expedited' ? 'default' : 'secondary'}>
                    {formData.urgencyLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Range:</span>
                  <span className="font-medium">{formData.budgetRange || 'Not specified'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-primary">Problem Description</h4>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  {formData.problemDescription || 'No description provided'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
              {totalEstimatedDuration ? `~${Math.ceil(totalEstimatedDuration / 8)} business days` : 'Duration not calculated'}
      {/* Selected Equipment */}
      {selectedEquipment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Equipment & Techniques</CardTitle>
            <CardDescription>
              Detailed breakdown of analysis equipment and associated costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Duration</TableHead>
                  <TableHead className="text-right">Base Cost</TableHead>
                  <TableHead className="text-right">Final Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedEquipment.map((equipment: any, index: number) => (
                  <TableRow key={equipment.id || index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{equipment.name}</div>
                        {equipment.justification && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {equipment.justification}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {equipment.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {equipment.base_duration_hours}h
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(equipment.base_cost || 0)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency((equipment.base_cost || 0) * urgencyMultiplier)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2">
                  <TableCell colSpan={3} className="font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(baseCost)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    {formatCurrency(totalEstimatedCost || 0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
            </div>
      {/* Root Cause Analysis */}
      {aiRecommendations?.root_cause_analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Root Cause Analysis</span>
            </CardTitle>
            <CardDescription>
              Probable causes and risk factors for {aiRecommendations.root_cause_analysis.failure_type.toLowerCase()} failures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-600 mb-3">Probable Causes</h4>
                <ul className="space-y-2">
                  {aiRecommendations.root_cause_analysis.probable_causes.map((cause, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-600 mb-3">Risk Factors</h4>
                <ul className="space-y-2">
                  {aiRecommendations.root_cause_analysis.risk_factors.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
          </CardContent>
      {/* Process Flow */}
      {aiRecommendations?.process_flow && aiRecommendations.process_flow.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Analysis Process Flow</span>
            </CardTitle>
            <CardDescription>
              Step-by-step analysis process tailored for your failure type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.process_flow.map((step, index) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {step.estimated_hours}h
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </Card>
      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF Quote</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Submit Analysis Request</span>
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            This quotation is valid for 30 days. Final costs may vary based on actual sample conditions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}