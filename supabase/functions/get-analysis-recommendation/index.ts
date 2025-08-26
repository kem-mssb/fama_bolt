import { createClient } from 'npm:@supabase/supabase-js@2'

interface RequestPayload {
  failure_type: string
  urgency_level: string
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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Rule-based equipment recommendations
const getEquipmentRecommendations = (failureType: string): { name: string; priority: 'High' | 'Medium' | 'Low'; justification: string }[] => {
  const recommendations: Record<string, { name: string; priority: 'High' | 'Medium' | 'Low'; justification: string }[]> = {
    'Electrical': [
      {
        name: 'Electrical Testing',
        priority: 'High',
        justification: 'Essential for verifying electrical parameters and identifying circuit failures'
      },
      {
        name: 'SEM Analysis',
        priority: 'Medium',
        justification: 'Provides high-resolution imaging to identify electrical failure points and contamination'
      }
    ],
    'Mechanical': [
      {
        name: 'SEM Analysis',
        priority: 'High',
        justification: 'Critical for examining fracture surfaces and mechanical failure modes'
      },
      {
        name: 'CT Scanning',
        priority: 'Medium',
        justification: 'Non-destructive analysis of internal mechanical structures and defects'
      }
    ],
    'Thermal': [
      {
        name: 'FTIR Analysis',
        priority: 'High',
        justification: 'Identifies thermal degradation products and material changes due to heat exposure'
      },
      {
        name: 'SEM Analysis',
        priority: 'Medium',
        justification: 'Examines thermal damage patterns and microstructural changes'
      }
    ],
    'Chemical': [
      {
        name: 'FTIR Analysis',
        priority: 'High',
        justification: 'Essential for identifying chemical composition changes and contamination'
      },
      {
        name: 'EDX Spectroscopy',
        priority: 'High',
        justification: 'Provides elemental analysis to identify chemical contaminants and corrosion products'
      }
    ],
    'Interface': [
      {
        name: 'SEM Analysis',
        priority: 'High',
        justification: 'Critical for examining interface morphology and adhesion failures'
      },
      {
        name: 'EDX Spectroscopy',
        priority: 'Medium',
        justification: 'Analyzes elemental distribution across interfaces and identifies contamination'
      }
    ]
  }

  return recommendations[failureType] || []
}

// Root cause analysis data
const getRootCauseAnalysis = (failureType: string) => {
  const rootCauses: Record<string, { probable_causes: string[]; risk_factors: string[] }> = {
    'Electrical': {
      probable_causes: [
        'Overvoltage or overcurrent conditions',
        'Electrostatic discharge (ESD)',
        'Wire bonding failures',
        'Metallization corrosion',
        'Junction degradation'
      ],
      risk_factors: [
        'Inadequate ESD protection',
        'Poor environmental controls',
        'Manufacturing process variations',
        'Material quality issues',
        'Thermal cycling stress'
      ]
    },
    'Mechanical': {
      probable_causes: [
        'Fatigue crack propagation',
        'Impact or shock loading',
        'Material defects or inclusions',
        'Stress concentration points',
        'Improper assembly procedures'
      ],
      risk_factors: [
        'Cyclic loading conditions',
        'Environmental stress factors',
        'Material property variations',
        'Design inadequacies',
        'Manufacturing tolerances'
      ]
    },
    'Thermal': {
      probable_causes: [
        'Excessive operating temperatures',
        'Thermal cycling fatigue',
        'Poor heat dissipation',
        'Material thermal expansion mismatch',
        'Thermal runaway conditions'
      ],
      risk_factors: [
        'Inadequate thermal management',
        'Environmental temperature extremes',
        'Power density concentrations',
        'Material thermal properties',
        'Cooling system failures'
      ]
    },
    'Chemical': {
      probable_causes: [
        'Corrosion and oxidation',
        'Chemical contamination',
        'Material degradation',
        'Galvanic corrosion',
        'Environmental exposure'
      ],
      risk_factors: [
        'Harsh environmental conditions',
        'Material compatibility issues',
        'Contamination during manufacturing',
        'Inadequate protective coatings',
        'Moisture and humidity exposure'
      ]
    },
    'Interface': {
      probable_causes: [
        'Adhesion failures',
        'Delamination',
        'Interface contamination',
        'Thermal expansion mismatch',
        'Poor surface preparation'
      ],
      risk_factors: [
        'Surface cleanliness issues',
        'Material compatibility problems',
        'Process parameter variations',
        'Environmental stress factors',
        'Aging and degradation'
      ]
    }
  }

  return {
    failure_type: failureType,
    ...rootCauses[failureType] || { probable_causes: [], risk_factors: [] }
  }
}

// Process flow data
const getProcessFlow = (failureType: string) => {
  const processFlows: Record<string, { step: number; title: string; description: string; estimated_hours: number }[]> = {
    'Electrical': [
      { step: 1, title: 'Initial Assessment', description: 'Visual inspection and documentation of the failed component', estimated_hours: 1 },
      { step: 2, title: 'Electrical Testing', description: 'Comprehensive electrical parameter verification and circuit analysis', estimated_hours: 4 },
      { step: 3, title: 'Sample Preparation', description: 'Prepare samples for microscopic analysis', estimated_hours: 2 },
      { step: 4, title: 'SEM Imaging', description: 'High-resolution imaging of failure sites and structures', estimated_hours: 3 },
      { step: 5, title: 'Data Analysis', description: 'Analyze electrical test results and imaging data', estimated_hours: 2 },
      { step: 6, title: 'Root Cause Identification', description: 'Determine primary failure mechanisms', estimated_hours: 2 },
      { step: 7, title: 'Report Generation', description: 'Compile comprehensive analysis report', estimated_hours: 3 },
      { step: 8, title: 'Recommendations', description: 'Provide corrective action recommendations', estimated_hours: 1 }
    ],
    'Mechanical': [
      { step: 1, title: 'Initial Assessment', description: 'Visual inspection and failure mode documentation', estimated_hours: 1 },
      { step: 2, title: 'Non-Destructive Testing', description: 'CT scanning for internal structure analysis', estimated_hours: 6 },
      { step: 3, title: 'Sample Preparation', description: 'Prepare fracture surfaces for detailed examination', estimated_hours: 2 },
      { step: 4, title: 'SEM Analysis', description: 'Detailed fracture surface analysis and imaging', estimated_hours: 4 },
      { step: 5, title: 'Fractography', description: 'Interpret fracture patterns and failure progression', estimated_hours: 3 },
      { step: 6, title: 'Material Characterization', description: 'Verify material properties and composition', estimated_hours: 2 },
      { step: 7, title: 'Report Generation', description: 'Document findings and failure analysis', estimated_hours: 3 },
      { step: 8, title: 'Prevention Strategies', description: 'Recommend design and process improvements', estimated_hours: 1 }
    ],
    'Thermal': [
      { step: 1, title: 'Initial Assessment', description: 'Document thermal damage and failure patterns', estimated_hours: 1 },
      { step: 2, title: 'FTIR Spectroscopy', description: 'Identify thermal degradation products and material changes', estimated_hours: 3 },
      { step: 3, title: 'Sample Preparation', description: 'Prepare samples for microscopic thermal damage analysis', estimated_hours: 2 },
      { step: 4, title: 'SEM Analysis', description: 'Examine thermal damage patterns and microstructural changes', estimated_hours: 4 },
      { step: 5, title: 'Thermal History Analysis', description: 'Reconstruct thermal exposure conditions', estimated_hours: 2 },
      { step: 6, title: 'Material Property Assessment', description: 'Evaluate thermal property changes', estimated_hours: 2 },
      { step: 7, title: 'Report Generation', description: 'Compile thermal failure analysis report', estimated_hours: 3 },
      { step: 8, title: 'Thermal Management Recommendations', description: 'Suggest thermal design improvements', estimated_hours: 1 }
    ],
    'Chemical': [
      { step: 1, title: 'Initial Assessment', description: 'Document chemical damage and contamination patterns', estimated_hours: 1 },
      { step: 2, title: 'FTIR Analysis', description: 'Identify chemical composition and contamination', estimated_hours: 3 },
      { step: 3, title: 'EDX Spectroscopy', description: 'Elemental analysis and contamination mapping', estimated_hours: 2 },
      { step: 4, title: 'Sample Preparation', description: 'Prepare samples for detailed chemical analysis', estimated_hours: 2 },
      { step: 5, title: 'Chemical Mapping', description: 'Map chemical distribution and corrosion products', estimated_hours: 3 },
      { step: 6, title: 'Corrosion Analysis', description: 'Analyze corrosion mechanisms and progression', estimated_hours: 2 },
      { step: 7, title: 'Report Generation', description: 'Document chemical failure analysis findings', estimated_hours: 3 },
      { step: 8, title: 'Protection Recommendations', description: 'Suggest chemical protection strategies', estimated_hours: 1 }
    ],
    'Interface': [
      { step: 1, title: 'Initial Assessment', description: 'Document interface failure and delamination patterns', estimated_hours: 1 },
      { step: 2, title: 'SEM Analysis', description: 'High-resolution interface morphology examination', estimated_hours: 4 },
      { step: 3, title: 'EDX Mapping', description: 'Elemental distribution analysis across interfaces', estimated_hours: 2 },
      { step: 4, title: 'Sample Preparation', description: 'Cross-section preparation for interface analysis', estimated_hours: 2 },
      { step: 5, title: 'Adhesion Testing', description: 'Evaluate interface adhesion strength', estimated_hours: 3 },
      { step: 6, title: 'Contamination Analysis', description: 'Identify interface contamination sources', estimated_hours: 2 },
      { step: 7, title: 'Report Generation', description: 'Compile interface failure analysis report', estimated_hours: 3 },
      { step: 8, title: 'Process Optimization', description: 'Recommend interface preparation improvements', estimated_hours: 1 }
    ]
  }

  return processFlows[failureType] || []
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      })
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    const { failure_type, urgency_level }: RequestPayload = await req.json()

    if (!failure_type || !urgency_level) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: failure_type and urgency_level" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all equipment from database
    const { data: allEquipment, error: equipmentError } = await supabase
      .from('equipment')
      .select('*')

    if (equipmentError) {
      throw new Error(`Database error: ${equipmentError.message}`)
    }

    // Get rule-based recommendations
    const recommendationRules = getEquipmentRecommendations(failure_type)
    
    // Match recommendations with actual equipment
    const recommendedEquipment: RecommendedEquipment[] = []
    let totalBaseCost = 0
    let totalDuration = 0

    for (const rule of recommendationRules) {
      const equipment = allEquipment?.find(eq => eq.name === rule.name)
      if (equipment) {
        recommendedEquipment.push({
          ...equipment,
          justification: rule.justification,
          priority: rule.priority
        })
        totalBaseCost += equipment.base_cost
        totalDuration += equipment.base_duration_hours
      }
    }

    // Apply urgency multiplier to cost
    const urgencyMultipliers: Record<string, number> = {
      'Standard': 1.0,
      'Expedited': 1.5,
      'Emergency': 2.0
    }

    const urgencyMultiplier = urgencyMultipliers[urgency_level] || 1.0
    const totalCost = totalBaseCost * urgencyMultiplier

    // Get root cause analysis and process flow
    const rootCauseAnalysis = getRootCauseAnalysis(failure_type)
    const processFlow = getProcessFlow(failure_type)

    const response: AnalysisRecommendation = {
      recommended_equipment: recommendedEquipment,
      total_cost: Math.round(totalCost * 100) / 100, // Round to 2 decimal places
      total_duration: totalDuration,
      root_cause_analysis: rootCauseAnalysis,
      process_flow: processFlow
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )

  } catch (error) {
    console.error('Error in get-analysis-recommendation:', error)
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})