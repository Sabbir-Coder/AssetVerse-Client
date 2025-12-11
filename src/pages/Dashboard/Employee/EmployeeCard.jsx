import React from "react";

const EmployeeCard = ({ employee }) => {
  console.log(employee);

  const { name,  email, companyLogo, role } = employee;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border">
      <img
        src={companyLogo || "/default-user.png"}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 font-bold"> {role}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
