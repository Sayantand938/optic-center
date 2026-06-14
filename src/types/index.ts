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
    createdAt: string;
}

export type OrderStatus = 'pending' | 'complete';
export type Gender = 'male' | 'female' | 'other';
export type AgeGroup = '0-12' | '13-19' | '20-35' | '36-50' | '51-65' | '65+';