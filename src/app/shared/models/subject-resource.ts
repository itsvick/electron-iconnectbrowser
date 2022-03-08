export interface SubjectResource {
    id?: number;
    title: string;
    subTitle?: string;
    imageUrl?: string;
    completed?: boolean;
    locked?: boolean;
    footerText: string;
    year?: string;
    // completionTime: number;
    type: 'paper' | 'lesson';
}
