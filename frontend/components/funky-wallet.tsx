import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Skull, AlertTriangle, Heart, TrendingDown, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Props: expects an array of transaction objects
export function FunkyWallet({ transactions }: { transactions: any[] }) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/analyze-transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        // If backend returns an array, use first element
        setData(Array.isArray(json) ? json[0] : json);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch wallet roast. " + err.message);
        setLoading(false);
      });
  }, [transactions]);

  function getHealthIcon(score: number) {
    if (score < 3) return <Skull className="h-6 w-6 text-red-500" />;
    if (score < 6) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    return <Heart className="h-6 w-6 text-green-500" />;
  }

  function getHealthColor(score: number) {
    if (score < 3) return "text-red-500";
    if (score < 6) return "text-yellow-500";
    return "text-green-500";
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="pt-24 pb-8">
        <div className="container max-w-4xl mx-auto text-center text-muted-foreground">
          <div className="text-2xl font-bold mb-2">No transactions to analyze yet.</div>
          <div className="text-sm">Connect your wallet and make some moves to get roasted!</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-24 pb-8">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold animate-pulse mb-2">Analyzing your wallet...</div>
          <div className="text-sm text-muted-foreground">Summoning the meme gods...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-8">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold text-red-500 mb-2">{error}</div>
          <div className="text-sm text-muted-foreground">Try again or check your connection.</div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Defensive fallback for missing fields
  const {
    wallet_address = "-",
    funky_title = "No roast found.",
    personality_sentences = [],
    wallet_health_score = 0,
    failed_investments = [],
    genuine_recommendations = [],
    description = "",
    tx_hash = "",
    score = 0,
    percentile = ""
  } = data;

  return (
    <div className="pt-24 pb-8">
      <div className="container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Roast Card */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                <Zap className="h-8 w-8 text-primary" />
                {funky_title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Wallet:</span>
                <code className="bg-background/50 px-2 py-1 rounded border font-mono">
                  {wallet_address}
                </code>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personality Section */}
              {personality_sentences.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <span>🧠</span> Your Personality
                  </h3>
                  <div className="grid gap-2">
                    {personality_sentences.map((sentence: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-background/30 rounded-lg border border-primary/10"
                      >
                        <p className="text-sm">😏 {sentence}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Score Section */}
              <div className="flex items-center justify-between p-4 bg-background/30 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3">
                  {getHealthIcon(wallet_health_score)}
                  <span className="text-lg font-bold">Wallet Health Score</span>
                </div>
                <div className={`text-3xl font-bold ${getHealthColor(wallet_health_score)}`}>
                  {wallet_health_score}/10
                </div>
              </div>

              {/* Two Column Layout for Failures and Recommendations */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Failed Investments */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Hall of Shame
                  </h3>
                  <div className="space-y-2">
                    {failed_investments.map((investment: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <p className="text-sm text-red-300">💀 {investment}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Genuine Recommendations */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Actual Advice
                  </h3>
                  <div className="space-y-2">
                    {genuine_recommendations.map((recommendation: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                      >
                        <p className="text-sm text-green-300">✨ {recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Tragedy */}
              {description && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <h4 className="font-bold text-yellow-400">Latest Masterpiece</h4>
                  </div>
                  <p className="text-sm text-yellow-300">{description}</p>
                  {tx_hash && (
                    <code className="text-xs text-yellow-400/70 mt-1 block">
                      TX: {tx_hash}
                    </code>
                  )}
                </div>
              )}

              {/* Funky Score */}
              <div className="text-center p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl">🏆</span>
                  <h3 className="text-xl font-bold text-purple-400">Degen Score</h3>
                </div>
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  {score}/100
                </div>
                {percentile && (
                  <Badge variant="outline" className="text-purple-300 border-purple-400">
                    {percentile}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}