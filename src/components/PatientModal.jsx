// PatientModal.jsx
import React from 'react';
const PatientFileModal = ({ patient,  isOpen , onClose }) => {
  if (!patient || !isOpen) return null;
  console.log(patient);
  console.log(isOpen);
  

  return (
    <div className="fixed inset-0 bg-gray-300/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* White paper document with clean styling */}
      <div className="bg-white p-6 rounded-sm shadow-lg w-full max-w-2xl border border-gray-300 relative font-serif">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6 border-b border-gray-300 pb-3">
          <h1 className="text-2xl font-bold tracking-tight">PATIENT MEDICAL RECORD</h1>
          <p className="text-xs text-gray-500 mt-1">CONFIDENTIAL • {new Date().toLocaleDateString()}</p>
        </div>

        {/* Patient Info in clean layout */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Full Name</p>
            <p className="border-b border-gray-200 pb-1">{patient.fullName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Contact</p>
            <p className="border-b border-gray-200 pb-1">{patient.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Token No</p>
            <p className="border-b border-gray-200 pb-1 font-mono">{patient.tokenNo}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Registered</p>
            <p className="border-b border-gray-200 pb-1">{new Date(patient.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient Photo */}
        {patient.image && (
          <div className="mb-6 text-center">
            <img
              src={patient.image}
              alt="Patient"
              className="inline-block h-32 w-32 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
        )}

        {/* Current Visit Details (fixed) */}
        <div className="mb-6 border border-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">CURRENT VISIT</span>
            <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
          </h2>
          
          <div className="text-sm space-y-2">
            <p><strong>Diagnosis:</strong> {patient.medicalHistory[0]?.diagnosis}</p>
            <p><strong>Treatment Plan:</strong> Amoxicillin 500mg TID × 7 days</p>
            <p><strong>Doctor's Remarks:</strong> {patient.medicalHistory[0]?.notes}</p>
          </div>
        </div>

        {/* Payment Summary (from newer version) */}
        <div className="border border-gray-300 p-3 mb-4">
          <h3 className="font-bold text-sm mb-2">PAYMENT SUMMARY</h3>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span>$75.00</span>
            </div>
            <div className="flex justify-between">
              <span>Medication</span>
              <span>$28.50</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 mt-1 pt-1 font-bold">
              <span>TOTAL</span>
              <span>$103.50</span>
            </div>
          </div>
        </div>


        {/* Action buttons (Print and Pay) */}
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
            onClick={() => window.print()}
          >
            Print Record
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            onClick={() => alert('Processing payment...')}
          >
            Process Payment
          </button>
        </div>

        {/* Visit History (original format) */}
        <div>
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">VISIT HISTORY</h2>
          {patient.history && patient.history.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {patient.history.map((visit, idx) => (
                <li key={idx} className="border-b pb-2 text-sm">
                  <p><strong>Date:</strong> {new Date(visit.date).toLocaleDateString()}</p>
                  <p><strong>Notes:</strong> {visit.notes}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No visit history available.</p>
          )}
        </div>


        {/* Footer (from newer version) */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Thank you for choosing our clinic</p>
          <p className="mt-1">Document generated on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientFileModal;
