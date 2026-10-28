# App-Grabber-Frontend

Next.js frontend for App Grabber (VK Internship Project)

<img width="250" alt="Screenshot 2026-10-10 at 21 49 12" src="https://github.com/user-attachments/assets/b7bbcfce-e589-4dd9-8133-9204e35557f9" />
<img width="250" alt="Screenshot 2026-10-10 at 21 49 25" src="https://github.com/user-attachments/assets/cab54b8c-cd8f-47a4-8113-b6e5613bc4a9" />


## Installation

1. Clone the repositories:

```bash
git clone https://github.com/SharkyJunior/App-Grabber-Frontend.git && git clone https://github.com/grishacake/CheckApp.git
```

2. Run the backend:

```bash
cd CheckApp && cp .env.example .env && sed -i "s/^JWT_SECRET=.*/JWT_SECRET=$(openssl rand -hex 32)/" .env && docker compose up -d --build --wait
```

3. Run the frontend:

```bash
cd ../App-Grabber-Frontend && npm run build && npm run start
```

4. Access the service at `http://localhost:3000/`

## Useful links
- [Link to backend](https://github.com/grishacake/CheckApp)
