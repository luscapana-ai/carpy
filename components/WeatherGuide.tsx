
import React from 'react';

const GuideSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3 border-b-2 border-slate-700 pb-2">{title}</h2>
        <div className="space-y-4 text-slate-300">
            {children}
        </div>
    </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-white mt-4">{children}</h3>
);

const ExpertTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mt-4 bg-cyan-900/40 border-l-4 border-cyan-500 text-cyan-200 p-3 rounded-r-lg">
        <p><span className="font-bold">Expert's Edge:</span> {children}</p>
    </div>
);


const WeatherGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Ultimate Weather Guide for Carp Anglers</h1>
            <p className="mb-8 text-slate-400">Understanding the weather is arguably the most crucial skill in carp fishing. It dictates where the fish will be, how they will feed, and which tactics will be most effective. This guide will help you interpret the conditions and use them to your advantage.</p>

            <GuideSection title="Air Pressure: The Invisible Influence">
                <p>Air pressure has a profound effect on a carp's feeding behaviour. Their swim bladder is sensitive to these changes, which affects their comfort and confidence.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Low Pressure (Below 1005mb):</strong> This is the angler's friend. Low pressure, often associated with overcast skies, wind, and rain, generally makes carp feel more comfortable and confident to feed, especially on the bottom. A dropping barometer is a sign to get the rods out!</li>
                    <li><strong>High Pressure (Above 1020mb):</strong> Often brings bright sun, clear skies, and calm conditions. This can make carp feel 'pressured' and less willing to feed heavily on the lakebed. During these times, they are often found in the upper layers, making it prime time for Zig Rigs or surface fishing.</li>
                    <li><strong>Stable Pressure:</strong> Consistency is key. Several days of stable pressure (either high or low) will see the fish acclimatise and feed confidently. A sudden change, especially a rapid rise in pressure, can switch the fish off completely.</li>
                </ul>
                <ExpertTip>Your smartphone's weather app has a barometer. Keep a close eye on it before and during your session. A steady drop in pressure is often the trigger for a major feeding spell.</ExpertTip>
            </GuideSection>

            <GuideSection title="Wind: Your Greatest Ally">
                <p>The wind is the most important fish-finding tool you have. It creates currents, moves food, and pushes the warmer, oxygenated surface water around the lake.</p>
                <SubHeading>The Golden Rule: Carp Follow the Wind</SubHeading>
                <p>A fresh, new wind will push natural food and the warmer surface water to the 'windward' bank (the bank the wind is blowing into). The carp will almost always follow this. Fishing on the end of a new, warm wind is one of the most reliable tactics in carp fishing.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Warm Winds (South-Westerly):</strong> The classic carp wind. These winds are warm, low-pressure, and full of oxygen. Carp love them.</li>
                    <li><strong>Cold Winds (North-Easterly):</strong> A cold wind can have the opposite effect, especially in spring. Carp may actively move away from it, seeking out sheltered, sun-warmed bays that are on the 'back of the wind'.</li>
                </ul>
                <ExpertTip>On large lakes, a strong wind can create an 'undertow' current. While the surface water moves one way, the water at the bottom moves the other. This can mean the leeward (sheltered) bank can sometimes hold fish too.</ExpertTip>
            </GuideSection>

            <GuideSection title="Sunlight & Cloud Cover">
                <p>The amount of light penetrating the water affects where carp feel safe and comfortable.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Bright Sunshine:</strong> Can be tough for bottom-bait fishing. Carp often move to deeper water or seek the safety of snags, overhanging trees, and lily pads. It is, however, the best time to try surface fishing or get up high and try to spot them in the clear water.</li>
                    <li><strong>Cloud Cover:</strong> Overcast conditions make carp feel less exposed and more confident to move around and feed in shallower water. A grey, overcast day is a classic 'carpy' day.</li>
                </ul>
            </GuideSection>

            <GuideSection title="Rain & Its Effects">
                <p>Rain can be a game-changer, for better or worse.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Warm, Light Rain:</strong> Excellent. It oxygenates the water, washes natural food items into the margins, and often coincides with a drop in air pressure. This combination can trigger an intense feeding spell.</li>
                    <li><strong>Heavy, Cold Rain:</strong> Can have a negative effect. It can rapidly cool the water temperature, especially in the shallows, and shut the fishing down.</li>
                </ul>
                <ExpertTip>The period just before a big storm or thunderstorm can be electric. The dramatic drop in pressure can trigger a last-minute feeding frenzy. Be prepared, but always prioritise your safety in a lightning storm.</ExpertTip>
            </GuideSection>

            <GuideSection title="Temperature: Air vs. Water">
                <p>It's the water temperature, not the air temperature, that dictates the carp's metabolism and behaviour. Water heats and cools much slower than air.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Spring:</strong> After a long winter, carp are desperate for warmth. A few hours of spring sunshine can warm up a shallow bay or margin significantly faster than the main body of the lake. This is where the carp will be.</li>
                    <li><strong>Summer:</strong> During heatwaves, the surface water can become too warm and low on oxygen. Carp may seek deeper, cooler water where they are more comfortable.</li>
                    <li><strong>Autumn & Winter:</strong> As the air temperature plummets, the deeper water remains more temperature-stable for longer. These deep 'winter holes' are where the carp will often group up for the cold months.</li>
                </ul>
            </GuideSection>
        </div>
    );
};

export default WeatherGuide;