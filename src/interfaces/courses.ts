export interface Course{
    id: number;
    course_code?: string;
    title: string;
    description: string;
    trainer_id: number;
    trainer_name: string;
    duration: string;
    course_status_id: number;
}

export const defaultCourse: Course = {
    id: 0,
    course_code: '',
    title: '',
    description: '',
    trainer_id: 0,
    trainer_name: '',
    duration: '',
    course_status_id: 0,
};