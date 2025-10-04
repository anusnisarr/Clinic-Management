import React, { useEffect } from 'react';
import { X, Printer, Download, User, Clock, Hash, Calendar, Phone, MapPin } from 'lucide-react';

const TokenReceipt = ({
  isOpen,
  onClose,
  errors,
  setErrors,
  generateToken,
  setQeue,
  tokenData,
  patientData,
  clinicInfo = {
    name: "City Medical Clinic",
    address: "123 Health Street, Medical District",
    phone: "+1-555-CLINIC",
    website: "www.citymedicalclinic.com"
  }
}) => {

  useEffect(() => {
    if (errors?.message) {
      alert(errors.message);
      setErrors({}); // clear error after showing
    }
  }, [errors]);

  if (!isOpen || !tokenData) return null;

  // Print receipt
  const printReceipt = () => {
    window.print();
  };


  return (

    <div className="fixed inset-0 bg-gray-900/50 flex justify-center z-50 p-4 overflow-y-auto">

      <div className="flex items-start justify-center min-h-screen w-full">

        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">


          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b no-print">
            <h2 className="text-xl font-semibold">Token Receipt</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Receipt Content */}
        <div id="receipt-content" className="p-1 space-y-1">

            {/* Clinic Info */}
            <div className="text-center border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900">{clinicInfo.name}</h3>
              <p className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {clinicInfo.address}
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <Phone className="w-4 h-4 mr-1" />
                {clinicInfo.phone}
              </p>
              {clinicInfo.website && (
                <p className="text-sm text-gray-600 mt-1">{clinicInfo.website}</p>
              )}
            </div>

            <hr />

            {/* Token Info */}
            <div className="text-center bg-blue-50 p-4 rounded-lg">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">{tokenData.tokenNumber}</h4>
              <p className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                {new Date(tokenData.createdAt).toLocaleDateString()} at {new Date(tokenData.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <hr />

            {/* Patient Details */}
            {patientData && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Patient Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{patientData.firstName} {patientData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">{patientData.phone}</p>
                  </div>
                  {patientData.age && (
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <p className="font-medium">{patientData.age}</p>
                    </div>
                  )}
                  {patientData.gender && (
                    <div>
                      <span className="text-gray-600">Gender:</span>
                      <p className="font-medium">{patientData.gender}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Appointment Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Appointment Details
              </h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {tokenData.department && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{tokenData.department}</span>
                  </div>
                )}
                {tokenData.doctor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{tokenData.doctor}</span>
                  </div>
                )}
              </div>
            </div>


            <hr />


            {/* Default Instructions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Please arrive 15 minutes before your estimated time</li>
                <li>• Keep this receipt for your records</li>
                <li>• Contact reception if you need to reschedule</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-6 border-t no-print">
            <button
              onClick={printReceipt}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={generateToken}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TokenReceipt;