"use client";
import React from "react";
import EmployeeTable from "./components/TableEmployee";

const mockEmployees = [
  {
    id: "1",
    email: "nguyenvana@example.com",
    firstName: "Văn A",
    lastName: "Nguyễn",
    phone: "0123456789",
    userType: "EMPLOYEE",
    status: "ACTIVE", // Đang làm việc
    employee: {
      id: "e1",
      department: "FRONT_DESK",
      hireDate: "2023-01-15",
      position: "Nhân viên lễ tân",
      roles: [{ role: { name: "Lễ tân" } }],
    },
  },
  {
    id: "2",
    email: "tranthib@example.com",
    firstName: "Thị B",
    lastName: "Trần",
    phone: "0987654321",
    userType: "EMPLOYEE",
    status: "ON_LEAVE", // Đang nghỉ phép
    employee: {
      id: "e2",
      department: "MAINTENANCE",
      hireDate: "2022-11-01",
      position: "Kỹ thuật viên",
      roles: [{ role: { name: "Bảo trì" } }],
    },
  },
  {
    id: "3",
    email: "lequangc@example.com",
    firstName: "Quang C",
    lastName: "Lê",
    phone: "0912345678",
    userType: "EMPLOYEE",
    status: "ACTIVE", // Đang làm việc
    employee: {
      id: "e3",
      department: "MANAGEMENT",
      hireDate: "2021-07-21",
      position: "Quản lý ca",
      roles: [{ role: { name: "Quản lý" } }],
    },
  },
  {
    id: "4",
    email: "phamthid@example.com",
    firstName: "Thị D",
    lastName: "Phạm",
    phone: "0944556677",
    userType: "EMPLOYEE",
    status: "ON_LEAVE", // Đang nghỉ phép
    employee: {
      id: "e4",
      department: "ACCOUNTING",
      hireDate: "2024-03-01",
      position: "Kế toán viên",
      roles: [],
    },
  },
];

const Page = () => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <EmployeeTable employee={mockEmployees} />
    </div>
  );
};

export default Page;
