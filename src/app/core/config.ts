const config = {
    "mobile_max_window_size": 760
}

export function globalConfig(key: string) {
    return config[key];
}
