import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmployeeCard from "./EmployeeCard";
import BirthdayCard from "./BirthdayCard";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  // 1. Fetch companies for dropdown
  const { data: companies = [], isLoading: companyLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });

  // 2. Fetch employees based on selected company
  const { data: employees = [], isLoading: employeesLoading } = useQuery({
    queryKey: ["companyEmployees", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/company/${selectedCompany}/employees`
      );
      return res.data;
    },
  });

  // 3. Fetch birthdays for selected company
  const { data: birthdays = [], isLoading: birthdayLoading } = useQuery({
    queryKey: ["companyBirthdays", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/company/${selectedCompany}/birthdays`
      );
      return res.data;
    },
  });

  if (companyLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">My Team</h1>

      {/* Company Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm mb-1">Select Company</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select a company</option>
          {companies.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {(employeesLoading || birthdayLoading) && <LoadingSpinner />}

      {/* Employee List */}
      {selectedCompany && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Employees of {selectedCompany}
          </h2>

          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <EmployeeCard key={emp._id} employee={emp} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Birthdays */}
      {selectedCompany && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Upcoming Birthdays</h2>

          {birthdays.length === 0 ? (
            <p>No upcoming birthdays this month.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {birthdays.map((emp) => (
                <BirthdayCard key={emp._id} employee={emp} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTeam;
