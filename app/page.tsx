import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RootPage() {
  return (
    <div className="container mx-auto">
      <Card className="relative h-full w-56 mt-20 overflow-hidden rounded-lg bg- transition-colors group hover:bg-emerald-600">
        <CardHeader>O</CardHeader>
        <CardContent className="space-y-1.5">
          <CardTitle className="capitalize text-emerald-600 group-hover:text-white">
            aok
          </CardTitle>
          <CardDescription className="group-hover:text-white">
            Products
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
