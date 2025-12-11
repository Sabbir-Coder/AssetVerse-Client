import React from "react";

const BirthdayCard = ({ employee }) => {
  const birthday = new Date(employee.dateOfBirth);
  const formatted = birthday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-blue-50 shadow-md rounded-lg p-4 flex items-center gap-4 border border-blue-200">
      <img
        src={employee.photoURL || "/default-user.png"}
        alt={employee.name}
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div>
        <h3 className="text-lg font-semibold">{employee.name}</h3>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <p className="text-sm font-medium text-blue-700">🎉 {formatted}</p>
      </div>
    </div>
  );
};

export default BirthdayCard;
