import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleData = [
  { name: "Ep 10", views: 1200 },
  { name: "Ep 11", views: 1880 },
  { name: "Ep 12", views: 1425 },
  { name: "Ep 13", views: 2340 },
  { name: "Ep 14", views: 1980 },
];

export default function StatsChart() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Sample episode reach</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="views"
              radius={[10, 10, 0, 0]}
              fill="currentColor"
              className="text-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
