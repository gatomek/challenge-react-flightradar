export type PageProps = {
    label: string;
    path: string;
};

export const PAGES: PageProps[] = [
    {label: 'Aircrafts', path: '/aircrafts'},
    {label: 'Radars', path: '/radars'},
    {label: 'Settings', path: '/settings'},
    {label: 'Profile', path: '/profile'}
];
