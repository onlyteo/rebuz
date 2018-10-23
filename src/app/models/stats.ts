export enum Status {
    CORRECT = 'CORRECT',
    INCORRECT = 'INCORRECT'
}

export interface Stats {
    event: string,
    team: string,
    question: string,
    tries: number,
    status: Status,
    created: number,
    modified: number
}

export interface StatsSave {
    event: string,
    team: string,
    question: string,
    status: Status
}

export interface StatsState {
    loading: boolean;
    stats: Stats[];
    error?: any;
}

export const initialStatsState: StatsState = {
    loading: false,
    stats: []
}