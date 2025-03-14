from flask import Flask, render_template, request, jsonify
from pytube import YouTube
import os

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download_video():
    data = request.json
    video_url = data.get("url")

    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        yt = YouTube(video_url)
        stream = yt.streams.filter(progressive=True, file_extension="mp4").first()
        video_path = stream.download(DOWNLOAD_FOLDER)
        return jsonify({"message": "Download successful!", "video_path": video_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
