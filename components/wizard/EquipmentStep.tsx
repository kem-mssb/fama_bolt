'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bot, Settings, Clock, DollarSign, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { useAnalysis } from '@/contexts/AnalysisContext'
import { supabase } from '@/lib/supabase'

interface RecommendedEquipment {
  id: string
  name: string
  category: string
  description: string
  applications: string[]
  base_duration_hours: number
  base_cost: number
  sample_prep_requirements: string
  justification: string
  priority: 'High' | 'Medium' | 'Low'
}

interface Equipment {
  id: string
  name: string
  category: string
  description: string
  applications: string[]
  base_duration_hours: number
  base_cost: number
  sample_prep_requirements: string
}

interface AnalysisRecommendation {
  recommended_equipment: RecommendedEquipment[]
  total_cost: number
  total_duration: number
  root_cause_analysis: {
    failure_type: string
    probable_causes: string[]
    risk_factors: string[]
  }
  process_flow: {
    step: number
    title: string
    description: string
    estimated_hours: number
  }[]
}

export function EquipmentStep() {
  const { state, dispatch } = useAnalysis()
  const { formData } = state
  const [recommendations, setRecommendations] = useState<AnalysisRecommendation | null>(null)
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

  // Fetch AI recommendations
  const fetchRecommendations = async () => {
    if (!formData.failureType || !formData.urgencyLevel) return

    setLoading(true)
    setError(null)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-analysis-recommendation`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          failure_type: formData.failureType,
          urgency_level: formData.urgencyLevel
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AnalysisRecommendation = await response.json()
      setRecommendations(data)
      
      // Auto-select recommended equipment
      const recommendedIds = data.recommended_equipment.map(eq => eq.id)
      setSelectedEquipment(recommendedIds)
      
      // Update context with recommendations
      dispatch({
        type: 'UPDATE_EQUIPMENT',
        payload: { selectedEquipment: data.recommended_equipment }
      })
      
      dispatch({
        type: 'UPDATE_RESULTS',
        payload: {
          totalEstimatedCost: data.total_cost,
          totalEstimatedDuration: data.total_duration,
          aiRecommendations: data
        }
      })
    } catch (err) {
      console.error('Error fetching recommendations:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch recommendations')
    } finally {
      setLoading(false)
    }
  }

  // Fetch all equipment
  const fetchAllEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error
      setAllEquipment(data || [])
    } catch (err) {
      console.error('Error fetching equipment:', err)
    }
  }

  useEffect(() => {
    fetchRecommendations()
    fetchAllEquipment()
  }, [formData.failureType, formData.urgencyLevel])

  const toggleEquipmentSelection = (equipmentId: string, equipment: Equipment) => {
    const isSelected = selectedEquipment.includes(equipmentId)
    let newSelection: string[]
    
    if (isSelected) {
      newSelection = selectedEquipment.filter(id => id !== equipmentId)
    } else {
      newSelection = [...selectedEquipment, equipmentId]
    }
    
    setSelectedEquipment(newSelection)
    
    // Update selected equipment in context
    const selectedEquipmentData = allEquipment.filter(eq => newSelection.includes(eq.id))
    dispatch({
      type: 'UPDATE_EQUIPMENT',
      payload: { selectedEquipment: selectedEquipmentData }
    })
    
    // Recalculate totals
    const totalCost = selectedEquipmentData.reduce((sum, eq) => sum + eq.base_cost, 0)
    const totalDuration = selectedEquipmentData.reduce((sum, eq) => sum + eq.base_duration_hours, 0)
    
    // Apply urgency multiplier
    const urgencyMultipliers: Record<string, number> = {
      'Standard': 1.0,
      'Expedited': 1.5,
      'Emergency': 2.0
    }
    const multiplier = urgencyMultipliers[formData.urgencyLevel] || 1.0
    
    dispatch({
      type: 'UPDATE_RESULTS',
      payload: {
        totalEstimatedCost: Math.round(totalCost * multiplier * 100) / 100,
        totalEstimatedDuration: totalDuration
      }
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const renderEquipmentCard = (equipment: Equipment | RecommendedEquipment, isRecommended = false) => {
    const isSelected = selectedEquipment.includes(equipment.id)
    const recommendedEquipment = isRecommended ? equipment as RecommendedEquipment : null
    
    return (
      <Card 
        key={equipment.id} 
        className={`cursor-pointer transition-all hover:shadow-md ${
          isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
        }`}
        onClick={() => toggleEquipmentSelection(equipment.id, equipment)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <CardTitle className="text-lg">{equipment.name}</CardTitle>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {equipment.category}
                </Badge>
                {recommendedEquipment && (
                  <Badge className={`text-xs ${getPriorityColor(recommendedEquipment.priority)}`}>
                    {recommendedEquipment.priority} Priority
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <CardDescription className="text-sm">
            {equipment.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {recommendedEquipment && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-1">AI Recommendation:</p>
              <p className="text-sm text-blue-700">{recommendedEquipment.justification}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Duration:</span>
              </div>
              <span className="font-medium">{equipment.base_duration_hours} hours</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span>Base Cost:</span>
              </div>
              <span className="font-medium">${equipment.base_cost.toLocaleString()}</span>
            </div>
            
            {equipment.applications && equipment.applications.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Applications:</p>
                <div className="flex flex-wrap gap-1">
                  {equipment.applications.slice(0, 3).map((app, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                  {equipment.applications.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{equipment.applications.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {equipment.sample_prep_requirements && (
              <div>
                <p className="text-sm font-medium mb-1">Sample Preparation:</p>
                <p className="text-xs text-muted-foreground">{equipment.sample_prep_requirements}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Equipment Selection</CardTitle>
        <CardDescription>
          Choose the analysis equipment for your requirements. Our AI has recommended the best options based on your failure type and urgency level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai-recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-recommended" className="flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>AI Recommended</span>
            </TabsTrigger>
            <TabsTrigger value="all-equipment" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>All Equipment</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-recommended" className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                <h3 className="text-lg font-medium mb-2">Generating AI Recommendations</h3>
                <p className="text-muted-foreground">
                  Analyzing your requirements to suggest the best equipment...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-medium mb-2 text-red-700">Error Loading Recommendations</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchRecommendations} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : recommendations && recommendations.recommended_equipment.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-primary">AI Analysis Complete</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your <strong>{formData.failureType}</strong> failure type and <strong>{formData.urgencyLevel}</strong> urgency level, 
                    we recommend the following equipment for optimal analysis results.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>Estimated Cost: <strong>${recommendations.total_cost.toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Total Duration: <strong>{recommendations.total_duration} hours</strong></span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.recommended_equipment.map(equipment => 
                    renderEquipmentCard(equipment, true)
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Recommendations Available</h3>
                <p className="text-muted-foreground">
                  Please complete the previous steps to get AI-powered equipment recommendations.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all-equipment" className="mt-6">
            {allEquipment.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Complete Equipment Catalog</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse all available equipment and customize your selection
                    </p>
                  </div>
                  <Badge variant="outline" className="px-3 py-1">
                    {selectedEquipment.length} selected
                  </Badge>
                </div>
                
                {/* Group equipment by category */}
                {['Electrical Verification', 'Non-Destructive Inspection', 'Fault Localisation', 'Physical Analysis', 'Material Analysis'].map(category => {
                  const categoryEquipment = allEquipment.filter(eq => eq.category === category)
                  if (categoryEquipment.length === 0) return null
                  
                  return (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-primary border-b border-border pb-2">
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryEquipment.map(equipment => 
                          renderEquipmentCard(equipment, false)
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Loading Equipment Catalog</h3>
                <p className="text-muted-foreground">
                  Please wait while we load the available equipment...
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}