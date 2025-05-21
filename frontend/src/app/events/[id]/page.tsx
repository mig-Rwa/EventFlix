import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from 'date-fns';

interface Event {
  _id: string;
  title: string;
  organizer: string;
  price: number;
  imageUrl: string;
  date: string;
  tickets: number;
  headliners: string[];
  genres: string[];
  hashtags: string[];
  seller: string;
  description?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  ticketTypes?: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`,
      { cache: "no-store" }
    );
    console.log("Event details fetch status:", res.status);
    if (!res.ok) {
      console.log("Event details fetch failed:", await res.text());
      return null;
    }
    const event = await res.json();
    console.log("Fetched event details:", event);
    return event;
  } catch (e) {
    console.log("Fetch error:", e);
    return null;
  }
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);

  if (!event) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Event Image */}
        <div className="md:w-1/2 w-full relative h-80 md:h-auto">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
            priority
          />
        </div>
        {/* Event Details */}
        <div className="md:w-1/2 w-full flex flex-col p-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <div className="text-orange-600 text-xl font-bold mb-2">${event.price?.toFixed(2)}</div>
          <div className="mb-2">
            <span className="font-semibold">Organizer:</span> {event.organizer}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Event Start Date:</span> {format(new Date(event.date), "dd/MM/yyyy")}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Tickets:</span> {event.tickets}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Headliners:</span> {event.headliners?.join(", ")}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Genres:</span> {event.genres?.map((g) => (
              <span
                key={g}
                className="inline-block bg-gray-200 text-gray-800 rounded px-2 py-1 text-xs font-medium mr-2"
              >
                {g}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Hashtags:</span> {event.hashtags?.map((h) => (
              <span
                key={h}
                className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs font-medium mr-2"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Location:</span> {event.location?.address}, {event.location?.city}, {event.location?.country}
          </div>
          {event.ticketTypes && Array.isArray(event.ticketTypes) && (
            <div className="mb-2">
              <span className="font-semibold">Ticket Types:</span>
              <ul className="list-disc list-inside">
                {event.ticketTypes.map((tt: any, idx: number) => (
                  <li key={idx}>{tt.name} - ${tt.price} ({tt.quantity} available)</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-2">
            <span className="font-semibold">Description:</span> {event.description}
          </div>
        </div>
      </div>
    </div>
  );
}