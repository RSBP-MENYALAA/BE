# Gunakan base image Python
FROM python:3.8-slim

# Set environment variables untuk Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Copy dependencies
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy semua file ke dalam image
COPY . /app

# Expose port Flask
EXPOSE 5000

# Jalankan aplikasi Flask
CMD ["python", "app.py"]
