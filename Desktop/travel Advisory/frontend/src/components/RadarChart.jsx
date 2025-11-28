import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SafetyRadarChart = ({ data }) => {
    // Transform data for Recharts
    const chartData = [
        { subject: 'Healthcare', A: data.HealthcareScore, fullMark: 100 },
        { subject: 'Transport', A: data.TransportSafety, fullMark: 100 },
        { subject: 'LGBTQ+', A: data.LGBTQSafety, fullMark: 100 },
        { subject: 'Women', A: data.WomensSafety, fullMark: 100 },
        { subject: 'Crime', A: data.CrimeSafety, fullMark: 100 },
        { subject: 'Politics', A: data.PoliticalStability, fullMark: 100 },
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                        name="Safety Score"
                        dataKey="A"
                        stroke="#2563EB"
                        strokeWidth={2}
                        fill="#3B82F6"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SafetyRadarChart;
