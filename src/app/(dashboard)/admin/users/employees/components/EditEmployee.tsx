"use client";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const EditEmployee = ({ isOpen, setIsOpen, employee }: any) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    Modal.setAppElement("#root");
    if (employee) {
      setForm({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        position: employee.employee?.position || "",
        department: employee.employee?.department || "",
        hireDate: employee.employee?.hireDate || "",
        status: employee.status || "ACTIVE",
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/auth/employee/${employee.id}`, form, {
        withCredentials: true,
      });
      toast.success("Cập nhật nhân viên thành công");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi cập nhật");
    }
  };

  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-6xl mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50"
      contentLabel="Chỉnh sửa nhân viên"
    >
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa nhân viên</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Họ" />
        <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Tên" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" />
        <Input name="position" value={form.position} onChange={handleChange} placeholder="Vị trí" />
        <select name="department" value={form.department} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="FRONT_DESK">Lễ tân</option>
          <option value="MAINTENANCE">Bảo trì</option>
          <option value="MANAGEMENT">Quản lý</option>
          <option value="ACCOUNTING">Kế toán</option>
        </select>
        <Input
          type="date"
          name="hireDate"
          value={form.hireDate}
          onChange={handleChange}
          placeholder="Ngày vào làm"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="ACTIVE">Đang làm việc</option>
          <option value="ON_LEAVE">Đang nghỉ phép</option>
          <option value="INACTIVE">Đã nghỉ việc</option>
        </select>
        <div className="flex justify-end gap-2 mt-7">
          <Button variant="outline" onClick={() => setIsOpen(false)} type="button">
            Hủy
          </Button>
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployee;