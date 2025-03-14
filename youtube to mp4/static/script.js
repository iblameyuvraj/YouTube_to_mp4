document.addEventListener("DOMContentLoaded", function() {
    const downloadBtn = document.getElementById("download-btn");
    const youtubeInput = document.getElementById("youtube-url");
    const loader = document.getElementById("loader");
    const statusMessage = document.getElementById("status-message");

    gsap.from("#download-btn", { scale: 0.8, opacity: 0, duration: 0.6, ease: "elastic" });

    downloadBtn.addEventListener("click", function() {
        const url = youtubeInput.value.trim();

        if (url === "") {
            statusMessage.textContent = "Please enter a valid YouTube URL!";
            statusMessage.style.color = "#ff4b2b";
            return;
        }

        loader.style.display = "block";
        statusMessage.textContent = "Downloading...";
        statusMessage.style.color = "#ffffff";

        fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none";
            if (data.error) {
                statusMessage.textContent = "Error: " + data.error;
                statusMessage.style.color = "#ff4b2b";
            } else {
                statusMessage.textContent = "Download successful! File saved.";
                statusMessage.style.color = "#32cd32";
            }
        })
        .catch(error => {
            loader.style.display = "none";
            statusMessage.textContent = "Error downloading video.";
            statusMessage.style.color = "#ff4b2b";
        });
    });
});
