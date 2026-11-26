
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <section id="my-bookings" className="my-bookings">
      <h2>My Bookings</h2>
      <button onClick={loadBookings}>Refresh Bookings</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Match ID</th>
                <th>Category</th>
                <th>Tickets</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customer_name || b.customer || b.full_name || b.user_name || "Not entered"}</td>
                  <td>{b.email || "N/A"}</td>
                  <td>{b.match_id}</td>
                  <td>{b.stand_category || b.category || "N/A"}</td>
                  <td>{b.number_of_tickets ?? b.tickets ?? b.quantity ?? "N/A"}</td>
                  <td>₹{Number(b.total_amount ?? b.total_price ?? b.amount ?? b.price ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MyBookings;
