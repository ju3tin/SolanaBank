import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import jwt_decode from "jwt-decode";
import { decode } from "next-auth/jwt";

export default function CardLineChart() {
  const chartRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  //  const decodedToken = jwt_decode(token);
  const decodedToken = '0898098908';
    setDecoded(decodedToken);
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/auth/userbyemail/" + decoded.sub,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const json = await res.json();
        setProfile(json);
        setBalance(json.balance);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    if (decoded) {
      fetchProfile();
    }
  }, [decoded]);

  useEffect(() => {
    if (chartRef.current && profile) {
      const chartData = {
        labels: ["September", "Sep/Oct", "October", "November", "December"],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [0, profile.balance * 0.1, profile.balance],
            fill: false,
          },
        ],
      };

      const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Balance",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      };

      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [profile]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                balance
              </h6>
              <h2 className="text-white text-2xl font-semibold">
                {balance + " EUR"}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
