export interface Event {
    id: string,
    welcomeMessage: string,
    teams: string[],
    successMessage: string
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