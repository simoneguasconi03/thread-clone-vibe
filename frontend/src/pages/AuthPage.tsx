import { useState } from "react";

interface AuthPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthPage({ setIsAuthenticated }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setError(null);

    const endpoint = isLogin
      ? "http://localhost:8000/api/token/"
      : "http://localhost:8000/api/register/";

    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || data?.detail || "Errore");
        return;
      }

      if (isLogin) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        window.location.href = "/"; 
      } else {
        setIsLogin(true);
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError("Errore di rete");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            {isLogin ? "Accedi" : "Registrati"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Entra per postare sul feed"
              : "Crea un account per iniziare"}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded px-4 py-2 border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input dark:text-foreground dark:border-border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded px-4 py-2 border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input dark:text-foreground dark:border-border"
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            onClick={handleAuth}
            className="w-full rounded py-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80"
          >
            {isLogin ? "Accedi" : "Registrati"}
          </button>

          <div className="text-center text-sm">
            {isLogin ? (
              <>
                Non hai un account?{" "}
                <button
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  onClick={() => setIsLogin(false)}
                >
                  Registrati
                </button>
              </>
            ) : (
              <>
                Hai già un account?{" "}
                <button
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  onClick={() => setIsLogin(true)}
                >
                  Accedi
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
