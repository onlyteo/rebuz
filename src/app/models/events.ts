export interface Event {
    id: string,
    name: string,
    teams: string[]
}

export interface EventState {
    loading: boolean;
    events: Event[];
    error?: any;
}

export const initialEventState: EventState = {
    loading: false,
    events: []
}