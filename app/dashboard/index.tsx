import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { API } from "@/config";
import { useNetwork } from "@/middleware/network";
import BarChartScreen from "@/components/barChart";

interface ExpenseGroupedByDate {
  date: string;
  amount: number;
}

interface ExpenseGroupedByName {
  name: string;
  amount: number;
}

interface OrderStat {
  date: string;
  totalPrice: number;
  totalDeposit: number;
  totalRemaining: number;
}

interface TotalExpense {
  totalExpense: number;
}

const Dashboard = () => {
  const [orderStats, setOrderStats] = useState<OrderStat[]>([]);
  const [expensesGroupedByDate, setExpensesGroupedByDate] = useState<
    ExpenseGroupedByDate[]
  >([]);
  const [expensesGroupedByName, setExpensesGroupedByName] = useState<
    ExpenseGroupedByName[]
  >([]);
  const [totalExpenseTillDate, setTotalExpenseTillDate] =
    useState<TotalExpense | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useNetwork();

  useEffect(() => {
    const fetchDataStats = async () => {
      try {
        const orderStat = await axios.get(API.getOrderStat, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setOrderStats(orderStat.data);

        const response = await axios.get(API.getAllExpense, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setExpensesGroupedByDate(response.data.expensesGroupedByDate || []);
        setExpensesGroupedByName(response.data.expensesGroupedByName || []);
        setTotalExpenseTillDate(response.data.totalExpenseTillDate || null);
        setError(null);

        // Set default chart data
        const defaultOrderData = {
          labels: orderStat.data.map((item) =>
            new Date(item.date).toLocaleDateString(),
          ),
          datasets: [
            {
              data: orderStat.data.map((item) => item.totalPrice),
            },
          ],
        };
        setChartData(defaultOrderData);
      } catch (error) {
        setError("Failed to load expense data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      fetchDataStats();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Icon name="wifi-off" size={64} color="#9ca3af" />
        <Text className="text-lg font-bold text-gray-800 mt-4">
          No Internet Connection
        </Text>
        <Text className="text-sm text-gray-600 text-center mt-2">
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-sm text-gray-600 mt-2">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-600 text-base">{error}</Text>
        <Button title="Retry" onPress={() => setLoading(true)} />
      </View>
    );
  }

  const expenseData = {
    labels: expensesGroupedByDate.map((item) =>
      new Date(item.date).toLocaleDateString(),
    ),
    datasets: [
      {
        data: expensesGroupedByDate.map((item) => item.amount),
      },
    ],
  };

  const totalSellData = {
    labels: ["Sell Data"],
    datasets: [
      {
        data: [orderStats.reduce((acc, cur) => acc + cur.totalPrice, 0)],
      },
    ],
  };

  const handleChartDataChange = (type: string) => {
    if (type === "expense") {
      setChartData(expenseData);
    } else if (type === "totalSell") {
      setChartData(totalSellData);
    } else {
      const defaultOrderData = {
        labels: orderStats.map((item) =>
          new Date(item.date).toLocaleDateString(),
        ),
        datasets: [
          {
            data: orderStats.map((item) => item.totalPrice),
          },
        ],
      };
      setChartData(defaultOrderData);
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <BarChartScreen data={chartData} />
      <View className="mt-4 flex-row justify-evenly">
        <Button
          title="Show Expense"
          onPress={() => handleChartDataChange("expense")}
        />
        <Button
          title="Show Total Sell"
          onPress={() => handleChartDataChange("totalSell")}
        />
        <Button
          title="Show Orders"
          onPress={() => handleChartDataChange("orders")}
        />
      </View>
      {/* Additional content like Order Stats, Expenses, etc. */}
    </ScrollView>
  );
};

export default Dashboard;
