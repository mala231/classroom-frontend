export const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || "https://api.fake-rest.refine.dev";

export const DEPARTMENTS =
    ['CS',
        'Math',
        'English'
    ]


export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) =>
(
    {
        value: dept,
        label: dept,
    }));