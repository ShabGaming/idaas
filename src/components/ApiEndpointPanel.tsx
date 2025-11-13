import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ApiEndpointPanelProps {
  endpoint: string;
  tableName: string;
  requiredKeys?: string[];
}

export function ApiEndpointPanel({ endpoint, tableName, requiredKeys }: ApiEndpointPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const curlExample = `curl -X GET "${endpoint}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

  const javascriptExample = `fetch("${endpoint}", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`;

  const pythonExample = `import requests

url = "${endpoint}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;

  const exampleResponse = `{
  "data": [
    {
      "id": 1,
      "name": "Example Record",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 100,
    "total": 125000
  }
}`;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          API Endpoint
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Endpoint URL
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono break-all">
              {endpoint}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(endpoint, "endpoint")}
            >
              {copied === "endpoint" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curl" className="mt-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                <code>{curlExample}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(curlExample, "curl")}
              >
                {copied === "curl" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="mt-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                <code>{javascriptExample}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(javascriptExample, "javascript")}
              >
                {copied === "javascript" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="python" className="mt-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                <code>{pythonExample}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(pythonExample, "python")}
              >
                {copied === "python" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="response" className="mt-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                <code>{exampleResponse}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(exampleResponse, "response")}
              >
                {copied === "response" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {requiredKeys && requiredKeys.length > 0 && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p className="font-medium mb-2">Required Keys:</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {requiredKeys.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {key}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground">
              Your dataset must include these keys for successful data import.
            </p>
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          <p className="font-medium mb-1">Authentication:</p>
          <p>All requests require a Bearer token in the Authorization header. Contact your administrator for API key access.</p>
        </div>
      </CardContent>
    </Card>
  );
}

