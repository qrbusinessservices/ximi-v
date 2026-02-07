// Function to generate greeting based on current time
function getGreeting() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeString = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;

  if (hour >= 5 && hour < 12) {
    return `Good Morning! It's ${timeString}.`;
  } else if (hour >= 12 && hour < 16) {
    return `Good Afternoon! It's ${timeString}.`;
  } else {
    return `Good Evening! It's ${timeString}.`;
  }
}

// Function to draw QR code with logo in the center
function drawQRCodeWithLogo(canvasId, url, logoUrl) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const size = 200;
  const logoSize = 50;
  const ctx = canvas.getContext('2d');

  QRCode.toCanvas(
    canvas,
    url,
    {
      width: size,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff',
      },
    },
    function (error) {
      if (error) {
        console.error(`QR code generation failed for ${canvasId}:`, error);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        // Optional white background behind logo for clarity
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);

        // Draw logo on top
        ctx.drawImage(img, x, y, logoSize, logoSize);
      };
      img.onerror = () => {
        console.error(`Failed to load logo image: ${logoUrl}`);
      };
      img.src = logoUrl;
    }
  );
}

// On window load
window.onload = function () {
  // Insert greeting if element exists
  const greetingElement = document.getElementById('greeting-message');
  if (greetingElement) {
    const originalText = greetingElement.innerHTML;
    greetingElement.innerHTML = getGreeting() + "<br>" + originalText;
  }

  // Google Reviews URL and logo
  const googleReviewUrl = 'https://www.google.com/search?sca_esv=ba24c2d2484ecd3d&rlz=1C1ONGR_enCA1147CA1147&sxsrf=ANbL-n5ZPqkzUiwWuYCxIUwUkpD0o51Zbg:1770420485133&q=ximi-v+ottawa+reviews&uds=ALYpb_kZZVVAl2rcYDLox25MJ3lKKcmbM60qxlqQKLgMbYg0C7HkiZhlMeRsaua_VQARU2NdeJZplMKFE8WgMYL4jpv0VU_qF_SUk9qGPNWYN6OoSuxTNZrT05nUD4TXnU8oK627ABvRKlyvETWV-ItCg7HjtSNHgC7rPcwqsrmIBREu3ucJREGU_3YRzbt3WAh54M0xHzXCtTDqFZRlVUGMqpiAANKXXGVNU4obhn0RTyJxNKNk-BHvB7U2wlvZsB-B-4IWEpj2qRtzeaXgzlvhR31QxAm4-thBu3spTMg71Oi5-l4fmioglcaVgQ-nrmBFYbyZ39TjtsEDL65MEzB0pu4w3bKODYS8im3PCVaCswcJuSaxgfFjB8K6A3PH1wFvXrlHbmt8&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOS94-uRhU4EnkXHVJH0kspWJ6eCud2F0Z0J4mxndqASfCUWZH7g10Z7-Iqr5MkP199Y9LksUAH4E7w-zrhoy5Gc10iZj&sa=X&ved=2ahUKEwij7fmggsaSAxUCNlkFHXbSH3AQk8gLegQIIRAB&ictx=1&biw=428&bih=859&dpr=3&sei=cnqGabWrO8qf5NoP5NHG4AU#lrd=0x4cce0f000a0b6941:0x4b6bf3c4ee88ccd,3,,,,';
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/800px-KFC_logo-image.svg.png';

  // Generate QR code for Google Reviews only
  setTimeout(() => {
    drawQRCodeWithLogo('qr-google-maps', googleReviewUrl, logoUrl);
  }, 400);
};
