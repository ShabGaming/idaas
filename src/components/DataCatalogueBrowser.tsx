import { useState } from "react";
import { Database, Schema, Table } from "@/lib/mockDataCatalogue";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight, ChevronDown, Database as DatabaseIcon, Folder, Table as TableIcon, Search, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RequestAccessDialog } from "./RequestAccessDialog";
import { PrefillDatasetDialog } from "./PrefillDatasetDialog";

interface DataCatalogueBrowserProps {
  databases: Database[];
  onSelect: (item: Database | Schema | Table, type: "database" | "schema" | "table", dbName?: string) => void;
}

export function DataCatalogueBrowser({ databases, onSelect }: DataCatalogueBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDatabases, setExpandedDatabases] = useState<Set<string>>(new Set());
  const [expandedSchemas, setExpandedSchemas] = useState<Set<string>>(new Set());
  const [requestAccessDialogOpen, setRequestAccessDialogOpen] = useState(false);
  const [selectedDatabaseForAccess, setSelectedDatabaseForAccess] = useState<Database | null>(null);
  const [prefillDialogOpen, setPrefillDialogOpen] = useState(false);

  const toggleDatabase = (dbName: string) => {
    const newExpanded = new Set(expandedDatabases);
    if (newExpanded.has(dbName)) {
      newExpanded.delete(dbName);
    } else {
      newExpanded.add(dbName);
    }
    setExpandedDatabases(newExpanded);
  };

  const toggleSchema = (schemaKey: string) => {
    const newExpanded = new Set(expandedSchemas);
    if (newExpanded.has(schemaKey)) {
      newExpanded.delete(schemaKey);
    } else {
      newExpanded.add(schemaKey);
    }
    setExpandedSchemas(newExpanded);
  };

  const matchesSearch = (text: string): boolean => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filterDatabase = (db: Database): boolean => {
    if (!searchQuery) return true;
    if (matchesSearch(db.name)) return true;
    return db.schemas.some((schema) => {
      if (matchesSearch(schema.name)) return true;
      return schema.tables.some((table) => matchesSearch(table.name));
    });
  };

  const filteredDatabases = databases.filter(filterDatabase);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search databases, schemas, tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredDatabases.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No databases found matching "{searchQuery}"
            </div>
          ) : (
            filteredDatabases.map((db) => (
              <Collapsible
                key={db.name}
                open={expandedDatabases.has(db.name)}
                onOpenChange={() => toggleDatabase(db.name)}
              >
                <div className="mb-1">
                  {db.tableCount > 0 ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <CollapsibleTrigger
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(db, "database");
                          }}
                        >
                          {expandedDatabases.has(db.name) ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          )}
                          <DatabaseIcon className="h-4 w-4 shrink-0 text-primary" />
                          <span className="font-medium flex-1">{db.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {db.tableCount} {db.tableCount === 1 ? "table" : "tables"}
                          </span>
                        </CollapsibleTrigger>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80" side="right" align="start" sideOffset={8}>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">{db.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {db.description}
                            </p>
                          </div>
                          <Separator />
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-muted-foreground">Tables</span>
                              <p className="font-medium">{db.tableCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Total Rows</span>
                              <p className="font-medium">{db.rowCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Size</span>
                              <p className="font-medium">{db.size}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Owner</span>
                              <p className="font-medium">{db.owner}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Last Updated</span>
                              <p className="font-medium">{db.lastUpdated}</p>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <CollapsibleTrigger
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDatabaseForAccess(db);
                        setRequestAccessDialogOpen(true);
                      }}
                    >
                      {expandedDatabases.has(db.name) ? (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      )}
                      <DatabaseIcon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="font-medium flex-1">{db.name}</span>
                      <Badge variant="destructive" className="text-xs">
                        Request Access
                      </Badge>
                    </CollapsibleTrigger>
                  )}

                  <CollapsibleContent>
                    <div className="ml-7 mt-1 space-y-1">
                      {db.schemas.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground italic">
                          No schemas
                        </div>
                      ) : (
                        db.schemas
                          .filter((schema) => !searchQuery || matchesSearch(schema.name) || schema.tables.some((t) => matchesSearch(t.name)))
                          .map((schema) => {
                            const schemaKey = `${db.name}.${schema.name}`;
                            return (
                              <Collapsible
                                key={schemaKey}
                                open={expandedSchemas.has(schemaKey)}
                                onOpenChange={() => toggleSchema(schemaKey)}
                              >
                                <div>
                                  <CollapsibleTrigger
                                    className={cn(
                                      "w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left",
                                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelect(schema, "schema", db.name);
                                    }}
                                  >
                                    {expandedSchemas.has(schemaKey) ? (
                                      <ChevronDown className="h-4 w-4 shrink-0" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 shrink-0" />
                                    )}
                                    <Folder className="h-4 w-4 shrink-0 text-blue-500" />
                                    <span className="text-sm flex-1">{schema.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {schema.tables.length} {schema.tables.length === 1 ? "table" : "tables"}
                                    </span>
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                    <div className="ml-7 mt-1 space-y-1">
                                      {schema.tables.length === 0 ? (
                                        <div className="px-3 py-2 text-sm text-muted-foreground italic">
                                          No tables
                                        </div>
                                      ) : (
                                        schema.tables
                                          .filter((table) => !searchQuery || matchesSearch(table.name))
                                          .map((table) => (
                                            <button
                                              key={table.name}
                                              className={cn(
                                                "w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left",
                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                              )}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect(table, "table", db.name);
                                              }}
                                            >
                                              <TableIcon className="h-4 w-4 shrink-0 text-green-500" />
                                              <span className="text-sm flex-1">{table.name}</span>
                                              <span className="text-xs text-muted-foreground">
                                                {table.rowCount.toLocaleString()} rows
                                              </span>
                                            </button>
                                          ))
                                      )}
                                    </div>
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            );
                          })
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Prefill Dataset Button */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setPrefillDialogOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Prefill Dataset
        </Button>
      </div>

      <RequestAccessDialog
        database={selectedDatabaseForAccess}
        open={requestAccessDialogOpen}
        onOpenChange={setRequestAccessDialogOpen}
      />

      <PrefillDatasetDialog
        open={prefillDialogOpen}
        onOpenChange={setPrefillDialogOpen}
        databases={databases}
      />
    </div>
  );
}

