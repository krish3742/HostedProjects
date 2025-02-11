function ChangeDetails() {
  const data = {
    name: "DCC-000013",
    description:
      "Policy ensures controlled user access in Ossence for Anthem. System Admin manages new access, modifications, and deactivations. Regular audits ensure compliance. Non-compliance results in disciplinary action.",
    reason:
      "As part of Ossence implementation policy and work instruction are newly introduced across Anthem",
    scope: "Global",
  };

  const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-[150px,1fr] py-2">
      <div className="text-gray-600 font-medium">{label}</div>
      <div className="text-gray-800">{value}</div>
    </div>
  );

  return (
    <div className="px-9">
      <InfoRow label="Name" value={data.name} />
      <InfoRow label="Description" value={data.description} />
      <InfoRow label="Reason" value={data.reason} />
      <InfoRow label="Scope" value={data.scope} />
    </div>
  );
}

export default ChangeDetails;
