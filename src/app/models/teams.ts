export interface Team {
    id: string,
    name: string,
    questions: string[]
}

export interface TeamState {
    loading: boolean;
    teams: Team[];
    teamMap: any;
    error?: any;
}

export const initialTeamState: TeamState = {
    loading: false,
    teams: [],
    teamMap: {}
}