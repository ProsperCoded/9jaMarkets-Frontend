import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart4,
  Eye,
  MousePointerClick,
  Clock,
  Calendar,
  AlertCircle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Pause,
  Crown,
  Star,
  Award,
  Loader,
} from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getAdsApi, getAllAdsApi } from "@/lib/api/adApi";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { useErrorLogger } from "@/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [activeAds, setActiveAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [activeTab, setActiveTab] = useState("online-ads");
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const errorLogger = useErrorLogger();

  // Use useCallback to prevent function recreation on every render
  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);

      if (activeTab === "online-ads") {
        // Fetch active ads
        const activeAdsData = await getAdsApi({}, messageApi.error);
        setActiveAds(activeAdsData);
      } else if (activeTab === "all-ads") {
        // Fetch all ads
        const allAdsData = await getAllAdsApi({}, messageApi.error);
        setAllAds(allAdsData);
      }
    } catch (error) {
      errorLogger("Failed to fetch ads data");
    } finally {
      setLoading(false);
    }
  }, [activeTab, messageApi.error, errorLogger]);

  // Only fetch data when the component mounts and when the activeTab changes
  useEffect(() => {
    fetchAds();
  }, [activeTab]);

  const toggleAdDetails = (adId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [adId]: !prev[adId],
    }));
  };

  const stopAd = (adId) => {
    // Dummy function for now
    messageApi.info(`Ad ${adId} has been stopped`);
  };

  // Get cumulative ad performance data for charts
  const totalViews = activeAds.reduce((sum, ad) => sum + ad.adViews, 0);
  const totalClicks = activeAds.reduce((sum, ad) => sum + ad.adClicks, 0);
  const clickThroughRate =
    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

  // Function to get ad level badge properties
  const getAdBadge = (level) => {
    switch (level) {
      case 3:
        return {
          icon: <Crown className="w-3 h-3" />,
          label: "Premium",
          classes: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
        };
      case 2:
        return {
          icon: <Star className="w-3 h-3" />,
          label: "Featured",
          classes: "bg-gradient-to-r from-orange-400 to-amber-500 text-white",
        };
      case 1:
        return {
          icon: <Award className="w-3 h-3" />,
          label: "Standard",
          classes: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
        };
      default:
        return {
          icon: <Award className="w-3 h-3" />,
          label: "Free",
          classes: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
        };
    }
  };

  // Calculate performance ratio for doughnut chart
  const performanceChartData = {
    labels: ["Views", "Clicks"],
    datasets: [
      {
        data: [totalViews, totalClicks],
        backgroundColor: ["#F8912D", "#236C13"],
        borderWidth: 0,
      },
    ],
  };

  // Get ad performance by level for bar chart
  const adLevels = [0, 1, 2, 3];
  const viewsByLevel = adLevels.map((level) =>
    activeAds
      .filter((ad) => ad.level === level)
      .reduce((sum, ad) => sum + ad.adViews, 0)
  );
  const clicksByLevel = adLevels.map((level) =>
    activeAds
      .filter((ad) => ad.level === level)
      .reduce((sum, ad) => sum + ad.adClicks, 0)
  );

  const levelPerformanceData = {
    labels: ["Free", "Standard", "Featured", "Premium"],
    datasets: [
      {
        label: "Views",
        backgroundColor: "#F8912D",
        borderRadius: 6,
        data: viewsByLevel,
        barThickness: 12,
      },
      {
        label: "Clicks",
        backgroundColor: "#236C13",
        borderRadius: 6,
        data: clicksByLevel,
        barThickness: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "#E5E7EB",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if ad is expired
  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  // Improved loading component
  const LoadingIndicator = () => (
    <div className="flex flex-col justify-center items-center bg-white shadow-sm rounded-lg h-64">
      <Loader className="mb-4 w-10 h-10 text-Primary animate-spin" />
      <p className="font-medium text-gray-600">Loading ad data...</p>
      <p className="mt-2 text-gray-500 text-sm">Please wait a moment</p>
    </div>
  );

  return (
    <div className="space-y-4 mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Monitor your ads performance and manage your advertising campaigns
        </p>
      </div>

      <Tabs
        defaultValue="online-ads"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6 w-[400px]">
          <TabsTrigger value="online-ads">Online Ads</TabsTrigger>
          <TabsTrigger value="all-ads">All Ads</TabsTrigger>
        </TabsList>

        {/* Online Ads Tab */}
        <TabsContent value="online-ads">
          {loading ? (
            <LoadingIndicator />
          ) : activeAds.length > 0 ? (
            <div className="space-y-6">
              {/* Performance Summary Cards */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="w-4 h-4 text-Primary" /> Ad Views
                    </CardTitle>
                    <CardDescription>Total impressions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-3xl">{totalViews}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MousePointerClick className="w-4 h-4 text-Primary" /> Ad
                      Clicks
                    </CardTitle>
                    <CardDescription>Total interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-3xl">{totalClicks}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart4 className="w-4 h-4 text-Primary" /> CTR
                    </CardTitle>
                    <CardDescription>Click-through rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold text-3xl">
                      {clickThroughRate}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Charts */}
              <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                <Card className="h-80">
                  <CardHeader>
                    <CardTitle>Ad Performance by Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <Bar data={levelPerformanceData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="h-80">
                  <CardHeader>
                    <CardTitle>Views vs Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <Doughnut
                        data={performanceChartData}
                        options={doughnutOptions}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Ad Cards */}
              <h2 className="font-semibold text-xl">Active Advertisements</h2>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {activeAds.map((ad) => (
                  <Collapsible
                    key={ad.id}
                    open={expandedCards[ad.id]}
                    onOpenChange={() => toggleAdDetails(ad.id)}
                    className="bg-white shadow-sm border rounded-lg"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="rounded-md w-16 h-16 overflow-hidden">
                            <img
                              src={
                                ad.product?.displayImage?.url ||
                                "https://via.placeholder.com/150"
                              }
                              alt={ad.product?.name || "Product"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {ad.product?.name || "Unnamed Product"}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getAdBadge(ad.level).classes}>
                                <span className="flex items-center gap-1">
                                  {getAdBadge(ad.level).icon}
                                  {getAdBadge(ad.level).label}
                                </span>
                              </Badge>
                              <span className="text-gray-500 text-xs">
                                <Calendar className="inline mr-1 w-3 h-3" />
                                Expires: {formatDate(ad.expiresAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => stopAd(ad.id)}
                          >
                            <Pause className="mr-1 w-4 h-4" /> Stop Ad
                          </Button>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {expandedCards[ad.id] ? (
                                <ChevronUp />
                              ) : (
                                <ChevronDown />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="w-4 h-4 text-Primary" /> {ad.adViews}{" "}
                          views
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MousePointerClick className="w-4 h-4 text-Primary" />{" "}
                          {ad.adClicks} clicks
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />{" "}
                          {ad.adViews > 0
                            ? ((ad.adClicks / ad.adViews) * 100).toFixed(2)
                            : "0"}
                          % CTR
                        </div>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <Separator />
                      <div className="space-y-4 p-4">
                        <div>
                          <h4 className="mb-1 font-medium text-sm">
                            Performance
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1 text-xs">
                                <span>Views to Clicks Ratio</span>
                                <span>
                                  {ad.adViews > 0
                                    ? (
                                        (ad.adClicks / ad.adViews) *
                                        100
                                      ).toFixed(2)
                                    : "0"}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  ad.adViews > 0
                                    ? (ad.adClicks / ad.adViews) * 100
                                    : 0
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-4 grid grid-cols-2">
                          <div>
                            <h4 className="mb-1 font-medium text-sm">
                              Product Details
                            </h4>
                            <p className="mb-1 text-gray-600 text-sm">
                              {ad.product?.details || "No details available"}
                            </p>
                            <p className="font-medium text-sm">
                              ₦{ad.product?.price?.toLocaleString() || "N/A"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Stock: {ad.product?.stock || "N/A"}
                            </p>
                          </div>
                          <div>
                            <h4 className="mb-1 font-medium text-sm">
                              Ad Information
                            </h4>
                            <div className="space-y-1 text-gray-600 text-xs">
                              <p>Created: {formatDate(ad.createdAt)}</p>
                              <p>Updated: {formatDate(ad.updatedAt)}</p>
                              <p>Expires: {formatDate(ad.expiresAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center bg-white shadow rounded-lg h-64">
              <AlertCircle className="mb-4 w-12 h-12 text-Primary/50" />
              <h3 className="font-medium text-gray-900 text-xl">
                No Active Ads
              </h3>
              <p className="mt-2 text-gray-500">
                You don't have any active advertisements at the moment
              </p>
              <Button
                className="mt-4"
                onClick={() => (window.location.href = "/dashboard/products")}
              >
                Create an Ad
              </Button>
            </div>
          )}
        </TabsContent>

        {/* All Ads Tab */}
        <TabsContent value="all-ads">
          {loading ? (
            <LoadingIndicator />
          ) : (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Advertisements</CardTitle>
                  <CardDescription>
                    Complete history of all your ads, including expired and
                    unpaid
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {allAds.length > 0 ? (
                      allAds.map((ad) => (
                        <div
                          key={ad.id}
                          className="flex justify-between items-center hover:bg-gray-50 p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-md w-12 h-12 overflow-hidden">
                              <img
                                src={
                                  ad.product?.displayImage?.url ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={ad.product?.name || "Product"}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div>
                              <h3 className="font-medium text-gray-900">
                                {ad.product?.name || "Unnamed Product"}
                              </h3>
                              <div className="flex items-center gap-2 text-xs">
                                <Badge
                                  variant="outline"
                                  className={getAdBadge(ad.level).classes}
                                >
                                  {getAdBadge(ad.level).label}
                                </Badge>
                                {ad.paidFor &&
                                  (isExpired(ad.expiresAt) ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-red-100 border-red-200 text-red-800"
                                    >
                                      Expired
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-100 border-green-200 text-green-800"
                                    >
                                      Active
                                    </Badge>
                                  ))}
                                {ad.paidFor ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 border-green-200 text-green-800"
                                  >
                                    <Check className="mr-1 w-3 h-3" /> Paid
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-100 border-amber-200 text-amber-800"
                                  >
                                    <X className="mr-1 w-3 h-3" /> Unpaid
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-gray-500 text-xs">
                            <div className="flex flex-col items-end">
                              <div className="flex items-center">
                                <Eye className="mr-1 w-3 h-3" /> {ad.adViews}{" "}
                                views
                              </div>
                              <div className="flex items-center">
                                <MousePointerClick className="mr-1 w-3 h-3" />{" "}
                                {ad.adClicks} clicks
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div>Created: {formatDate(ad.createdAt)}</div>
                              <div>Expires: {formatDate(ad.expiresAt)}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center py-12">
                        <AlertCircle className="mb-4 w-12 h-12 text-gray-300" />
                        <h3 className="font-medium text-gray-900 text-xl">
                          No Ads Found
                        </h3>
                        <p className="mt-2 text-gray-500">
                          You haven't created any advertisements yet
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Overview;
