export interface Stats {
    event: string,
    team: string,
    question: string
}

export interface StatsState {
    loading: boolean;
    stats: Stats[];
    error?: any;
}

export const initialEventState: StatsState = {
    loading: false,
    stats: []
}