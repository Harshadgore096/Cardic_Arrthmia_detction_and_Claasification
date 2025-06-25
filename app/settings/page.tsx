"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { Monitor, User, Heart, Bell, SettingsIcon } from "lucide-react"
import Navigation from "../_components/Navigation"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal")
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  })

  const handleUpdateInfo = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
      })

      if (response.ok) {
        alert("Information updated successfully")
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("Update failed")
    }
  }

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Monitor },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "ecg-history", label: "ECG History", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "display", label: "Display", icon: SettingsIcon },
  ]

  return (
    <div className="min-h-screen bg-slate-800">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-slate-600 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "personal" && (
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Personal Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <Input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <Input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={personalInfo.phoneNumber}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                      <Input
                        type="date"
                        value={personalInfo.dateOfBirth}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                      <Input
                        type="text"
                        value={personalInfo.gender}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                      <Input
                        type="text"
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        className="bg-slate-600 border-slate-500 text-white h-12"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={handleUpdateInfo} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                        Update Information
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
