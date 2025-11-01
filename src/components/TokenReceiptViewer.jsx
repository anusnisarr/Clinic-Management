import React, { useEffect , useRef } from 'react';
import { X, Printer, Download, User, Clock, Hash, Calendar, Phone, MapPin } from 'lucide-react';
const TokenReceipt = ({
  isOpen,
  onClose,
  errors,
  setErrors,
  receiptData,
  clinicInfo = {
    name: "City Medical Clinic",
    address: "123 Health Street, Medical District",
    phone: "+1-555-CLINIC",
    website: "www.citymedicalclinic.com"
  }

  
}) => {
  const receiptRef = useRef();
    console.log(receiptData);

  useEffect(() => {
    if (errors?.message) {
      alert(errors.message);
      setErrors({}); // clear error after showing
    }
  }, [errors]);

// const printReceipt = () => {
//   const receiptElement = document.getElementById("receipt-content");
//   if (!receiptElement) return;

//   const iframe = document.createElement("iframe");
//   iframe.style.position = "fixed";
//   iframe.style.right = "0";
//   iframe.style.bottom = "0";
//   iframe.style.width = "0";
//   iframe.style.height = "0";
//   iframe.style.border = "0";
//   document.body.appendChild(iframe);

//   const doc = iframe.contentWindow.document;

//   // ✅ Copy your Tailwind styles from the page
//   const styles = Array.from(document.styleSheets)
//     .map((sheet) => {
//       try {
//         return Array.from(sheet.cssRules)
//           .map((rule) => rule.cssText)
//           .join("\n");
//       } catch (e) {
//         return "";
//       }
//     })
//     .join("\n");

//   doc.open();
//   // doc.write(`
//   //   <html>
//   //     <head>
//   //       <title>Token Receipt</title>
//   //       <style>
//   //         @page {
//   //           size: 80mm auto;
//   //           margin: 2mm;
//   //         }

//   //         body {
//   //           width: 80mm;
//   //           margin: 0 auto;
//   //           color: #000;
//   //           background: #fff;
//   //           font-size: 13px;
//   //           -webkit-print-color-adjust: exact !important;
//   //           print-color-adjust: exact !important;
//   //         }

//   //         * {
//   //           color: #000 !important;
//   //         }

//   //         ${styles}
//   //       </style>
//   //     </head>
//   //     <body>
//   //       <div id="print-area">${receiptElement.outerHTML}</div>
//   //     </body>
//   //   </html>
//   // `);
//  const html = `
//     <html>
//       <head>
//         <title>Token Receipt</title>
//         <style>
//           @page {
//             size: 80mm auto;
//             margin: 2mm;
//           }
//           body {
//             width: 80mm;
//             margin: 0 auto;
//             font-size: 13px;
//             color: #000;
//             background: #fff;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }
//           * { color: #000 !important; }
//           ${styles}
//         </style>
//       </head>
//       <body>
//         <div id="print-area">${receiptElement.outerHTML}</div>
//       </body>
//     </html>
//   `;
//   doc.documentElement.innerHTML = html;
//   doc.close();

//   iframe.onload = () => {
//     iframe.contentWindow.focus();
//     iframe.contentWindow.print();
//     setTimeout(() => document.body.removeChild(iframe), 1000);
//   };
// };

const printReceipt = () => {
  const receiptElement = document.getElementById("receipt-content");
  if (!receiptElement) {
    console.error("❌ receipt-content element not found");
    return;
  }

  // Create hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // Collect Tailwind or inline styles (CORS-safe)
  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  // Full HTML for the receipt
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Token Receipt</title>
        <style>
          @page {
            size: 80mm auto;
            margin: 2mm;
          }
          body {
            width: 80mm;
            margin: 0 auto;
            font-size: 13px;
            color: #000;
            background: #fff;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          * { color: #000 !important; }
          * { font-weight: 800 !important; }
          ${styles}
        </style>
      </head>
      <body>
        <div id="print-area">${receiptElement.outerHTML}</div>
      </body>
    </html>
  `;

  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(html, "text/html");

  iframeDoc.replaceChild(
    iframeDoc.importNode(parsedDoc.documentElement, true),
    iframeDoc.documentElement
  );

  requestAnimationFrame(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Cleanup
    setTimeout(() => iframe.remove(), 1000);
  });
};

  if (!isOpen  || !receiptData) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex justify-center z-50 p-4 overflow-y-auto no-print">
      <div className="flex items-start justify-center min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full print:w-[80mm] print:m-0 print:rounded-none print:shadow-none">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b no-print">
            <h2 className="text-lg font-semibold">Token Receipt</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Content */}
          <div
            ref={receiptRef}
            id="receipt-content"
            className="p-4 text-xs text-black font-[monospace] print:p-0 print:m-0 print:w-[80mm]"
          >
            {/* Clinic Info */}
            <div className="text-center pb-3 border-b border-black">
              <h3 className="text-lg font-bold uppercase">{clinicInfo.name}</h3>
              <p className="text-[12px] flex items-center justify-center">
                <MapPin className="w-3 h-3 mr-1" /> {clinicInfo.address}
              </p>
              <p className="text-[12px] flex items-center justify-center">
                <Phone className="w-3 h-3 mr-1" /> {clinicInfo.phone}
              </p>
              {clinicInfo.website && <p className="text-[11px]">{clinicInfo.website}</p>}
            </div>

            {/* Token Info */}
            <div className="text-center py-3 border-b border-black">
              <h4 className="text-2xl font-black tracking-widest ">{receiptData.tokenNo}</h4>
              <p className="text-[12px] font-medium mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                {new Date(receiptData.createdAt).toLocaleDateString()} {" "}
                {new Date(receiptData.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Patient Info */}
            {receiptData.patient && (
              <div className="py-3 border-b border-black">
                <h4 className="font-bold text-[13px] mb-2 flex items-center">
                  <User className="w-3 h-3 mr-1" /> Patient Information
                </h4>
                <div className="grid grid-cols-2 gap-1 text-[12px] leading-tight">
                  <p><span className="font-semibold">Name:</span> {receiptData.patient.firstName} {receiptData.patient.lastName}</p>
                  <p><span className="font-semibold">Phone:</span> {receiptData.patient.phone}</p>
                  {receiptData.patient.age && <p><span className="font-semibold">Age:</span> {receiptData.patient.age}</p>}
                  {receiptData.patient.gender && <p><span className="font-semibold">Gender:</span> {receiptData.patient.gender}</p>}
                </div>
              </div>
            )}

            {/* Appointment Details */}
            <div className="py-3 border-b border-black">
              <h4 className="font-bold text-[13px] mb-2 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Appointment Details
              </h4>
              <div className="space-y-1 text-[12px] leading-tight">
                {receiptData.department && (
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span className="font-semibold">{receiptData.department}</span>
                  </div>
                )}
                {receiptData.doctor && (
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span className="font-semibold">{receiptData.doctor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="pt-3 text-[12px]">
              <h4 className="font-bold mb-1">Instructions</h4>
              <ul className="list-none leading-tight">
                <li>• Arrive 15 mins before your time</li>
                <li>• Keep this receipt for your records</li>
                <li>• Contact reception for reschedule</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-3 text-center border-t border-black pt-2 text-[11px]">
              <p>Thank you for visiting <b>{clinicInfo.name}</b></p>
              <p>Powered by Clinic Management System</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-3 border-t no-print">
            <button
              onClick={printReceipt}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Print-only CSS */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            width: 80mm !important;
            color: #000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          #receipt-content {
            width: 80mm !important;
            margin: 0;
            font-size: 11px;
            color: #000 !important;
          }
          * {
            color: #000 !important;
            background: transparent !important;
          }
        }
      `}</style>
    </div>
  );
};



export default TokenReceipt;