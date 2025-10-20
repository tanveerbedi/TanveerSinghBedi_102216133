import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ProductImport } from "@/components/product-import";

export default function AdminImportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Data Import</CardTitle>
        <CardDescription>Upload a CSV or JSON file to add or update products in your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductImport />
      </CardContent>
    </Card>
  );
}
