'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAnalysis, UrgencyLevel, BudgetRange } from '@/contexts/AnalysisContext'
import { Clock, DollarSign, Zap } from 'lucide-react'

const urgencyOptions: { value: UrgencyLevel; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'Standard',
    label: 'Standard',
    description: '5-7 business days',
    icon: <Clock className="w-5 h-5" />
  },
  {
    value: 'Expedited',
    label: 'Expedited',
    description: '2-3 business days',
    icon: <Zap className="w-5 h-5" />
  },
  {
    value: 'Emergency',
    label: 'Emergency',
    description: '24-48 hours',
    icon: <Zap className="w-5 h-5 text-red-500" />
  }
]

const budgetRanges: BudgetRange[] = ['Low', 'Medium', 'High']

export function ParametersStep() {
  const { state, dispatch } = useAnalysis()
  const { formData } = state

  const handleUrgencyChange = (value: UrgencyLevel) => {
    dispatch({
      type: 'UPDATE_PARAMETERS',
      payload: { urgencyLevel: value }
    })
  }

  const handleBudgetChange = (value: BudgetRange) => {
    dispatch({
      type: 'UPDATE_PARAMETERS',
      payload: { budgetRange: value }
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Analysis Parameters</CardTitle>
        <CardDescription>
          Set your urgency level and budget preferences for the analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-medium">Urgency Level</Label>
          <RadioGroup
            value={formData.urgencyLevel}
            onValueChange={handleUrgencyChange}
            className="grid grid-cols-1 gap-4"
          >
            {urgencyOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex items-center space-x-3 flex-1">
                  {option.icon}
                  <div className="space-y-1">
                    <Label
                      htmlFor={option.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <Label htmlFor="budget-range" className="text-base font-medium">Budget Range</Label>
          </div>
          <Select value={formData.budgetRange || undefined} onValueChange={handleBudgetChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low ($500 - $1,500)</SelectItem>
              <SelectItem value="Medium">Medium ($1,500 - $5,000)</SelectItem>
              <SelectItem value="High">High ($5,000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}