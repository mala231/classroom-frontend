import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS-101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "Fundamental concepts of programming, algorithms, and computational thinking.",
        createdAt: "2026-06-03T10:00:00.000Z"
    },
    {
        id: 2,
        code: "MATH-201",
        name: "Linear Algebra",
        department: "Math",
        description: "Study of vector spaces, linear transformations, matrices, eigenvalues, and eigenvectors.",
        createdAt: "2026-06-03T10:05:00.000Z"
    },
    {
        id: 3,
        code: "ENG-102",
        name: "Creative Writing",
        department: "English",
        description: "Workshop-style exploration of poetry, fiction writing, and narrative prose techniques.",
        createdAt: "2026-06-03T10:10:00.000Z"
    }
];
