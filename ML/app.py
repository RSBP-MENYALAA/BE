from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os
from tensorflow.keras.optimizers import Adam

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

        # Hapus gambar setelah diproses
        # os.remove(image_path)

        # Mapping hasil prediksi ke label
        label = "AI Generated" if predicted_class[0] == 0 else "Human-made"
        
        # Return hasil prediksi
        return jsonify({
            'predicted_class': int(predicted_class[0]),
            'label': label,
            'probabilities': predictions.tolist(),
            'imagePath': image_path,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def retrain_model(retrain_data):
    images = []
    labels = []

    for data in retrain_data:
        image_path = data['imagepath']
        new_class = data['new_class']
        
        # Load gambar dan ubah ukuran sesuai model input
        img = load_img(image_path, target_size=(32, 32))  # Sesuaikan dengan ukuran input model
        img_array = img_to_array(img)
        img_array = img_array / 255.0  # Normalisasi (jika diperlukan)
        images.append(img_array)
        
        # Tambahkan label ke array
        labels.append(new_class)
    
    # Mengubah list ke numpy array
    X_train = np.array(images)
    y_train = np.array(labels)
    
    # Compile ulang model sebelum retraining
    model.compile(optimizer=Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Melatih model dengan data baru
    model.fit(X_train, y_train, epochs=5, batch_size=32)

    # Simpan model yang sudah dilatih ulang
    model.save(MODEL_PATH)

    print("Retraining completed.")

# Endpoint untuk retraining model
@app.route('/retrain-model', methods=['POST'])
def retrain():
    try:
        # Dapatkan data retrain dari request JSON
        retrain_data = request.get_json()

        if not retrain_data:
            return jsonify({'error': 'No retrain data provided'}), 200

        # Melakukan retraining
        retrain_model(retrain_data)
        
        return jsonify({'message': 'Model retrained successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint untuk health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
