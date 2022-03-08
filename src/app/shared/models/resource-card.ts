export interface ResourceCard {
    title: string;
    imageUrl?: string;
}

export interface SubjectCard extends ResourceCard {
    subTitle: string;
    footer?: string;
    badgeTitle?: string;
    hasPapers: boolean;
    mainButtonText: string;
    mainButtonRoute: { link: string, queryParams?: any };
    hasLessons: boolean;
    secondaryButtonText: string;
    secondaryButtonRoute:  { link: string, queryParams?: any };
}

export interface ProductCard extends ResourceCard {
    mainButtonText: string;
}

export interface ProgressCard extends ResourceCard {
    title: string;
    value: number;
}
