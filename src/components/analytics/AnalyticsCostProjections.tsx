
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

// Sample historical cost data
const historicalData = [
  { month: "Jan", current: 42000, previous: 39000 },
  { month: "Feb", current: 43500, previous: 40000 },
  { month: "Mar", current: 45000, previous: 42500 },
  { month: "Apr", current: 44000, previous: 43000 },
  { month: "May", current: 47000, previous: 44500 },
  { month: "Jun", current: 48500, previous: 45000 },
  { month: "Jul", current: 50000, previous: 46000 },
  { month: "Aug", current: 52000, previous: 48000 },
  { month: "Sep", current: 51000, previous: 49000 },
  { month: "Oct", current: 54000, previous: 51500 },
  { month: "Nov", current: 56000, previous: 53000 },
  { month: "Dec", current: 59000, previous: 55000 },
];

export const AnalyticsCostProjections: React.FC = () => {
  // What-if scenarios parameters
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [inflationRate, setInflationRate] = useState<number>(2);
  const [staffingChange, setStaffingChange] = useState<number>(0);
  const [projectionType, setProjectionType] = useState<string>("monthly");

  // Generate projected data based on what-if parameters
  const generateProjection = () => {
    const lastYearTotal = historicalData.reduce((sum, item) => sum + item.previous, 0);
    const currentTotal = historicalData.reduce((sum, item) => sum + item.current, 0);
    
    let projectedData;
    
    if (projectionType === "monthly") {
      projectedData = historicalData.map((item, index) => {
        const monthIndex = index;
        const baseCost = item.current;
        
        // Calculate growth effect
        const growthEffect = baseCost * (growthRate / 100) * (monthIndex / 12);
        
        // Calculate inflation effect
        const inflationEffect = baseCost * (inflationRate / 100) * (monthIndex / 12);
        
        // Calculate staffing effect (assuming staff costs are 60% of total costs)
        const staffingEffect = baseCost * 0.6 * (staffingChange / 100);
        
        // Calculate projected cost
        const projected = baseCost + growthEffect + inflationEffect + staffingEffect;
        
        return {
          ...item,
          projected: Math.round(projected)
        };
      });
    } else if (projectionType === "yearly") {
      // Yearly projection for the next 5 years
      const currentYear = new Date().getFullYear();
      projectedData = [];
      
      for (let i = 0; i < 5; i++) {
        const yearOffset = i;
        const baseCost = i === 0 ? currentTotal : projectedData[i - 1].projected;
        
        // Calculate growth effect
        const growthEffect = baseCost * (growthRate / 100);
        
        // Calculate inflation effect
        const inflationEffect = baseCost * (inflationRate / 100);
        
        // Calculate staffing effect (assuming staff costs are 60% of total costs)
        const staffingEffect = baseCost * 0.6 * (staffingChange / 100);
        
        // Calculate projected cost
        const projected = baseCost + growthEffect + inflationEffect + staffingEffect;
        
        projectedData.push({
          year: (currentYear + yearOffset).toString(),
          current: i === 0 ? currentTotal : null,
          previous: i === 0 ? lastYearTotal : null,
          projected: Math.round(projected)
        });
      }
    }
    
    return projectedData;
  };

  // Calculate projection data
  const projectionData = generateProjection();

  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Real-time Cost Projections
            </CardTitle>
            <CardDescription>
              Adjust parameters to see how costs might change over time
            </CardDescription>
          </div>
          <Tabs defaultValue={projectionType} onValueChange={setProjectionType}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Business Growth Rate</label>
              <span className="text-sm font-semibold">{growthRate}%</span>
            </div>
            <Slider
              defaultValue={[5]} 
              min={0} 
              max={20} 
              step={0.5} 
              value={[growthRate]}
              onValueChange={(value) => setGrowthRate(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Inflation Rate</label>
              <span className="text-sm font-semibold">{inflationRate}%</span>
            </div>
            <Slider
              defaultValue={[2]} 
              min={0} 
              max={10} 
              step={0.5} 
              value={[inflationRate]}
              onValueChange={(value) => setInflationRate(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Staffing Change</label>
              <span className="text-sm font-semibold">{staffingChange > 0 ? `+${staffingChange}%` : `${staffingChange}%`}</span>
            </div>
            <Slider
              defaultValue={[0]} 
              min={-20} 
              max={20} 
              step={1} 
              value={[staffingChange]}
              onValueChange={(value) => setStaffingChange(value[0])}
            />
          </div>
        </div>
        
        <div className="h-[400px] mt-8">
          <ChartContainer 
            config={{
              current: {
                label: "Current Year",
                color: "#3B82F6",
              },
              previous: {
                label: "Previous Year",
                color: "#9CA3AF",
              },
              projected: {
                label: "Projected",
                color: "#8B5CF6",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              {projectionType === "monthly" ? (
                <AreaChart
                  data={projectionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            className="bg-background border border-border/50 shadow-md"
                            indicator="dot"
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="previous" stackId="1" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="current" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="projected" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.5} />
                </AreaChart>
              ) : (
                <LineChart
                  data={projectionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            className="bg-background border border-border/50 shadow-md"
                            indicator="dot"
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="previous" stroke="#9CA3AF" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="projected" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="text-sm text-muted-foreground mb-1">Cost Summary - Current Year</h4>
            <p className="text-xl font-bold">{formatCurrency(historicalData.reduce((sum, item) => sum + item.current, 0))}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="text-sm text-muted-foreground mb-1">Cost Summary - Previous Year</h4>
            <p className="text-xl font-bold">{formatCurrency(historicalData.reduce((sum, item) => sum + item.previous, 0))}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm text-muted-foreground mb-1">Projected Annual Cost</h4>
            <p className="text-xl font-bold text-purple-700">
              {formatCurrency(projectionType === "monthly" 
                ? projectionData.reduce((sum, item) => sum + (item.projected || 0), 0)
                : projectionData[projectionData.length - 1].projected)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
