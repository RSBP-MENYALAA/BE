export interface RetrainRequest {
    imagepath: string;
    new_class: number;
}

export interface RetrainResponse {
    imagepath: string;
    new_class: string;
}

export interface BatchRetrainRequest {
    image_data: RetrainRequest[]
}