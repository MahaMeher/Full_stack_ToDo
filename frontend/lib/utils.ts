import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  // Create date object - ensure proper timezone handling
  let dateObj: Date;
  if (typeof date === 'string') {
    // If date string is missing timezone info, assume it's UTC and convert to local
    if (!date.includes('Z') && !date.includes('+') && !date.includes('GMT') && !date.includes('UTC')) {
      // Add 'Z' suffix to treat as UTC if no timezone info is present
      dateObj = new Date(date + 'Z');
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }

  // Format using user's local timezone
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 12-hour format
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

export function formatDateTime(date: Date | string): string {
  // Create date object - ensure proper timezone handling
  let dateObj: Date;
  if (typeof date === 'string') {
    // If date string is missing timezone info, assume it's UTC and convert to local
    if (!date.includes('Z') && !date.includes('+') && !date.includes('GMT') && !date.includes('UTC')) {
      // Add 'Z' suffix to treat as UTC if no timezone info is present
      dateObj = new Date(date + 'Z');
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }

  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format
    timeZoneName: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}