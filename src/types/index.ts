// ── Enums / Union Types ───────────────────────────────────────────────

export type PropertyType =
  | 'balance'
  | 'apartment'
  | 'retail'
  | 'farm'
  | 'residential'
  | 'commercial'
  | 'industrial';

export type UserRole = 'owner' | 'manager' | 'tenant' | 'contractor' | 'admin';

export type LeaseStatus = 'active' | 'expired' | 'pending' | 'terminated' | 'renewal_pending';

export type RentStatus = 'paid' | 'pending' | 'overdue' | 'partial' | 'failed';

export type BondStatus = 'held' | 'released' | 'partial_claim' | 'claimed' | 'pending';

export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'structural'
  | 'appliance'
  | 'cosmetic'
  | 'safety'
  | 'pest'
  | 'landscaping'
  | 'other';

export type MaintenancePriority = 'urgent' | 'high' | 'medium' | 'low';

export type MaintenanceStatus =
  | 'open'
  | 'in_progress'
  | 'pending_parts'
  | 'completed'
  | 'cancelled'
  | 'inspection_required';

export type UtilityType = 'electricity' | 'gas' | 'water' | 'internet' | 'solar' | 'ev_charging' | 'waste';

export type UtilityStatus = 'connected' | 'disconnected' | 'pending' | 'fault';

export type RoofType =
  | 'flat'
  | 'pitched'
  | 'gable'
  | 'hip'
  | 'dutch_gable'
  | 'shed'
  | 'green'
  | 'solar_tiled'
  | 'other';

export type DocumentType =
  | 'lease'
  | 'inspection'
  | 'compliance'
  | 'financial'
  | 'insurance'
  | 'maintenance'
  | 'volumetric'
  | 'casa'
  | 'general';

export type ActivityType =
  | 'payment'
  | 'maintenance'
  | 'lease'
  | 'casa'
  | 'volumetric'
  | 'document'
  | 'inspection'
  | 'compliance'
  | 'general';

// ── Interfaces ────────────────────────────────────────────────────────

export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  documents: string[];
  notes: string;
  createdAt: string;
  propertyId?: string;
  leaseId?: string;
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  rentFrequency: 'weekly' | 'fortnightly' | 'monthly';
  bondAmount: number;
  bondStatus: BondStatus;
  status: LeaseStatus;
  renewalReminderSent: boolean;
  specialConditions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RentPayment {
  id: string;
  leaseId: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: RentStatus;
  paymentMethod?: 'bank_transfer' | 'card' | 'cash' | 'cheque' | 'bpay';
  reference?: string;
  lateFee?: number;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  reportedBy: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  images: string[];
  notes: string[];
}

export interface Contractor {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  categories: MaintenanceCategory[];
  rating: number;
  reviewCount: number;
  insuranceExpiry: string;
  isActive: boolean;
  address: Address;
  createdAt: string;
}

export interface UtilityConnection {
  id: string;
  propertyId: string;
  type: UtilityType;
  provider: string;
  accountNumber: string;
  status: UtilityStatus;
  meterNumber?: string;
  dailyAverage?: number;
  monthlyAverage?: number;
  lastReading?: number;
  lastReadingDate?: string;
  costPerUnit?: number;
  isSolarFeedIn?: boolean;
  solarFeedInRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: 'chairperson' | 'secretary' | 'treasurer' | 'member' | 'non_voting';
  unitNumber: string;
  email: string;
  phone: string;
  electedDate: string;
  termEndDate: string;
}

export interface ByLaw {
  id: string;
  number: string;
  title: string;
  description: string;
  dateAdopted: string;
  lastAmended?: string;
  isActive: boolean;
  category: 'conduct' | 'management' | 'use' | 'architecture' | 'safety' | 'other';
}

export interface Motion {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  meetingDate: string;
  status: 'draft' | 'proposed' | 'seconded' | 'voting' | 'passed' | 'defeated' | 'deferred';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  result?: 'passed' | 'defeated' | 'deferred';
  createdAt: string;
}

export interface FinancialReport {
  id: string;
  schemeId: string;
  periodStart: string;
  periodEnd: string;
  adminFundBalance: number;
  sinkingFundBalance: number;
  totalLeviesRaised: number;
  totalExpenses: number;
  categories: {
    category: string;
    budgeted: number;
    actual: number;
    variance: number;
  }[];
  generatedAt: string;
  generatedBy: string;
}

export interface BodyCorporate {
  id: string;
  schemeName: string;
  schemeNumber: string;
  propertyId: string;
  address: Address;
  totalLots: number;
  totalUnitEntitlement: number;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  insuranceValue: number;
  committeeMembers: CommitteeMember[];
  bylaws: ByLaw[];
  motions: Motion[];
  financialReports: FinancialReport[];
  nextAgmDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: Address;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  floorArea?: number;
  landArea?: number;
  yearBuilt?: number;
  roofType?: RoofType;
  purchasePrice?: number;
  currentValue?: number;
  rentalIncome?: number;
  expenses?: number;
  features: string[];
  images: string[];
  hasVolumetricTitle: boolean;
  volumetricLevels?: number;
  airspaceRights?: boolean;
  subsurfaceRights?: boolean;
  droneCorridorId?: string;
  casaPermitNumber?: string;
  bodyCorporateId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId?: string;
  propertyId?: string;
  subject: string;
  body: string;
  isRead: boolean;
  attachments: string[];
  createdAt: string;
}

export interface Document {
  id: string;
  propertyId?: string;
  tenantId?: string;
  title: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  expiryDate?: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface ActivityFeedItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  propertyId?: string;
  propertyName?: string;
  propertyType?: PropertyType;
  createdAt: string;
  read: boolean;
}

export interface PortfolioChartData {
  month: string;
  value: number;
  revenue: number;
  expenses: number;
}

export interface PropertyTypeDistribution {
  type: PropertyType;
  count: number;
  color: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  propertyId?: string;
  propertyName?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  route?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  read: boolean;
  createdAt: string;
  link?: string;
}

// ── Color Maps ────────────────────────────────────────────────────────

export const propertyTypeColors: Record<PropertyType, { color: string; bg: string; label: string }> = {
  balance: { color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)', label: 'Balance' },
  apartment: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', label: 'Apartment' },
  retail: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Retail' },
  farm: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Farm' },
  residential: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Residential' },
  commercial: { color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)', label: 'Commercial' },
  industrial: { color: '#6366F1', bg: 'rgba(99, 102, 241, 0.1)', label: 'Industrial' },
};

export const leaseStatusColors: Record<LeaseStatus, { color: string; bg: string }> = {
  active: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  expired: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  terminated: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)' },
  renewal_pending: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
};

export const rentStatusColors: Record<RentStatus, { color: string; bg: string }> = {
  paid: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  overdue: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  partial: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  failed: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export const bondStatusColors: Record<BondStatus, { color: string; bg: string }> = {
  held: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  released: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  partial_claim: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  claimed: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
};

export const maintenancePriorityColors: Record<MaintenancePriority, { color: string; bg: string }> = {
  urgent: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  high: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  medium: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  low: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)' },
};

export const maintenanceStatusColors: Record<MaintenanceStatus, { color: string; bg: string }> = {
  open: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  in_progress: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  pending_parts: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  completed: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  cancelled: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)' },
  inspection_required: { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)' },
};

export const utilityStatusColors: Record<UtilityStatus, { color: string; bg: string }> = {
  connected: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  disconnected: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)' },
  pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  fault: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export const userRoleColors: Record<UserRole, { color: string; bg: string; label: string }> = {
  owner: { color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)', label: 'Owner' },
  manager: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Manager' },
  tenant: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Tenant' },
  contractor: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Contractor' },
  admin: { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)', label: 'Admin' },
};

export const activityTypeColors: Record<ActivityType, { color: string; bg: string }> = {
  payment: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  maintenance: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  lease: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  casa: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  volumetric: { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)' },
  document: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  inspection: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  compliance: { color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)' },
  general: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)' },
};

export const documentTypeColors: Record<DocumentType, { color: string; bg: string; label: string }> = {
  lease: { color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)', label: 'Lease' },
  inspection: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Inspection' },
  compliance: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Compliance' },
  financial: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Financial' },
  insurance: { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)', label: 'Insurance' },
  maintenance: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Maintenance' },
  volumetric: { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)', label: 'Volumetric' },
  casa: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'CASA' },
  general: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)', label: 'General' },
};

export const utilityTypeColors: Record<UtilityType, { color: string; bg: string; label: string }> = {
  electricity: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Electricity' },
  gas: { color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)', label: 'Gas' },
  water: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Water' },
  internet: { color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.1)', label: 'Internet' },
  solar: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Solar' },
  ev_charging: { color: '#6366F1', bg: 'rgba(99, 102, 241, 0.1)', label: 'EV Charging' },
  waste: { color: '#52525B', bg: 'rgba(82, 82, 91, 0.1)', label: 'Waste' },
};
