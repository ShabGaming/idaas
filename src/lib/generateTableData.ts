import { Table, Column } from "./mockDataCatalogue";

// Generate mock row data for a table based on its column definitions
export function generateTableRows(table: Table, limit: number = 100): Record<string, any>[] {
  const rows: Record<string, any>[] = [];
  
  for (let i = 0; i < Math.min(limit, table.rowCount); i++) {
    const row: Record<string, any> = {};
    
    table.columns.forEach((column) => {
      row[column.name] = generateValueForColumn(column, i);
    });
    
    rows.push(row);
  }
  
  return rows;
}

function generateValueForColumn(column: Column, rowIndex: number): any {
  const name = column.name.toLowerCase();
  const type = column.type.toUpperCase();
  
  // Generate realistic mock data based on column name and type
  if (name.includes("id") && name.includes("primary") || name === "id") {
    return rowIndex + 1;
  }
  
  if (name.includes("property_id") || name.includes("building_id") || name.includes("station_id")) {
    return `PROP-${String(rowIndex + 1).padStart(6, "0")}`;
  }
  
  if (name.includes("address")) {
    const addresses = [
      "123 Main Street",
      "456 Oak Avenue",
      "789 Pine Road",
      "321 Elm Boulevard",
      "654 Maple Drive",
      "987 Cedar Lane",
      "147 Birch Court",
      "258 Spruce Way",
    ];
    return addresses[rowIndex % addresses.length];
  }
  
  if (name.includes("city")) {
    const cities = ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City"];
    return cities[rowIndex % cities.length];
  }
  
  if (name.includes("province")) {
    const provinces = ["ON", "QC", "BC", "AB", "MB", "SK", "NS", "NB"];
    return provinces[rowIndex % provinces.length];
  }
  
  if (name.includes("postal_code")) {
    const codes = ["M5H 2N2", "H3A 0G4", "V6B 1A1", "T2P 1J9", "K1A 0A6", "T5J 2R7", "R3C 0V3", "B3H 4R2"];
    return codes[rowIndex % codes.length];
  }
  
  if (name.includes("name")) {
    const names = [
      "Evergreen Building",
      "Sunset Plaza",
      "Riverside Complex",
      "Mountain View Tower",
      "Oceanfront Center",
      "Downtown Hub",
      "Parkview Residence",
      "Harbor Point",
    ];
    return names[rowIndex % names.length];
  }
  
  if (name.includes("type") || name.includes("category")) {
    const types = ["Residential", "Commercial", "Industrial", "Mixed Use", "Office", "Retail", "Warehouse", "Other"];
    return types[rowIndex % types.length];
  }
  
  if (name.includes("year") || name.includes("date") && type.includes("INT")) {
    return 1980 + (rowIndex % 45);
  }
  
  if (name.includes("date") && !type.includes("INT")) {
    const baseDate = new Date(2024, 0, 1);
    baseDate.setDate(baseDate.getDate() + rowIndex);
    if (type.includes("TIMESTAMP")) {
      return baseDate.toISOString().replace("T", " ").substring(0, 19);
    }
    return baseDate.toISOString().split("T")[0];
  }
  
  if (name.includes("value") || name.includes("cost") || name.includes("price")) {
    return (Math.random() * 1000000 + 10000).toFixed(2);
  }
  
  if (name.includes("score") || name.includes("rating")) {
    return (Math.random() * 5 + 1).toFixed(2);
  }
  
  if (name.includes("latitude")) {
    return (43.6532 + (Math.random() - 0.5) * 10).toFixed(6);
  }
  
  if (name.includes("longitude")) {
    return (-79.3832 + (Math.random() - 0.5) * 10).toFixed(6);
  }
  
  if (name.includes("phone")) {
    return `(416) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  }
  
  if (name.includes("email")) {
    return `user${rowIndex + 1}@example.com`;
  }
  
  if (name.includes("boolean") || type.includes("BOOLEAN")) {
    return rowIndex % 2 === 0;
  }
  
  if (name.includes("status")) {
    const statuses = ["Active", "Inactive", "Pending", "Completed", "Cancelled"];
    return statuses[rowIndex % statuses.length];
  }
  
  if (name.includes("description") || name.includes("notes") || name.includes("findings")) {
    return `Sample description text for row ${rowIndex + 1}. This is mock data generated for demonstration purposes.`;
  }
  
  // Type-based generation
  if (type.includes("INT") || type.includes("BIGINT")) {
    return rowIndex + 1;
  }
  
  if (type.includes("DECIMAL") || type.includes("FLOAT") || type.includes("DOUBLE")) {
    return (Math.random() * 1000).toFixed(2);
  }
  
  if (type.includes("VARCHAR") || type.includes("TEXT")) {
    return `Sample text ${rowIndex + 1}`;
  }
  
  if (type.includes("BOOLEAN")) {
    return rowIndex % 2 === 0;
  }
  
  // Default fallback
  return `Value ${rowIndex + 1}`;
}

