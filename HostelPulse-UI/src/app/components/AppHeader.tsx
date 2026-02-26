import { ArrowLeft, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  actions?: React.ReactNode;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function AppHeader({
  title,
  onBack,
  showNotifications,
  notificationCount = 0,
  onNotificationsClick,
  actions,
  showMenu,
  onMenuClick,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors md:hidden"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <h1 className="font-semibold text-gray-900 truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {showNotifications && (
            <button
              onClick={onNotificationsClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
