"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingDown, TrendingUp, AlertTriangle, Skull, Heart } from "lucide-react"
import { motion } from "framer-motion"

const mockWalletData = {
  address: "0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C",
  balance: "0.0042 ETH",
  totalValue: "$12.34",
  tokens: [
    { name: "PEPE", amount: "1,000,000", value: "$8.50", change: "-69%" },
    { name: "DOGE", amount: "420", value: "$2.10", change: "+0.01%" },
    { name: "SHIB", amount: "50,000,000", value: "$1.74", change: "-42%" },
  ],
  healthScore: 2.5,
  diagnosis: "Terminal Bag Holder Syndrome",
  therapy: "Have you considered a career at McDonald's?",
}

export default function WalletPage() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    setLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      setConnected(true)
      setLoading(false)
    }, 2000)
  }

  const getHealthIcon = (score: number) => {
    if (score < 3) return <Skull className="h-6 w-6 text-red-500" />
    if (score < 6) return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    return <Heart className="h-6 w-6 text-green-500" />
  }

  const getHealthColor = (score: number) => {
    if (score < 3) return "text-red-500"
    if (score < 6) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="pt-24 pb-12">
        <div className="container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Time to Face Reality, Anon</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet and prepare to get absolutely demolished by facts and logic
            </p>
          </motion.div>

          {!connected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <Card className="glassmorphism border-primary/20">
                <CardContent className="p-8 text-center">
                  <Wallet className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Ready to Get Rekt?</h2>
                  <p className="text-muted-foreground mb-6">
                    Time to see how much you could've made buying SPY instead
                  </p>
                  <Button onClick={connectWallet} disabled={loading} size="lg" className="w-full hover-glow">
                    {loading ? "Connecting..." : "Show Me My L's"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Wallet Overview */}
              <Card className="glassmorphism border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-mono text-sm">{mockWalletData.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-bold">{mockWalletData.balance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-bold text-2xl">{mockWalletData.totalValue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Score */}
              <Card className="glassmorphism border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getHealthIcon(mockWalletData.healthScore)}
                    Wallet Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className={`text-6xl font-bold ${getHealthColor(mockWalletData.healthScore)}`}>
                      {mockWalletData.healthScore}/10
                    </div>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      {mockWalletData.diagnosis}
                    </Badge>
                    <p className="text-muted-foreground italic">"{mockWalletData.therapy}"</p>
                  </div>
                </CardContent>
              </Card>

              {/* Token Holdings */}
              <Card className="glassmorphism border-primary/20">
                <CardHeader>
                  <CardTitle>Your "Investments" 💀</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWalletData.tokens.map((token, index) => (
                      <motion.div
                        key={token.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-bold">{token.name}</h3>
                          <p className="text-sm text-muted-foreground">{token.amount} tokens</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{token.value}</p>
                          <div className="flex items-center gap-1">
                            {token.change.startsWith("-") ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            )}
                            <span className={token.change.startsWith("-") ? "text-red-500" : "text-green-500"}>
                              {token.change}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Therapy Recommendations */}
              <Card className="glassmorphism border-primary/20">
                <CardHeader>
                  <CardTitle>Therapy Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-bold text-red-400 mb-2">
                        🚨 Rope Incoming - Stop buying every coin that pumps 2%. Your wife's boyfriend is disappointed.
                      </h4>
                      <p className="text-sm"> </p>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <h4 className="font-bold text-yellow-400 mb-2">
                        ⚠️ Ngmi Detected - Maybe try buying high and selling low less often?
                      </h4>
                      <p className="text-sm"></p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="font-bold text-blue-400 mb-2">
                        💡 Actual Financial Advice - Delete your trading apps and touch grass. Seriously.
                      </h4>
                      <p className="text-sm"></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
