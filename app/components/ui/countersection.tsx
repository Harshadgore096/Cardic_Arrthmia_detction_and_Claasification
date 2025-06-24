'use client'
import { useState, useEffect, useRef } from 'react';

const CounterSection = () => {
    const [StudentsTrained, setStudentsTrained] = useState(0);
    const [HoursTrained, setHoursTrained] = useState(0);
    const [TeamMembers, setTeamMembers] = useState(0);
    const [CountriesServed, setCountriesServed] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.length > 0 && entries[0]?.isIntersecting) {
                    // Start counting when section comes into view
                    animateNumber(150000, setStudentsTrained, 1000);
                    animateNumber(826000, setHoursTrained, 1000);
                    animateNumber(800, setTeamMembers, 1000);
                    animateNumber(112, setCountriesServed, 1000);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const animateNumber = (target: number, setter: (value: number) => void, duration: number) => {
        const start = 0;
        const increment = target / (duration / 16); // 60fps

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            setter(Math.floor(current));
        }, 16);
    };

    return (
        <>
            <div ref={sectionRef} className="container mx-auto py-12 px-12 bg-white max-w-6xl">
                <h2 className="text-3xl font-normal mb-8 text-start">Global reach, Local impact</h2>
                <p className="container text-gray-600 mb-8">We teach thousands of students across the globe while affecting their lives in positive ways to add value to their learning. Through our Online IELTS Courses and Test Series for TOEFL/PTE/CELPIP/OET, we enable thousands of people every year to pursue their dreams of International Education or migration.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">
                            {StudentsTrained}+
                        </div>
                        <p className="mt-2 text-gray-600">Students Trained</p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">
                            {HoursTrained}+
                        </div>
                        <p className="mt-2 text-gray-600">Hours Trained</p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">
                            {TeamMembers}+
                        </div>
                        <p className="mt-2 text-gray-600">Team Members</p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">
                            {CountriesServed}+
                        </div>
                        <p className="mt-2 text-gray-600">Countries Served</p>
                    </div>
                </div>
            </div>
            <div className="bottom-0 left-0 right-0 h-96 bg-white">
                <div
                    className="w-full h-[100px] bg-repeat bg-center"
                    style={{
                        backgroundImage: "url('/home/grid.jpg')",
                        backgroundSize: "5px 40px",
                        filter: "grayscale(100%) brightness(110%)",
                    }}
                ></div>
            </div>
        </>

    );
};

export default CounterSection;