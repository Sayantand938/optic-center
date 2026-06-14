export interface MenuItem {
    id: number;
    label: string;
    screen: string;
    action: () => void;
}

export interface EyePrescription {
    sph: string;      // Sphere
    cyl: string;      // Cylinder
    axis: string;     // Axis
    va: string;       // Visual Acuity
    d: string;        // Distance
    n: string;        // Near
    add: string;      // Addition
    cl: string;       // Contact Lens
}

export interface PDMeasurements {
    right: string;    // PD Right Eye
    left: string;     // PD Left Eye
    total: string;    // Total PD
}

// Frame Types
export type FrameType = '3-piece/rimless' | 'half-rimless/supra' | 'full-metal' | 'full-shell/plastic' | 'goggles';

export interface FrameItem {
    id: string;
    type: FrameType;
    modelName: string;
    modelCode: string;
    modelColor: string;
    modelSize: string;
    price: number;
    quantity: number;
}

// Lens Types
export type LensCategory = 'distance' | 'near' | 'bifocal' | 'progressive';
export type LensMaterial = 'mineral' | 'plastic' | 'contact' | 'trivex' | 'organic' | 'polycarbonate';
export type LensSide = 'both' | 'right' | 'left';

export interface LensItem {
    id: string;
    category: LensCategory;
    material: LensMaterial;
    side: LensSide;
    companyName: string;
    productName: string;
    index: string;
    dia: string;
    price: number;
    quantity: number;
}

// Bill Details
export interface BillDetails {
    subtotal: number;
    discount: number;
    discountType: 'percentage' | 'fixed';
    advancePayment: number;
    paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer';
    finalAmount: number;
    balanceDue: number;
}

export interface Order {
    id: string;
    orderDetails: {
        orderDate: string;
        completionDate: string;
        status: 'pending' | 'complete';
    };
    customer: {
        firstName: string;
        lastName: string;
        gender: 'male' | 'female' | 'other';
        ageGroup: '0-12' | '13-19' | '20-35' | '36-50' | '51-65' | '65+';
        phoneNumber: string;
    };
    optometrist: {
        eyeCheckupDate: string;
        doctorName: string;
        hospitalName: string;
    };
    prescription: {
        rightEye: EyePrescription;
        leftEye: EyePrescription;
        pd: PDMeasurements;
        notes?: string;
    };
    purchase: {
        frames: FrameItem[];
        lenses: LensItem[];
    };
    bill: BillDetails;
    createdAt: string;
}

export type OrderStatus = 'pending' | 'complete';
export type Gender = 'male' | 'female' | 'other';
export type AgeGroup = '0-12' | '13-19' | '20-35' | '36-50' | '51-65' | '65+';