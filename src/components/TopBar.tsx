import { useState } from 'react';

import ModalWrapper from './ModalWrapper';
import { Pen, Save } from 'lucide-react';

export default function TopBar() {
  const [name, setName] = useState('Jonn Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [isProfilModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  return (
    <div className="">
      <div className="flex justify-between items-center py-1 border-b border-border overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {/* left side */}
        <div className="flex gap-1 items-center">
          <div
            className="px-2 py-2 text-[#618666] hover:bg-primary/10 rounded-md"
            onClick={() => (window.location.href = '/')}
          >
            <img src="/icons/Panel.svg" alt="Panel icon" />
          </div>
          <div className="hidden md:flex items-center">
            <span className="text-muted-foreground font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">
              Workspace
            </span>
            <span className="translate-y-[2px] text-muted-foreground">
              <img src="/icons/Chevron.svg" alt="Chevron icon" />
            </span>
            <span className="text-muted-foreground font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">
              Folder 2
            </span>
            <span className="translate-y-[2px] text-muted-foreground">
              <img src="/icons/Chevron.svg" alt="Chevron icon" />
            </span>
            <span className="font-medium hover:bg-secondary/30 px-2 py-1 rounded-md">
              Spreadsheet 3
            </span>
            <span className="translate-y-[2px] text-muted-foreground hover:bg-secondary/30 px-2 py-2 rounded-full text-sm">
              <img src="/icons/Ellipsis.svg" alt="Ellipsis icon" />
            </span>
          </div>
        </div>

        {/* right side */}
        <div className="flex items-center gap-1">
          {/* search box */}
          <div className="w-44 relative bg-[#F6F6F6] text-tertiary-foreground rounded-md">
            <span className="p-2 absolute top-1/2 -translate-y-1/2 text-[#AFAFAF]">
              <img src="/icons/Search.svg" alt="Search icon" />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search within sheet"
              className="w-full pl-8 pr-2 py-2 rounded-md placeholder:text-tertiary-foreground outline-0 focus-visible:ring-secondary-foreground/50 focus-visible:ring-[1px]"
            />
          </div>

          {/* notification */}
          <div
            className="p-2 relative rounded-md hover:bg-secondary/30"
            onClick={() => setIsNotificationOpen(true)}
          >
            <span className="absolute right-0 top-0 h-5 w-5 bg-primary text-primary-foreground text-xs text-center rounded-full hover:bg-primary/80 border border-white">
              2
            </span>
            <img src="/icons/Alert.svg" alt="Alert icon" />
          </div>

          {/* user */}
          <div
            className="flex items-center px-2 py-[6px] gap-1 rounded-md hover:bg-secondary/30"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <div className="w-7 h-7">
              <img
                src="/userImage.png"
                alt="User image"
                loading="lazy"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="hidden md:block max-w-20 overflow-hidden">
              <p className="text-sm">{name}</p>
              <p className="text-tertiary-foreground text-xs text-ellipsis overflow-hidden">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isProfilModalOpen && (
        <ModalWrapper title="Profile" onClose={() => setIsProfileModalOpen(false)}>
          <div className="grid grid-cols-5 gap-2 place-items-baseline min-w-md pb-20">
            <div className="font-medium text-lg">Name</div>
            {isNameEditing ? (
              <input
                type="text"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 px-1 outline-0 rounded-md focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
              />
            ) : (
              <div className="col-span-3">{name}</div>
            )}
            <button
              className="text-muted-foreground cursor-pointer"
              onClick={() => setIsNameEditing((prev) => !prev)}
            >
              {isNameEditing ? <Save size={16} /> : <Pen size={16} />}
            </button>

            <div className="font-medium text-lg">Email</div>
            {isEmailEditing ? (
              <input
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3 px-1 outline-0 rounded-md focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
              />
            ) : (
              <div className="col-span-3">{email}</div>
            )}
            <button
              className="text-muted-foreground cursor-pointer"
              onClick={() => setIsEmailEditing((prev) => !prev)}
            >
              {isEmailEditing ? <Save size={16} /> : <Pen size={16} />}
            </button>
          </div>
        </ModalWrapper>
      )}
      {isNotificationOpen && (
        <ModalWrapper title="Notification" onClose={() => setIsNotificationOpen(false)}>
          <div className="">
            <div className="py-1">New Notification 1</div>
            <div className="py-1">New Notification 2</div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
