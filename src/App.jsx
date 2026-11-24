
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [showMatches, setShowMatches] = useState(true);

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "28 March",
      venue: "Bengaluru",
      price: 800
    },
    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "29 March",
      venue: "Mumbai",
      price: 900
    },
    {
      id: 3,
      team1: "CSK",
      team2: "MI",
      date: "30 March",
      venue: "Chennai",
      price: 800
    }
  ];

  return (
    <>
      <Navbar />

      <Hero />

      <section id="matches">
        <h2>IPL Match Schedule</h2>

        <button onClick={() => setShowMatches(!showMatches)}>
          {showMatches ? "Hide Matches" : "Show Matches"}
        </button>

        {showMatches && (
          <div className="matches">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                date={match.date}
                venue={match.venue}
                price={match.price}
                onBook={() => alert("You selected " + match.team1 + " vs " + match.team2)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
