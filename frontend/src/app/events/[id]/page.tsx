import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from 'date-fns';

// Mock event data (replace with API call in production)
const mockEvents = [
  {
    id: "1",
    title: "The Barrel House Ball Room",
    organizer: "Cameron Whitcomb",
    price: 120,
    image: "/images/people-concert-with-smoke-overlay-texture.jpg",
    date: "2025-04-10",
    tickets: 2,
    headliners: ["Cameron Whitcomb"],
    genres: ["Country", "Alternative"],
    hashtags: ["Cameron whitcomb"],
    seller: "Aaron C",
  },
  {
    id: "2",
    title: "Resonant Language Crawdad Sniper Onyx Garden Waterchild Pluff",
    organizer: "AC C",
    price: 30,
    image: "/images/sample2.JPG",
    date: "2025-05-01",
    tickets: 1,
    headliners: ["AC C"],
    genres: ["Jazz"],
    hashtags: ["AC C"],
    seller: "John D",
  },
];

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find(e => e.id === params.id);
  if (!event) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Event Image */}
        <div className="md:w-1/2 w-full relative h-80 md:h-auto">
          <Image
            src={event.image}
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
          />
        </div>
        {/* Event Details */}
        <div className="md:w-1/2 w-full flex flex-col p-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <div className="text-orange-600 text-xl font-bold mb-2">${event.price.toFixed(2)}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm font-medium">{event.seller}</span>
            <span className="text-gray-500 text-sm">Seller</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Event Name:</span> <span className="text-black">{event.organizer}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Event Start Date:</span> {format(new Date(event.date), 'dd/MM/yyyy')}
          </div>
          <div className="mb-2">
            <span className="font-semibold">How many tickets are sold with this listing?:</span> {event.tickets}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Headliners and artists:</span> {event.headliners.join(", ")}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Music genre(s):</span> {event.genres.map(g => (
              <span key={g} className="inline-block bg-gray-200 text-gray-800 rounded px-2 py-1 text-xs font-medium mr-2">{g}</span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Search terms and hashtags:</span> {event.hashtags.map(h => (
              <span key={h} className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs font-medium mr-2">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}