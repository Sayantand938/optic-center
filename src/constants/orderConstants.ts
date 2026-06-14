import type { OrderStatus, Gender, AgeGroup, EyePrescription, PDMeasurements } from '../types';

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
    }
};