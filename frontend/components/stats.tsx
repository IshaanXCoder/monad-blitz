"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Code, Users } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: "420,690",
    label: "Portfolios Rekt",
    description: "And still buying the dip",
  },
  {
    icon: Users,
    value: "69%",
    label: "Still Down Bad",
    description: "But diamond handing",
  },
  {
    icon: Code,
    value: "$69M",
    label: "Bags Fumbled",
    description: "Could've bought a house",
  },
]

export function Stats() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-glow border-primary/20">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-primary mb-4" />
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <div className="text-lg font-medium">{stat.label}</div>
                    <div className="text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
