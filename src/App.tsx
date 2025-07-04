import Spreadsheet from './components/Spreadsheet';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-full h-screen px-2 py-2 flex flex-col">
        <TopBar />
        <div className='overflow-auto'>
          <Spreadsheet />
        </div>
      </main>
    </div>
  );
}

export default App;
