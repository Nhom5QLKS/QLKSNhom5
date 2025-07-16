"use client";
import React, { useState } from "react";
import CardItemTotal from "./CardItemTotal";
import useSWR from "swr";
import { formatPrice } from "@/lib/formatPrice";
import SelectRangeStatistical from "./SelectRangeStatistical";

const CardStatistical = () => {
  const [range, setRange] = useState("day");
  const { data, isLoading } = useSWR(`/api/dashboard?range=${range}`);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 p-2">
        <CardItemTotal
          title="Loading..."
          total={0}
          description="Loading data"
        />
        <CardItemTotal
          title="Loading..."
          total={0}
          description="Loading data"
        />
        <CardItemTotal
          title="Loading..."
          total={0}
          description="Loading data"
        />
        <CardItemTotal
          title="Loading..."
          total={0}
          description="Loading data"
        />
      </div>
    );
  }

  return (
    <>
      <SelectRangeStatistical setRange={setRange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-4 gap-2">
        <CardItemTotal
          title="danh sách đặt phòng"
          total={data?.bookings || 0}
          description="Total bookings made"
        />
        <CardItemTotal
          title="Tổng số khách hàng"
          total={data?.customers || 0}
          description="Total customers"
        />
        <CardItemTotal
          title="Tổng Tiền Đặt Phòng"
          total={formatPrice(Number(data?.totalAmount) || 0)}
          description="Total booking amount"
        />
        <CardItemTotal
          title="Tổng doanh thu"
          total={formatPrice(Number(data?.revenue) || 0)}
          description="Total revenue"
        />
      </div>
    </>
  );
};

export default CardStatistical;
