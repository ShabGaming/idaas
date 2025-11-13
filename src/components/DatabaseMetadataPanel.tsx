import { Database, Schema, Table, databases } from "@/lib/mockDataCatalogue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiEndpointPanel } from "./ApiEndpointPanel";
import { generateTableRows } from "@/lib/generateTableData";
import React, { useState } from "react";

interface DatabaseMetadataPanelProps {
  selectedItem: Database | Schema | Table | null;
  selectedType: "database" | "schema" | "table" | null;
  dbName?: string;
}

export function DatabaseMetadataPanel({ selectedItem, selectedType, dbName }: DatabaseMetadataPanelProps) {
  if (!selectedItem || !selectedType) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full p-8">
          <p className="text-muted-foreground text-center">
            Select a database, schema, or table from the tree to view its metadata
          </p>
        </CardContent>
      </Card>
    );
  }

  const RequestAccessForm = ({ databaseName }: { databaseName: string }) => {
    const [email, setEmail] = useState("");
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setEmail("");
        setReason("");
        setSubmitted(false);
      }, 2000);
    };

    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">Request Access</h3>
        {submitted ? (
          <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950">
            <div className="text-green-600 dark:text-green-400 font-semibold mb-2">
              Request Submitted Successfully!
            </div>
            <p className="text-sm text-muted-foreground">
              Your access request has been sent. You will be notified once it's reviewed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`access-email-${databaseName}`}>Intact Email *</Label>
              <Input
                id={`access-email-${databaseName}`}
                type="email"
                placeholder="your.name@intact.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern=".*@intact\.ca$"
                title="Please enter a valid Intact email address"
              />
              <p className="text-xs text-muted-foreground">
                Must be an @intact.ca email address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`access-reason-${databaseName}`}>Reason for Request *</Label>
              <Textarea
                id={`access-reason-${databaseName}`}
                placeholder="Please describe why you need access to this database..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={4}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        )}
      </div>
    );
  };

  const renderDatabaseMetadata = (db: Database) => {
    // If database has no data (rowCount === 0), show request access form with metadata
    if (db.rowCount === 0) {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{db.name}</h2>
            <p className="text-muted-foreground">{db.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Table Count</label>
              <p className="text-lg font-semibold">{db.tableCount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Rows</label>
              <p className="text-lg font-semibold">{db.rowCount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Size</label>
              <p className="text-lg font-semibold">{db.size}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <p className="text-lg font-semibold">{db.lastUpdated}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Owner</label>
              <p className="text-lg font-semibold">{db.owner}</p>
            </div>
          </div>

          <Separator />

          {/* Show schemas and tables even when requesting access */}
          {db.schemas.length > 0 && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3">Schemas</h3>
                <div className="space-y-2">
                  {db.schemas.map((schema) => (
                    <div key={schema.name} className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{schema.name}</span>
                          <Badge variant="secondary">{schema.tables.length} tables</Badge>
                        </div>
                        {schema.tables.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {schema.tables.map((table) => (
                              <div key={table.name} className="ml-4 p-2 border rounded bg-muted/30">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">{table.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {table.columns.length} columns
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{table.description}</p>
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Columns:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {table.columns.map((column) => (
                                      <span
                                        key={column.name}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-background border"
                                        title={`${column.type}${column.nullable ? " (nullable)" : ""} - ${column.description || ""}`}
                                      >
                                        {column.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          <RequestAccessForm databaseName={db.name} />
        </div>
      );
    }

    // Database with tables - show normal metadata
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{db.name}</h2>
          <p className="text-muted-foreground">{db.description}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Table Count</label>
            <p className="text-lg font-semibold">{db.tableCount.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Rows</label>
            <p className="text-lg font-semibold">{db.rowCount.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Size</label>
            <p className="text-lg font-semibold">{db.size}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
            <p className="text-lg font-semibold">{db.lastUpdated}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Owner</label>
            <p className="text-lg font-semibold">{db.owner}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Schemas</h3>
          <div className="space-y-2">
            {db.schemas.length > 0 ? (
              db.schemas.map((schema) => (
                <div key={schema.name} className="p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{schema.name}</span>
                    <Badge variant="secondary">{schema.tables.length} tables</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No schemas available</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSchemaMetadata = (schema: Schema, dbName: string) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{schema.name}</h2>
        <p className="text-muted-foreground">Schema in {dbName}</p>
      </div>

      <Separator />

      <div>
        <label className="text-sm font-medium text-muted-foreground">Table Count</label>
        <p className="text-lg font-semibold">{schema.tables.length.toLocaleString()}</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">Tables</h3>
        <div className="space-y-2">
          {schema.tables.length > 0 ? (
            schema.tables.map((table) => (
              <div key={table.name} className="p-3 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{table.name}</span>
                  <Badge variant="secondary">{table.rowCount.toLocaleString()} rows</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{table.description}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No tables available</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderTableData = (table: Table) => {
    const rows = generateTableRows(table, 100);
    
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Showing {rows.length.toLocaleString()} of {table.rowCount.toLocaleString()} rows
        </p>

        <div className="border rounded-md overflow-auto">
          <TableComponent>
            <TableHeader className="sticky top-0 bg-muted z-10">
              <TableRow>
                {table.columns.map((column) => (
                  <TableHead key={column.name} className="font-semibold whitespace-nowrap bg-muted">
                    {column.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {table.columns.map((column) => (
                    <TableCell key={column.name} className="whitespace-nowrap">
                      {formatCellValue(row[column.name], column.type)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    );
  };

  const formatCellValue = (value: any, type: string): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">NULL</span>;
    }
    
    if (typeof value === "boolean") {
      return value ? "True" : "False";
    }
    
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    
    return String(value);
  };

  const renderTableMetadata = (table: Table) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{table.name}</h2>
        <p className="text-muted-foreground">{table.description}</p>
      </div>

      <Separator />

      {/* API Endpoint Panel - shown at top for tables */}
      {(() => {
        // Find the database that contains this table to get required keys
        const parentDatabase = databases.find((db) => {
          return db.schemas.some((schema) =>
            schema.tables.some((t) => t.name === table.name && t.apiEndpoint === table.apiEndpoint)
          );
        });
        return (
          <ApiEndpointPanel
            endpoint={table.apiEndpoint}
            tableName={table.name}
            requiredKeys={parentDatabase?.requiredKeys}
          />
        );
      })()}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Row Count</label>
          <p className="text-lg font-semibold">{table.rowCount.toLocaleString()}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Size</label>
          <p className="text-lg font-semibold">{table.size}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
          <p className="text-lg font-semibold">{table.lastUpdated}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Owner</label>
          <p className="text-lg font-semibold">{table.owner}</p>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">Columns</h3>
        <div className="border rounded-md">
          <TableComponent>
            <TableHeader>
              <TableRow>
                <TableHead>Column Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nullable</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.columns.map((column) => (
                <TableRow key={column.name}>
                  <TableCell className="font-medium">{column.name}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{column.type}</code>
                  </TableCell>
                  <TableCell>
                    {column.nullable ? (
                      <Badge variant="outline">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {column.description || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        {selectedType === "table" ? (
          <CardTitle className="mb-0">{(selectedItem as Table).name}</CardTitle>
        ) : (
          <CardTitle>Metadata</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        {selectedType === "table" ? (
          <Tabs defaultValue="table" className="w-full flex-1 flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="flex-1 overflow-hidden mt-0">
              <div className="h-full overflow-y-auto">
                {renderTableData(selectedItem as Table)}
              </div>
            </TabsContent>
            <TabsContent value="metadata" className="flex-1 overflow-hidden mt-0">
              <div className="h-full overflow-y-auto">
                {renderTableMetadata(selectedItem as Table)}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
            {selectedType === "database" && renderDatabaseMetadata(selectedItem as Database)}
            {selectedType === "schema" && renderSchemaMetadata(selectedItem as Schema, dbName || "")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

