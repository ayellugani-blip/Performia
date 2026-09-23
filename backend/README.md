# Performia Backend

FastAPI backend for the Performia performance management platform.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py   # Package init
│   └── main.py       # FastAPI app entry point
├── .env.example      # Environment variable template
├── requirements.txt  # Python dependencies
└── README.md
```

## Setup

### 1. Fix Python (required — see note below)

Both Python 3.13 and 3.14 on this machine are missing `tempfile.py` from the
standard library. Repair or reinstall Python before running the server:

- **Windows repair**: Go to *Settings → Apps → Python 3.13/3.14 → Modify →
  Repair*.
- **Fresh install**: Download the latest Python installer from
  <https://www.python.org/downloads/> and run it, selecting **Repair**.

### 2. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env if needed
```

### 4. Run the development server

```bash
uvicorn app.main:app --reload
```

Server will start at <http://127.0.0.1:8000>.

### 5. Verify

Open <http://127.0.0.1:8000> — you should see:

```json
{"message": "Performia API is running"}
```

Interactive API docs are at <http://127.0.0.1:8000/docs>.
