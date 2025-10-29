<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exofters - Coming Soon</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f1a1e 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        body::before {
            content: '';
            position: fixed;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(30, 167, 141, 0.15) 0%, transparent 70%);
            animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-100px, 100px) rotate(180deg); }
        }

        .container {
            text-align: center;
            padding: 40px 20px;
            position: relative;
            z-index: 1;
            animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo {
            margin-bottom: 60px;
            animation: fadeInDown 0.8s ease-out;
        }

        .logo img {
            width: 200px;
            height: auto;
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #ffffff 0%, #2bc4a8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 1s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .subtitle {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.5s both;
        }

        .dots {
            display: inline-flex;
            gap: 10px;
            animation: fadeInUp 1s ease-out 0.7s both;
        }

        .dot {
            width: 12px;
            height: 12px;
            background: linear-gradient(135deg, #1ea78d 0%, #2bc4a8 100%);
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
        }

        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            .subtitle { font-size: 1.2rem; }
            .logo img { width: 150px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://exofters.io/images/companylogo.png" alt="Exofters" onerror="this.style.display='none'">
        </div>
        <h1>Coming Soon</h1>
        <p class="subtitle">Something amazing is on the way</p>
        <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>
</body>
</html>
