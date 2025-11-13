// TypeScript interfaces and mock data for Data Catalogue

export interface Column {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
}

export interface Table {
  name: string;
  rowCount: number;
  size: string;
  lastUpdated: string;
  owner: string;
  description: string;
  columns: Column[];
  apiEndpoint: string;
}

export interface Schema {
  name: string;
  tables: Table[];
}

export interface Database {
  name: string;
  tableCount: number;
  rowCount: number;
  size: string;
  lastUpdated: string;
  owner: string;
  description: string;
  schemas: Schema[];
  requiredKeys?: string[];
}

// Mock data for exposure_db
const exposureDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "property_exposures",
        rowCount: 125000,
        size: "2.4 GB",
        lastUpdated: "2024-01-15 10:30:00",
        owner: "data_engineer",
        description: "Comprehensive property exposure data including building details, location, and risk factors",
        columns: [
          { name: "id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "property_id", type: "VARCHAR(50)", nullable: false, description: "Unique property identifier" },
          { name: "address", type: "VARCHAR(255)", nullable: false },
          { name: "city", type: "VARCHAR(100)", nullable: false },
          { name: "province", type: "VARCHAR(50)", nullable: false },
          { name: "postal_code", type: "VARCHAR(10)", nullable: true },
          { name: "building_type", type: "VARCHAR(50)", nullable: false },
          { name: "construction_year", type: "INTEGER", nullable: true },
          { name: "total_value", type: "DECIMAL(15,2)", nullable: false },
          { name: "risk_score", type: "DECIMAL(5,2)", nullable: true },
          { name: "created_at", type: "TIMESTAMP", nullable: false },
          { name: "updated_at", type: "TIMESTAMP", nullable: false },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/exposure_db/core/property_exposures",
      },
      {
        name: "risk_assessments",
        rowCount: 89000,
        size: "1.8 GB",
        lastUpdated: "2024-01-14 14:20:00",
        owner: "risk_analyst",
        description: "Detailed risk assessment records for properties including flood, fire, and earthquake risks",
        columns: [
          { name: "assessment_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "property_id", type: "VARCHAR(50)", nullable: false },
          { name: "assessment_type", type: "VARCHAR(50)", nullable: false },
          { name: "risk_level", type: "VARCHAR(20)", nullable: false },
          { name: "score", type: "DECIMAL(5,2)", nullable: false },
          { name: "assessment_date", type: "DATE", nullable: false },
          { name: "assessor", type: "VARCHAR(100)", nullable: true },
          { name: "notes", type: "TEXT", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/exposure_db/core/risk_assessments",
      },
      {
        name: "geographic_data",
        rowCount: 45000,
        size: "950 MB",
        lastUpdated: "2024-01-13 09:15:00",
        owner: "data_engineer",
        description: "Geographic and geospatial data for property locations",
        columns: [
          { name: "geo_id", type: "BIGINT", nullable: false },
          { name: "property_id", type: "VARCHAR(50)", nullable: false },
          { name: "latitude", type: "DECIMAL(10,8)", nullable: false },
          { name: "longitude", type: "DECIMAL(11,8)", nullable: false },
          { name: "elevation", type: "DECIMAL(8,2)", nullable: true },
          { name: "flood_zone", type: "VARCHAR(50)", nullable: true },
          { name: "earthquake_zone", type: "VARCHAR(50)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/exposure_db/core/geographic_data",
      },
    ],
  },
  {
    name: "analytics",
    tables: [
      {
        name: "exposure_trends",
        rowCount: 12000,
        size: "280 MB",
        lastUpdated: "2024-01-15 08:00:00",
        owner: "analytics_team",
        description: "Aggregated exposure trends and statistics over time",
        columns: [
          { name: "trend_id", type: "BIGINT", nullable: false },
          { name: "region", type: "VARCHAR(100)", nullable: false },
          { name: "period", type: "DATE", nullable: false },
          { name: "total_exposure", type: "DECIMAL(15,2)", nullable: false },
          { name: "property_count", type: "INTEGER", nullable: false },
          { name: "avg_risk_score", type: "DECIMAL(5,2)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/exposure_db/analytics/exposure_trends",
      },
    ],
  },
];

// Mock data for building_db
const buildingDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "buildings",
        rowCount: 98000,
        size: "3.2 GB",
        lastUpdated: "2024-01-15 11:45:00",
        owner: "building_admin",
        description: "Master building inventory with detailed structural and material information",
        columns: [
          { name: "building_id", type: "BIGINT", nullable: false },
          { name: "building_code", type: "VARCHAR(50)", nullable: false },
          { name: "name", type: "VARCHAR(255)", nullable: false },
          { name: "address", type: "VARCHAR(255)", nullable: false },
          { name: "building_type", type: "VARCHAR(50)", nullable: false },
          { name: "construction_material", type: "VARCHAR(50)", nullable: false },
          { name: "stories", type: "INTEGER", nullable: true },
          { name: "total_area_sqft", type: "DECIMAL(12,2)", nullable: false },
          { name: "year_built", type: "INTEGER", nullable: true },
          { name: "year_renovated", type: "INTEGER", nullable: true },
          { name: "occupancy_type", type: "VARCHAR(50)", nullable: false },
          { name: "fire_safety_rating", type: "VARCHAR(20)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/building_db/core/buildings",
      },
      {
        name: "building_inspections",
        rowCount: 156000,
        size: "2.1 GB",
        lastUpdated: "2024-01-14 16:30:00",
        owner: "inspection_team",
        description: "Historical building inspection records and reports",
        columns: [
          { name: "inspection_id", type: "BIGINT", nullable: false },
          { name: "building_id", type: "BIGINT", nullable: false },
          { name: "inspection_date", type: "DATE", nullable: false },
          { name: "inspector_name", type: "VARCHAR(100)", nullable: false },
          { name: "inspection_type", type: "VARCHAR(50)", nullable: false },
          { name: "status", type: "VARCHAR(20)", nullable: false },
          { name: "findings", type: "TEXT", nullable: true },
          { name: "recommendations", type: "TEXT", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/building_db/core/building_inspections",
      },
      {
        name: "maintenance_records",
        rowCount: 234000,
        size: "1.9 GB",
        lastUpdated: "2024-01-15 09:20:00",
        owner: "facilities_team",
        description: "Maintenance and repair history for all buildings",
        columns: [
          { name: "maintenance_id", type: "BIGINT", nullable: false },
          { name: "building_id", type: "BIGINT", nullable: false },
          { name: "maintenance_date", type: "DATE", nullable: false },
          { name: "maintenance_type", type: "VARCHAR(50)", nullable: false },
          { name: "description", type: "TEXT", nullable: false },
          { name: "cost", type: "DECIMAL(12,2)", nullable: true },
          { name: "contractor", type: "VARCHAR(100)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/building_db/core/maintenance_records",
      },
    ],
  },
  {
    name: "structural",
    tables: [
      {
        name: "structural_elements",
        rowCount: 450000,
        size: "4.5 GB",
        lastUpdated: "2024-01-13 12:00:00",
        owner: "structural_engineer",
        description: "Detailed structural element inventory including beams, columns, and foundations",
        columns: [
          { name: "element_id", type: "BIGINT", nullable: false },
          { name: "building_id", type: "BIGINT", nullable: false },
          { name: "element_type", type: "VARCHAR(50)", nullable: false },
          { name: "material", type: "VARCHAR(50)", nullable: false },
          { name: "dimensions", type: "VARCHAR(100)", nullable: true },
          { name: "condition_rating", type: "VARCHAR(20)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/building_db/structural/structural_elements",
      },
    ],
  },
];

// Mock data for firehalls_db
const firehallsDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "fire_stations",
        rowCount: 3200,
        size: "125 MB",
        lastUpdated: "2024-01-15 13:00:00",
        owner: "fire_services",
        description: "Fire station locations, contact information, and operational details",
        columns: [
          { name: "station_id", type: "BIGINT", nullable: false },
          { name: "station_number", type: "VARCHAR(20)", nullable: false },
          { name: "name", type: "VARCHAR(255)", nullable: false },
          { name: "address", type: "VARCHAR(255)", nullable: false },
          { name: "city", type: "VARCHAR(100)", nullable: false },
          { name: "province", type: "VARCHAR(50)", nullable: false },
          { name: "postal_code", type: "VARCHAR(10)", nullable: false },
          { name: "latitude", type: "DECIMAL(10,8)", nullable: false },
          { name: "longitude", type: "DECIMAL(11,8)", nullable: false },
          { name: "phone", type: "VARCHAR(20)", nullable: true },
          { name: "is_active", type: "BOOLEAN", nullable: false },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/firehalls_db/core/fire_stations",
      },
      {
        name: "response_times",
        rowCount: 1250000,
        size: "2.8 GB",
        lastUpdated: "2024-01-15 12:30:00",
        owner: "fire_services",
        description: "Historical fire response time data by station and incident type",
        columns: [
          { name: "response_id", type: "BIGINT", nullable: false },
          { name: "station_id", type: "BIGINT", nullable: false },
          { name: "incident_id", type: "VARCHAR(50)", nullable: false },
          { name: "incident_type", type: "VARCHAR(50)", nullable: false },
          { name: "dispatch_time", type: "TIMESTAMP", nullable: false },
          { name: "arrival_time", type: "TIMESTAMP", nullable: true },
          { name: "response_time_seconds", type: "INTEGER", nullable: true },
          { name: "distance_km", type: "DECIMAL(8,2)", nullable: true },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/firehalls_db/core/response_times",
      },
      {
        name: "equipment_inventory",
        rowCount: 8500,
        size: "95 MB",
        lastUpdated: "2024-01-14 10:00:00",
        owner: "equipment_manager",
        description: "Fire station equipment inventory including vehicles, tools, and apparatus",
        columns: [
          { name: "equipment_id", type: "BIGINT", nullable: false },
          { name: "station_id", type: "BIGINT", nullable: false },
          { name: "equipment_type", type: "VARCHAR(50)", nullable: false },
          { name: "equipment_name", type: "VARCHAR(255)", nullable: false },
          { name: "serial_number", type: "VARCHAR(100)", nullable: true },
          { name: "purchase_date", type: "DATE", nullable: true },
          { name: "last_service_date", type: "DATE", nullable: true },
          { name: "status", type: "VARCHAR(20)", nullable: false },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/firehalls_db/core/equipment_inventory",
      },
    ],
  },
];

// Calculate totals for databases
const calculateDatabaseStats = (schemas: Schema[]) => {
  let totalTables = 0;
  let totalRows = 0;
  let totalSizeBytes = 0;

  schemas.forEach((schema) => {
    totalTables += schema.tables.length;
    schema.tables.forEach((table) => {
      totalRows += table.rowCount;
      // Parse size string (e.g., "2.4 GB" -> 2.4 * 1024 * 1024 * 1024)
      const sizeMatch = table.size.match(/([\d.]+)\s*(GB|MB|KB)/i);
      if (sizeMatch) {
        const value = parseFloat(sizeMatch[1]);
        const unit = sizeMatch[2].toUpperCase();
        const multiplier = unit === "GB" ? 1024 * 1024 * 1024 : unit === "MB" ? 1024 * 1024 : 1024;
        totalSizeBytes += value * multiplier;
      }
    });
  });

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
  };

  return {
    tableCount: totalTables,
    rowCount: totalRows,
    size: formatSize(totalSizeBytes),
  };
};

const exposureStats = calculateDatabaseStats(exposureDbSchemas);
const buildingStats = calculateDatabaseStats(buildingDbSchemas);
const firehallsStats = calculateDatabaseStats(firehallsDbSchemas);

// Mock data for claims_db
const claimsDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "claims",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "claims_team",
        description: "Insurance claims records including claim details, status, and processing information",
        columns: [
          { name: "claim_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "policy_number", type: "VARCHAR(50)", nullable: false, description: "Associated policy number" },
          { name: "claim_number", type: "VARCHAR(50)", nullable: false, description: "Unique claim identifier" },
          { name: "claim_type", type: "VARCHAR(50)", nullable: false, description: "Type of claim (auto, property, liability, etc.)" },
          { name: "incident_date", type: "DATE", nullable: false, description: "Date of the incident" },
          { name: "report_date", type: "DATE", nullable: false, description: "Date claim was reported" },
          { name: "claim_status", type: "VARCHAR(50)", nullable: false, description: "Current status (open, closed, pending, denied)" },
          { name: "claim_amount", type: "DECIMAL(15,2)", nullable: true, description: "Total claim amount" },
          { name: "paid_amount", type: "DECIMAL(15,2)", nullable: true, description: "Amount paid to date" },
          { name: "adjuster_id", type: "VARCHAR(50)", nullable: true, description: "Assigned adjuster identifier" },
          { name: "description", type: "TEXT", nullable: true, description: "Detailed claim description" },
          { name: "created_at", type: "TIMESTAMP", nullable: false, description: "Record creation timestamp" },
          { name: "updated_at", type: "TIMESTAMP", nullable: false, description: "Last update timestamp" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/claims_db/core/claims",
      },
      {
        name: "claim_documents",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "claims_team",
        description: "Documents and attachments associated with claims",
        columns: [
          { name: "document_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "claim_id", type: "BIGINT", nullable: false, description: "Foreign key to claims table" },
          { name: "document_type", type: "VARCHAR(50)", nullable: false, description: "Type of document (photo, report, invoice, etc.)" },
          { name: "file_name", type: "VARCHAR(255)", nullable: false, description: "Original file name" },
          { name: "file_path", type: "VARCHAR(500)", nullable: false, description: "Storage path for the document" },
          { name: "file_size", type: "BIGINT", nullable: false, description: "File size in bytes" },
          { name: "uploaded_by", type: "VARCHAR(100)", nullable: false, description: "User who uploaded the document" },
          { name: "uploaded_at", type: "TIMESTAMP", nullable: false, description: "Upload timestamp" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/claims_db/core/claim_documents",
      },
    ],
  },
];

// Mock data for policies_db
const policiesDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "policies",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "underwriting",
        description: "Insurance policy records with coverage details and terms",
        columns: [
          { name: "policy_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "policy_number", type: "VARCHAR(50)", nullable: false, description: "Unique policy number" },
          { name: "policy_type", type: "VARCHAR(50)", nullable: false, description: "Type of policy (auto, home, commercial, etc.)" },
          { name: "customer_id", type: "VARCHAR(50)", nullable: false, description: "Customer identifier" },
          { name: "effective_date", type: "DATE", nullable: false, description: "Policy effective start date" },
          { name: "expiration_date", type: "DATE", nullable: false, description: "Policy expiration date" },
          { name: "premium_amount", type: "DECIMAL(15,2)", nullable: false, description: "Annual premium amount" },
          { name: "coverage_limit", type: "DECIMAL(15,2)", nullable: true, description: "Maximum coverage limit" },
          { name: "deductible", type: "DECIMAL(15,2)", nullable: true, description: "Policy deductible amount" },
          { name: "status", type: "VARCHAR(50)", nullable: false, description: "Policy status (active, expired, cancelled, pending)" },
          { name: "underwriter_id", type: "VARCHAR(50)", nullable: true, description: "Assigned underwriter identifier" },
          { name: "created_at", type: "TIMESTAMP", nullable: false, description: "Record creation timestamp" },
          { name: "updated_at", type: "TIMESTAMP", nullable: false, description: "Last update timestamp" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/policies_db/core/policies",
      },
      {
        name: "policy_coverage",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "underwriting",
        description: "Detailed coverage information for each policy",
        columns: [
          { name: "coverage_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "policy_id", type: "BIGINT", nullable: false, description: "Foreign key to policies table" },
          { name: "coverage_type", type: "VARCHAR(50)", nullable: false, description: "Type of coverage (liability, collision, comprehensive, etc.)" },
          { name: "coverage_amount", type: "DECIMAL(15,2)", nullable: false, description: "Coverage amount for this type" },
          { name: "is_optional", type: "BOOLEAN", nullable: false, description: "Whether this coverage is optional" },
          { name: "description", type: "TEXT", nullable: true, description: "Coverage description" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/policies_db/core/policy_coverage",
      },
    ],
  },
];

// Mock data for analytics_db
const analyticsDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "analytics_dashboards",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "analytics_team",
        description: "Analytics dashboard configurations and metadata",
        columns: [
          { name: "dashboard_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "dashboard_name", type: "VARCHAR(255)", nullable: false, description: "Dashboard display name" },
          { name: "dashboard_type", type: "VARCHAR(50)", nullable: false, description: "Type of dashboard (executive, operational, financial, etc.)" },
          { name: "owner", type: "VARCHAR(100)", nullable: false, description: "Dashboard owner" },
          { name: "last_refreshed", type: "TIMESTAMP", nullable: true, description: "Last data refresh timestamp" },
          { name: "refresh_frequency", type: "VARCHAR(50)", nullable: true, description: "Refresh frequency (daily, weekly, monthly)" },
          { name: "is_active", type: "BOOLEAN", nullable: false, description: "Whether dashboard is active" },
          { name: "created_at", type: "TIMESTAMP", nullable: false, description: "Creation timestamp" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/analytics_db/core/analytics_dashboards",
      },
      {
        name: "kpi_metrics",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "analytics_team",
        description: "Key performance indicators and metric definitions",
        columns: [
          { name: "metric_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "metric_name", type: "VARCHAR(255)", nullable: false, description: "Metric name" },
          { name: "metric_category", type: "VARCHAR(50)", nullable: false, description: "Metric category (sales, claims, customer, etc.)" },
          { name: "metric_value", type: "DECIMAL(15,2)", nullable: true, description: "Current metric value" },
          { name: "target_value", type: "DECIMAL(15,2)", nullable: true, description: "Target value for the metric" },
          { name: "calculation_method", type: "VARCHAR(100)", nullable: true, description: "How the metric is calculated" },
          { name: "last_calculated", type: "TIMESTAMP", nullable: true, description: "Last calculation timestamp" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/analytics_db/core/kpi_metrics",
      },
    ],
  },
  {
    name: "reports",
    tables: [
      {
        name: "report_history",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "analytics_team",
        description: "Historical record of generated reports",
        columns: [
          { name: "report_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "report_name", type: "VARCHAR(255)", nullable: false, description: "Report name" },
          { name: "report_type", type: "VARCHAR(50)", nullable: false, description: "Type of report" },
          { name: "generated_by", type: "VARCHAR(100)", nullable: false, description: "User who generated the report" },
          { name: "generated_at", type: "TIMESTAMP", nullable: false, description: "Generation timestamp" },
          { name: "file_path", type: "VARCHAR(500)", nullable: true, description: "Path to generated report file" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/analytics_db/reports/report_history",
      },
    ],
  },
];

// Mock data for reports_db
const reportsDbSchemas: Schema[] = [
  {
    name: "core",
    tables: [
      {
        name: "generated_reports",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "reporting_team",
        description: "Generated report files and metadata",
        columns: [
          { name: "report_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "report_name", type: "VARCHAR(255)", nullable: false, description: "Report name" },
          { name: "report_type", type: "VARCHAR(50)", nullable: false, description: "Report type (monthly, quarterly, annual, ad-hoc)" },
          { name: "report_format", type: "VARCHAR(20)", nullable: false, description: "File format (PDF, Excel, CSV, etc.)" },
          { name: "file_path", type: "VARCHAR(500)", nullable: false, description: "Storage path for the report file" },
          { name: "file_size", type: "BIGINT", nullable: false, description: "File size in bytes" },
          { name: "generated_by", type: "VARCHAR(100)", nullable: false, description: "User who generated the report" },
          { name: "generation_date", type: "TIMESTAMP", nullable: false, description: "Report generation timestamp" },
          { name: "report_period_start", type: "DATE", nullable: true, description: "Start date of report period" },
          { name: "report_period_end", type: "DATE", nullable: true, description: "End date of report period" },
          { name: "status", type: "VARCHAR(50)", nullable: false, description: "Report status (generating, completed, failed)" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/reports_db/core/generated_reports",
      },
      {
        name: "report_templates",
        rowCount: 0,
        size: "0 B",
        lastUpdated: "2024-01-01 00:00:00",
        owner: "reporting_team",
        description: "Report template definitions and configurations",
        columns: [
          { name: "template_id", type: "BIGINT", nullable: false, description: "Primary key" },
          { name: "template_name", type: "VARCHAR(255)", nullable: false, description: "Template name" },
          { name: "template_type", type: "VARCHAR(50)", nullable: false, description: "Type of template" },
          { name: "template_config", type: "TEXT", nullable: false, description: "JSON configuration for the template" },
          { name: "created_by", type: "VARCHAR(100)", nullable: false, description: "User who created the template" },
          { name: "created_at", type: "TIMESTAMP", nullable: false, description: "Creation timestamp" },
          { name: "is_active", type: "BOOLEAN", nullable: false, description: "Whether template is active" },
        ],
        apiEndpoint: "https://api.intact-risk-navigator.com/v1/reports_db/core/report_templates",
      },
    ],
  },
];

const claimsStats = calculateDatabaseStats(claimsDbSchemas);
const policiesStats = calculateDatabaseStats(policiesDbSchemas);
const analyticsStats = calculateDatabaseStats(analyticsDbSchemas);
const reportsStats = calculateDatabaseStats(reportsDbSchemas);

// Main databases with rich data
export const databases: Database[] = [
  {
    name: "exposure_db",
    tableCount: exposureStats.tableCount,
    rowCount: exposureStats.rowCount,
    size: exposureStats.size,
    lastUpdated: "2024-01-15 10:30:00",
    owner: "data_engineering",
    description: "Comprehensive database containing property exposure data, risk assessments, and geographic information for insurance risk analysis",
    schemas: exposureDbSchemas,
    requiredKeys: ["business_name", "address"],
  },
  {
    name: "building_db",
    tableCount: buildingStats.tableCount,
    rowCount: buildingStats.rowCount,
    size: buildingStats.size,
    lastUpdated: "2024-01-15 11:45:00",
    owner: "facilities_management",
    description: "Building inventory database with detailed structural information, inspection records, and maintenance history",
    schemas: buildingDbSchemas,
    requiredKeys: ["address"],
  },
  {
    name: "firehalls_db",
    tableCount: firehallsStats.tableCount,
    rowCount: firehallsStats.rowCount,
    size: firehallsStats.size,
    lastUpdated: "2024-01-15 13:00:00",
    owner: "fire_services",
    description: "Fire station database containing station locations, response times, and equipment inventory",
    schemas: firehallsDbSchemas,
    requiredKeys: ["address"],
  },
  // Databases requiring access
  {
    name: "claims_db",
    tableCount: claimsStats.tableCount,
    rowCount: claimsStats.rowCount,
    size: claimsStats.size,
    lastUpdated: "2024-01-15 14:00:00",
    owner: "claims_team",
    description: "Insurance claims database containing claim records, documents, and processing information for managing insurance claims lifecycle",
    schemas: claimsDbSchemas,
  },
  {
    name: "policies_db",
    tableCount: policiesStats.tableCount,
    rowCount: policiesStats.rowCount,
    size: policiesStats.size,
    lastUpdated: "2024-01-15 14:30:00",
    owner: "underwriting",
    description: "Insurance policies database with policy details, coverage information, and terms for all insurance products",
    schemas: policiesDbSchemas,
  },
  {
    name: "analytics_db",
    tableCount: analyticsStats.tableCount,
    rowCount: analyticsStats.rowCount,
    size: analyticsStats.size,
    lastUpdated: "2024-01-15 15:00:00",
    owner: "analytics_team",
    description: "Analytics and reporting database containing dashboards, KPI metrics, and analytical data for business intelligence",
    schemas: analyticsDbSchemas,
  },
  {
    name: "reports_db",
    tableCount: reportsStats.tableCount,
    rowCount: reportsStats.rowCount,
    size: reportsStats.size,
    lastUpdated: "2024-01-15 15:30:00",
    owner: "reporting_team",
    description: "Generated reports database storing report files, templates, and metadata for all system-generated reports",
    schemas: reportsDbSchemas,
  },
];

