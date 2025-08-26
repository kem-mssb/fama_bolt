'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAnalysis, MaterialType, FailureType } from '@/contexts/AnalysisContext'

const materialTypes: MaterialType[] = [
  'Semiconductor', 'PCB', 'Metal', 'Polymer', 'Ceramic', 'Composite', 'Coating', 'Other'
]

const failureTypes: FailureType[] = [
  'Electrical', 'Mechanical', 'Thermal', 'Chemical', 'Interface'
]

export function RequirementsStep() {
  const { state, dispatch } = useAnalysis()
  const { formData } = state

  const handleProblemDescriptionChange = (value: string) => {
    dispatch({
      type: 'UPDATE_REQUIREMENTS',
      payload: { problemDescription: value }
    })
  }

  const handleMaterialTypeChange = (value: MaterialType) => {
    dispatch({
      type: 'UPDATE_REQUIREMENTS',
      payload: { materialType: value }
    })
  }

  const handleFailureTypeChange = (value: FailureType) => {
    dispatch({
      type: 'UPDATE_REQUIREMENTS',
      payload: { failureType: value }
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Analysis Requirements</CardTitle>
        <CardDescription>
          Tell us about your analysis needs and the problem you're trying to solve.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="problem-description">Problem Description</Label>
          <Textarea
            id="problem-description"
            placeholder="Describe the failure, issue, or analysis requirements in detail..."
            value={formData.problemDescription}
            onChange={(e) => handleProblemDescriptionChange(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="material-type">Material Type</Label>
            <Select value={formData.materialType || undefined} onValueChange={handleMaterialTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                {materialTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="failure-type">Failure Type</Label>
            <Select value={formData.failureType || undefined} onValueChange={handleFailureTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select failure type" />
              </SelectTrigger>
              <SelectContent>
                {failureTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}