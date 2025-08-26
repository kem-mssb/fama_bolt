'use client'

import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/StepIndicator'
import { RequirementsStep } from '@/components/wizard/RequirementsStep'
import { ParametersStep } from '@/components/wizard/ParametersStep'
import { EquipmentStep } from '@/components/wizard/EquipmentStep'
import { ResultsStep } from '@/components/wizard/ResultsStep'
import { AnalysisProvider, useAnalysis } from '@/contexts/AnalysisContext'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function AnalysisWizardContent() {
  const { state, dispatch } = useAnalysis()
  const { currentStep } = state

  const totalSteps = 4

  const nextStep = () => {
    if (currentStep < totalSteps) {
      dispatch({ type: 'SET_STEP', payload: currentStep + 1 })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 })
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !state.formData.problemDescription || !state.formData.materialType || !state.formData.failureType
      case 2:
        return !state.formData.budgetRange
      default:
        return false
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RequirementsStep />
      case 2:
        return <ParametersStep />
      case 3:
        return <EquipmentStep />
      case 4:
        return <ResultsStep />
      default:
        return <RequirementsStep />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis Request Wizard</h1>
          <p className="text-muted-foreground">
            Follow our guided process to get accurate quotations for your analysis needs
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={isNextDisabled()}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button className="flex items-center space-x-2">
              <span>Complete Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-muted rounded-lg max-w-2xl mx-auto">
            <h3 className="font-medium mb-2">Debug Info:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(state.formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AnalysisPage() {
  return (
    <AnalysisProvider>
      <AnalysisWizardContent />
    </AnalysisProvider>
  )
}