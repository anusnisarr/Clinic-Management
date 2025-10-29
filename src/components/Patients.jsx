
import React, { useState, useEffect, useMemo } from 'react';
import PatientFileModal from './PatientModal';
import TokenReceipt from './TokenReceiptViewer';
import axios from 'axios';
import { socket } from "../socket.js"
import { CalendarDays, User, Calendar, Phone, Mail, MapPin, Hash, Clock, UserPlus } from 'lucide-react';

const Patients = () => {
  const [showTokenReceipt, setShowTokenReceipt] = useState({
    isOpen: false,
    patientData: {}
  });
  const [showTokenFile, setShowTokenFile] = useState(false);
  const [editedPatientId, setEditedPatientId] = useState("");
  const [todayPatients, setTodayPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [allPatients, setAllPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const currentToken = useMemo(() => {
    if (loading) return '';
    return (todayPatients.length + 1).toString().padStart(3, '0');
  }, [todayPatients, loading]);


  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    emergencyContact: '',
    emergencyPhone: '',
    appointmentType: 'consultation',
    priority: 'normal',
    medicalHistory: []
  });

  useEffect(() => {
    todayPatient()
  }, [])


  socket.on("status-updated", (data) => {
    setTodayPatients(prevPatients =>
      prevPatients.map(patient => {

        if (patient._id === data.patientId) {
          return { ...patient, status: data.newStatus };
        }
        return patient;

      })
    );
  });

  const deleteAll = async () => {
    try {
      const res = await axios.delete('http://localhost:3000/patient/Delete')

    } catch (error) {
      console.error(error.response?.data || error.message)
    }
  }

  const runFunction = async () => {
    console.log("Today Patients", todayPatients);
    console.log("currently Selected Patient", selectedPatient);
    console.log("CcurrentToken", currentToken);
    console.log("show token data", showTokenReceipt)
    setLoading(true)
  }

  const todayPatient = async () => {

    try {
      const todayPatient = await axios.get(`http://localhost:3000/patient/todayPatient`)

      setTodayPatients(todayPatient.data)

    } catch (error) {
      console.error(`Error Getting All Patient : ${error.response?.data || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getAllPatient = async () => {

    try {
      const res = await axios.get(`http://localhost:3000/patient/`)
      setAllPatients(res.data)
      console.log(res.data);


    } catch (error) {
      console.error(`Error Getting All Patient : ${error.response?.data || error.message}`)
    }
  }
  const getPatientByPhone = async (phone) => {

    if (phone.length < 4) return;


    try {
      const res = await axios.get(`http://localhost:3000/patient/search?phone=${phone}`)

      setSuggestions(res.data)

    } catch (error) {
      console.error(error.response?.data || error.message)

      setErrors(prev => ({
        ...prev,
        phone: error.response?.data?.error || error.message
      }));
    }
  }

  // Generate next token number
  const generateNextToken = () => {
    const nextNumber = (todayPatients.length + 1).toString().padStart(3, '0');
    return nextNumber;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "age" && value < 0) return;

    if (name === "phone") getPatientByPhone(value);

    if (name === "phone" && value === "") setSuggestions([]);


    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!patientData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!patientData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!patientData.phone.trim()) newErrors.phone = 'Phone number is required';
    // if (!patientData.age) newErrors.age = 'Age is required';
    // if (!patientData.gender) newErrors.gender = 'Gender is required';

    // Phone validation
    if (patientData.phone && !/^\d{11,14}$/.test(patientData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    if (patientData.email && !/\S+@\S+\.\S+/.test(patientData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    if (newErrors) console.error(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // Handle form submission
  const handleSubmit = async () => {

    if (!validateForm()) return;

    if (editedPatientId) {

      try {
        const updatedPatient = await axios.patch(`http://localhost:3000/patient/update/${editedPatientId}`, { ...patientData })

      } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
      }

    } else {
      const visitDetails = {
        tokenNo: currentToken,
        registrationTime: new Date().toLocaleTimeString(`en-US`, {
          timeStyle: 'short',
          hour12: true
        }),
        registrationDate: new Date().toISOString(),
        status: 'waiting'
      };

      try {
        
        const patient = await axios.post('http://localhost:3000/patient/Create', {PatientInfo: {...patientData} , visitDetails})
       
        const PatientVisit = {...patient.data , ...patient.data.patientId}
        delete PatientVisit.patientId

        console.log(PatientVisit);
        
    
        
        setTodayPatients(prev => [...prev, PatientVisit]);
        setShowTokenReceipt({ isOpen: true, patientData: PatientVisit })
        // setSelectedPatient(patient.data)


      } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
      }

    }

    // Reset form
    setPatientData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      age: '',
      gender: '',
      emergencyContact: '',
      emergencyPhone: '',
      appointmentType: 'consultation',
      priority: 'normal',
      medicalHistory: []

    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Handle edit patient
  const updatePatientInfo = (patient) => {
    setEditedPatientId(patient._id)

    setPatientData({
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      phone: patient.phone || "",
      email: patient.email || "",
      address: patient.address || "",
      age: patient.age || "",
      gender: patient.gender || "",
      emergencyContact: patient.emergencyContact || "",
      emergencyPhone: patient.emergencyPhone || "",
      appointmentType: patient.appointmentType || "",
      priority: patient.priority || ""
    });

  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserPlus className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Registration</h1>
                <p className="text-gray-600">Register new patients and assign appointment tokens</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Next Token Number</div>
              {loading ?
                (
                  <div className="p-3 rounded-lg bg-gray-200 animate-pulse space-y-3"></div>
                ) :
                (<div className="text-2xl font-bold text-blue-600 flex items-center justify-end">
                  <Hash className="h-5 w-5 mr-1" />
                  {currentToken}
                </div>
                )}
            </div>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={deleteAll}>delete all data</button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={runFunction}>Run Function</button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Patient Information</h2>
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="text-green-800">
                      <strong>Success!</strong> Patient registered successfully with token #{currentToken.slice(-3)}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Personal Information */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative"> {/* ⬅ Wrap input & suggestions in relative */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={patientData.phone}
                        onChange={handleInputChange}
                        className={`appearance-none pl-10 w-full p-3 border focus:outline-none rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Error */}
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 mt-1 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {suggestions.map((patient) => (

                          <li
                            key={patient._id}
                            className="flex justify-between items-center  p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={(e) => {

                              const AlreadyGenerated = todayPatients.some((todayPatient) => todayPatient._id === patient._id);

                              if (AlreadyGenerated) {

                                setShowTokenReceipt({ isOpen: false, patientData: {} })
                                setErrors({ message: "Token Already Generated!" })

                              } else {

                                (async () => {

                                  try {
                                    const patientUpdated = await axios.patch(`http://localhost:3000/patient/update/${patient._id}`
                                      , { tokenNo: currentToken })

                                    setTodayPatients(prev => [...prev, patientUpdated.data]);
                                    setShowTokenReceipt({ isOpen: true, patientData: patientUpdated.data });

                                  } catch (error) {
                                    console.error('❌ Error:', error.response?.data || error.message);
                                  }

                                })();


                              }

                              setSelectedPatient(patient)
                              setSuggestions([]);
                            }}
                          >
                            {patient.firstName} {patient.lastName} – {patient.phone}
                            <button
                              className="cursor-pointer text-blue-600 font-semibold hover:text-white hover:bg-blue-600 active:bg-blue-700 px-4 py-1.5 rounded-md text-sm transition-colors duration-200 shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                updatePatientInfo(patient)
                                setSuggestions([]);
                              }}
                            >
                              Edit
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={patientData.email}
                        onChange={handleInputChange}
                        className={`pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={patientData.firstName}
                        onChange={handleInputChange}
                        className={`pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={patientData.lastName}
                        onChange={handleInputChange}
                        className={`pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      name="address"
                      value={patientData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        value={patientData.age}
                        onChange={handleInputChange}
                        className={`pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.age ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                    </div>
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={patientData.gender}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                </div>

              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={patientData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Emergency contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={patientData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Emergency contact phone"

                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6 ">
              <h3 className="text-md font-medium text-gray-900 mb-4">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    name="appointmentType"
                    value={patientData.appointmentType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="consultation">General Consultation</option>
                    <option value="followup">Follow-up</option>
                    <option value="emergency">Emergency</option>
                    <option value="checkup">Health Checkup</option>
                    <option value="vaccination">Vaccination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={patientData.priority}
                    onChange={handleInputChange}
                    className="w-full p-3 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSubmit}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>{editedPatientId ? "Update Patient & Assign Token" : "Register Patient & Assign Token"}</span>
              </button>
            </div>
          </div>

          {/* Today's Patients Queue */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white rounded-lg shadow-sm">
              <div className='max-h-[500px]s'>
                <div className="flex items-center justify-between mb-4 ">
                  <h2 className="text-lg font-semibold text-gray-900">Today's Queue</h2>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {todayPatients?.length} patients
                  </div>
                </div>
              </div>

              {loading ? (
                // Skeleton placeholder
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-gray-100 animate-pulse space-y-3"
                    >
                      {/* Token and Status line */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 w-10 bg-gray-300 rounded"></div> {/* token placeholder */}
                        <div className="h-5 w-16 bg-gray-300 rounded-full"></div> {/* status badge */}
                      </div>

                      {/* Name line */}
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>

                      {/* Appointment + time line */}
                      <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                todayPatients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No patients registered today</p>
                  </div>
                ) : (
                  todayPatients?.slice().reverse().map((patient) => (
                    <div key={patient._id}
                      onClick={() => {
                        setShowTokenReceipt({ isOpen: true, patientData: patient })
                      }}
                      className={`p-3 border rounded-lg ${patient.priority === 'emergency' ? 'border-red-200 bg-red-50' :
                        patient?.priority === 'urgent' ? 'border-yellow-200 bg-yellow-50' :
                          'border-gray-200 bg-gray-50'
                        }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">
                          #{patient?.tokenNo.slice(-3)}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${patient.priority === 'emergency' ? 'bg-red-100 text-red-800' :
                          patient?.priority === 'urgent' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                          {patient?.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        {patient?.firstName} {patient.lastName}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {patient?.appointmentType} • {patient.registrationTime}
                      </div>

                    </div>
                  ))
                )
              )}
              <TokenReceipt
                isOpen={showTokenReceipt.isOpen}
                onClose={() => setShowTokenReceipt(false)}
                errors={errors}
                setErrors={setErrors}
                patientData={showTokenReceipt.patientData}
                tokenData={{
                  tokenNumber: showTokenReceipt.patientData?.tokenNo || "",
                  createdAt: showTokenReceipt.patientData?.updatedAt || "",
                  status: showTokenReceipt.patientData?.updatedAt || "",
                  estimatedTime: '10:30 AM',
                  department: 'General Medicine',
                  doctor: 'Dr. Sarah Wilson',
                  queuePosition: selectedPatient?.tokenNo || "",
                  notes: 'Follow up appointment',
                  instructions: 'Please bring previous test results'
                }}
              />
              {/* <PatientFileModal isOpen={showTokenReceipt} patient={selectedPatient} onClose={() => { setSelectedPatient(null), setShowTokenReceipt(false) }} /> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;