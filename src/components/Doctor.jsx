import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { socket } from  "../socket.js"


import { 
  User, Clock, Hash, X, Calendar, Phone, Mail, MapPin, 
  FileText, Plus, Trash2, Upload, Download, History,
  Stethoscope, Pill, Thermometer, Activity, ChevronDown, ChevronUp
} from 'lucide-react';

const PatientManagementSystem = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [loading , setLoading] = useState(true);
  const [expandedHistory, setExpandedHistory] = useState({});
  const [currentVisit, setCurrentVisit] = useState({
    diagnosis: '',
    symptoms: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    notes: '',
    attachments: []
  });

    const deleteAll = async ()=>{
    try {
      const res = await axios.delete('http://localhost:3000/patient/Delete')
      console.log(res);
      
      setPatients([])
      
    } catch (error) {
      console.error(error.response?.data || error.message)
    }
  }

  //for testing
  const hitApiTest = async () => {
    
    try {
        // const todayPatient = await axios.get(`http://localhost:3000/patient/todayPatient`)

        console.log('NOTHING SETUP')
    } catch (error) {
      console.error(`Error Getting All Patient : ${error.response?.data || error.message}`)
    } finally{
      setLoading(false)
    }
  }

  const todayPatient = async () => {
    
    try {
        const todayPatient = await axios.get(`http://localhost:3000/patient/todayPatient`)
        
        setPatients(todayPatient.data)
        console.log(`today patient data `, todayPatient.data)
    } catch (error) {
      console.error(`Error Getting Patients data : ${error.response?.data || error.message}`)
    } finally{
      setLoading(false)
    }
  }

  //FOR FUTURE USE
  // const getAllPatient = async () => {
    
  //   try {
  //       const allPatient = await axios.get(`http://localhost:3000/patient/`)
        
  //       setPatients(allPatient.data)

  //       console.log(`all patient data `, allPatient.data)
  //   } catch (error) {
  //     console.error(`Error Getting All Patient : ${error.response?.data || error.message}`)
  //   } finally{
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
      todayPatient()    
  }, [])

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('current');
    setCurrentVisit({
      diagnosis: '',
      symptoms: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
      notes: '',
      attachments: []
    });
  };

  const handleCloseSidebar = () => {
    setSelectedPatient(null);
  };

  const handleAtionButtons = async (patientId , status) => {

      socket.emit("status-updated", {
        patientId: patientId,
        newStatus: status
      });
      
      try {
        
        const statusUpdated = await axios.patch(`http://localhost:3000/patient/update/${patientId}`, { status })
      
        console.log("statusUpdated" , statusUpdated.data);
        
      } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
      }
    
  };

  const addMedicine = () => {
    setCurrentVisit(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const removeMedicine = (index) => {
    setCurrentVisit(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const updateMedicine = (index, field, value) => {
    setCurrentVisit(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleInputChange = (field, value) => {
    console.log(field ,"|", value);
    console.log(currentVisit);
    
    
    setCurrentVisit(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setCurrentVisit(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files.map(file => file.name)]
    }));
  };

  const saveCurrentVisit = async () => {    
    // Add your save logic here
    setLoading(true)
    try {
      const res = await axios.patch(`http://localhost:3000/patient/updateMedicalHistory/${selectedPatient._id}` ,
      currentVisit);
      
    } catch (error) {
      console.error(error.response?.data || error.message)
    } finally{
      setLoading(false)
    }
  };

  const toggleHistoryExpanded = (index) => {

    setExpandedHistory(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBorder = (priority) => {
    switch (priority) {
      case 'emergency':
        return 'border-red-200 bg-red-50';
      case 'urgent':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options); // e.g., "14 June 2025, 08:15 AM"
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
                <p className="text-gray-600">Manage appointments and medical records</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 flex items-center justify-end">
                <Clock className="h-4 w-4 mr-1" />
                Total Patients
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {patients.length}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Patient List */}
          <div className={`${selectedPatient ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow" 
             type="button" onClick={hitApiTest}>HIT API</button>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Today's Appointments</h2>
              
              {patients.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No patients in queue</p>
                  <p className="text-sm">New registrations will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div 
                      key={patient._id}
                      onClick={() => handlePatientClick(patient)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedPatient?._id === patient._id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      } ${getPriorityBorder(patient.priority)}`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Patient Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center text-blue-600 font-medium">
                              <Hash className="h-4 w-4 mr-1" />
                              {patient.tokenNo.slice(-3)}
                            </div>
                            <div className="font-semibold text-gray-900">
                              {patient.fullName}
                            </div>
                          </div>
                          
                          {/* Appointment Type */}
                          <div className="mb-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              Status
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                {patient.status}
                              </span>
                              <span className="text-sm text-gray-600">
                                {patient.appointmentType}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            Registered: {patient.registrationTime}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAtionButtons(patient._id , "Checkup Done");
                            }}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          >
                            Mark as Done
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAtionButtons(patient._id , "On Hold");
                            }}
                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                          >
                            Hold
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Sidebar */}
          {selectedPatient && (
            <div className="w-1/2 bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedPatient.fullName}
                  </h2>
                </div>
                <button
                  onClick={handleCloseSidebar}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Patient Basic Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{selectedPatient.age} years, {selectedPatient.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <span>Token: {selectedPatient.tokenNo}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-sm">{selectedPatient.address}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'current'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Current Visit
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Medical History
                </button>
              </div>

              {/* Current Visit Tab */}
              {activeTab === 'current' && (
                <div className="space-y-6">
                  {/* Diagnosis */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      value={currentVisit.diagnosis}
                      onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter diagnosis (e.g., Common Cold, Flu, Fever)"
                    />
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Symptoms
                    </label>
                    <textarea
                      value={currentVisit.symptoms}
                      onChange={(e) => handleInputChange('symptoms', e.target.value)}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe symptoms..."
                    />
                  </div>

                  {/* Medicines */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Prescribed Medicines
                      </label>
                      <button
                        onClick={addMedicine}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Medicine</span>
                      </button>
                    </div>

                    {currentVisit.medicines.map((medicine, index) => (
                      <div key={index} className="border rounded-lg p-4 mb-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">Medicine {index + 1}</span>
                          </div>
                          {currentVisit.medicines.length > 1 && (
                            <button
                              onClick={() => removeMedicine(index)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Medicine name"
                            value={medicine.name}
                            onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Dosage (e.g., 500mg)"
                            value={medicine.dosage}
                            onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Frequency (e.g., 3 times daily)"
                            value={medicine.frequency}
                            onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g., 5 days)"
                            value={medicine.duration}
                            onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={currentVisit.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional notes or instructions..."
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload medical documents, reports, or images</p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </label>
                    </div>
                    {currentVisit.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {currentVisit.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-700">{file}</span>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={saveCurrentVisit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Save Visit Record</span>
                  </button>
                </div>
              )}

              {/* Medical History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  {selectedPatient.medicalHistory?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <History className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No previous medical history</p>
                      <p className="text-sm">Past visits will appear here</p>
                    </div>
                  ) : (
                    selectedPatient.medicalHistory?.map((visit, index) => (
                      <div key={index} className="cursor-pointer border rounded-lg p-4 bg-gray-50"
                       onClick={() => toggleHistoryExpanded(index)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-gray-900">{formatDateTime(visit.createdAt)}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {visit.diagnosis}
                            </span>
                          </div>
        
                            {expandedHistory[index] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Symptoms:</strong> {visit.symptoms}
                        </div>

                        {expandedHistory[index] && (
                          <div className="mt-4 space-y-3">
                            {visit.medicines.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Prescribed Medicines:</h4>
                                <div className="space-y-2">
                                  {visit.medicines.map((med, medIndex) => (
                                    <div key={medIndex} className="bg-white p-3 rounded-md border">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <Pill className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">{med.name}</span>
                                      </div>
                                      <div className="text-sm text-gray-600 grid grid-cols-3 gap-2">
                                        <span>Dosage: {med.dosage}</span>
                                        <span>Frequency: {med.frequency}</span>
                                        <span>Duration: {med.duration}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {visit.attachments.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Attachments:</h4>
                                <div className="space-y-1">
                                  {visit.attachments.map((file, fileIndex) => (
                                    <div key={fileIndex} className="flex items-center justify-between p-2 bg-white rounded-md">
                                      <span className="text-sm text-gray-700">{file}</span>
                                      <button className="text-blue-600 hover:text-blue-800">
                                        <Download className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {visit.notes && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                                <p className="text-sm text-gray-600 bg-white p-3 rounded-md">
                                  {visit.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagementSystem;