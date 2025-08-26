'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Bot, Settings } from 'lucide-react'

export function EquipmentStep() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Equipment Selection</CardTitle>
        <CardDescription>
          Choose the analysis equipment for your requirements. Our AI will recommend the best options.
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
            <div className="text-center py-12">
              <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">AI Equipment Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                Equipment recommendations will be displayed here based on your requirements.
              </p>
              <Badge variant="secondary" className="px-4 py-2">
                Coming Soon
              </Badge>
            </div>
          </TabsContent>
          
          <TabsContent value="all-equipment" className="mt-6">
            <div className="text-center py-12">
              <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">All Available Equipment</h3>
              <p className="text-muted-foreground mb-4">
                Complete equipment catalog will be displayed here.
              </p>
              <Badge variant="secondary" className="px-4 py-2">
                Coming Soon
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}