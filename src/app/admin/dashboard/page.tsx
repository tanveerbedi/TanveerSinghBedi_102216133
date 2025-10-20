import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>This is your control center for managing products, analyzing data, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Use the sidebar navigation to access different sections of the admin panel. You can manage products, view analytics, and import new product data.</p>
        </CardContent>
      </Card>
    </div>
  );
}
