"use client"

import { useEffect, useRef } from "react"

interface ECGChartProps {
  data: number[]
}

export default function ECGChart({ data }: ECGChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw ECG waveform
    ctx.strokeStyle = "#60a5fa"
    ctx.lineWidth = 2
    ctx.beginPath()

    const scaleX = canvas.width / data.length
    const scaleY = canvas.height / 4
    const offsetY = canvas.height / 2

    data.forEach((point, index) => {
      const x = index * scaleX
      const y = offsetY - point * scaleY

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw time labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px sans-serif"
    const timeLabels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00"]
    timeLabels.forEach((label, index) => {
      const x = (index * canvas.width) / (timeLabels.length - 1)
      ctx.fillText(label, x - 15, canvas.height - 10)
    })
  }, [data])

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="w-full h-48 bg-slate-800 rounded-lg" />
    </div>
  )
}
