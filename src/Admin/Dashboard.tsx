import { ThemeProvider } from "./contexts/theme-context.tsx";
import Layout from "./routes/layout.tsx";
import './index.css'

function Admin() {
    return (
        <ThemeProvider storageKey="theme">
            <Layout />
        </ThemeProvider>
    );
}

export default Admin;
