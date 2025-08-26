'use client'

import { useAnalysis } from '@/contexts/AnalysisContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bot, Clock, DollarSign, FileText, AlertTriangle, CheckCircle, ListChecks, Target } from 'lucide-react'

// Define the structure for the AI recommendations if it's not already globally available
interface AnalysisRecommendation {
  recommended_equipment: {
    id: string;
    name: string;
    category: string;
    justification: string;
    priority: 'High' | 'Medium' | 'Low';
    base_cost: number;
    base_duration_hours: number;
  }[];
  total_cost: number;
  total_duration: number;
  root_cause_analysis: {
    failure_type: string;
    probable_causes: string[];
    risk_factors: string[];
  };
  process_flow: {
    step: number;
    title: string;
    description: string;
    estimated_hours: number;
  }[];
}

export function ResultsStep() {
  const { state } = useAnalysis()
  const { formData, results } = state
  const { aiRecommendations, totalEstimatedCost, totalEstimatedDuration } = results

  // --- FIX: Define the missing helper function ---
  const getUrgencyMultiplier = (level: string) => {
    switch (level) {
      case 'Expedited':
        return 1.5
      case 'Emergency':
        return 2.0
      case 'Standard':
      default:
        return 1.0
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!aiRecommendations) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-lg font-medium mb-2">No Analysis Data</h3>
        <p className="text-muted-foreground">
          Please complete the previous steps to generate the analysis results.
        </p>
      </div>
    )
  }

  const recommendations = aiRecommendations as AnalysisRecommendation;
  const urgencyMultiplier = getUrgencyMultiplier(formData.urgencyLevel);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimated Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEstimatedCost?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Includes {urgencyMultiplier}x urgency multiplier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimated Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEstimatedDuration} hours</div>
            <p className="text-xs text-muted-foreground">Based on selected equipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Recommended</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations.recommended_equipment.length}</div>
            <p className="text-xs text-muted-foreground">AI-powered suggestions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Equipment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-primary" />
                <span>AI Recommended Equipment</span>
              </CardTitle>
              <CardDescription>
                The following equipment is recommended based on your analysis of a '{formData.failureType}' failure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Justification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendations.recommended_equipment.map((eq) => (
                    <TableRow key={eq.id}>
                      <TableCell className="font-medium">{eq.name}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(eq.priority)}>{eq.priority}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{eq.justification}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recommended Process Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ListChecks className="w-6 h-6 text-primary" />
                <span>Recommended Analysis Workflow</span>
              </CardTitle>
              <CardDescription>A step-by-step process to guide your failure analysis.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recommendations.process_flow.map((step, index) => (
                        <div key={step.step} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    {step.step}
                                </div>
                                {index < recommendations.process_flow.length - 1 && (
                                    <div className="h-12 w-px bg-border" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">({step.estimated_hours} hours)</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Root Cause Analysis Section */}
        <div className="space-y-8">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-primary" />
                <span>Root Cause Analysis</span>
              </CardTitle>
              <CardDescription>
                Probable causes and risk factors for a '{recommendations.root_cause_analysis.failure_type}' failure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Probable Causes</h4>
                <div className="flex flex-col space-y-1">
                  {recommendations.root_cause_analysis.probable_causes.map((cause, i) => (
                    <p key={i} className="text-sm text-muted-foreground">- {cause}</p>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Key Risk Factors</h4>
                <div className="flex flex-col space-y-1">
                  {recommendations.root_cause_analysis.risk_factors.map((factor, i) => (
                    <p key={i} className="text-sm text-muted-foreground">- {factor}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
