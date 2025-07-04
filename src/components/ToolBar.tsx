export default function ToolBar() {
  return (
    <div className="w-full flex justify-between items-center py-1 border-b border-border">
      {/* left side */}
      <div className="flex gap-1 items-center">
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md hover:bg-secondary/30">
          <p>Tool bar</p>
          <img src="src\assets\icons\ChevronDouble.svg" alt="ChevronDouble icon" />
        </button>
        <div className="w-1 h-5 border-r-2 border-border"></div>
        <button className="flex items-center justify-center gap-1 w-30 py-2 rounded-md hover:bg-secondary/30">
          <img src="src\assets\icons\Eye.svg" alt="Eye icon" />
          <p>Hide fields</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md hover:bg-secondary/30">
          <img src="src\assets\icons\Sort.svg" alt="Sort icon" />
          <p>Sort</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md hover:bg-secondary/30">
          <img src="src\assets\icons\Filter.svg" alt="Filter icon" />
          <p>Filter</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-30 py-2 rounded-md hover:bg-secondary/30">
          <img src="src\assets\icons\ArrowAutofit.svg" alt="Arrow Autofit icon" />
          <p>Cell View</p>
        </button>
      </div>

      {/* right side */}
      <div className="flex gap-1">
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30">
          <img src="src\assets\icons\Download.svg" alt="Download icon" />
          <p>Import</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30">
          <img src="src\assets\icons\Upload.svg" alt="Upload icon" />
          <p>Export</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-22 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30">
          <img src="src\assets\icons\Share.svg" alt="Share icon" />
          <p>Share</p>
        </button>
        <button className="flex items-center justify-center gap-1 w-38 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
          <img src="src\assets\icons\ArrowSplit.svg" alt="Arrow split icon" />
          <p>New Action</p>
        </button>
      </div>
    </div>
  );
}
