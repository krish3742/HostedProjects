function UserDetails() {
  const employeeData = {
    person: "Reyan Young",
    firstName: "Reyan",
    lastName: "Young",
    employeeId: "1234567890",
    emailId: "Reyan123@gmail.com",
    branch: "Biosciences Pvt.Ltd",
    department: "Automation",
    role: "Basic document rights- Document control",
    domainUser: "No",
    comments: "New request",
  };

  const InfoRow = ({ label, value, isLink = false }) => (
    <div className="grid grid-cols-2 py-2">
      <div className="text-gray-600 font-medium">{label}</div>
      <div className="text-gray-800">
        {isLink ? (
          <p className="text-blue-600 hover:text-blue-800">{value}</p>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="px-9">
      <InfoRow label="Person" value={employeeData.person} isLink={true} />
      <InfoRow label="First name" value={employeeData.firstName} />
      <InfoRow label="Last name" value={employeeData.lastName} />
      <InfoRow label="Employee ID" value={employeeData.employeeId} />
      <InfoRow label="Email ID" value={employeeData.emailId} />
      <InfoRow label="Branch" value={employeeData.branch} isLink={true} />
      <InfoRow
        label="Department"
        value={employeeData.department}
        isLink={true}
      />
      <InfoRow label="Role" value={employeeData.role} />
      <InfoRow label="Domain user" value={employeeData.domainUser} />
      <InfoRow label="Comments" value={employeeData.comments} />
    </div>
  );
}

export default UserDetails;
