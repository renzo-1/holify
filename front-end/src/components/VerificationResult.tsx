import React from "react";

const VerificationResult = ({
  verifiedStudent,
}: {
  verifiedStudent: Student | undefined;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl text-green-600">✔️Verified</h2>
      <div>
        <p className="text-sm md:text-base lg:text-lg">
          {verifiedStudent?.studentName}
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          {verifiedStudent?.studentNum}
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          {verifiedStudent?.program}
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          {verifiedStudent?.specialization}
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          {verifiedStudent?.gradDate}
        </p>
      </div>
    </div>
  );
};

export default VerificationResult;
