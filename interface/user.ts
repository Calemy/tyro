export interface DatabaseUser {
    id: number;
    name: string;
    safe_name: string;
    email: string;
    priv: number;
    pw_bcrypt: string;
    country: string;
    silence_end: number;
    donor_end: number;
    creation_time: number;
    latest_activity: number;
    clan_id: number;
    clan_priv: number;
    preferred_mode: number;
    play_style: number;
    custom_badge_name: string;
    custom_badge_icon: string;
    userpage_content: string;
    api_key: string;
}

export interface DatabaseStats {
    id: number;
    mode: number;
    tscore: number;
    rscore: number;
    pp: number;
    plays: number;
    playtime: number;
    accuracy: number;
    max_combo: number;
    total_hits: number;
    replay_views: number;
    xh_count: number;
    x_count: number;
    sh_count: number;
    s_count: number;
    a_count: number;
}