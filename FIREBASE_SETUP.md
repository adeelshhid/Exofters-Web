# Exofters Firebase setup

The website is connected to the provided `exofters` Firebase project and runs with useful on-screen defaults until Firestore contains content.

## Database selection

This Firebase project uses the named `default` Firestore database, and the app targets it automatically. If a future environment uses a different **Database ID**, create a local `.env` file from [`.env.example`](./.env.example), set `REACT_APP_FIRESTORE_DATABASE_ID` to that exact ID, and restart or rebuild the React app.

1. In Firebase Console, enable **Authentication → Email/Password** and create the administrator account you will use at `/admin`.
2. Create a **Cloud Firestore** database. In its Rules tab, paste and publish the contents of [`firestore.rules`](./firestore.rules).
3. Enable **Firebase Storage**. In its Rules tab, paste and publish [`storage.rules`](./storage.rules), enabling authenticated administrators to upload portfolio images up to 10 MB.
4. Sign in at `/admin`. Add or edit products, portfolio projects, services, and homepage messaging; changes publish live to the public site.

The administrator can enter product introduction HTML. The interface removes script elements and inline event handlers before saving, but Firebase Authentication and the Firestore rules are the authority that protects publishing access.

For production, replace the `signedIn()` write check with an allowlist/custom-claim check if more than one Firebase user can sign in. For example, store approved UIDs in an `admins` collection and check their existence in your rules.
