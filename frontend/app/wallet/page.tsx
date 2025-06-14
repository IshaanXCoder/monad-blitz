"use client"

import { useEffect, useState } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { FunkyWallet } from "@/components/funky-wallet"
import { motion } from "framer-motion"

export default function WalletPage() {
  const [transactions, setTransactions] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const sendTransactions = async () => {
    setLoading(true);
    setError(null);
    setTransactions(null);

    try {
      // Load transactions.json from public folder
      const response = await fetch("/transactions.json");
      if (!response.ok) throw new Error("Failed to load transactions.json");
      const transactionsData = await response.json();
      console.log("Transactions data loaded:", transactionsData);

      // Send transaction data to backend
      const apiRes = await fetch("http://localhost:5000/analyze-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionsData),
      });

      if (!apiRes.ok) throw new Error("API error");

      const json = await apiRes.json();
      if (json && json.error) throw new Error(json.error);

      setTransactions(Array.isArray(json) ? json : [json]);
    } catch (e: any) {
      setError(e.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  sendTransactions();
}, []);

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="pt-24 pb-12">
        <div className="container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Time to Face Reality, Anon</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here's your meme/funky wallet roast, straight from the LangChain bot.
            </p>
          </motion.div>
          {loading && <div className="text-center text-lg">Loading...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {transactions && <FunkyWallet transactions={transactions} />}
        </div>
      </div>
      <Footer />
    </main>
  )
}
