import { CiSearch } from "react-icons/ci";
import { PiBell } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";

const NAME = "John Doe";
const EMAIL = "john.doe@gmail.com";

export default function TopBar() {
  return (
    <div className="w-full flex justify-between items-center py-1">
      {/* left side */}
      <div className="flex gap-1 items-center">
        <div className="px-2 py-2 text-[#618666] hover:bg-primary/10 rounded-md">
          <TbLayoutSidebarRightFilled size={24}/>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">Workspace</span>
          <span className="translate-y-[2px] text-muted-foreground"><MdOutlineKeyboardArrowRight /></span>
          <span className="text-muted-foreground font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">Folder 2</span>
          <span className="translate-y-[2px] text-muted-foreground"><MdOutlineKeyboardArrowRight /></span>
          <span className="font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">Spreadsheet 3</span>
          <span className="translate-y-[2px] text-muted-foreground hover:bg-secondary/30 px-2 py-2 rounded-full text-sm"><FaEllipsisH /></span>
        </div>
      </div>


      {/* right side */}
      <div className="flex items-center gap-1">
        {/* search box */}
        <div className="w-44 relative bg-[#F6F6F6] text-secondary-foreground rounded-md">
            <span className="p-2 absolute top-1/2 -translate-y-1/2 text-[#AFAFAF]">
              <CiSearch size={20} strokeWidth={1} />
            </span>
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder="Search within sheet" 
              className="w-full pl-8 pr-2 py-2 rounded-md placeholder:text-secondary-foreground outline-0 focus-visible:ring-secondary-foreground/50 focus-visible:ring-[1px]"
            />
        </div>

        {/* notification */}
        <div className="p-2 relative rounded-md hover:bg-secondary/30">
          <span className="absolute right-0 top-0 h-5 w-5 bg-primary text-primary-foreground text-xs text-center rounded-full hover:bg-primary/80 border border-white">2</span>
          <PiBell size={24} strokeWidth={2} />
        </div>

        {/* user */}
        <div className="flex items-center px-2 py-[6px] gap-1 rounded-md hover:bg-secondary/30">
            <div className="w-7 h-7">
                <img src="src/assets/userImage.png" alt="User image" loading="lazy" className="object-cover h-full w-full" />
            </div>
            <div className="max-w-20 overflow-hidden">
                <p className="text-sm">{NAME}</p>
                <p className="text-secondary-foreground text-xs text-ellipsis overflow-hidden">{EMAIL}</p>
            </div>
        </div>
      </div>
    </div>
  )
}
