import Spreadsheet from './components/Spreadsheet';
import ToolBar from './components/ToolBar';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-full h-screen px-2 flex flex-col">
        <TopBar />
        <ToolBar />
        <div className="overflow-auto">
          <Spreadsheet />
        </div>
      </main>
    </div>
  );
}

export default App;
