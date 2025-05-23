import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Employee, Payslip, PayslipItem, YearToDateData, CompanyInfo } from '../../types/employee';

// Add necessary type augmentations for jsPDF
declare module 'jspdf' {
  interface jsPDF {
    previousAutoTable: {
      finalY: number;
    } | undefined;
  }
}

// Helper function to add company header
const addCompanyHeader = (doc: jsPDF, companyInfo: CompanyInfo): void => {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(companyInfo.name, 105, 15, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(companyInfo.address, 105, 20, { align: 'center' });
  doc.text(`${companyInfo.phone} | ${companyInfo.email}`, 105, 25, { align: 'center' });
};

// Helper function to add payslip title and reference
const addPayslipTitle = (doc: jsPDF, payslip: Payslip): void => {
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`PAYSLIP - ${payslip.period}`, 105, 35, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Reference: ${payslip.id} | Payment Date: ${format(new Date(payslip.date), 'dd MMM yyyy')} | Tax Year: 2024/2025`, 105, 40, { align: 'center' });
};

// Helper function to add employee and payment details
const addEmployeeAndPaymentDetails = (doc: jsPDF, employee: Employee, payslip: Payslip): void => {
  // Employee & Payment Info Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Employee Details', 14, 50);
  doc.text('Payment Details', 120, 50);
  
  // Employee Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const employeeDetails = [
    ['Name:', employee.name],
    ['Employee ID:', employee.id],
    ['Department:', employee.department],
    ['Role:', employee.role],
    ['Tax Code:', employee.taxCode],
    ['NI Number:', employee.nationalInsurance]
  ];
  
  let yPos = 55;
  employeeDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, 14, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(value, 40, yPos);
    yPos += 5;
  });
  
  // Payment Details
  const paymentDetails = [
    ['Pay Period:', payslip.period],
    ['Payment Date:', format(new Date(payslip.date), 'dd MMM yyyy')],
    ['Payment Method:', 'Bank Transfer'],
    ['Bank Account:', employee.bankAccount],
    ['Status:', payslip.status]
  ];
  
  yPos = 55;
  paymentDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, 120, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(value, 150, yPos);
    yPos += 5;
  });
  
  // Add separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 90, 196, 90);
};

// Helper function to add earnings table
const addEarningsTable = (doc: jsPDF, earnings: PayslipItem[], totalEarnings: number): void => {
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Earnings', 14, 100);
  
  const earningsTableBody = earnings.map(item => [
    item.label,
    `£${item.amount.toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: 105,
    head: [['Description', 'Amount']],
    body: earningsTableBody,
    foot: [['Total Earnings', `£${totalEarnings.toFixed(2)}`]],
    theme: 'grid',
    headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    margin: { left: 14, right: 105 },
    tableWidth: 85
  });
};

// Helper function to add deductions table
const addDeductionsTable = (doc: jsPDF, deductions: PayslipItem[], totalDeductions: number): void => {
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Deductions', 120, 100);
  
  const deductionsTableBody = deductions.map(item => [
    item.label,
    `-£${item.amount.toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: 105,
    head: [['Description', 'Amount']],
    body: deductionsTableBody,
    foot: [['Total Deductions', `-£${totalDeductions.toFixed(2)}`]],
    theme: 'grid',
    headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    margin: { left: 120, right: 14 },
    tableWidth: 85
  });
};

// Helper function to add net pay box
const addNetPayBox = (doc: jsPDF, payslip: Payslip, finalY: number): void => {
  doc.setFillColor(240, 240, 240);
  doc.rect(14, finalY + 10, 85, 25, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Net Pay This Period', 18, finalY + 18);
  
  doc.setFontSize(13);
  doc.text(`£${payslip.netPay.toFixed(2)}`, 85, finalY + 18, { align: 'right' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Amount transferred to your bank account on ${format(new Date(payslip.date), 'dd MMM yyyy')}`, 18, finalY + 25);
};

// Helper function to add year-to-date summary
const addYearToDateSummary = (doc: jsPDF, ytdData: YearToDateData, finalY: number): void => {
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Year-to-Date Summary', 120, finalY + 18);
  
  const ytdTableBody = [
    ['Gross Pay', `£${ytdData.grossPay.toFixed(2)}`],
    ['Income Tax', `£${ytdData.taxPaid.toFixed(2)}`],
    ['National Insurance', `£${ytdData.nationalInsurance.toFixed(2)}`],
    ['Pension', `£${ytdData.pension.toFixed(2)}` ]
  ];
  
  // Add student loan if applicable
  if (ytdData.studentLoan > 0) {
    ytdTableBody.push(['Student Loan', `£${ytdData.studentLoan.toFixed(2)}`]);
  }
  
  autoTable(doc, {
    startY: finalY + 22,
    body: ytdTableBody,
    foot: [['Net Pay YTD', `£${ytdData.netPay.toFixed(2)}`]],
    theme: 'plain',
    footStyles: { fontStyle: 'bold' },
    margin: { left: 120, right: 14 },
    tableWidth: 85
  });
};

// Helper function to add footer
const addFooter = (doc: jsPDF, companyInfo: CompanyInfo): void => {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  doc.setPage(pageCount);
  const pageHeight = doc.internal.pageSize.height;
  
  // Add separator line above footer
  doc.setDrawColor(200, 200, 200);
  doc.line(14, pageHeight - 20, 196, pageHeight - 20);
  
  // Footer text
  doc.text(`${companyInfo.name} | ${companyInfo.address} | ${companyInfo.phone}`, 105, pageHeight - 15, { align: 'center' });
  doc.text(`${companyInfo.registrationNumber} | ${companyInfo.vatNumber}`, 105, pageHeight - 10, { align: 'center' });
  
  // Add page numbers
  doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`, 196, pageHeight - 5, { align: 'right' });
};

interface GeneratePayslipPDFParams {
  employee: Employee;
  payslip: Payslip;
  earnings: PayslipItem[];
  deductions: PayslipItem[];
  totalEarnings: number;
  totalDeductions: number;
  ytdData: YearToDateData;
  companyInfo: CompanyInfo;
}

// Main function to generate and download a PDF payslip
export const generatePayslipPDF = ({
  employee,
  payslip,
  earnings,
  deductions,
  totalEarnings,
  totalDeductions,
  ytdData,
  companyInfo
}: GeneratePayslipPDFParams): void => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: `Payslip_${employee.id}_${payslip.id}`,
    subject: `Payslip for ${employee.name} - ${payslip.period}`,
    author: companyInfo.name,
    creator: 'Bolt HR Platform'
  });
  
  // Add all sections in order
  addCompanyHeader(doc, companyInfo);
  addPayslipTitle(doc, payslip);
  addEmployeeAndPaymentDetails(doc, employee, payslip);
  addEarningsTable(doc, earnings, totalEarnings);
  addDeductionsTable(doc, deductions, totalDeductions);
  
  // Get the final Y position after tables
  const finalY = doc.previousAutoTable?.finalY || 150;
  
  addNetPayBox(doc, payslip, finalY);
  addYearToDateSummary(doc, ytdData, finalY);
  addFooter(doc, companyInfo);
  
  // Save the PDF with a specific name
  doc.save(`Payslip_${employee.name.replace(/\s+/g, '_')}_${payslip.period.replace(/\s+/g, '_')}.pdf`);
};