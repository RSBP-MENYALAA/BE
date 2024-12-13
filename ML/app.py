from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os

# Inisialisasi Flask
app = Flask(__name__)

# Load model
MODEL_PATH = "model/CNN_art_classifier.h5"
model = load_model(MODEL_PATH)

# Endpoint untuk prediksi
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Periksa apakah ada file gambar di request
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        file = request.files['image']

        # Simpan gambar sementara di folder 'image'
        image_path = os.path.join('image', file.filename)
        file.save(image_path)

        # Proses gambar
        img = load_img(image_path, target_size=(32, 32))  # Pastikan ukuran sesuai dengan model Anda
        img_array = img_to_array(img)
        img_array = img_array / 255.0  # Normalisasi (jika diperlukan)
        img_array = np.expand_dims(img_array, axis=0)  # Tambahkan batch dimension

        # Prediksi
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)
        confidence = np.max(predictions)

        # Hapus gambar setelah diproses
        os.remove(image_path)

        # Mapping hasil prediksi ke label
        label = "AI Generated" if predicted_class[0] == 0 else "Human-made"

        # Return hasil prediksi
        return jsonify({
            'predicted_class': int(predicted_class[0]),
            'label': label,
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint untuk health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
