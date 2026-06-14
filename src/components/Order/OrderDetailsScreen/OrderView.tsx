import React from 'react';
import { Calendar, User, Stethoscope, Eye, Package, Receipt } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderViewProps {
    order: Order;
}

export const OrderView: React.FC<OrderViewProps> = ({ order }) => {
    const getStatusBadge = (status: string) => {
        if (status === 'complete') {
            return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Complete</span>;
        }
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">⏳ Pending</span>;
    };

    return (
        <div className="px-4 max-w-4xl mx-auto">
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Order Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <span className="text-xs text-gray-500">Order Date</span>
                        <p className="font-medium">{order.orderDetails.orderDate}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Completion Date</span>
                        <p className="font-medium">{order.orderDetails.completionDate || 'Not completed'}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Status</span>
                        <p>{getStatusBadge(order.orderDetails.status)}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Created At</span>
                        <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <span className="text-xs text-gray-500">Full Name</span>
                        <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Gender</span>
                        <p className="font-medium capitalize">{order.customer.gender}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Age Group</span>
                        <p className="font-medium">{order.customer.ageGroup} years</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Phone Number</span>
                        <p className="font-medium">{order.customer.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* Eye Examination */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-500" />
                    Eye Examination
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <span className="text-xs text-gray-500">Checkup Date</span>
                        <p className="font-medium">{order.optometrist.eyeCheckupDate}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500">Doctor</span>
                        <p className="font-medium">{order.optometrist.doctorName}</p>
                    </div>
                    <div className="col-span-2">
                        <span className="text-xs text-gray-500">Hospital/Clinic</span>
                        <p className="font-medium">{order.optometrist.hospitalName}</p>
                    </div>
                </div>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    Prescription
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-blue-50 rounded-lg p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Right Eye (OD)</h4>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-gray-500">SPH:</span> {order.prescription.rightEye.sph || '-'}</p>
                            <p><span className="text-gray-500">CYL:</span> {order.prescription.rightEye.cyl || '-'}</p>
                            <p><span className="text-gray-500">Axis:</span> {order.prescription.rightEye.axis || '-'}</p>
                            <p><span className="text-gray-500">VA:</span> {order.prescription.rightEye.va || '-'}</p>
                            <p><span className="text-gray-500">ADD:</span> {order.prescription.rightEye.add || '-'}</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-3">
                        <h4 className="font-medium text-purple-800 mb-2">Left Eye (OS)</h4>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-gray-500">SPH:</span> {order.prescription.leftEye.sph || '-'}</p>
                            <p><span className="text-gray-500">CYL:</span> {order.prescription.leftEye.cyl || '-'}</p>
                            <p><span className="text-gray-500">Axis:</span> {order.prescription.leftEye.axis || '-'}</p>
                            <p><span className="text-gray-500">VA:</span> {order.prescription.leftEye.va || '-'}</p>
                            <p><span className="text-gray-500">ADD:</span> {order.prescription.leftEye.add || '-'}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p><span className="text-gray-500">PD:</span> Right: {order.prescription.pd.right}mm | Left: {order.prescription.pd.left}mm | Total: {order.prescription.pd.total}mm</p>
                </div>
                {order.prescription.notes && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm"><span className="font-medium">Notes:</span> {order.prescription.notes}</p>
                    </div>
                )}
            </div>

            {/* Purchase Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Purchase Items
                </h3>
                {order.purchase.frames.length > 0 && (
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Frames</h4>
                        {order.purchase.frames.map((frame) => (
                            <div key={frame.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="text-gray-500">Type:</span> {frame.type}</p>
                                    <p><span className="text-gray-500">Model:</span> {frame.modelName}</p>
                                    <p><span className="text-gray-500">Price:</span> ₹{frame.price} x {frame.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {order.purchase.lenses.length > 0 && (
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Lenses</h4>
                        {order.purchase.lenses.map((lens) => (
                            <div key={lens.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="text-gray-500">Category:</span> {lens.category}</p>
                                    <p><span className="text-gray-500">Company:</span> {lens.companyName}</p>
                                    <p><span className="text-gray-500">Price:</span> ₹{lens.price} x {lens.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-blue-500" />
                    Bill Summary
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal:</span>
                        <span>₹{order.bill.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Discount:</span>
                        <span className="text-red-600">-₹{(order.bill.discountType === 'percentage' ? (order.bill.subtotal * order.bill.discount / 100) : order.bill.discount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                        <span>Final Amount:</span>
                        <span>₹{order.bill.finalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Advance Payment:</span>
                        <span className="text-green-600">-₹{order.bill.advancePayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                        <span>Balance Due:</span>
                        <span className={order.bill.balanceDue > 0 ? 'text-orange-600' : 'text-green-600'}>
                            ₹{order.bill.balanceDue.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="capitalize">{order.bill.paymentMethod}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};