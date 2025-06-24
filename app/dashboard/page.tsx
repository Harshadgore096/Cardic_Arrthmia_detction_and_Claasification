"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Upload } from "lucide-react"
import Navigation from "../_components/Navigation"

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      handleUpload(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      handleUpload(e.target.files[0])
    }
  }

  const handleUpload = async (selectedFile: File) => {
    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("ecgFile", selectedFile)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/ecg/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadProgress(100)
        setTimeout(() => {
          window.location.href = "/analysis"
        }, 1000)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Upload ECG Data</h1>
          <p className="text-slate-400">
            Drag and drop your ECG file here or browse to select a file manually. Supported formats: .ecg, .txt, .csv
          </p>
        </div>

        <Card className="bg-slate-700 border-slate-600 mb-8">
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-500 hover:border-slate-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Drag and drop your ECG file here</h3>
              <p className="text-slate-400 mb-6">Or</p>

              <div className="relative">
                <input
                  type="file"
                  accept=".ecg,.txt,.csv"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button className="bg-slate-600 hover:bg-slate-500 text-white">Browse Files</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {uploading && (
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Uploading...</h3>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-slate-400 mt-2">{uploadProgress}% complete</p>
              </div>

              <p className="text-sm text-slate-400">
                By uploading, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  terms and conditions
                </a>
                .
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
