export interface Event {
    id: string,
    welcomeMessage: string,
    teams: string[],
    successMessage: string
}

export interface EventState {
    loading: boolean;
    events: Event[];
    eventMap: any;
    error?: any;
}

export const initialEventState: EventState = {
    loading: false,
    events: [],
    eventMap: {}
}