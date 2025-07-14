"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserRound } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// Define types based on your Prisma schema
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
type UserType = "CUSTOMER" | "EMPLOYEE" | "ADMIN";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  userType: UserType;
  status: UserStatus;
  customer: Customer;
}

interface Customer {
  id: string;
  address: string | null;
  city: string | null;
  country: string | null;
  idNumber: string | null;
}

interface ITableCustomer {
  customers: User[];
}

const TableCustomer = ({ customers = [] }: ITableCustomer) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Thống kê
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "ACTIVE").length;
  const suspendedCustomers = customers.filter(c => c.status === "SUSPENDED" || c.status === "INACTIVE").length;
  const countries = Array.from(new Set(customers.map(c => c.customer.country))).length;

  // Filter customers based on search term (nếu muốn thêm chức năng search thực tế)

  return (
    <div className="space-y-4 bg-white p-3 border rounded-xl">
      {/* Thống kê khách hàng */}
      <div className="flex justify-between gap-3 mb-2">
        <div className="flex flex-col items-start justify-center flex-1 bg-blue-600 text-white rounded-lg p-3 shadow-sm min-w-0">
          <span className="text-base font-medium">Tổng khách hàng</span>
          <span className="text-2xl font-bold mt-1">{totalCustomers}</span>
        </div>
        <div className="flex flex-col items-start justify-center flex-1 bg-green-600 text-white rounded-lg p-3 shadow-sm min-w-0">
          <span className="text-base font-medium">Đang hoạt động</span>
          <span className="text-2xl font-bold mt-1">{activeCustomers}</span>
        </div>
        <div className="flex flex-col items-start justify-center flex-1 bg-yellow-400 text-black rounded-lg p-3 shadow-sm min-w-0">
          <span className="text-base font-medium">Bị khóa / Tạm ngưng</span>
          <span className="text-2xl font-bold mt-1">{suspendedCustomers}</span>
        </div>
        <div className="flex flex-col items-start justify-center flex-1 bg-cyan-400 text-white rounded-lg p-3 shadow-sm min-w-0">
          <span className="text-base font-medium">Quốc gia</span>
          <span className="text-2xl font-bold mt-1">{countries}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lí Khách Hàng</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-[250px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Số điện thoại
              </TableHead>
              <TableHead className="hidden md:table-cell">CMND/CCCD</TableHead>
              <TableHead className="hidden lg:table-cell">Địa điểm</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <UserRound className="h-4 w-4" />
                      </div>
                      <div>
                        {customer.firstName} {customer.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.phone || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.customer.idNumber || "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {[customer.customer.city, customer.customer.country]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "ACTIVE"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        customer.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <PencilSquareIcon className="w-7 h-7 text-gray-500 inline-block mr-5 cursor-pointer hover:text-blue-500" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableCustomer;
