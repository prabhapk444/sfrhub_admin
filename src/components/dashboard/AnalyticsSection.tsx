import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Award } from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { format } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface OrderData {
  date?: string;
  month?: string;
  orders: number;
}

interface ServiceData {
  name: string;
  value: number;
}

interface UserGrowthData {
  month: string;
  users: number;
}

function toDate(obj: any): Date | null {
  if (!obj) return null;
  if (typeof obj.toDate === "function") return obj.toDate();
  if (obj instanceof Date) return obj;
  if (typeof obj === "string" || typeof obj === "number") {
    const d = new Date(obj);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

export const AnalyticsSection = () => {
  const [highestService, setHighestService] = useState<ServiceData>({
    name: "Loading...",
    value: 0,
  });

  const [timeframe, setTimeframe] = useState<"daily" | "monthly">("daily");
  const [dailyOrdersData, setDailyOrdersData] = useState<OrderData[]>([]);
  const [monthlyOrdersData, setMonthlyOrdersData] = useState<OrderData[]>([]);
  const [serviceRequestsData, setServiceRequestsData] = useState<ServiceData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData[]>([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      const snapshot = await getDocs(collection(db, "enquiries"));
      const dailyCount: Record<string, number> = {};
      const monthlyCount: Record<string, number> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const rawTimestamp = data.createdAt || data.date;
        const dateObj = toDate(rawTimestamp);

        if (dateObj) {
          const dateStr = format(dateObj, "yyyy-MM-dd");
          const monthStr = format(dateObj, "yyyy-MM");

          dailyCount[dateStr] = (dailyCount[dateStr] || 0) + 1;
          monthlyCount[monthStr] = (monthlyCount[monthStr] || 0) + 1;
        }
      });

      const dailyArray = Object.entries(dailyCount).map(([date, orders]) => ({ date, orders }));
      const monthlyArray = Object.entries(monthlyCount).map(([month, orders]) => ({ month, orders }));

      dailyArray.sort((a, b) => a.date!.localeCompare(b.date!));
      monthlyArray.sort((a, b) => a.month!.localeCompare(b.month!));

      setDailyOrdersData(dailyArray);
      setMonthlyOrdersData(monthlyArray);
    };

    fetchEnquiries();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const enquiriesSnapshot = await getDocs(collection(db, "enquiries"));
      const servicesSnapshot = await getDocs(collection(db, "services"));

      // Create a map of service IDs to service names
      const servicesMap: Record<string, string> = {};
      servicesSnapshot.forEach((doc) => {
        const serviceData = doc.data();
        servicesMap[doc.id] = serviceData.nameInEnglish || serviceData.name || "Unknown Service";
      });

      const serviceCounts: Record<string, number> = {};

      enquiriesSnapshot.forEach((doc) => {
        const enquiry = doc.data();
        const serviceId = enquiry.serviceId;

        if (serviceId && servicesMap[serviceId]) {
          const serviceName = servicesMap[serviceId];
          serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
        }
      });

      const dataArray = Object.entries(serviceCounts).map(([name, value]) => ({ name, value }));

      const maxService = dataArray.reduce(
        (max, item) => (item.value > max.value ? item : max),
        { name: "No Services Found", value: 0 }
      );

      setServiceRequestsData(dataArray);
      setHighestService(maxService);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map((doc) => doc.data());

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const growthMap: Record<string, number> = {};

      usersData.forEach((user) => {
        const rawCreatedAt = user.createdAt || user.date;
        const createdAtDate = toDate(rawCreatedAt);

        if (createdAtDate) {
          const monthName = months[createdAtDate.getMonth()];
          growthMap[monthName] = (growthMap[monthName] || 0) + 1;
        }
      });

      const growthArray = months.map((month) => ({
        month,
        users: growthMap[month] || 0,
      }));

      setUserGrowthData(growthArray);
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6 max-w-full mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-extrabold">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} className="text-indigo-600" />
              Most Requested Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold break-words">{highestService.name}</div>
            <p className="text-gray-500">{highestService.value} Enquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{ users: { label: "Users", color: "#22C55E" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#22C55E"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <CardTitle>Enquiries Overview</CardTitle>
              <Tabs
                value={timeframe}
                onValueChange={(val) => setTimeframe(val as "daily" | "monthly")}
              >
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{ orders: { label: "Enquiries", color: "#6366F1" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeframe === "daily" ? dailyOrdersData : monthlyOrdersData}>
                    <XAxis dataKey={timeframe === "daily" ? "date" : "month"} />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={serviceRequestsData.reduce((acc, item, i) => {
                  acc[item.name] = { color: COLORS[i % COLORS.length], label: item.name };
                  return acc;
                }, {} as Record<string, { color: string; label: string }>)}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceRequestsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) =>
                        entry.name.substring(0, 10) + (entry.name.length > 10 ? "..." : "")
                      }
                    >
                      {serviceRequestsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
