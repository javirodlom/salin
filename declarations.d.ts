declare module '*.png' {
    const value: string;
    export default value;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_GEMINI_API_KEY: string;
}

