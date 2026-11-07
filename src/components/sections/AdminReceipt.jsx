import React, { useState, useEffect } from "react";

export default function AdminReceipt() {
  // Courses pre-defined with their fees for auto-fill
  const courses = [
    { name: "EPS-TOPIK Preparation", fee: 25000 },
    { name: "Basic Korean", fee: 25000 },
    { name: "Fast-Track Korean", fee: 20000 },
    { name: "TOPIK Test Preparation", fee: 20000 },
  ];

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    totalFee: 0,
    paidAmount: "",
  });

  const [receiptNo, setReceiptNo] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Generate Receipt No and Date on load
  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    );
    setReceiptNo(`HK-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;
    const selectedCourse = courses.find((c) => c.name === selectedCourseName);

    setFormData({
      ...formData,
      course: selectedCourseName,
      totalFee: selectedCourse ? selectedCourse.fee : 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "totalFee" || name === "paidAmount" ? Number(value) : value,
    });
  };

  // Calculations
  const balanceDue = formData.totalFee - formData.paidAmount;
  const isPaid = balanceDue <= 0 && formData.paidAmount > 0;
  const isPartial = balanceDue > 0 && formData.paidAmount > 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 p-4 sm:p-8 print:p-0 print:bg-white">
      {/* Page Header - Hidden on Print */}
      <div className="max-w-6xl mx-auto mb-8 print:hidden">
        <h1 className="text-3xl font-bold text-[#155ae0]">Admin Dashboard</h1>
        <p className="text-slate-500">
          Generate and print official fee receipts for students.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: Input Form (Hidden on Print) */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-[0_0_20px_rgba(76,244,255,0.15)] border border-[#4cf4ff]/30 print:hidden">
          <h2 className="text-xl font-semibold mb-6 text-[#155ae0] border-b border-[#4cf4ff]/40 pb-3">
            Payment Details
          </h2>

          <div className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#4cf4ff] focus:border-[#155ae0] outline-none transition-all"
                placeholder="e.g. Ali Ahmed"
              />
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Select Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleCourseChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#4cf4ff] focus:border-[#155ae0] outline-none transition-all bg-white"
              >
                <option value="">-- Choose Course --</option>
                {courses.map((c, idx) => (
                  <option key={idx} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Fee */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Total Fee (PKR)
              </label>
              <input
                type="number"
                name="totalFee"
                value={formData.totalFee}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#4cf4ff] focus:border-[#155ae0] outline-none transition-all bg-slate-50"
              />
            </div>

            {/* Paid Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Amount Paid (PKR)
              </label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#4cf4ff] focus:border-[#155ae0] outline-none transition-all"
                // placeholder=""
              />
            </div>

            {/* Admin Controls */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const originalTitle = document.title;

                  // ✅ Yahan humne formData.studentName kar diya hai
                  const studentName = formData.studentName || formData.name;

                  const fileName = studentName
                    ? `${studentName.trim().replace(/\s+/g, "_")}_Fee_Receipt`
                    : "Fee_Receipt";

                  document.title = fileName;
                  window.print();

                  // Print dialog band hone ke baad wapas theek kar dein
                  setTimeout(() => {
                    document.title = originalTitle;
                  }, 100);
                }}
                className="mt-8 mx-auto flex items-center gap-2 bg-[#4cf4ff] hover:bg-cyan-300 text-navy px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 print:hidden"
              >
                🖨️ Download / Print Receipt
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Receipt Preview (Visible on Print) */}
        <div className="w-full lg:w-2/3 flex justify-center print:w-full print:block">
          {/* Paper Canvas */}
          <div className="w-full max-w-[800px] bg-white rounded-none sm:rounded-xl shadow-xl print:shadow-none border border-slate-200 print:border-none p-8 sm:p-12 relative overflow-hidden print:p-0 print:m-0">
            {/* Watermark Overlay (Official Blue Ink Style) */}
            {isPaid && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none print:opacity-20 opacity-10 z-0">
                <span className="text-8xl font-black text-[#155ae0] border-8 border-[#155ae0] p-4 rounded-xl tracking-widest uppercase">
                  PAID
                </span>
              </div>
            )}
            {isPartial && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none print:opacity-20 opacity-10 z-0">
                <span className="text-8xl font-black text-[#155ae0] border-8 border-[#155ae0] p-4 rounded-xl tracking-widest uppercase">
                  PARTIAL
                </span>
              </div>
            )}

            {/* Receipt Header */}
            <div className="relative z-10 flex justify-between items-start border-b-2 border-[#155ae0] pb-6 mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#155ae0] tracking-tight">
                  HK Institute
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Korean Language Center
                </p>
                <p className="text-slate-500 text-sm">
                  Al Rehman Palace, 1 Muslim Town, Lahore
                </p>
                <p className="text-slate-500 text-sm">+92 343 6808080</p>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-[#155ae0] uppercase tracking-wider mb-2">
                  Receipt
                </h3>
                <div className="text-sm text-slate-600 font-medium">
                  <span className="inline-block w-24">Receipt No:</span>{" "}
                  {receiptNo}
                </div>
                <div className="text-sm text-slate-600 font-medium mt-1">
                  <span className="inline-block w-24">Date:</span> {currentDate}
                </div>
              </div>
            </div>

            {/* Student Details */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 print:bg-transparent print:border-none print:p-0 print:mb-6">
              <h4 className="text-xs font-bold text-[#155ae0] uppercase tracking-widest mb-4">
                Student Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Student Name</p>
                  <p className="text-lg font-bold text-[#155ae0] capitalize">
                    {formData.studentName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Enrolled Course</p>
                  <p className="text-lg font-bold text-[#155ae0]">
                    {formData.course || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Table */}
            <table className="relative z-10 w-full text-left mb-8">
              <thead>
                <tr className="border-b-2 border-[#155ae0] text-[#155ae0]">
                  <th className="py-3 px-2 font-semibold">Description</th>
                  <th className="py-3 px-2 font-semibold text-right w-40">
                    Amount (PKR)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-2 text-[#155ae0] font-medium">
                    Course Fee: {formData.course}
                  </td>
                  <td className="py-4 px-2 text-right text-slate-700">
                    {formData.totalFee.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Summary Box */}
            <div className="relative z-10 flex justify-end mb-16">
              <div className="w-full sm:w-1/2 space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount</span>
                  <span>Rs {formData.totalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#155ae0] font-bold border-b border-[#4cf4ff]/50 pb-3">
                  <span>Amount Paid</span>
                  <span>- Rs {formData.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#155ae0] pt-2">
                  <span>Balance Due</span>
                  <span>Rs {Math.max(0, balanceDue).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Signatures & Footer */}
            <div className="relative z-10 flex justify-between items-end mt-20 pt-8 border-t border-[#155ae0]/30">
              <div className="text-center w-48">
                <div className="border-b border-[#155ae0] mb-2 h-10 flex items-end justify-center">
                  <span className="italic text-[#155ae0] font-serif signature-font">
                    Hammad Khurram
                  </span>
                </div>
                <p className="text-xs text-slate-500 uppercase font-medium">
                  Authorized Signature
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#155ae0] italic">
                  "감사합니다! (Thank you)"
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  This is a system generated receipt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
