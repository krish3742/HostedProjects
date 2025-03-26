import Navbar from "./components/Navbar";
import ChatInterface from "./components/ChatInterface";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./styles/App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <ChatInterface />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
