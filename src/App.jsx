
import MyBookings from "./components/MyBookings";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMatches, setShowMatches] = useState(true);

  // Fetch matches from Supabase
  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .not("match_number", "is", null)
      .order("match_number");

    if (error) {
      console.error("Error fetching matches:", error.message);
    } else {
      // Avoid showing duplicate match numbers
      const uniqueMatches = Array.from(
        new Map(data.map((match) => [match.match_number, match])).values()
      );

      setMatches(uniqueMatches);
    }

    setLoading(false);
  }

  // Fetch data and enable Realtime
  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <section id="matches">
        <h2>IPL Match Schedule</h2>

        <button onClick={() => setShowMatches(!showMatches)}>
          {showMatches ? "Hide Matches" : "Show Matches"}
        </button>

        {loading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <p>No matches available.</p>
        ) : showMatches ? (
          <div className="matches">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                date={match.match_date || match.date}
                venue={match.venue}
                price={match.general_price || match.price}
                onBook={() => {
                  document.getElementById("booking")?.scrollIntoView({
                    behavior: "smooth"
                  });
            }}
              />
            ))}
          </div>
        ) : null}
      </section>

      <BookingForm matches={matches} />
      <MyBookings />
    </>
  );
}

export default App;
