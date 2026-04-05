# Basement Talk Firebase Starter

A starter repo to recreate the uploaded Base44 app as a plain React + Vite app using:

- React + Vite
- Tailwind CSS v4 + PostCSS
- Radix UI
- React Router
- React Query
- Firebase Auth (Google)
- Firestore
- Firebase Storage
- next-themes
- Recharts
- Vercel

## 1. Install

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Firebase values.

## 2. Firebase setup

Create a Firebase project, enable Google sign-in, create Firestore and Storage, and add your local + production domains to Authorized domains.

## 3. Run locally

```bash
npm run dev
```

## 4. Deploy to Vercel

- Push this repo to GitHub
- Import into Vercel
- Add the same `VITE_*` environment variables in Vercel
- Deploy
- Add your `*.vercel.app` domain to Firebase Authorized domains

## Suggested Firestore collections

### episodes
- title: string
- description: string
- episode_number: number
- date: string
- tags: array of strings
- status: `draft` or `published`
- thumbnail_url: string
- video_url: string
- audio_url: string
- created_at: number

### mediaClips
- title: string
- description: string
- type: `video` | `image` | `audio`
- tags: array of strings
- file_url: string
- created_at: number

## Suggested Firestore rules

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /episodes/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /mediaClips/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Suggested Storage rules

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
