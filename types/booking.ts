export type Booking = {
  bookingId: string;
  bookingDate: string;
  purpose?: string;

  roomId: string;
  roomName: string;

  userId: string;
  userName: string;
};

export type CreateBookingDto = {
  roomId: string;
  bookingDate: string; // yyyy-mm-dd
  purpose?: string;
};
