"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageCircle, Wallet, TrendingDown } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Wallet Connection",
    description: "Connect your wallet so we can laugh at your life choices together",
  },
  {
    icon: Brain,
    title: "AI Therapist",
    description: "Our AI has seen every rugpull and will judge you accordingly",
  },
  {
    icon: TrendingDown,
    title: "Portfolio Analysis",
    description: "We'll calculate exactly how much you could've made with index funds",
  },
  {
    icon: MessageCircle,
    title: "Meme Therapy",
    description: "Cope through premium wojaks and pepe reactions to your losses",
  },
]

export function Features() {
  return (
    <section className="py-20 relative">
      <div className="gradient-bg absolute inset-0" />
      <div className="container relative mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Absolutely Rekt, Anon</h2>
          <p className="text-xl text-muted-foreground">
            We'll roast your bags harder than a McDonald's ice cream machine
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-glow h-full border-primary/20">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
