
import { useState, useMemo } from 'react';

// Types for our data structures
export interface CostDataPoint {
  month: string;
  actual: number | null;
  forecast: number | null;
  budget: number;
  cumActual: number | null;
  cumForecast: number | null;
  cumBudget: number;
  fte: number;
  baseWages: number;
  overtime: number;
  taxes: number;
  benefits: number;
  contractor: number;
  rolling3Month: number | null;
  rolling6Month: number | null;
}

export interface ScenarioData {
  name: string;
  inflationRate: number;
  data: CostDataPoint[];
}

export type DateRangeOption = '6m' | '12m' | '24m';
export type Department = 'All Departments' | 'Engineering' | 'Marketing' | 'Sales' | 'Support' | 'Operations';
export type Region = 'All Regions' | 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America';
export type EmployeeType = 'All Types' | 'Full-time' | 'Part-time' | 'Contractor';

export interface FilterState {
  dateRange: DateRangeOption;
  department: Department;
  region: Region;
  employeeType: EmployeeType;
  scenario: 'baseline' | 'high';
  showRolling3Month: boolean;
  showRolling6Month: boolean;
  alertThreshold: number;
}

// Utility function to generate realistic mock data
const generateMockData = (): ScenarioData[] => {
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Generate data for 24 months (past 12 and future 12)
  const baselineData: CostDataPoint[] = [];
  const highInflationData: CostDataPoint[] = [];
  
  // Base cost parameters
  const baseMonthlyCost = 850000; // $850k base monthly cost
  const seasonalVariation = 0.15; // 15% seasonal variation
  const growthTrend = 0.02; // 2% monthly growth trend
  const forecastVolatility = 0.04; // 4% volatility in forecast
  
  // Cumulative trackers
  let baselineCumActual = 0;
  let baselineCumForecast = 0;
  let baselineCumBudget = 0;
  let highCumActual = 0;
  let highCumForecast = 0;
  let highCumBudget = 0;
  
  // Generate data for 3 years (past 12 and future 24 months)
  for (let i = 0; i < 36; i++) {
    const yearOffset = Math.floor(i / 12);
    const monthIndex = i % 12;
    const month = `${months[monthIndex]} ${currentYear - 1 + yearOffset}`;
    
    // Determine if this is actual data or forecast
    const isActual = i < 12; // First 12 months are actual data
    
    // Calculate base cost with seasonal variation
    // More expensive in Q4 and Q1, less in Q2 and Q3
    const seasonalFactor = 1 + seasonalVariation * Math.sin((monthIndex / 12) * 2 * Math.PI);
    
    // Add growth trend over time
    const trendFactor = 1 + (growthTrend * i);
    
    // Base calculation for this month
    const baseCost = baseMonthlyCost * seasonalFactor * trendFactor;
    
    // Baseline scenario (3% inflation)
    const baselineActual = isActual ? Math.round(baseCost * (1 + Math.random() * 0.06 - 0.03)) : null;
    const baselineForecast = !isActual ? Math.round(baseCost * (1 + 0.03 * yearOffset)) : null;
    const baselineBudget = Math.round(baseCost * 0.95); // Budget is typically 5% less than actual
    
    // High inflation scenario (5% inflation)
    const highActual = isActual ? Math.round(baseCost * (1 + Math.random() * 0.06 - 0.03)) : null;
    const highForecast = !isActual ? Math.round(baseCost * (1 + 0.05 * yearOffset)) : null;
    const highBudget = Math.round(baseCost * 0.95); // Budget is typically 5% less than actual
    
    // Track cumulative values
    if (isActual) {
      baselineCumActual += baselineActual || 0;
      highCumActual += highActual || 0;
    } else {
      baselineCumForecast += baselineForecast || 0;
      highCumForecast += highForecast || 0;
    }
    baselineCumBudget += baselineBudget;
    highCumBudget += highBudget;
    
    // Calculate cost components (percentages of total)
    const baseWages = Math.round(baseCost * 0.65); // 65% of costs are base wages
    const overtime = Math.round(baseCost * 0.05); // 5% overtime
    const taxes = Math.round(baseCost * 0.12); // 12% taxes and insurance
    const benefits = Math.round(baseCost * 0.10); // 10% benefits
    const contractor = Math.round(baseCost * 0.08); // 8% contractor fees
    
    // FTE count calculation (roughly $85k per FTE annually, or ~$7k monthly)
    const fte = Math.round((baseCost / 7000) * (1 + (Math.random() * 0.1 - 0.05)));
    
    // Calculate rolling averages (null for first months where we don't have enough data)
    let rolling3Month = null;
    let rolling6Month = null;
    
    if (i >= 2) {
      // For rolling 3-month, we need current and 2 previous months
      const prev1 = baselineData[i-1]?.actual || baselineData[i-1]?.forecast || 0;
      const prev2 = baselineData[i-2]?.actual || baselineData[i-2]?.forecast || 0;
      const current = baselineActual || baselineForecast || 0;
      rolling3Month = Math.round((prev2 + prev1 + current) / 3);
    }
    
    if (i >= 5) {
      // For rolling 6-month, we need current and 5 previous months
      let sum = baselineActual || baselineForecast || 0;
      for (let j = 1; j <= 5; j++) {
        sum += baselineData[i-j]?.actual || baselineData[i-j]?.forecast || 0;
      }
      rolling6Month = Math.round(sum / 6);
    }
    
    // Add to baseline data array
    baselineData.push({
      month,
      actual: baselineActual,
      forecast: baselineForecast,
      budget: baselineBudget,
      cumActual: isActual ? baselineCumActual : null,
      cumForecast: !isActual ? baselineCumForecast : null,
      cumBudget: baselineCumBudget,
      fte,
      baseWages,
      overtime,
      taxes,
      benefits,
      contractor,
      rolling3Month,
      rolling6Month
    });
    
    // Add to high inflation data array with similar structure
    highInflationData.push({
      month,
      actual: highActual,
      forecast: highForecast,
      budget: highBudget,
      cumActual: isActual ? highCumActual : null,
      cumForecast: !isActual ? highCumForecast : null,
      cumBudget: highCumBudget,
      fte,
      baseWages: Math.round(baseWages * 1.02),
      overtime: Math.round(overtime * 1.02),
      taxes: Math.round(taxes * 1.02),
      benefits: Math.round(benefits * 1.02),
      contractor: Math.round(contractor * 1.02),
      rolling3Month,
      rolling6Month
    });
  }
  
  // Fix rolling averages for high inflation scenario
  for (let i = 0; i < highInflationData.length; i++) {
    if (i >= 2) {
      const prev1 = highInflationData[i-1]?.actual || highInflationData[i-1]?.forecast || 0;
      const prev2 = highInflationData[i-2]?.actual || highInflationData[i-2]?.forecast || 0;
      const current = highInflationData[i].actual || highInflationData[i].forecast || 0;
      highInflationData[i].rolling3Month = Math.round((prev2 + prev1 + current) / 3);
    }
    
    if (i >= 5) {
      let sum = highInflationData[i].actual || highInflationData[i].forecast || 0;
      for (let j = 1; j <= 5; j++) {
        sum += highInflationData[i-j]?.actual || highInflationData[i-j]?.forecast || 0;
      }
      highInflationData[i].rolling6Month = Math.round(sum / 6);
    }
  }
  
  return [
    {
      name: 'Baseline (3% Inflation)',
      inflationRate: 3,
      data: baselineData
    },
    {
      name: 'High (5% Inflation)',
      inflationRate: 5,
      data: highInflationData
    }
  ];
};

// Calculate summary metrics
const calculateSummaryMetrics = (data: CostDataPoint[], dateRange: DateRangeOption) => {
  // Determine slice of data to analyze based on date range
  const sliceSize = dateRange === '6m' ? 6 : dateRange === '12m' ? 12 : 24;
  const relevantData = data.slice(12, 12 + sliceSize); // Start from current month (index 12)
  
  // Next quarter projection (sum of next 3 months)
  const nextQuarterProjection = relevantData
    .slice(0, 3)
    .reduce((sum, item) => sum + (item.forecast || 0), 0);
  
  // Average cost per FTE
  const totalCost = relevantData.reduce(
    (sum, item) => sum + (item.actual || item.forecast || 0), 
    0
  );
  const totalFTE = relevantData.reduce((sum, item) => sum + item.fte, 0);
  const avgCostPerFTE = totalCost / totalFTE;
  
  // Incremental headcount cost (average cost to add one FTE)
  // Assuming 20% overhead on top of average cost
  const incrementalHeadcountCost = avgCostPerFTE * 1.2;
  
  return {
    nextQuarterProjection,
    avgCostPerFTE,
    incrementalHeadcountCost
  };
};

// The custom hook
export const useMockCostData = () => {
  // Default filter settings
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '12m',
    department: 'All Departments',
    region: 'All Regions',
    employeeType: 'All Types',
    scenario: 'baseline',
    showRolling3Month: false,
    showRolling6Month: false,
    alertThreshold: 1000000, // $1M default threshold
  });
  
  // Generate mock data only once
  const scenarios = useMemo(() => generateMockData(), []);
  
  // Apply filters to get visible data
  const filteredData = useMemo(() => {
    const scenario = scenarios.find(s => 
      s.name.toLowerCase().includes(filters.scenario === 'baseline' ? '3%' : '5%')
    );
    
    if (!scenario) return [];
    
    // Determine the slice of data to show based on dateRange
    const months = filters.dateRange === '6m' ? 6 : 
                  filters.dateRange === '12m' ? 12 : 24;
    
    // Start from index 12 (current month) and take the specified number of months
    return scenario.data.slice(12, 12 + months);
  }, [scenarios, filters]);
  
  // Calculate summary metrics for the current view
  const summaryMetrics = useMemo(() => 
    calculateSummaryMetrics(
      scenarios.find(s => s.name.toLowerCase().includes(filters.scenario === 'baseline' ? '3%' : '5%'))?.data || [],
      filters.dateRange
    ),
  [scenarios, filters.scenario, filters.dateRange]);
  
  // Mock timestamp for "last updated"
  const lastUpdated = useMemo(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 37); // 37 minutes ago
    return date.toLocaleString();
  }, []);
  
  return {
    data: filteredData,
    filters,
    setFilters,
    summaryMetrics,
    lastUpdated,
    allDepartments: ['All Departments', 'Engineering', 'Marketing', 'Sales', 'Support', 'Operations'] as Department[],
    allRegions: ['All Regions', 'North America', 'Europe', 'Asia Pacific', 'Latin America'] as Region[],
    allEmployeeTypes: ['All Types', 'Full-time', 'Part-time', 'Contractor'] as EmployeeType[],
  };
};
