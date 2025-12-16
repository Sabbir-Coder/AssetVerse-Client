import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmployeeCard from "./EmployeeCard";
import BirthdayCard from "./BirthdayCard";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  // 1. Fetch companies
  const { data: companies = [], isLoading: companyLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });

  // 2. Fetch employees by company
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
console.log(employees);

  // 3. Filter upcoming birthdays (current month)
  const upcomingBirthdays = useMemo(() => {
    const currentMonth = new Date().getMonth(); // 0–11

    return employees.filter((emp) => {
      if (!emp.dateOfBirth) return false;

      const birthMonth = new Date(emp.dateOfBirth).getMonth();
      return birthMonth === currentMonth;
    });
  }, [employees]);

  if (companyLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Team</h1>

      {/* Company Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm mb-1">
          Select Company
        </label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select a company</option>
          {companies.map((company, i) => (
            <option key={i} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {employeesLoading && <LoadingSpinner />}

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

      {/* Upcoming Birthdays */}
      {selectedCompany && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Upcoming Birthdays (This Month)
          </h2>

          {upcomingBirthdays.length === 0 ? (
            <p>No upcoming birthdays this month.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingBirthdays.map((emp) => (
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
