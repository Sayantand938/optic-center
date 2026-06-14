import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
    { id: 1, label: 'Dashboard', screen: 'Dashboard', action: () => { } },
    { id: 2, label: 'New Order', screen: 'New Order', action: () => { } },
    { id: 3, label: 'Pending Orders', screen: 'Pending Orders', action: () => { } },
    { id: 4, label: 'Pending Payment', screen: 'Pending Payment', action: () => { } },
    { id: 5, label: 'Stock', screen: 'Stock', action: () => alert('Stock screen coming soon') },
    { id: 6, label: 'Find Reports', screen: 'Find Reports', action: () => alert('Find Reports screen coming soon') },
    { id: 7, label: 'Visitbook', screen: 'Visitbook', action: () => alert('Visitbook screen coming soon') },
    { id: 8, label: 'Order Lens', screen: 'Order Lens', action: () => alert('Order Lens screen coming soon') },
    { id: 9, label: 'Data Management', screen: 'Data Management', action: () => alert('Data Management screen coming soon') },
];