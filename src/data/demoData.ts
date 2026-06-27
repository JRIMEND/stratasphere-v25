import type {
  Property, Tenant, Lease, RentPayment, MaintenanceRequest, Contractor,
  UtilityConnection, BodyCorporate, ActivityFeedItem, PortfolioChartData,
  UpcomingTask, QuickAction, NotificationItem, PropertyTypeDistribution,
} from '@/types';

// ── Properties (8 properties, all 7 types) ──────────────────────────

export const properties: Property[] = [
  {
    id: 'prop-001', name: 'The Meridian', type: 'apartment',
    address: { street: '127 Charlotte Street', suburb: 'Brisbane City', state: 'QLD', postcode: '4000', country: 'Australia' },
    description: 'Luxury 12-storey apartment tower in Brisbane CBD with 48 units, rooftop amenities and volumetric airspace rights.',
    bedrooms: 48, bathrooms: 52, carSpaces: 36, floorArea: 4200, landArea: 1200, yearBuilt: 2019,
    roofType: 'flat', purchasePrice: 18500000, currentValue: 22400000, rentalIncome: 142000, expenses: 38000,
    features: ['Pool', 'Gym', 'Rooftop Terrace', 'Secure Parking', 'Intercom', 'Elevator', 'NBN'],
    images: [], hasVolumetricTitle: true, volumetricLevels: 12, airspaceRights: true, subsurfaceRights: false,
    droneCorridorId: 'DC-2847', casaPermitNumber: 'CASA-2024-1189', bodyCorporateId: 'bc-001', isActive: true,
    createdAt: '2023-01-15T00:00:00Z', updatedAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'prop-002', name: 'Farm Ridge Estate', type: 'farm',
    address: { street: '1847 Gatton-Helidon Road', suburb: 'Gatton', state: 'QLD', postcode: '4343', country: 'Australia' },
    description: 'Working horticultural farm with 45 hectares of irrigated cropping land, packing shed and workers accommodation.',
    bedrooms: 4, bathrooms: 2, carSpaces: 8, floorArea: 320, landArea: 450000, yearBuilt: 1987,
    roofType: 'shed', purchasePrice: 2100000, currentValue: 2850000, rentalIncome: 8500, expenses: 4200,
    features: ['Irrigation', 'Packing Shed', 'Workers Quarters', 'Dam', 'Bore', 'Solar Array', 'Machinery Shed'],
    images: [], hasVolumetricTitle: false, airspaceRights: true, subsurfaceRights: true,
    casaPermitNumber: 'CASA-2024-2045', isActive: true,
    createdAt: '2023-02-10T00:00:00Z', updatedAt: '2025-11-15T00:00:00Z',
  },
  {
    id: 'prop-003', name: '42 Main Street', type: 'residential',
    address: { street: '42 Main Street', suburb: 'Kangaroo Point', state: 'QLD', postcode: '4169', country: 'Australia' },
    description: 'Heritage Queenslander fully renovated with modern amenities while retaining original character features.',
    bedrooms: 4, bathrooms: 2, carSpaces: 2, floorArea: 285, landArea: 650, yearBuilt: 1925,
    roofType: 'gable', purchasePrice: 1250000, currentValue: 1680000, rentalIncome: 3200, expenses: 850,
    features: ['Heritage Features', 'Deck', 'Air Conditioning', 'Solar Hot Water', 'Garden', 'Shed'],
    images: [], hasVolumetricTitle: false, isActive: true,
    createdAt: '2023-03-05T00:00:00Z', updatedAt: '2025-10-20T00:00:00Z',
  },
  {
    id: 'prop-004', name: 'Harbourview Plaza', type: 'commercial',
    address: { street: '88 Marine Parade', suburb: 'Southport', state: 'QLD', postcode: '4215', country: 'Australia' },
    description: 'Modern 6-level commercial office building with ground floor retail and underground parking. Gold Coast CBD fringe.',
    bedrooms: 0, bathrooms: 12, carSpaces: 45, floorArea: 3600, landArea: 1800, yearBuilt: 2017,
    roofType: 'flat', purchasePrice: 8200000, currentValue: 9450000, rentalIncome: 68000, expenses: 18500,
    features: ['Lift Access', 'NBN', 'Air Conditioning', 'Kitchenette', 'Meeting Rooms', 'Secure Parking', 'CCTV'],
    images: [], hasVolumetricTitle: true, volumetricLevels: 6, airspaceRights: true, subsurfaceRights: true,
    droneCorridorId: 'DC-3122', casaPermitNumber: 'CASA-2024-3401', bodyCorporateId: 'bc-002', isActive: true,
    createdAt: '2023-04-12T00:00:00Z', updatedAt: '2025-12-10T00:00:00Z',
  },
  {
    id: 'prop-005', name: 'Sunrise Retail Precinct', type: 'retail',
    address: { street: '45-51 Mooloolaba Esplanade', suburb: 'Mooloolaba', state: 'QLD', postcode: '4557', country: 'Australia' },
    description: 'Beachfront retail strip with 8 tenancies including cafes, boutique stores and surf shop. High foot traffic.',
    bedrooms: 0, bathrooms: 6, carSpaces: 25, floorArea: 680, landArea: 950, yearBuilt: 2015,
    roofType: 'flat', purchasePrice: 5200000, currentValue: 6100000, rentalIncome: 42000, expenses: 11200,
    features: ['Ocean Views', 'Outdoor Seating', 'Rear Access', 'Loading Dock', 'Storage'],
    images: [], hasVolumetricTitle: false, isActive: true,
    createdAt: '2023-05-20T00:00:00Z', updatedAt: '2025-09-28T00:00:00Z',
  },
  {
    id: 'prop-006', name: 'Pacific Logistics Hub', type: 'industrial',
    address: { street: '77 Export Drive', suburb: 'Pinkenba', state: 'QLD', postcode: '4008', country: 'Australia' },
    description: 'Purpose-built logistics warehouse near Port of Brisbane with 12m clearance and 20 container bays.',
    bedrooms: 0, bathrooms: 4, carSpaces: 35, floorArea: 8200, landArea: 12000, yearBuilt: 2021,
    roofType: 'shed', purchasePrice: 11200000, currentValue: 12800000, rentalIncome: 85000, expenses: 22000,
    features: ['12m Clearance', 'Container Bays', 'Loading Docks', 'Office Fitout', 'Security Fence', 'Truck Parking'],
    images: [], hasVolumetricTitle: false, airspaceRights: true, subsurfaceRights: false,
    casaPermitNumber: 'CASA-2024-5621', isActive: true,
    createdAt: '2023-06-08T00:00:00Z', updatedAt: '2025-11-30T00:00:00Z',
  },
  {
    id: 'prop-007', name: 'Airspace Tower — Balance Lot', type: 'balance',
    address: { street: '200 Turbot Street', suburb: 'Spring Hill', state: 'QLD', postcode: '4000', country: 'Australia' },
    description: 'Mixed-use balance lot development with strata subdivision. 24 residential units over 4 commercial suites.',
    bedrooms: 24, bathrooms: 28, carSpaces: 30, floorArea: 2800, landArea: 800, yearBuilt: 2022,
    roofType: 'flat', purchasePrice: 9800000, currentValue: 12200000, rentalIncome: 88000, expenses: 21000,
    features: ['Mixed Use', 'NBN', 'Solar', 'Elevator', 'Secure Access', 'Bike Storage'],
    images: [], hasVolumetricTitle: true, volumetricLevels: 8, airspaceRights: true, subsurfaceRights: true,
    droneCorridorId: 'DC-4521', bodyCorporateId: 'bc-001', isActive: true,
    createdAt: '2023-07-18T00:00:00Z', updatedAt: '2025-12-05T00:00:00Z',
  },
  {
    id: 'prop-008', name: 'Noosa Heads Beach House', type: 'residential',
    address: { street: '17 Hastings Street', suburb: 'Noosa Heads', state: 'QLD', postcode: '4567', country: 'Australia' },
    description: 'Premium beachfront residence with direct ocean access, heated pool and smart home automation.',
    bedrooms: 5, bathrooms: 3, carSpaces: 3, floorArea: 420, landArea: 850, yearBuilt: 2020,
    roofType: 'hip', purchasePrice: 4200000, currentValue: 5800000, rentalIncome: 8500, expenses: 3200,
    features: ['Ocean Front', 'Heated Pool', 'Smart Home', 'Outdoor Kitchen', 'Guest House', 'Double Garage'],
    images: [], hasVolumetricTitle: false, isActive: true,
    createdAt: '2023-08-22T00:00:00Z', updatedAt: '2025-08-14T00:00:00Z',
  },
];

// ── Tenants (15) ─────────────────────────────────────────────────────

export const tenants: Tenant[] = [
  { id: 'tnt-001', firstName: 'James', lastName: 'Wilson', email: 'j.wilson@email.com.au', phone: '0401 234 567', dateOfBirth: '1985-03-15', emergencyContact: { name: 'Sarah Wilson', phone: '0402 345 678', relationship: 'Spouse' }, documents: ['lease-001', 'id-scan'], notes: '', createdAt: '2023-01-20T00:00:00Z', propertyId: 'prop-001' },
  { id: 'tnt-002', firstName: 'Emily', lastName: 'Chen', email: 'emily.chen@email.com.au', phone: '0412 456 789', dateOfBirth: '1990-07-22', emergencyContact: { name: 'David Chen', phone: '0413 567 890', relationship: 'Partner' }, documents: ['lease-002'], notes: 'Renewal due March 2026', createdAt: '2023-02-14T00:00:00Z', propertyId: 'prop-001' },
  { id: 'tnt-003', firstName: 'Michael', lastName: 'Thompson', email: 'm.thompson@outlook.com', phone: '0423 678 901', dateOfBirth: '1978-11-05', emergencyContact: { name: 'Lisa Thompson', phone: '0424 789 012', relationship: 'Spouse' }, documents: ['lease-003'], notes: '', createdAt: '2023-03-10T00:00:00Z', propertyId: 'prop-003' },
  { id: 'tnt-004', firstName: 'Sophie', lastName: 'Anderson', email: 'sophie.a@email.com.au', phone: '0434 890 123', dateOfBirth: '1992-01-30', emergencyContact: { name: 'Jack Anderson', phone: '0435 901 234', relationship: 'Brother' }, documents: ['lease-004'], notes: '', createdAt: '2023-04-05T00:00:00Z', propertyId: 'prop-004' },
  { id: 'tnt-005', firstName: 'Daniel', lastName: 'Park', email: 'daniel.park@email.com.au', phone: '0445 012 345', dateOfBirth: '1988-09-18', emergencyContact: { name: 'Min Park', phone: '0446 123 456', relationship: 'Mother' }, documents: ['lease-005'], notes: '', createdAt: '2023-05-12T00:00:00Z', propertyId: 'prop-005' },
  { id: 'tnt-006', firstName: 'Olivia', lastName: 'Martinez', email: 'o.martinez@email.com.au', phone: '0456 234 567', dateOfBirth: '1995-05-08', emergencyContact: { name: 'Carlos Martinez', phone: '0457 345 678', relationship: 'Father' }, documents: ['lease-006'], notes: '', createdAt: '2023-06-20T00:00:00Z', propertyId: 'prop-001' },
  { id: 'tnt-007', firstName: 'Liam', lastName: 'O\'Brien', email: 'liam.obrien@email.com.au', phone: '0467 456 789', dateOfBirth: '1982-12-03', emergencyContact: { name: 'Megan O\'Brien', phone: '0468 567 890', relationship: 'Spouse' }, documents: ['lease-007'], notes: '', createdAt: '2023-07-15T00:00:00Z', propertyId: 'prop-007' },
  { id: 'tnt-008', firstName: 'Ava', lastName: 'Nguyen', email: 'ava.nguyen@email.com.au', phone: '0478 678 901', dateOfBirth: '1993-04-25', emergencyContact: { name: 'Tom Nguyen', phone: '0479 789 012', relationship: 'Partner' }, documents: ['lease-008'], notes: '', createdAt: '2023-08-08T00:00:00Z', propertyId: 'prop-008' },
  { id: 'tnt-009', firstName: 'Noah', lastName: 'Patel', email: 'noah.patel@email.com.au', phone: '0489 890 123', dateOfBirth: '1989-08-14', emergencyContact: { name: 'Priya Patel', phone: '0490 901 234', relationship: 'Spouse' }, documents: [], notes: 'Application pending', createdAt: '2023-09-01T00:00:00Z' },
  { id: 'tnt-010', firstName: 'Isabella', lastName: 'Murphy', email: 'isabella.m@email.com.au', phone: '0491 012 345', dateOfBirth: '1991-06-17', emergencyContact: { name: 'Sean Murphy', phone: '0492 123 456', relationship: 'Father' }, documents: [], notes: '', createdAt: '2023-09-25T00:00:00Z', propertyId: 'prop-004' },
  { id: 'tnt-011', firstName: 'William', lastName: 'Kim', email: 'will.kim@email.com.au', phone: '0403 234 567', dateOfBirth: '1987-02-09', emergencyContact: { name: 'Anna Kim', phone: '0404 345 678', relationship: 'Spouse' }, documents: [], notes: '', createdAt: '2023-10-10T00:00:00Z', propertyId: 'prop-002' },
  { id: 'tnt-012', firstName: 'Charlotte', lastName: 'Singh', email: 'charlotte.s@email.com.au', phone: '0415 456 789', dateOfBirth: '1994-10-28', emergencyContact: { name: 'Raj Singh', phone: '0416 567 890', relationship: 'Partner' }, documents: [], notes: '', createdAt: '2023-11-05T00:00:00Z', propertyId: 'prop-006' },
  { id: 'tnt-013', firstName: 'Benjamin', lastName: 'Taylor', email: 'ben.taylor@email.com.au', phone: '0427 678 901', dateOfBirth: '1980-04-12', emergencyContact: { name: 'Kate Taylor', phone: '0428 789 012', relationship: 'Spouse' }, documents: [], notes: '', createdAt: '2023-11-20T00:00:00Z' },
  { id: 'tnt-014', firstName: 'Mia', lastName: 'Johnson', email: 'mia.johnson@email.com.au', phone: '0439 890 123', dateOfBirth: '1996-12-01', emergencyContact: { name: 'Peter Johnson', phone: '0440 901 234', relationship: 'Father' }, documents: [], notes: '', createdAt: '2023-12-15T00:00:00Z', propertyId: 'prop-005' },
  { id: 'tnt-015', firstName: 'Lucas', lastName: 'Wang', email: 'lucas.wang@email.com.au', phone: '0451 123 456', dateOfBirth: '1986-07-20', emergencyContact: { name: 'Helen Wang', phone: '0452 234 567', relationship: 'Spouse' }, documents: [], notes: '', createdAt: '2024-01-10T00:00:00Z', propertyId: 'prop-007' },
];

// ── Leases (8) ───────────────────────────────────────────────────────

export const leases: Lease[] = [
  { id: 'lse-001', propertyId: 'prop-001', tenantId: 'tnt-001', startDate: '2024-02-01', endDate: '2025-01-31', rentAmount: 2400, rentFrequency: 'monthly', bondAmount: 4800, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['No pets without approval', 'Aircon serviced annually'], createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z' },
  { id: 'lse-002', propertyId: 'prop-001', tenantId: 'tnt-002', startDate: '2024-03-15', endDate: '2025-03-14', rentAmount: 2650, rentFrequency: 'monthly', bondAmount: 5300, bondStatus: 'held', status: 'active', renewalReminderSent: true, specialConditions: ['Parking space 12 allocated'], createdAt: '2024-02-28T00:00:00Z', updatedAt: '2024-02-28T00:00:00Z' },
  { id: 'lse-003', propertyId: 'prop-003', tenantId: 'tnt-003', startDate: '2024-01-01', endDate: '2025-12-31', rentAmount: 3200, rentFrequency: 'monthly', bondAmount: 6400, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['Garden maintained by tenant', 'Heritage features to be preserved'], createdAt: '2023-12-10T00:00:00Z', updatedAt: '2023-12-10T00:00:00Z' },
  { id: 'lse-004', propertyId: 'prop-004', tenantId: 'tnt-004', startDate: '2024-06-01', endDate: '2027-05-31', rentAmount: 8500, rentFrequency: 'monthly', bondAmount: 17000, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['Fit-out subject to landlord approval', 'Signage rights included'], createdAt: '2024-05-15T00:00:00Z', updatedAt: '2024-05-15T00:00:00Z' },
  { id: 'lse-005', propertyId: 'prop-005', tenantId: 'tnt-005', startDate: '2024-04-01', endDate: '2026-03-31', rentAmount: 5200, rentFrequency: 'monthly', bondAmount: 10400, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['Outdoor seating permit included', 'Trading hours 6am-10pm'], createdAt: '2024-03-10T00:00:00Z', updatedAt: '2024-03-10T00:00:00Z' },
  { id: 'lse-006', propertyId: 'prop-001', tenantId: 'tnt-006', startDate: '2024-07-01', endDate: '2025-06-30', rentAmount: 2100, rentFrequency: 'monthly', bondAmount: 4200, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: [], createdAt: '2024-06-15T00:00:00Z', updatedAt: '2024-06-15T00:00:00Z' },
  { id: 'lse-007', propertyId: 'prop-007', tenantId: 'tnt-007', startDate: '2024-08-01', endDate: '2025-07-31', rentAmount: 1800, rentFrequency: 'monthly', bondAmount: 3600, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['Commercial noise restrictions apply'], createdAt: '2024-07-15T00:00:00Z', updatedAt: '2024-07-15T00:00:00Z' },
  { id: 'lse-008', propertyId: 'prop-008', tenantId: 'tnt-008', startDate: '2024-09-01', endDate: '2025-08-31', rentAmount: 8500, rentFrequency: 'monthly', bondAmount: 17000, bondStatus: 'held', status: 'active', renewalReminderSent: false, specialConditions: ['Pool maintenance included', 'No short-term subletting'], createdAt: '2024-08-15T00:00:00Z', updatedAt: '2024-08-15T00:00:00Z' },
];

// ── Rent Payments (12) ───────────────────────────────────────────────

export const rentPayments: RentPayment[] = [
  { id: 'rpay-001', leaseId: 'lse-001', propertyId: 'prop-001', tenantId: 'tnt-001', amount: 2400, dueDate: '2025-01-01', paidDate: '2025-01-01', status: 'paid', paymentMethod: 'bank_transfer', reference: 'RENT-JAN-001', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-002', leaseId: 'lse-001', propertyId: 'prop-001', tenantId: 'tnt-001', amount: 2400, dueDate: '2025-01-15', status: 'overdue', paymentMethod: 'bank_transfer', reference: 'RENT-JAN-002', createdAt: '2025-01-15T00:00:00Z' },
  { id: 'rpay-003', leaseId: 'lse-002', propertyId: 'prop-001', tenantId: 'tnt-002', amount: 2650, dueDate: '2025-01-01', paidDate: '2025-01-02', status: 'paid', paymentMethod: 'bpay', reference: 'BPAY-992831', createdAt: '2025-01-02T00:00:00Z' },
  { id: 'rpay-004', leaseId: 'lse-003', propertyId: 'prop-003', tenantId: 'tnt-003', amount: 3200, dueDate: '2025-01-01', paidDate: '2025-01-01', status: 'paid', paymentMethod: 'bank_transfer', reference: 'RENT-JAN-003', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-005', leaseId: 'lse-004', propertyId: 'prop-004', tenantId: 'tnt-004', amount: 8500, dueDate: '2025-01-01', paidDate: '2025-01-03', status: 'paid', paymentMethod: 'bank_transfer', reference: 'RENT-JAN-004', createdAt: '2025-01-03T00:00:00Z' },
  { id: 'rpay-006', leaseId: 'lse-005', propertyId: 'prop-005', tenantId: 'tnt-005', amount: 5200, dueDate: '2025-01-01', status: 'pending', paymentMethod: 'bank_transfer', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-007', leaseId: 'lse-006', propertyId: 'prop-001', tenantId: 'tnt-006', amount: 2100, dueDate: '2025-01-01', paidDate: '2025-01-01', status: 'paid', paymentMethod: 'bank_transfer', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-008', leaseId: 'lse-007', propertyId: 'prop-007', tenantId: 'tnt-007', amount: 1800, dueDate: '2025-01-01', paidDate: '2024-12-30', status: 'paid', paymentMethod: 'bank_transfer', createdAt: '2024-12-30T00:00:00Z' },
  { id: 'rpay-009', leaseId: 'lse-008', propertyId: 'prop-008', tenantId: 'tnt-008', amount: 8500, dueDate: '2025-01-01', status: 'pending', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-010', leaseId: 'lse-004', propertyId: 'prop-004', tenantId: 'tnt-010', amount: 4200, dueDate: '2025-01-01', paidDate: '2025-01-05', status: 'partial', paymentMethod: 'bank_transfer', createdAt: '2025-01-05T00:00:00Z' },
  { id: 'rpay-011', leaseId: 'lse-002', propertyId: 'prop-002', tenantId: 'tnt-011', amount: 8500, dueDate: '2025-01-01', paidDate: '2025-01-01', status: 'paid', paymentMethod: 'bank_transfer', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'rpay-012', leaseId: 'lse-006', propertyId: 'prop-006', tenantId: 'tnt-012', amount: 12000, dueDate: '2025-01-01', paidDate: '2025-01-04', status: 'paid', paymentMethod: 'bank_transfer', createdAt: '2025-01-04T00:00:00Z' },
];

// ── Maintenance Requests (10) ────────────────────────────────────────

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'mnt-001', propertyId: 'prop-003', title: 'Leaking kitchen tap', description: 'Mixer tap in kitchen dripping constantly. Started 3 days ago.', category: 'plumbing', priority: 'medium', status: 'open', reportedBy: 'tnt-003', estimatedCost: 180, actualCost: undefined, createdAt: '2025-01-13T09:00:00Z', updatedAt: '2025-01-13T09:00:00Z', completedAt: undefined, images: [], notes: ['Tenant reported via email'] },
  { id: 'mnt-002', propertyId: 'prop-001', title: 'HVAC not cooling', description: 'Split system in Unit 4B not producing cold air. Fan works but no cooling.', category: 'hvac', priority: 'high', status: 'in_progress', reportedBy: 'tnt-002', assignedTo: 'ctr-001', estimatedCost: 450, actualCost: undefined, createdAt: '2025-01-12T14:30:00Z', updatedAt: '2025-01-14T10:00:00Z', completedAt: undefined, images: [], notes: ['Contractor attending Friday'] },
  { id: 'mnt-003', propertyId: 'prop-004', title: 'Broken window lock', description: 'Ground floor window lock mechanism broken on south side.', category: 'structural', priority: 'high', status: 'open', reportedBy: 'tnt-004', estimatedCost: 320, actualCost: undefined, createdAt: '2025-01-11T11:15:00Z', updatedAt: '2025-01-11T11:15:00Z', completedAt: undefined, images: [], notes: ['Security risk — needs urgent attention'] },
  { id: 'mnt-004', propertyId: 'prop-005', title: 'Exterior light replacement', description: 'Two exterior floodlights not working above rear entrance.', category: 'electrical', priority: 'low', status: 'pending_parts', reportedBy: 'tnt-005', assignedTo: 'ctr-003', estimatedCost: 280, actualCost: undefined, createdAt: '2025-01-10T08:45:00Z', updatedAt: '2025-01-14T09:00:00Z', completedAt: undefined, images: [], notes: ['LED panels on order — ETA 3 days'] },
  { id: 'mnt-005', propertyId: 'prop-006', title: 'Loading dock roller door jammed', description: 'Roller door at Bay 3 jammed halfway. Cannot fully open or close.', category: 'structural', priority: 'urgent', status: 'in_progress', reportedBy: 'tnt-012', assignedTo: 'ctr-002', estimatedCost: 850, actualCost: undefined, createdAt: '2025-01-14T07:00:00Z', updatedAt: '2025-01-14T12:00:00Z', completedAt: undefined, images: [], notes: ['Contractor on site this afternoon'] },
  { id: 'mnt-006', propertyId: 'prop-001', title: 'Pool pH imbalance', description: 'Pool water testing shows pH at 8.2. Needs chemical adjustment.', category: 'safety', priority: 'medium', status: 'completed', reportedBy: 'sys', assignedTo: 'ctr-004', estimatedCost: 120, actualCost: 95, createdAt: '2025-01-08T06:00:00Z', updatedAt: '2025-01-09T14:00:00Z', completedAt: '2025-01-09T14:00:00Z', images: [], notes: ['Balanced and retested — pH now 7.4'] },
  { id: 'mnt-007', propertyId: 'prop-002', title: 'Irrigation pump failure', description: 'Main irrigation pump not starting. Possible electrical fault.', category: 'plumbing', priority: 'urgent', status: 'open', reportedBy: 'tnt-011', estimatedCost: 1200, actualCost: undefined, createdAt: '2025-01-14T06:30:00Z', updatedAt: '2025-01-14T06:30:00Z', completedAt: undefined, images: [], notes: ['Crop irrigation affected — urgent'] },
  { id: 'mnt-008', propertyId: 'prop-008', title: 'Smart home hub offline', description: 'Control4 hub not responding. All automated systems offline.', category: 'electrical', priority: 'medium', status: 'in_progress', reportedBy: 'tnt-008', assignedTo: 'ctr-003', estimatedCost: 350, actualCost: undefined, createdAt: '2025-01-13T16:00:00Z', updatedAt: '2025-01-14T08:00:00Z', completedAt: undefined, images: [], notes: ['Technician attending today'] },
  { id: 'mnt-009', propertyId: 'prop-007', title: 'Elevator service overdue', description: 'Annual elevator maintenance and safety inspection due.', category: 'safety', priority: 'high', status: 'inspection_required', reportedBy: 'sys', assignedTo: 'ctr-005', estimatedCost: 2200, actualCost: undefined, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z', completedAt: undefined, images: [], notes: ['QBCC certified technician required'] },
  { id: 'mnt-010', propertyId: 'prop-001', title: 'Carpet cleaning', description: 'End of lease carpet cleaning for Unit 6A.', category: 'cosmetic', priority: 'low', status: 'completed', reportedBy: 'sys', assignedTo: 'ctr-006', estimatedCost: 280, actualCost: 265, createdAt: '2025-01-05T09:00:00Z', updatedAt: '2025-01-07T11:00:00Z', completedAt: '2025-01-07T11:00:00Z', images: [], notes: ['Completed and invoiced'] },
];

// ── Contractors (6) ──────────────────────────────────────────────────

export const contractors: Contractor[] = [
  { id: 'ctr-001', businessName: 'Brisbane Climate Solutions Pty Ltd', contactName: 'Mark Stevens', email: 'mark@bneclimate.com.au', phone: '07 3123 4567', licenseNumber: 'QBCC-15278463', licenseType: 'Trade Contractor', categories: ['hvac', 'electrical'], rating: 4.8, reviewCount: 124, insuranceExpiry: '2025-08-15', isActive: true, address: { street: '45 Industrial Ave', suburb: 'Eagle Farm', state: 'QLD', postcode: '4009', country: 'Australia' }, createdAt: '2023-01-10T00:00:00Z' },
  { id: 'ctr-002', businessName: 'Gateway Door & Access Systems', contactName: 'Rachel Kim', email: 'rachel@gatewaydoor.com.au', phone: '07 3345 6789', licenseNumber: 'QBCC-16389271', licenseType: 'Trade Contractor', categories: ['structural', 'safety'], rating: 4.6, reviewCount: 87, insuranceExpiry: '2025-11-20', isActive: true, address: { street: '12 Trade St', suburb: 'Lytton', state: 'QLD', postcode: '4178', country: 'Australia' }, createdAt: '2023-02-15T00:00:00Z' },
  { id: 'ctr-003', businessName: 'Coastal Electrical Services', contactName: 'David Nguyen', email: 'david@coastalelec.com.au', phone: '07 5443 2100', licenseNumber: 'QBCC-17456382', licenseType: 'Trade Contractor', categories: ['electrical'], rating: 4.9, reviewCount: 203, insuranceExpiry: '2026-01-10', isActive: true, address: { street: '78 Technology Dr', suburb: 'Warana', state: 'QLD', postcode: '4575', country: 'Australia' }, createdAt: '2023-03-20T00:00:00Z' },
  { id: 'ctr-004', businessName: 'PoolWerx Maintenance', contactName: 'Sandra Blake', email: 'sandra@poolwerx.com.au', phone: '07 3200 1122', licenseNumber: 'QBCC-18567891', licenseType: 'Trade Contractor', categories: ['plumbing', 'safety'], rating: 4.5, reviewCount: 156, insuranceExpiry: '2025-09-30', isActive: true, address: { street: '23 Pool Lane', suburb: 'Underwood', state: 'QLD', postcode: '4119', country: 'Australia' }, createdAt: '2023-04-10T00:00:00Z' },
  { id: 'ctr-005', businessName: 'LiftSafe Queensland', contactName: 'Andrew McGregor', email: 'andrew@liftsafeqld.com.au', phone: '07 3606 4400', licenseNumber: 'QBCC-19678234', licenseType: 'Trade Contractor', categories: ['safety', 'structural'], rating: 4.7, reviewCount: 92, insuranceExpiry: '2025-12-05', isActive: true, address: { street: '56 Elevator Way', suburb: 'Geebung', state: 'QLD', postcode: '4034', country: 'Australia' }, createdAt: '2023-05-25T00:00:00Z' },
  { id: 'ctr-006', businessName: 'Spotless Carpet Care', contactName: 'Jessica Wong', email: 'jess@spotlesscarpet.com.au', phone: '07 3555 8899', licenseNumber: 'QBCC-20734561', licenseType: 'Service Contractor', categories: ['cosmetic'], rating: 4.4, reviewCount: 67, insuranceExpiry: '2025-07-22', isActive: true, address: { street: '89 Clean St', suburb: 'Stafford', state: 'QLD', postcode: '4053', country: 'Australia' }, createdAt: '2023-06-18T00:00:00Z' },
];

// ── Utility Connections (12) ─────────────────────────────────────────

export const utilityConnections: UtilityConnection[] = [
  { id: 'utl-001', propertyId: 'prop-001', type: 'electricity', provider: 'Origin Energy', accountNumber: 'ORI-8834567123', status: 'connected', meterNumber: 'MTR-E-44122', dailyAverage: 145, monthlyAverage: 4350, lastReading: 128450, lastReadingDate: '2025-01-01', costPerUnit: 0.28, isSolarFeedIn: true, solarFeedInRate: 0.12, createdAt: '2023-01-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-002', propertyId: 'prop-001', type: 'water', provider: 'Urban Utilities', accountNumber: 'UU-112345678', status: 'connected', meterNumber: 'MTR-W-88721', dailyAverage: 2100, monthlyAverage: 63000, lastReading: 2450000, lastReadingDate: '2025-01-01', costPerUnit: 1.85, createdAt: '2023-01-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-003', propertyId: 'prop-001', type: 'internet', provider: 'TPG Telecom', accountNumber: 'TPG-77456231', status: 'connected', dailyAverage: undefined, monthlyAverage: undefined, lastReading: undefined, lastReadingDate: undefined, costPerUnit: undefined, createdAt: '2023-01-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-004', propertyId: 'prop-002', type: 'electricity', provider: 'Ergon Energy', accountNumber: 'ERG-556782341', status: 'connected', meterNumber: 'MTR-E-99012', dailyAverage: 280, monthlyAverage: 8400, lastReading: 678000, lastReadingDate: '2025-01-01', costPerUnit: 0.32, isSolarFeedIn: true, solarFeedInRate: 0.15, createdAt: '2023-02-15T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-005', propertyId: 'prop-002', type: 'water', provider: 'Seqwater', accountNumber: 'SEQ-334455667', status: 'connected', meterNumber: 'MTR-W-22334', dailyAverage: 15000, monthlyAverage: 450000, lastReading: 8900000, lastReadingDate: '2025-01-01', costPerUnit: 1.45, createdAt: '2023-02-15T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-006', propertyId: 'prop-002', type: 'solar', provider: 'Solar Analytics', accountNumber: 'SOL-889900112', status: 'connected', meterNumber: 'MTR-S-771', dailyAverage: 185, monthlyAverage: 5550, lastReading: 245000, lastReadingDate: '2025-01-01', costPerUnit: 0.15, isSolarFeedIn: true, solarFeedInRate: 0.15, createdAt: '2023-03-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-007', propertyId: 'prop-003', type: 'electricity', provider: 'AGL Energy', accountNumber: 'AGL-223344556', status: 'connected', meterNumber: 'MTR-E-55667', dailyAverage: 22, monthlyAverage: 660, lastReading: 89000, lastReadingDate: '2025-01-01', costPerUnit: 0.31, createdAt: '2023-03-10T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-008', propertyId: 'prop-004', type: 'electricity', provider: 'Origin Energy', accountNumber: 'ORI-998877665', status: 'connected', meterNumber: 'MTR-E-33445', dailyAverage: 320, monthlyAverage: 9600, lastReading: 445000, lastReadingDate: '2025-01-01', costPerUnit: 0.26, isSolarFeedIn: true, solarFeedInRate: 0.10, createdAt: '2023-04-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-009', propertyId: 'prop-004', type: 'gas', provider: 'Origin Energy', accountNumber: 'ORI-G-554433', status: 'connected', meterNumber: 'MTR-G-2233', dailyAverage: 45, monthlyAverage: 1350, lastReading: 56000, lastReadingDate: '2025-01-01', costPerUnit: 0.042, createdAt: '2023-04-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-010', propertyId: 'prop-006', type: 'ev_charging', provider: 'Chargefox', accountNumber: 'CFX-112233445', status: 'connected', meterNumber: 'EV-001-PH', dailyAverage: 85, monthlyAverage: 2550, lastReading: 45000, lastReadingDate: '2025-01-01', costPerUnit: 0.35, createdAt: '2023-06-25T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-011', propertyId: 'prop-006', type: 'waste', provider: 'Cleanaway', accountNumber: 'CW-998877665', status: 'connected', dailyAverage: undefined, monthlyAverage: undefined, lastReading: undefined, lastReadingDate: undefined, costPerUnit: undefined, createdAt: '2023-06-25T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'utl-012', propertyId: 'prop-007', type: 'internet', provider: 'Telstra', accountNumber: 'TLS-667788990', status: 'connected', dailyAverage: undefined, monthlyAverage: undefined, lastReading: undefined, lastReadingDate: undefined, costPerUnit: undefined, createdAt: '2023-07-20T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
];

// ── Body Corporates (2) ──────────────────────────────────────────────

export const bodyCorporates: BodyCorporate[] = [
  {
    id: 'bc-001',
    schemeName: 'The Meridian Community Title Scheme',
    schemeNumber: 'CTS-55421',
    propertyId: 'prop-001',
    address: { street: '127 Charlotte Street', suburb: 'Brisbane City', state: 'QLD', postcode: '4000', country: 'Australia' },
    totalLots: 48, totalUnitEntitlement: 4800,
    insurancePolicyNumber: 'POL-QBE-2025-884321', insuranceExpiry: '2025-12-31', insuranceValue: 32000000,
    committeeMembers: [
      { id: 'cm-001', name: 'Patricia Hughes', role: 'chairperson', unitNumber: 'Unit 1A', email: 'p.hughes@meridian-bc.com.au', phone: '0400 111 222', electedDate: '2024-03-15', termEndDate: '2026-03-14' },
      { id: 'cm-002', name: 'Robert Singh', role: 'secretary', unitNumber: 'Unit 3B', email: 'r.singh@meridian-bc.com.au', phone: '0400 222 333', electedDate: '2024-03-15', termEndDate: '2026-03-14' },
      { id: 'cm-003', name: 'Amanda Foster', role: 'treasurer', unitNumber: 'Unit 5C', email: 'a.foster@meridian-bc.com.au', phone: '0400 333 444', electedDate: '2024-03-15', termEndDate: '2026-03-14' },
      { id: 'cm-004', name: 'Kevin Zhang', role: 'member', unitNumber: 'Unit 7A', email: 'k.zhang@meridian-bc.com.au', phone: '0400 444 555', electedDate: '2024-09-10', termEndDate: '2026-03-14' },
      { id: 'cm-005', name: 'Lisa Crawford', role: 'member', unitNumber: 'Unit 9B', email: 'l.crawford@meridian-bc.com.au', phone: '0400 555 666', electedDate: '2024-09-10', termEndDate: '2026-03-14' },
    ],
    bylaws: [
      { id: 'bl-001', number: 'BL-01', title: 'Noise and Nuisance', description: 'Residents must not create noise that disturbs others between 10pm and 7am.', dateAdopted: '2019-06-01', isActive: true, category: 'conduct' },
      { id: 'bl-002', number: 'BL-02', title: 'Pet Policy', description: 'Pets require written approval. Maximum 2 pets per unit. Dogs must be on leash in common areas.', dateAdopted: '2019-06-01', lastAmended: '2023-08-15', isActive: true, category: 'conduct' },
      { id: 'bl-003', number: 'BL-03', title: 'Common Area Use', description: 'Booking required for rooftop terrace and function room. Max 20 guests.', dateAdopted: '2019-06-01', isActive: true, category: 'use' },
      { id: 'bl-004', number: 'BL-04', title: 'Renovation Approval', description: 'All structural and cosmetic changes to lots require committee approval.', dateAdopted: '2020-01-15', isActive: true, category: 'architecture' },
      { id: 'bl-005', number: 'BL-05', title: 'Fire Safety', description: 'Fire doors must not be propped open. Fire stairs are for emergency use only.', dateAdopted: '2022-05-20', isActive: true, category: 'safety' },
    ],
    motions: [
      { id: 'mot-001', title: 'Lift Modernisation', description: 'Approve $180,000 for lift modernisation including new control system and cab interiors.', proposedBy: 'cm-001', meetingDate: '2025-02-28', status: 'proposed', votesFor: 0, votesAgainst: 0, votesAbstain: 0, createdAt: '2025-01-10T00:00:00Z' },
      { id: 'mot-002', title: 'Solar Panel Extension', description: 'Install additional 50kW solar array on rooftop. Estimated cost $85,000.', proposedBy: 'cm-003', meetingDate: '2025-02-28', status: 'seconded', votesFor: 0, votesAgainst: 0, votesAbstain: 0, createdAt: '2025-01-12T00:00:00Z' },
      { id: 'mot-003', title: 'By-law Amendment — EV Charging', description: 'Update by-laws to allow EV charger installation in car spaces at owner cost.', proposedBy: 'cm-004', meetingDate: '2024-11-15', status: 'passed', votesFor: 38, votesAgainst: 4, votesAbstain: 6, result: 'passed', createdAt: '2024-10-01T00:00:00Z' },
    ],
    financialReports: [
      { id: 'fin-001', schemeId: 'bc-001', periodStart: '2024-10-01', periodEnd: '2024-12-31', adminFundBalance: 245000, sinkingFundBalance: 680000, totalLeviesRaised: 142000, totalExpenses: 138500, categories: [{ category: 'Insurance', budgeted: 28000, actual: 27500, variance: 500 }, { category: 'Maintenance', budgeted: 45000, actual: 48200, variance: -3200 }, { category: 'Utilities', budgeted: 22000, actual: 21800, variance: 200 }, { category: 'Management', budgeted: 35000, actual: 34000, variance: 1000 }, { category: 'Cleaning', budgeted: 12000, actual: 7000, variance: 5000 }], generatedAt: '2025-01-15T00:00:00Z', generatedBy: 'cm-003' },
    ],
    nextAgmDate: '2025-03-28',
    createdAt: '2019-06-01T00:00:00Z', updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'bc-002',
    schemeName: 'Harbourview Plaza CTS',
    schemeNumber: 'CTS-44189',
    propertyId: 'prop-004',
    address: { street: '88 Marine Parade', suburb: 'Southport', state: 'QLD', postcode: '4215', country: 'Australia' },
    totalLots: 18, totalUnitEntitlement: 3600,
    insurancePolicyNumber: 'POL-CGU-2025-223344', insuranceExpiry: '2025-11-30', insuranceValue: 18500000,
    committeeMembers: [
      { id: 'cm-006', name: 'David Thornton', role: 'chairperson', unitNumber: 'Suite 101', email: 'd.thornton@harbourview-bc.com.au', phone: '0411 666 777', electedDate: '2024-06-20', termEndDate: '2026-06-19' },
      { id: 'cm-007', name: 'Emma Richardson', role: 'secretary', unitNumber: 'Suite 201', email: 'e.richardson@harbourview-bc.com.au', phone: '0412 777 888', electedDate: '2024-06-20', termEndDate: '2026-06-19' },
      { id: 'cm-008', name: 'Nathan Cole', role: 'treasurer', unitNumber: 'Suite 301', email: 'n.cole@harbourview-bc.com.au', phone: '0413 888 999', electedDate: '2024-06-20', termEndDate: '2026-06-19' },
    ],
    bylaws: [
      { id: 'bl-006', number: 'BL-01', title: 'After Hours Access', description: 'Tenants requiring after-hours access must register with building security.', dateAdopted: '2017-08-01', isActive: true, category: 'safety' },
      { id: 'bl-007', number: 'BL-02', title: 'Loading Dock Use', description: 'Loading dock bookings required 24hrs in advance. Max 2-hour slots.', dateAdopted: '2017-08-01', isActive: true, category: 'use' },
    ],
    motions: [
      { id: 'mot-004', title: 'Facade Upgrade', description: 'Approve $350,000 for external facade cleaning and recladding.', proposedBy: 'cm-006', meetingDate: '2025-03-15', status: 'voting', votesFor: 12, votesAgainst: 2, votesAbstain: 4, createdAt: '2025-01-05T00:00:00Z' },
    ],
    financialReports: [
      { id: 'fin-002', schemeId: 'bc-002', periodStart: '2024-10-01', periodEnd: '2024-12-31', adminFundBalance: 98000, sinkingFundBalance: 420000, totalLeviesRaised: 85000, totalExpenses: 82000, categories: [{ category: 'Insurance', budgeted: 18000, actual: 17800, variance: 200 }, { category: 'Maintenance', budgeted: 28000, actual: 29500, variance: -1500 }, { category: 'Utilities', budgeted: 15000, actual: 14800, variance: 200 }, { category: 'Management', budgeted: 20000, actual: 19900, variance: 100 }], generatedAt: '2025-01-10T00:00:00Z', generatedBy: 'cm-008' },
    ],
    nextAgmDate: '2025-04-15',
    createdAt: '2017-08-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z',
  },
];

// ── Activity Feed (12) ───────────────────────────────────────────────

export const activityFeed: ActivityFeedItem[] = [
  { id: 'act-001', type: 'payment', title: 'Rent payment received', description: '$2,400 from Unit 4B, The Meridian', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-15T10:30:00Z', read: false },
  { id: 'act-002', type: 'maintenance', title: 'New maintenance request', description: 'Leaking tap reported at 42 Main Street', propertyId: 'prop-003', propertyName: '42 Main Street', propertyType: 'residential', createdAt: '2025-01-15T09:15:00Z', read: false },
  { id: 'act-003', type: 'lease', title: 'Lease renewal signed', description: '12-month extension, Suite 301, Harbourview Plaza', propertyId: 'prop-004', propertyName: 'Harbourview Plaza', propertyType: 'commercial', createdAt: '2025-01-15T07:00:00Z', read: true },
  { id: 'act-004', type: 'casa', title: 'CASA airspace permit approved', description: 'Drone corridor #DC-2847 authorised', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-14T16:00:00Z', read: false },
  { id: 'act-005', type: 'volumetric', title: 'Volumetric title lodgement submitted', description: 'Lot 42, Airspace Level 3, Airspace Tower', propertyId: 'prop-007', propertyName: 'Airspace Tower', propertyType: 'balance', createdAt: '2025-01-14T11:30:00Z', read: true },
  { id: 'act-006', type: 'document', title: 'Insurance certificate uploaded', description: 'QBE policy renewal for The Meridian', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-14T08:45:00Z', read: true },
  { id: 'act-007', type: 'maintenance', title: 'Work order completed', description: 'Pool pH balanced and retested at The Meridian', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-13T14:00:00Z', read: true },
  { id: 'act-008', type: 'inspection', title: 'Routine inspection scheduled', description: '42 Main Street — 22 January 2025', propertyId: 'prop-003', propertyName: '42 Main Street', propertyType: 'residential', createdAt: '2025-01-13T10:00:00Z', read: false },
  { id: 'act-009', type: 'payment', title: 'Rent payment overdue', description: '$2,400 overdue from Unit 4B, The Meridian', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-12T00:00:00Z', read: false },
  { id: 'act-010', type: 'compliance', title: 'QBCC license verified', description: 'Gateway Door & Access Systems — license renewed to 2026', createdAt: '2025-01-12T09:00:00Z', read: true },
  { id: 'act-011', type: 'maintenance', title: 'Elevator service due', description: 'Annual maintenance required for Airspace Tower', propertyId: 'prop-007', propertyName: 'Airspace Tower', propertyType: 'balance', createdAt: '2025-01-11T08:00:00Z', read: false },
  { id: 'act-012', type: 'lease', title: 'New tenant application', description: 'Noah Patel applied for Unit 8A, The Meridian', propertyId: 'prop-001', propertyName: 'The Meridian', propertyType: 'apartment', createdAt: '2025-01-10T15:30:00Z', read: true },
];

// ── Portfolio Chart Data (13 months) ─────────────────────────────────

export const portfolioChartData: PortfolioChartData[] = [
  { month: 'Jan 2025', value: 22.1, revenue: 128000, expenses: 42000 },
  { month: 'Feb 2025', value: 22.4, revenue: 131000, expenses: 38000 },
  { month: 'Mar 2025', value: 22.6, revenue: 129500, expenses: 44500 },
  { month: 'Apr 2025', value: 22.9, revenue: 134000, expenses: 41000 },
  { month: 'May 2025', value: 23.1, revenue: 135500, expenses: 39500 },
  { month: 'Jun 2025', value: 23.2, revenue: 132000, expenses: 52000 },
  { month: 'Jul 2025', value: 23.5, revenue: 136000, expenses: 43000 },
  { month: 'Aug 2025', value: 23.8, revenue: 138500, expenses: 40000 },
  { month: 'Sep 2025', value: 24.0, revenue: 140000, expenses: 41500 },
  { month: 'Oct 2025', value: 24.2, revenue: 141000, expenses: 38500 },
  { month: 'Nov 2025', value: 24.5, revenue: 142000, expenses: 39000 },
  { month: 'Dec 2025', value: 24.6, revenue: 143500, expenses: 44000 },
  { month: 'Jan 2026', value: 24.8, revenue: 142650, expenses: 39800 },
];

// ── Property Type Distribution ───────────────────────────────────────

export const propertyTypeDistribution: PropertyTypeDistribution[] = [
  { type: 'balance', count: 1, color: '#14B8A6' },
  { type: 'apartment', count: 1, color: '#8B5CF6' },
  { type: 'retail', count: 1, color: '#F59E0B' },
  { type: 'farm', count: 1, color: '#10B981' },
  { type: 'residential', count: 2, color: '#3B82F6' },
  { type: 'commercial', count: 1, color: '#EC4899' },
  { type: 'industrial', count: 1, color: '#6366F1' },
];

// ── Upcoming Tasks (5) ───────────────────────────────────────────────

export const upcomingTasks: UpcomingTask[] = [
  { id: 'task-001', title: 'Routine inspection', description: 'Scheduled 6-monthly inspection', dueDate: '2025-01-16', propertyId: 'prop-003', propertyName: '42 Main Street', completed: false, priority: 'high', category: 'inspection' },
  { id: 'task-002', title: 'Body corporate meeting', description: 'Quarterly committee meeting', dueDate: '2025-01-17', propertyId: 'prop-001', propertyName: 'The Meridian', completed: false, priority: 'medium', category: 'meeting' },
  { id: 'task-003', title: 'CASA permit renewal', description: 'Renew drone corridor permit DC-2045', dueDate: '2025-01-20', propertyId: 'prop-002', propertyName: 'Farm Ridge Estate', completed: false, priority: 'high', category: 'compliance' },
  { id: 'task-004', title: 'Rent review notice', description: 'Issue annual rent review notices', dueDate: '2025-01-10', propertyId: 'prop-001', propertyName: 'The Meridian', completed: true, priority: 'medium', category: 'lease' },
  { id: 'task-005', title: 'Insurance certificate update', description: 'Update all property insurance certs', dueDate: '2025-01-22', completed: false, priority: 'medium', category: 'compliance' },
];

// ── Quick Actions ────────────────────────────────────────────────────

export const quickActions: QuickAction[] = [
  { id: 'qa-001', label: 'Add Property', description: 'Register a new title', icon: 'PlusCircle', route: '/properties' },
  { id: 'qa-002', label: 'Create Work Order', description: 'New maintenance request', icon: 'FileText', route: '/maintenance' },
  { id: 'qa-003', label: 'Add Tenant', description: 'Onboard new tenancy', icon: 'Users', route: '/tenants' },
  { id: 'qa-004', label: 'Upload Document', description: 'Lease, inspection, or compliance', icon: 'Upload', route: '/settings' },
  { id: 'qa-005', label: 'Flight Setup', description: 'Register drone operation', icon: 'Plane', route: '/casa-fims' },
  { id: 'qa-006', label: 'Run Report', description: 'Generate portfolio report', icon: 'BarChart3', route: '/revenue' },
];

// ── Notifications ────────────────────────────────────────────────────

export const notifications: NotificationItem[] = [
  { id: 'notif-001', title: 'Rent overdue', message: '$2,400 from Unit 4B is now overdue', type: 'warning', read: false, createdAt: '2025-01-15T00:00:00Z', link: '/tenants' },
  { id: 'notif-002', title: 'CASA permit approved', message: 'Drone corridor DC-2847 has been approved', type: 'success', read: false, createdAt: '2025-01-14T16:00:00Z', link: '/casa-fims' },
  { id: 'notif-003', title: 'Maintenance request', message: 'Leaking tap at 42 Main Street', type: 'info', read: false, createdAt: '2025-01-15T09:15:00Z', link: '/maintenance' },
  { id: 'notif-004', title: 'Elevator service due', message: 'Annual service required for Airspace Tower', type: 'warning', read: true, createdAt: '2025-01-11T08:00:00Z', link: '/maintenance' },
  { id: 'notif-005', title: 'Lease renewal', message: '12-month extension signed for Suite 301', type: 'success', read: true, createdAt: '2025-01-15T07:00:00Z', link: '/leasing' },
];

// ── KPI Data ─────────────────────────────────────────────────────────

export const kpiData = {
  totalPortfolioValue: 24.8,
  totalPortfolioValueChange: 4.2,
  activeTenancies: 186,
  activeTenanciesChange: 12,
  monthlyRevenue: 142650,
  monthlyRevenueChange: 2.8,
  openWorkOrders: 23,
  openWorkOrdersChange: -5,
  urgentWorkOrders: 8,
  standardWorkOrders: 15,
  occupancyRate: 94.2,
  totalProperties: 8,
  totalTenants: 186,
  vacancyCount: 3,
};

// ── Helper Functions ─────────────────────────────────────────────────

export const getPropertyById = (id: string): Property | undefined =>
  properties.find(p => p.id === id);

export const getTenantsByProperty = (propertyId: string): Tenant[] =>
  tenants.filter(t => t.propertyId === propertyId);

export const getLeasesByProperty = (propertyId: string): Lease[] =>
  leases.filter(l => l.propertyId === propertyId);

export const getRentPaymentsByProperty = (propertyId: string): RentPayment[] =>
  rentPayments.filter(r => r.propertyId === propertyId);

export const getMaintenanceByProperty = (propertyId: string): MaintenanceRequest[] =>
  maintenanceRequests.filter(m => m.propertyId === propertyId);

export const getUtilitiesByProperty = (propertyId: string): UtilityConnection[] =>
  utilityConnections.filter(u => u.propertyId === propertyId);

export const getBodyCorporateByProperty = (propertyId: string): BodyCorporate | undefined =>
  bodyCorporates.find(b => b.propertyId === propertyId);

export const getPropertyNameById = (id: string): string =>
  properties.find(p => p.id === id)?.name ?? 'Unknown Property';

export const getTenantById = (id: string): Tenant | undefined =>
  tenants.find(t => t.id === id);

export const getMaintenanceById = (id: string): MaintenanceRequest | undefined =>
  maintenanceRequests.find(m => m.id === id);

export const getContractorById = (id: string): Contractor | undefined =>
  contractors.find(c => c.id === id);

export const getRecentActivity = (limit = 7): ActivityFeedItem[] =>
  [...activityFeed].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);

export const getUnreadNotifications = (): NotificationItem[] =>
  notifications.filter(n => !n.read);
