import { ClassDetails, User, UserRole } from "@/types";

export const MOCK_TEACHERS: User[] = [
    { id: "1", name: "Dr. Alan Turing", email: "alan@school.com", role: UserRole.TEACHER, createdAt: "", updatedAt: "" },
    { id: "2", name: "Jane Smith", email: "jane@school.com", role: UserRole.TEACHER, createdAt: "", updatedAt: "" },
    { id: "3", name: "John Doe", email: "john@school.com", role: UserRole.TEACHER, createdAt: "", updatedAt: "" },
    { id: "4", name: "Jane Doe", email: "jane.doe@school.com", role: UserRole.TEACHER, createdAt: "", updatedAt: "" },
];

export const MOCK_CLASSES: ClassDetails[] = [
    {
        id: 1,
        name: "Introduction to Computer Science - Section A",
        description: "Introductory class for computer science freshmen.",
        capacity: 30,
        status: "active",
        courseCode: "CS-101",
        courseName: "Introduction to Computer Science",
        subject: { id: 1, name: "Computer Science", code: "CS", description: "", department: "Computer Science" },
        teacher: MOCK_TEACHERS[0],
        bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        bannerCldPubId: "banner1",
        schedules: [
            { day: "Monday", startTime: "09:00", endTime: "10:30" }
        ]
    },
    {
        id: 2,
        name: "Linear Algebra - Section B",
        description: "Core linear algebra concepts for mathematics majors.",
        capacity: 25,
        status: "active",
        courseCode: "MATH-201",
        courseName: "Linear Algebra",
        subject: { id: 2, name: "Mathematics", code: "MATH", description: "", department: "Mathematics" },
        teacher: MOCK_TEACHERS[1],
        bannerUrl: "https://images.unsplash.com/photo-1453733190148-c44698c265f8",
        bannerCldPubId: "banner2",
        schedules: [
            { day: "Wednesday", startTime: "11:00", endTime: "12:30" }
        ]
    }
];

