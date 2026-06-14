import type { OrderStatus, Gender, AgeGroup, EyePrescription, PDMeasurements, FrameItem, LensItem, BillDetails } from '../types';

export const defaultPrescription: EyePrescription = {
    sph: '',
    cyl: '',
    axis: '',
    va: '',
    d: '',
    n: '',
    add: '',
    cl: ''
};

export const defaultPD: PDMeasurements = {
    right: '',
    left: '',
    total: ''
};

export const defaultFrame: Omit<FrameItem, 'id'> = {
    type: 'full-metal',
    modelName: '',
    modelCode: '',
    modelColor: '',
    modelSize: '',
    price: 0,
    quantity: 1
};

export const defaultLens: Omit<LensItem, 'id'> = {
    category: 'distance',
    material: 'plastic',
    side: 'both',
    companyName: '',
    productName: '',
    index: '',
    dia: '',
    price: 0,
    quantity: 1
};

export const defaultBill: BillDetails = {
    subtotal: 0,
    discount: 0,
    discountType: 'percentage',
    advancePayment: 0,
    paymentMethod: 'cash',
    finalAmount: 0,
    balanceDue: 0
};

export const initialFormData = {
    orderDetails: {
        orderDate: new Date().toISOString().split('T')[0],
        completionDate: '',
        status: 'pending' as OrderStatus
    },
    customer: {
        firstName: '',
        lastName: '',
        gender: 'male' as Gender,
        ageGroup: '20-35' as AgeGroup,
        phoneNumber: ''
    },
    optometrist: {
        eyeCheckupDate: new Date().toISOString().split('T')[0],
        doctorName: '',
        hospitalName: ''
    },
    prescription: {
        rightEye: { ...defaultPrescription },
        leftEye: { ...defaultPrescription },
        pd: { ...defaultPD },
        notes: ''
    },
    purchase: {
        frames: [] as FrameItem[],
        lenses: [] as LensItem[]
    },
    bill: { ...defaultBill }
};