import Spreadsheet from './components/Spreadsheet';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-full min-h-screen px-4 py-6 overflow-auto">
        <Spreadsheet />
      </main>
    </div>
  );
}

export default App;
