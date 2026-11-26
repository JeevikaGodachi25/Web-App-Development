
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function BookingForm({ matches, selectedMatchId }) {
  const [matchId, setMatchId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General");
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedMatchId) {
      setMatchId(String(selectedMatchId));
    }
  }, [selectedMatchId]);

  async function handleBooking(e) {
    e.preventDefault();
    setMessage("");

    const match = matches.find(
      (m) => String(m.id) === matchId
    );

    if (!match) {
      setMessage("Please select a match.");
      return;
    }

    const count = Number(tickets);

    if (!name.trim() || !email.trim() || !Number.isInteger(count) || count < 1) {
      setMessage("Please enter valid details.");
      return;
    }

    if (count > Number(match.available_seats)) {
      setMessage("Not enough seats available.");
      return;
    }

    const prices = {
      General: Number(match.general_price),
      Premium: Number(match.premium_price),
      VIP: Number(match.vip_price)
    };

    const total = prices[category] * count;

    // Save booking using your actual database columns
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([{
        match_id: match.id,
        user_name: name.trim(),
        match_title: `${match.team1} vs ${match.team2}`,
        tickets: count,
        total_price: total,
        email: email.trim(),
        stand_category: category
      }]);

    if (bookingError) {
      setMessage("Booking failed: " + bookingError.message);
      return;
    }

    // Update available seats
    const { error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats: Number(match.available_seats) - count
      })
      .eq("id", match.id);

    if (updateError) {
      setMessage("Booking saved, but seat update failed: " + updateError.message);
      return;
    }

    setMessage("Booking successful!");
    setName("");
    setEmail("");
    setTickets(1);
  }

  return (
    <section id="booking">
      <h2>Book Your IPL Tickets</h2>

      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          required
        >
          <option value="">Select Match</option>
          {matches.map((m) => (
            <option key={m.id} value={m.id}>
              {m.team1} vs {m.team2}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>

        <input
          type="number"
          min="1"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>

      <p>{message}</p>
    </section>
  );
}

export default BookingForm;
