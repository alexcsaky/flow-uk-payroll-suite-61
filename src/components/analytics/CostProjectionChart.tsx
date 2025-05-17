import React, { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea, ReferenceLine, Brush } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BarChart3, Download, FileSpreadsheet, LineChart, TrendingUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMockCostData, FilterState } from "@/hooks/useMockCostData";

// Custom tooltip formatter to handle the various types of data
const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
export function CostProjectionChart() {
  // Use our mock data hook
  const {
    data,
    filters,
    setFilters,
    summaryMetrics,
    lastUpdated,
    allDepartments,
    allRegions,
    allEmployeeTypes
  } = useMockCostData();

  // Active chart type
  const [chartType, setChartType] = useState<'monthly' | 'cumulative' | 'components' | 'fte' | 'variance'>('monthly');

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Calculate variance for the variance chart view
  const getVarianceData = (entry: any) => {
    const mainValue = entry.actual || entry.forecast || 0;
    const variance = mainValue - entry.budget;
    return variance;
  };

  // Get color for variance bars
  const getVarianceColor = (entry: any) => {
    const mainValue = entry.actual || entry.forecast || 0;
    const variance = mainValue - entry.budget;
    return variance > 0 ? "#EF4444" : "#10B981"; // Red for over budget, green for under
  };

  // Create variance data for all entries
  const varianceData = React.useMemo(() => {
    return data.map(entry => {
      const mainValue = entry.actual || entry.forecast || 0;
      const variance = mainValue - entry.budget;
      return {
        ...entry,
        variance,
        varianceColor: variance > 0 ? "#EF4444" : "#10B981"
      };
    });
  }, [data]);
  return <Card className="mb-6">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Advanced Cost Projections
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span>Interactive analysis and forecasting</span>
              <span className="text-xs text-muted-foreground ml-2">Last updated: {lastUpdated}</span>
            </CardDescription>
          </div>
          <div className="flex gap-3">
            <Select value={filters.dateRange} onValueChange={value => handleFilterChange('dateRange', value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="12m">12 Months</SelectItem>
                <SelectItem value="24m">24 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <ToggleGroup type="single" value={chartType} onValueChange={value => value && setChartType(value as any)} aria-label="Chart Type">
              <ToggleGroupItem value="monthly" aria-label="Monthly View">
                <LineChart className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="cumulative" aria-label="Cumulative View">
                <BarChart3 className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 px-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={filters.department} onValueChange={value => handleFilterChange('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {allDepartments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Region</Label>
            <Select value={filters.region} onValueChange={value => handleFilterChange('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {allRegions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Employee Type</Label>
            <Select value={filters.employeeType} onValueChange={value => handleFilterChange('employeeType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {allEmployeeTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Inflation Scenario</Label>
            <ToggleGroup type="single" value={filters.scenario} onValueChange={value => value && handleFilterChange('scenario', value)}>
              <ToggleGroupItem value="baseline" className="flex-1">3% Inflation</ToggleGroupItem>
              <ToggleGroupItem value="high" className="flex-1">5% Inflation</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="threshold" className="text-sm font-medium">Alert Threshold</Label>
              <span className="text-sm font-semibold">{currencyFormatter(filters.alertThreshold)}</span>
            </div>
            <Slider id="threshold" min={500000} max={2000000} step={50000} value={[filters.alertThreshold]} onValueChange={value => handleFilterChange('alertThreshold', value[0])} aria-label="Alert Threshold" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Switch id="rolling3" checked={filters.showRolling3Month} onCheckedChange={checked => handleFilterChange('showRolling3Month', checked)} />
            <Label htmlFor="rolling3">Show 3-Month Rolling Average</Label>
          </div>
          
          <div className="flex items-center space-x-4">
            <Switch id="rolling6" checked={filters.showRolling6Month} onCheckedChange={checked => handleFilterChange('showRolling6Month', checked)} />
            <Label htmlFor="rolling6">Show 6-Month Rolling Average</Label>
          </div>
        </div>
        
        {/* Main Chart Area */}
        <div className="h-[450px] p-4 border border-border px-[110px] py-[16px] rounded">
          <ChartContainer config={{
          actual: {
            label: "Actual",
            color: "#3B82F6"
          },
          forecast: {
            label: "Forecast",
            color: "#8B5CF6"
          },
          forecastUpper: {
            label: "Forecast (+5%)",
            color: "#C084FC"
          },
          forecastLower: {
            label: "Forecast (-5%)",
            color: "#C084FC"
          },
          budget: {
            label: "Budget",
            color: "#F59E0B"
          },
          rolling3Month: {
            label: "3-Month Avg",
            color: "#10B981"
          },
          rolling6Month: {
            label: "6-Month Avg",
            color: "#06B6D4"
          },
          baseWages: {
            label: "Base Wages",
            color: "#3B82F6"
          },
          overtime: {
            label: "Overtime",
            color: "#8B5CF6"
          },
          taxes: {
            label: "Taxes & Insurance",
            color: "#F59E0B"
          },
          benefits: {
            label: "Benefits",
            color: "#10B981"
          },
          contractor: {
            label: "Contractor Fees",
            color: "#EC4899"
          },
          fte: {
            label: "FTE Count",
            color: "#EF4444"
          },
          variance: {
            label: "Variance",
            color: "#6366F1"
          }
        }}>
            <ResponsiveContainer width="99%" height="99%">
              <ComposedChart data={chartType === 'variance' ? varianceData : data} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{
                fontSize: 12
              }} dy={10} />
                
                {/* Primary Y Axis for monetary values */}
                <YAxis yAxisId="left" tickFormatter={value => `$${value / 1000}k`} domain={['auto', 'auto']} label={{
                value: 'Cost ($)',
                angle: -90,
                position: 'insideLeft',
                dx: -10,
                style: {
                  textAnchor: 'middle'
                }
              }} tick={{
                fontSize: 12
              }} />
                
                {/* Secondary Y Axis for FTE count */}
                {chartType === 'fte' && <YAxis yAxisId="right" orientation="right" label={{
                value: 'FTE Count',
                angle: 90,
                position: 'insideRight',
                dx: 10,
                style: {
                  textAnchor: 'middle'
                }
              }} tick={{
                fontSize: 12
              }} />}
                
                <ChartTooltip content={({
                active,
                payload
              }) => {
                if (active && payload && payload.length) {
                  return <ChartTooltipContent className="bg-background border border-border/50 shadow-md" indicator="dot" />;
                }
                return null;
              }} />
                
                <Legend verticalAlign="bottom" height={36} />
                
                {/* Monthly View - Actuals vs. Forecast with budget */}
                {chartType === 'monthly' && <>
                    {/* Confidence bands for forecast */}
                    {data.map((entry, index) => {
                  if (entry.forecast) {
                    return <ReferenceArea key={`band-${index}`} x1={entry.month} x2={entry.month} y1={entry.forecast * 0.95} y2={entry.forecast * 1.05} yAxisId="left" strokeOpacity={0} fill="#C084FC" fillOpacity={0.2} />;
                  }
                  return null;
                })}
                    
                    {/* Alert threshold reference line */}
                    <ReferenceLine y={filters.alertThreshold} yAxisId="left" stroke="#EF4444" strokeDasharray="3 3" label={{
                  position: 'insideTopRight',
                  value: 'Alert Threshold',
                  fill: '#EF4444',
                  fontSize: 12
                }} />
                    
                    {/* Budget line */}
                    <Line type="monotone" dataKey="budget" name="Budget" stroke="#F59E0B" strokeWidth={2} dot={false} yAxisId="left" />
                    
                    {/* Actual data points */}
                    <Line type="monotone" dataKey="actual" name="Actual" stroke="#3B82F6" strokeWidth={3} dot={{
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  r: 4
                }} yAxisId="left" />
                    
                    {/* Forecast line */}
                    <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" dot={{
                  stroke: '#8B5CF6',
                  strokeWidth: 2,
                  r: 4
                }} yAxisId="left" />
                    
                    {/* Rolling averages if enabled */}
                    {filters.showRolling3Month && <Line type="monotone" dataKey="rolling3Month" name="3-Month Avg" stroke="#10B981" strokeWidth={2} dot={false} yAxisId="left" />}
                    
                    {filters.showRolling6Month && <Line type="monotone" dataKey="rolling6Month" name="6-Month Avg" stroke="#06B6D4" strokeWidth={2} dot={false} yAxisId="left" />}
                  </>}
                
                {/* Cumulative View */}
                {chartType === 'cumulative' && <>
                    <Area type="monotone" dataKey="cumBudget" name="Cumulative Budget" fill="#F59E0B" stroke="#F59E0B" fillOpacity={0.2} yAxisId="left" />
                    <Area type="monotone" dataKey="cumActual" name="Cumulative Actual" fill="#3B82F6" stroke="#3B82F6" fillOpacity={0.6} yAxisId="left" />
                    <Area type="monotone" dataKey="cumForecast" name="Cumulative Forecast" fill="#8B5CF6" stroke="#8B5CF6" fillOpacity={0.4} yAxisId="left" />
                  </>}
                
                {/* Components View */}
                {chartType === 'components' && <>
                    <Area type="monotone" dataKey="baseWages" name="Base Wages" stackId="1" fill="#3B82F6" stroke="#3B82F6" fillOpacity={0.7} yAxisId="left" />
                    <Area type="monotone" dataKey="overtime" name="Overtime" stackId="1" fill="#8B5CF6" stroke="#8B5CF6" fillOpacity={0.7} yAxisId="left" />
                    <Area type="monotone" dataKey="taxes" name="Taxes & Insurance" stackId="1" fill="#F59E0B" stroke="#F59E0B" fillOpacity={0.7} yAxisId="left" />
                    <Area type="monotone" dataKey="benefits" name="Benefits" stackId="1" fill="#10B981" stroke="#10B981" fillOpacity={0.7} yAxisId="left" />
                    <Area type="monotone" dataKey="contractor" name="Contractor Fees" stackId="1" fill="#EC4899" stroke="#EC4899" fillOpacity={0.7} yAxisId="left" />
                  </>}
                
                {/* FTE View */}
                {chartType === 'fte' && <>
                    <Bar dataKey="actual" name="Actual Cost" fill="#3B82F6" yAxisId="left" barSize={20} fillOpacity={0.7} />
                    <Bar dataKey="forecast" name="Forecast Cost" fill="#8B5CF6" yAxisId="left" barSize={20} fillOpacity={0.7} />
                    <Line type="monotone" dataKey="fte" name="FTE Count" stroke="#EF4444" strokeWidth={2} dot={{
                  stroke: '#EF4444',
                  strokeWidth: 2,
                  r: 4
                }} yAxisId="right" />
                  </>}
                
                {/* Variance View */}
                {chartType === 'variance' && <>
                    <Bar dataKey="variance" name="Variance" fill={entry => entry.varianceColor} yAxisId="left" />
                    <Line type="monotone" dataKey="budget" name="Budget" stroke="#F59E0B" strokeWidth={2} dot={false} yAxisId="left" />
                  </>}
                
                <Brush dataKey="month" height={30} stroke="#8884d8" startIndex={0} endIndex={Math.min(5, data.length - 1)} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Chart Type Selector - moved to be higher up for better spacing */}
        <div className="flex justify-center mt-10 pt-4">
          <Tabs value={chartType} onValueChange={value => setChartType(value as any)} className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="fte">FTE Overlay</TabsTrigger>
              <TabsTrigger value="variance">Variance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <h4 className="text-sm text-muted-foreground mb-1">Next Quarter Projection</h4>
            <p className="text-2xl font-bold">{currencyFormatter(summaryMetrics.nextQuarterProjection)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <h4 className="text-sm text-muted-foreground mb-1">Avg. Cost Per FTE</h4>
            <p className="text-2xl font-bold">{currencyFormatter(summaryMetrics.avgCostPerFTE)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <h4 className="text-sm text-muted-foreground mb-1">Incremental Headcount Cost</h4>
            <p className="text-2xl font-bold">{currencyFormatter(summaryMetrics.incrementalHeadcountCost)}</p>
          </div>
        </div>
        
        {/* Export Buttons */}
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-1 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>;
}