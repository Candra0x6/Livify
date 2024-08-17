import React from "react";

export function Success({ status }: { status: string }) {
  return (
    <div className="p-2 bg-green-100 h-8 text-center text-green-600 text-xs rounded-md font-medium">
      <h1>{status}</h1>
    </div>
  );
}
export function Pending({ status }: { status: string }) {
  return (
    <div className="p-2 bg-yellow-100 text-center text-yellow-600 text-xs rounded-md font-medium">
      <h1>{status}</h1>
    </div>
  );
}
export function Processing({ status }: { status: string }) {
  return (
    <div className="p-2 bg-blue-100 text-center text-blue-600 text-xs rounded-md font-medium">
      <h1>{status}</h1>
    </div>
  );
}
export function Rejected({ status }: { status: string }) {
  return (
    <div className="p-2 bg-red-100 text-center text-red-600 text-xs rounded-md font-medium">
      <h1>{status}</h1>
    </div>
  );
}
export const statusBadge = (status: string) => {
  const statusComponents: { [key: string]: JSX.Element } = {
    PROCESSING: <Processing status="Processing" />,
    PENDING: <Pending status="Pending" />,
    CANCELLED: <Rejected status="Cancelled" />,
    COMPLETED: <Success status="Completed" />,
    REJECTED: <Rejected status="Rejected" />,
  };

  return statusComponents[status] || null;
};
