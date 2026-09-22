import { useState } from 'react';

const DispatchPortal = () => {
  // Mock data mapping strictly to the Firestore schema parameters
  const [mockBookings] = useState([
    {
      bookingId: 'ML-883A',
      passengerDetails: { fullName: 'Alexander Pierce', phone: '+30 690 000 0000' },
      routeDetails: { pickupLocation: 'Mykonos Airport (JMK)', dropoffLocation: 'Scorpios Mykonos', pickupDate: '2026-09-24', pickupTime: '14:30' },
      requirements: { vehicleClass: 'VIP Sprinter', passengers: 5 },
      financials: { totalPrice: 180 },
      status: 'Pending',
      assignedDriverId: null
    },
    {
      bookingId: 'ML-884B',
      passengerDetails: { fullName: 'Elena Rossi', phone: '+30 690 000 0001' },
      routeDetails: { pickupLocation: 'Principote', dropoffLocation: 'Cavo Tagoo Hotel', pickupDate: '2026-09-24', pickupTime: '16:00' },
      requirements: { vehicleClass: 'Standard', passengers: 2 },
      financials: { totalPrice: 65 },
      status: 'Confirmed',
      assignedDriverId: 'DRV-02'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Dispatch Top Navigation */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-widest uppercase">Dispatch Command</div>
          <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Admin</span>
        </div>
        <button className="text-sm font-semibold hover:text-blue-400 transition-colors">
          Secure Logout
        </button>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Active Vehicles</div>
            <div className="text-3xl font-bold text-slate-900">8 / 12</div>
          </div>
          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm border-l-4 border-l-blue-600">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Pending Bookings</div>
            <div className="text-3xl font-bold text-slate-900">4</div>
          </div>
          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Today's Revenue</div>
            <div className="text-3xl font-bold text-slate-900">€ 1,240</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Live Booking Feed</h2>
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded uppercase tracking-widest transition-colors">
              Refresh Feed
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-xs text-gray-600 uppercase tracking-widest border-b border-gray-200">
                  <th className="p-4 font-bold">Booking ID</th>
                  <th className="p-4 font-bold">Passenger</th>
                  <th className="p-4 font-bold">Route & Time</th>
                  <th className="p-4 font-bold">Class</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {mockBookings.map((booking) => (
                  <tr key={booking.bookingId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-700">{booking.bookingId}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{booking.passengerDetails.fullName}</div>
                      <div className="text-xs text-gray-500">{booking.passengerDetails.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{booking.routeDetails.pickupLocation}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span>→</span> {booking.routeDetails.dropoffLocation}
                      </div>
                      <div className="text-xs font-bold text-blue-600 mt-1">
                        {booking.routeDetails.pickupDate} @ {booking.routeDetails.pickupTime}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{booking.requirements.vehicleClass}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DispatchPortal;