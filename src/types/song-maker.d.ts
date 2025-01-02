export interface SongMaker {
    task_id: string;
    task_model: string;
    cost_points: number;
    input_data: InputData;
    output_data: null;
}

export interface InputData {
    style: string;
    title: string;
    custom: boolean;
    prompt: string;
    task_id: string;
    metadata: Metadata;
    callback_url: string;
    instrumental: boolean;
}

export interface Metadata {
    auto_suno_task_id: string;
}


export interface SongByTaskId {
    task_id: string;
    task_model: string;
    cost_points: number;
    input_data: InputData;
    output_data: OutputData;
}

export interface InputData {
    style: string;
    title: string;
    custom: boolean;
    prompt: string;
    task_id: string;
    metadata: Metadata;
    callback_url: string;
    instrumental: boolean;
}

export interface Metadata {
    auto_suno_task_id: string;
}

export interface OutputData {
    msg: string;
    code: number;
    data: Datum[] | null;
    callbackType: string;
}

export interface Datum {
    id: string;
    tags: string;
    title: string;
    prompt: string;
    status: string;
    duration: number;
    audio_url: string;
    image_url: string;
    createTime: Date;
    model_name: string;
    error_message: null;
    gpt_description_prompt: string;
}
