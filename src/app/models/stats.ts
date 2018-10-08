export interface Stats {
    event: string,
    team: string,
    question: string,
    created: number,
    modified: number
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