"use client"
import { useState, useEffect } from "react"

interface ProgressBarProps {
    percentage: number
    label: string
    animated?: boolean
}

const ProgressBar = ({ percentage, label, animated = true }: ProgressBarProps) => {
    const [currentPercentage, setCurrentPercentage] = useState(0)

    useEffect(() => {
        if (animated) {
            const timer = setTimeout(() => {
                setCurrentPercentage(percentage)
            }, 500)
            return () => clearTimeout(timer)
        } else {
            setCurrentPercentage(percentage)
        }
    }, [percentage, animated])
    return (
        <div className="w-full mb-6">
            <div className="relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                {/* Progress bar fill */}
                <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${currentPercentage}%` }}
                >
                    {/* Label inside the bar */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="text-white font-semibold text-sm">{label}</span>
                        <span className="text-white font-bold text-sm">{percentage}%</span>
                    </div>
                </div>

                {/* Fallback text when progress is very low */}
                {currentPercentage < 30 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="text-gray-600 font-semibold text-sm">{label}</span>
                        <span className="text-gray-600 font-bold text-sm">{percentage}%</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function CourseCards() {
    return (
        <div className="bg-gray-50 py-12 px-4 sm:py-16  lg:py-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 lg:gap-12">

                    <div className="bg-white rounded-lg p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-4 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Best IELTS Online Classes
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">Score Expectation</h3>
                            <ProgressBar percentage={94} label="8+ Bands" />
                        </div>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                            Our Online IELTS Classes students see an improvement from a baseline score of 5.5 to an improved score of
                            7.5 in just 30 days. By the end of 60 days (IELTS Diamond Course) 94% students are able to achieve a score
                            of 8.5 with less than 8.0 in any section.
                        </p>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg  font-semibold px-6 py-3 rounded-md transition-colors duration-200">
                            Book IELTS Demo
                        </button>
                    </div>


                    <div className="bg-white rounded-lg p-6 sm:p-8 transition-transform duration-300 hover:translate-y-4 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Best English Online Classes
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">Improvement in 90 Days</h3>
                            <ProgressBar percentage={96} label="A2-C1 Level" />
                        </div>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                            Our students see a marked improvement in their English Communication Skills in the duration of 3 month.
                            Statistically during 1st month we see 54% improvement from the baseline and by the end of 3 months we
                            observe a massive 96% improvement through our online English Course.
                        </p>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200">
                            Book EnglishDemo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
