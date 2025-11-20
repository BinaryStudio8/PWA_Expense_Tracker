import React, { useMemo } from "react";
import { useDashboardMetrics } from "@/hooks";
import { ExpenseList, SummaryCard, PendingReviews } from "@/components";
import { Plus, TrendingUp, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatIndianCurrency } from "@/utils";

export const Home: React.FC = () => {
  const { total, todayTotal, maxExpense } = useDashboardMetrics();
  const navigate = useNavigate();

  // Polished, context-aware emojis
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 18) return "Good Afternoon !!";
    return "Good Evening 🌙";
  }, []);

  const isMorning = greeting.includes("Morning");
  const isAfternoon = greeting.includes("Afternoon");
  const isEvening = greeting.includes("Evening");

  return (
    <div className="w-full mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 sm:space-y-10 bg-gray-50 dark:bg-gray-900/1">
      {/* Greeting Card */}
      <div
        className={`
          relative rounded-3xl shadow-lg p-6 sm:p-8 text-center border
          overflow-hidden
          ${isEvening ? "night-sky" : isAfternoon ? "afternoon-sky" : "day-sky"}
          border-gray-200 dark:border-gray-700
        `}
        aria-hidden={false}
      >
        {/* Background Animation Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Clouds (morning / calm) — multilayered, soft */}
          {isMorning && (
            <>
              <div
                className="cloud-1 absolute"
                style={{
                  top: "24px",
                  left: "-20%",
                  width: "120px",
                  height: "48px",
                  borderRadius: "48px",
                  background: "rgba(255,255,255,0.72)",
                }}
                aria-hidden
              />
              <div
                className="cloud-2 absolute"
                style={{
                  top: "64px",
                  left: "-35%",
                  width: "160px",
                  height: "60px",
                  borderRadius: "60px",
                  background: "rgba(255,255,255,0.56)",
                }}
                aria-hidden
              />
              <div
                className="cloud-3 absolute"
                style={{
                  top: "12px",
                  left: "10%",
                  width: "90px",
                  height: "40px",
                  borderRadius: "40px",
                  background: "rgba(255,255,255,0.5)",
                }}
                aria-hidden
              />
            </>
          )}

          {/* Afternoon Sun (soft, theme-tuned) */}
          {isAfternoon && (
            <div
              className="sun absolute"
              style={{
                top: "16px",
                right: "16px",
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, rgba(250,204,21,0.95), rgba(245,158,11,0.65))",
                mixBlendMode: "screen",
              }}
              aria-hidden
            />
          )}

          {/* Evening Moon + stars (soft indigo moon) */}
          {isEvening && (
            <>
              <div
                className="moon absolute"
                style={{
                  top: "36px",
                  right: "28px",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(147,197,253,0.18)",
                  boxShadow: "0 0 30px rgba(147,197,253,0.08)",
                }}
                aria-hidden
              />
              <div
                className="star absolute"
                style={{
                  top: "32px",
                  left: "48px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                }}
                aria-hidden
              />
              <div
                className="star absolute"
                style={{
                  top: "64px",
                  left: "96px",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: "0 0 6px rgba(255,255,255,0.5)",
                }}
                aria-hidden
              />
              <div
                className="star absolute"
                style={{
                  top: "48px",
                  left: "60%",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.88)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.55)",
                }}
                aria-hidden
              />
            </>
          )}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10">
          <h2
            className={`text-xl sm:text-2xl font-semibold mb-2 ${
              isEvening ? "text-white" : "text-gray-800"
            }`}
          >
            {greeting}
          </h2>

          <p
            className={`text-base font-semibold sm:text-lg max-w-xl mx-auto ${
              isEvening ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Stay on top of your finances — quick, simple, and visual.
          </p>
        </div>

        {/* Inline styles block for animations, reduced-motion, and GPU hints */}
        <style>{`
          /* ===== reduced motion fallback ===== */
          @media (prefers-reduced-motion: reduce) {
            .cloud-1, .cloud-2, .cloud-3, .sun, .moon, .star {
              animation: none !important;
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }

          /* ===== GPU hint for smooth animations ===== */
          .cloud-1, .cloud-2, .cloud-3, .sun, .moon, .star {
            will-change: transform, opacity;
            transform: translateZ(0);
          }

          /* ===== multilayer soft clouds ===== */
          .cloud-1 {
            filter: blur(4px);
            opacity: 0.85;
            animation: cloudFloat 36s linear infinite;
          }
          .cloud-2 {
            filter: blur(6px);
            opacity: 0.66;
            animation: cloudFloat 48s linear infinite;
            animation-delay: 6s;
          }
          .cloud-3 {
            filter: blur(3px);
            opacity: 0.6;
            animation: cloudFloat 30s linear infinite;
            animation-delay: 2s;
          }

          @keyframes cloudFloat {
            0% { transform: translateX(-40%); }
            100% { transform: translateX(140%); }
          }

          /* ===== softened sun pulse ===== */
          .sun {
            animation: sunPulse 4s ease-in-out infinite;
            filter: blur(1.8px);
            box-shadow: 0 8px 40px rgba(245,158,11,0.12), inset 0 -6px 20px rgba(245,158,11,0.06);
          }

          @keyframes sunPulse {
            0%, 100% { transform: scale(1); opacity: 0.92; }
            50% { transform: scale(1.08); opacity: 1; }
          }

          /* ===== Bright, clean, soft glowing moon ===== */
          .moon {
            animation: moonGlow 4s ease-in-out infinite;
            filter: blur(1.2px);
            background: rgba(255, 255, 255, 0.28);
            box-shadow:
              0 0 20px rgba(255, 255, 255, 0.25),
              0 0 40px rgba(147, 197, 253, 0.35),
              0 0 60px rgba(147, 197, 253, 0.22);
          }

          @keyframes moonGlow {
            0% {
              box-shadow:
                0 0 20px rgba(255, 255, 255, 0.25),
                0 0 40px rgba(147, 197, 253, 0.35),
                0 0 60px rgba(147, 197, 253, 0.22);
              opacity: 0.9;
            }
            50% {
              box-shadow:
                0 0 28px rgba(255, 255, 255, 0.35),
                0 0 60px rgba(147, 197, 253, 0.45),
                0 0 90px rgba(147, 197, 253, 0.32);
              opacity: 1;
            }
            100% {
              box-shadow:
                0 0 20px rgba(255, 255, 255, 0.25),
                0 0 40px rgba(147, 197, 253, 0.35),
                0 0 60px rgba(147, 197, 253, 0.22);
              opacity: 0.9;
            }
          }


          /* ===== twinkling stars ===== */
          .star {
            animation: starTwinkle 3.5s ease-in-out infinite;
            filter: blur(0.4px);
          }

          @keyframes starTwinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.45; transform: scale(0.82); }
          }

          /* ===== smooth day → night theme-safe gradients (class-driven) ===== */
          .day-sky {
            background: linear-gradient(135deg, rgba(219,234,254,0.9), rgba(191,219,254,0.85), rgba(147,197,253,0.75));
            transition: background 800ms ease-in-out;
          }
          .afternoon-sky {
            background: linear-gradient(135deg, rgba(255,247,214,0.95), rgba(252,211,77,0.85), rgba(251,146,60,0.75));
            transition: background 800ms ease-in-out;
          }
          .night-sky {
            background: linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95), rgba(30,27,75,0.92));
            transition: background 800ms ease-in-out;
          }

          /* small accessibility nicety: focus ring for floating button */
          .floating-add:focus {
            outline: 2px solid rgba(59,130,246,0.25);
            outline-offset: 4px;
          }
        `}</style>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        <SummaryCard
          title="Total Spent"
          value={`₹${formatIndianCurrency(total)}`}
          gradient="from-blue-600 to-indigo-700"
        />
        <SummaryCard
          title="Today's Spend"
          value={`₹${formatIndianCurrency(todayTotal)}`}
          gradient="from-emerald-600 to-teal-700"
        />
        <SummaryCard
          title="Highest Expense"
          value={`₹${formatIndianCurrency(maxExpense > 0 ? maxExpense : 0)}`}
          gradient="from-rose-600 to-pink-700"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <PendingReviews />
      </div>

      {/* Insights Card */}
      {total > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quick Insights 💡
            </h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              📈 You've spent an average of{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                ₹{formatIndianCurrency(total / 7)}
              </span>{" "}
              per day this week.
            </p>
            {maxExpense > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                💸 Your largest single expense was{" "}
                <span className="font-semibold text-rose-500 dark:text-rose-400">
                  ₹{formatIndianCurrency(maxExpense)}
                </span>
                .
              </p>
            )}
          </div>
        </div>
      )}

      {/* Expense List Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <IndianRupee className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Recent Expenses
            </h3>
          </div>
        </div>
        <div className="p-6">
          <ExpenseList />
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/add-expense")}
        aria-label="Add new expense"
        className="floating-add fixed bottom-6 right-6 sm:bottom-8 sm:right-8 
                    p-4 rounded-full text-white 
                    bg-linear-to-r from-blue-600 to-indigo-700
                    shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                    hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)]
                    active:scale-95 hover:scale-110
                    transition-all duration-200
                    z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Home;
