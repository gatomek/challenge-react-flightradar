export type PageConfig = {
    label: string;
    path: string;
};

export const PAGES: PageConfig[] = [
    {label: 'Aircrafts', path: '/aircrafts'},
    {label: 'Radars', path: '/radars'},
    {label: 'Settings', path: '/settings'},
    {label: 'Profile', path: '/profile'}
];
