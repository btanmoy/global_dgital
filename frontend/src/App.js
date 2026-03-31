import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const res = await axios.get("http://localhost:3000/api/subscriptions");
    setData(res.data);
  };

  const handleReassign = async (subId, seatId) => {
    const newUser = prompt("Enter new user name:");

    if (!newUser) return;

    await axios.put(
      `http://localhost:3000/api/subscriptions/${subId}/seats/${seatId}`,
      {
        newUser,
      },
    );

    fetchSubscriptions();
  };

  const totalBurn = data.reduce((acc, sub) => {
    return acc + sub.monthlyCost * sub.totalSeats;
  }, 0);

  return (
    <div className="container mt-4">
      <h2>Subscription Dashboard</h2>

      <div className="row">
        {data.map((sub) => {
          const usedSeats = sub.assignments.filter(
            (a) => a.status === "Active",
          ).length;

          return (
            <div className="col-md-6" key={sub.id}>
              <div className="card p-3 mb-3">
                <h4>{sub.softwareName}</h4>
                <p>💰 Cost: ${sub.monthlyCost}</p>
                <p>
                  👥 Used: {usedSeats} / {sub.totalSeats}
                </p>
                <h3>Total Monthly Burn: ${totalBurn}</h3>

                <ul className="list-group">
                  {sub.assignments.map((seat) => (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={seat.seatId}
                    >
                      <span>
                        {seat.seatId} - {seat.user}
                      </span>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleReassign(sub.id, seat.seatId)}
                      >
                        Reassign
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
