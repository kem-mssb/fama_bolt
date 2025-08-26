'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export type MaterialType = 'Semiconductor' | 'PCB' | 'Metal' | 'Polymer' | 'Ceramic' | 'Composite' | 'Coating' | 'Other'
export type FailureType = 'Electrical' | 'Mechanical' | 'Thermal' | 'Chemical' | 'Interface'
export type UrgencyLevel = 'Standard' | 'Expedited' | 'Emergency'
export type BudgetRange = 'Low' | 'Medium' | 'High'

export interface AnalysisFormData {
  // Step 1: Requirements
  problemDescription: string
  materialType: MaterialType | null
  failureType: FailureType | null
  
  // Step 2: Parameters
  urgencyLevel: UrgencyLevel
  budgetRange: BudgetRange | null
  
  // Step 3: Equipment Selection
  selectedEquipment: any[]
  
  // Step 4: Results
  totalEstimatedCost: number | null
  totalEstimatedDuration: number | null
  aiRecommendations: any | null
}

interface AnalysisState {
  currentStep: number
  formData: AnalysisFormData
}

type AnalysisAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_REQUIREMENTS'; payload: Partial<Pick<AnalysisFormData, 'problemDescription' | 'materialType' | 'failureType'>> }
  | { type: 'UPDATE_PARAMETERS'; payload: Partial<Pick<AnalysisFormData, 'urgencyLevel' | 'budgetRange'>> }
  | { type: 'UPDATE_EQUIPMENT'; payload: Partial<Pick<AnalysisFormData, 'selectedEquipment'>> }
  | { type: 'UPDATE_RESULTS'; payload: Partial<Pick<AnalysisFormData, 'totalEstimatedCost' | 'totalEstimatedDuration' | 'aiRecommendations'>> }
  | { type: 'RESET' }

const initialState: AnalysisState = {
  currentStep: 1,
  formData: {
    problemDescription: '',
    materialType: null,
    failureType: null,
    urgencyLevel: 'Standard',
    budgetRange: null,
    selectedEquipment: [],
    totalEstimatedCost: null,
    totalEstimatedDuration: null,
    aiRecommendations: null,
  }
}

function analysisReducer(state: AnalysisState, action: AnalysisAction): AnalysisState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'UPDATE_REQUIREMENTS':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case 'UPDATE_PARAMETERS':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case 'UPDATE_EQUIPMENT':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case 'UPDATE_RESULTS':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const AnalysisContext = createContext<{
  state: AnalysisState
  dispatch: React.Dispatch<AnalysisAction>
} | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(analysisReducer, initialState)

  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider')
  }
  return context
}