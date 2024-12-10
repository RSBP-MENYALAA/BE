export interface PredictRequest {
  filePath: string;
}

export interface PredictResponse {
  prediction: Prediction;
}

export interface Prediction {
  predicted_class: number;
  label: string;
  probabilities: number[];
}