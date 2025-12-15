// src/types/room.ts
export interface Room {
  roomId: string;
  code: string;
  name: string;
  capacity: number;
  location?: string | null;
}

export interface RoomFormDto {
  code: string;
  name: string;
  capacity: number;
  location: string;
}
