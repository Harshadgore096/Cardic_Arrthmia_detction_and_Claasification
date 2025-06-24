"use client"

import type React from "react"
import Link from 'next/link'
import { useState } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card, CardContent } from "./components/ui/card"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        window.location.href = "/dashboard"
      } else {
        alert("Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-700 border-slate-600">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Cardiac Rhythm Analysis</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 h-12"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <Link href='/dashboard'>
            <Button>Submit</Button></Link>
            <div className="text-center">
              <a href="#" className="text-slate-400 hover:text-slate-300 text-sm underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
