'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { number: 1, title: 'Requirements' },
  { number: 2, title: 'Parameters' },
  { number: 3, title: 'Equipment' },
  { number: 4, title: 'Results' }
]

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-200',
                currentStep > step.number
                  ? 'bg-secondary text-secondary-foreground border-secondary'
                  : currentStep === step.number
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border'
              )}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <div className="ml-3 text-left">
              <p
                className={cn(
                  'text-sm font-medium transition-colors',
                  currentStep >= step.number
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Step {step.number}
              </p>
              <p
                className={cn(
                  'text-xs transition-colors',
                  currentStep >= step.number
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {step.title}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'w-16 h-0.5 mx-4 transition-colors',
                currentStep > step.number
                  ? 'bg-secondary'
                  : 'bg-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}