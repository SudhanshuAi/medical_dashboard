import type { Device } from '../features/inventory/inventorySlice';
import type { Installation } from '../components/InstallationForm';
import type { ServiceVisit } from '../components/ServiceVisitForm';
import type { TrainingLog } from '../components/TrainingForm';
import type { PhotoLog } from '../components/PhotoUploadForm';

export const generateSampleDevices = (): Device[] => [
  {
    id: 'DEV001',
    type: 'MRI Scanner',
    facility: 'Main Hospital',
    status: 'Online',
    battery: 85,
    lastServiceDate: '2024-01-15',
    contract: 'AMC',
    amcStatus: 'Active',
    amcStartDate: '2023-01-01',
    amcEndDate: '2024-12-31',
  },
  {
    id: 'DEV002',
    type: 'CT Scanner',
    facility: 'Emergency Wing',
    status: 'Offline',
    battery: 15,
    lastServiceDate: '2024-02-01',
    contract: 'CMC',
    amcStatus: 'Expired',
    amcStartDate: '2022-01-01',
    amcEndDate: '2023-12-31',
  },
  {
    id: 'DEV003',
    type: 'X-Ray Machine',
    facility: 'Outpatient Clinic',
    status: 'Online',
    battery: 92,
    lastServiceDate: '2024-03-10',
    contract: 'AMC',
    amcStatus: 'Active',
    amcStartDate: '2023-06-01',
    amcEndDate: '2024-05-31',
  },
  {
    id: 'DEV004',
    type: 'Ultrasound Machine',
    facility: 'Maternity Ward',
    status: 'Maintenance',
    battery: 45,
    lastServiceDate: '2024-01-20',
    contract: 'CMC',
    amcStatus: 'Active',
    amcStartDate: '2023-03-01',
    amcEndDate: '2024-02-28',
  },
];

export const generateSampleInstallations = (): Installation[] => [
  {
    id: 'INST001',
    deviceId: 'DEV001',
    facility: 'Main Hospital',
    installationDate: '2024-01-15',
    unboxingPhotoUrl: '/sample-photos/mri-installation.jpg',
  },
  {
    id: 'INST002',
    deviceId: 'DEV002',
    facility: 'Emergency Wing',
    installationDate: '2024-02-01',
    unboxingPhotoUrl: '/sample-photos/ct-installation.jpg',
  },
];

export const generateSampleServiceVisits = (): ServiceVisit[] => [
  {
    id: 'SV001',
    deviceId: 'DEV001',
    visitDate: '2024-01-15',
    purpose: 'Preventive',
    notes: 'All systems functioning normally. Replaced air filter. Schedule next maintenance in 3 months.',
    attachments: [],
  },
  {
    id: 'SV002',
    deviceId: 'DEV002',
    visitDate: '2024-02-01',
    purpose: 'Breakdown',
    notes: 'Power supply unit malfunction. Replaced defective component. Monitor power supply performance closely.',
    attachments: [],
  },
];

export const generateSampleTrainingLogs = (): TrainingLog[] => [
  {
    id: 'TR001',
    installationId: 'INST001',
    traineeName: 'Dr. Emily Brown',
    trainingDate: '2024-01-16',
    feedback: 'Completed basic operation training. Trainee demonstrated proficiency.',
  },
  {
    id: 'TR002',
    installationId: 'INST002',
    traineeName: 'Dr. Robert Davis',
    trainingDate: '2024-02-02',
    feedback: 'Advanced features training completed. Additional session scheduled.',
  },
];

export const generateSamplePhotoLogs = (): PhotoLog[] => [
  {
    id: 'PH001',
    facilityId: 'FAC001',
    caption: 'MRI Scanner - Pre-installation inspection',
    uploadDate: '2024-01-15T10:30:00Z',
    imageUrl: '/sample-photos/mri-inspection.jpg',
  },
  {
    id: 'PH002',
    facilityId: 'FAC002',
    caption: 'CT Scanner - Installation progress',
    uploadDate: '2024-02-01T14:15:00Z',
    imageUrl: '/sample-photos/ct-progress.jpg',
  },
];

export const generateCompleteSampleData = () => {
  const devices = generateSampleDevices();
  const installations = generateSampleInstallations();
  const serviceVisits = generateSampleServiceVisits();
  const trainingLogs = generateSampleTrainingLogs();
  const photoLogs = generateSamplePhotoLogs();

  return {
    inventory: { devices },
    installations: { installations },
    serviceVisits: { visits: serviceVisits },
    training: { logs: trainingLogs },
    photoLogs: { logs: photoLogs },
    alerts: { alerts: [] }, // Will be generated based on devices
  };
}; 