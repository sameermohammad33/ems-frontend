export interface Event {
    eventId: number;
    name: string;
    category: string;
    location: string;
    date: string; // or Date if you'll transform it
    availableTickets: number;
    // Add other properties as needed
  }
