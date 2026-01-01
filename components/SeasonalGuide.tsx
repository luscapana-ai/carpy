
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


const SeasonalGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Ultimate Seasonal Carp Fishing Guide</h1>
            <p className="mb-8 text-slate-400">Carp behaviour changes dramatically throughout the year. Adapting your tactics, location, and bait to the season is the single biggest key to consistent success. This guide provides a strategic blueprint for each season.</p>

            <GuideSection title="Spring: The Awakening">
                <p>As the water temperature slowly climbs, the carp begin to wake from their winter slumber. Their metabolism is still slow, so they're not feeding heavily, but they are catchable. Finesse, observation, and mobility are key.</p>
                <SubHeading>Carp Behaviour</SubHeading>
                <p>They are seeking warmth to kickstart their systems. They will be lethargic but will start to move and browse for easy meals.</p>
                <SubHeading>Prime Locations</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Shallows:</strong> Sun-facing, shallow bays and margins will warm up fastest. This is where the carp will be.</li>
                    <li><strong>Snags & Reeds:</strong> Look for snags in shallow water. The dark wood absorbs heat, making them carp magnets.</li>
                    <li><strong>'New' Weed Growth:</strong> The first shoots of new weed provide oxygen and shelter.</li>
                </ul>
                 <SubHeading>Top Baits</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Bright Singles:</strong> A single, high-attract, brightly coloured pop-up (pink, yellow, white) is the number one tactic. It grabs the attention of cruising fish.</li>
                    <li><strong>Maggots:</strong> Natural, full of movement, and easily digestible. A small PVA bag of maggots is deadly.</li>
                    <li><strong>Sweetcorn:</strong> The visual appeal and sweet taste of corn are irresistible to waking carp.</li>
                </ul>
                <SubHeading>Go-To Rigs</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Ronnie or Chod Rig:</strong> Perfect for presenting a single, bright pop-up with finesse.</li>
                    <li><strong>Solid PVA Bag:</strong> Delivers a small, irresistible mouthful of attraction right next to your hookbait.</li>
                </ul>
                <ExpertTip>Don't pile in the bait. A single hookbait or a tiny PVA bag is often all you need. Be mobile and willing to move swims to find the fish.</ExpertTip>
            </GuideSection>

            <GuideSection title="Summer: Peak Season">
                <p>The carp are at their most active and highest weights. Their metabolism is in overdrive, and they feed heavily. However, hot weather and angling pressure can make them tricky. Look for them at all levels of the water column.</p>
                <SubHeading>Carp Behaviour</SubHeading>
                <p>Very active, especially at dawn and dusk. During the hottest part of the day, they may become lethargic, seeking shade or cruising in the upper layers.</p>
                <SubHeading>Prime Locations</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Surface:</strong> On hot, calm days, carp will be basking on top.</li>
                    <li><strong>Weed Beds:</strong> Provide safety, shade, and a huge natural larder. The ultimate summer hotspot.</li>
                    <li><strong>Margins & Snags:</strong> Overhanging trees and snaggy areas provide shade and safety from the sun.</li>
                     <li><strong>The Windward Bank:</strong> A fresh summer wind will push cooler, oxygenated water, making this a comfortable feeding zone.</li>
                </ul>
                 <SubHeading>Top Baits</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Floating Baits:</strong> Dog biscuits ('mixers'), bread crust, and dedicated floaters are essential.</li>
                    <li><strong>Zig Foam:</strong> For targeting fish cruising mid-water. Black foam is a great starting point.</li>
                    <li><strong>Oily Baits:</strong> High-oil pellets and fishmeal boilies are highly effective in the warm water.</li>
                </ul>
                <SubHeading>Go-To Rigs</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Surface Controller Float Setup:</strong> For presenting floating baits at range.</li>
                    <li><strong>The Zig Rig:</strong> The only way to effectively target fish that are high up in the water.</li>
                    <li><strong>Solid PVA Bag:</strong> The best method for presenting a bait perfectly inside a weed bed.</li>
                </ul>
                <ExpertTip>Don't neglect the early mornings and late evenings. These are often the prime feeding windows during hot summer spells.</ExpertTip>
            </GuideSection>
            
            <GuideSection title="Autumn: The Big Feed">
                <p>As the water begins to cool, carp instinctively know that winter is coming. This triggers a period of intense feeding as they try to pack on weight. This is often the best time of year to catch the biggest fish in the lake.</p>
                <SubHeading>Carp Behaviour</SubHeading>
                <p>Confident and competitive feeding. They will often group up on productive feeding spots and eat large quantities of bait.</p>
                <SubHeading>Prime Locations</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Proven Feeding Spots:</strong> Areas of clean gravel or silt that have produced fish all year will be hotspots now.</li>
                    <li><strong>Dying Weed Beds:</strong> As the weed begins to die back, it exposes the natural food that has been living in it all year.</li>
                    <li><strong>The Windward Bank:</strong> An autumn wind will push the last of the year's natural food and warmer water, concentrating the fish.</li>
                </ul>
                 <SubHeading>Top Baits</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>High-Quality Boilies:</strong> Now is the time for good quality food baits. Fishmeals and high-protein boilies are best.</li>
                    <li><strong>Tigernuts & Particles:</strong> A bed of hemp and tigernuts can hold feeding fish for hours.</li>
                    <li><strong>Large Hookbaits:</strong> Don't be afraid to use bigger 18mm or 20mm hookbaits to single out the larger carp.</li>
                </ul>
                <SubHeading>Go-To Rigs</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Combi Rig:</strong> A strong, reliable rig perfect for presenting a large boilie or wafter.</li>
                    <li><strong>The Snowman Rig:</strong> A classic big-fish rig, combining a sinking boilie with a small pop-up for a balanced presentation.</li>
                    <li><strong>The D-Rig:</strong> A superb anti-eject rig for presenting wafters to confident, feeding fish.</li>
                </ul>
                <ExpertTip>Baiting campaigns can be hugely effective in autumn. Introducing a good quality bait to a spot for a few days before you fish can lead to spectacular results.</ExpertTip>
            </GuideSection>

            <GuideSection title="Winter: The Waiting Game">
                <p>Winter is the ultimate test of an angler's skill and patience. The carp are grouped up, their metabolism is at its lowest, and they feed infrequently. Bites are precious, so everything must be perfect.</p>
                <SubHeading>Carp Behaviour</SubHeading>
                <p>Lethargic and shoaled up tight. They will move very little and feed for only short windows, often just before a weather front arrives.</p>
                <SubHeading>Prime Locations</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Deeper Water:</strong> The 'winter holes'. Deeper areas of the lake are more temperature-stable and where carp often group up.</li>
                    <li><strong>Snags:</strong> Provide cover and are often slightly warmer than the surrounding water.</li>
                    <li><strong>South-Facing Banks:</strong> Any bank that gets direct winter sun, no matter how weak, can be a holding area.</li>
                </ul>
                 <SubHeading>Top Baits</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Maggots:</strong> The undisputed king of winter baits. Their movement is a huge trigger for lethargic carp.</li>
                    <li><strong>Bright Pop-Ups:</strong> A single, bright pop-up in a carp's face can provoke a bite out of pure curiosity.</li>
                    <li><strong>Sweetcorn:</strong> Highly visual, digestible, and a proven winter winner.</li>
                </ul>
                <SubHeading>Go-To Rigs</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Ronnie Rig:</strong> Perfect for presenting a single, low-lying pop-up with maximum efficiency.</li>
                    <li><strong>Maggot Clip Rig:</strong> The best way to present a ball of writhing maggots on a hair rig.</li>
                    <li><strong>Solid PVA Bag:</strong> A tiny bag of micropellets and maggot-friendly crumb creates a small, irresistible parcel of food.</li>
                </ul>
                <ExpertTip>Location is 99% of winter fishing. If you're not getting bites, move. A few feet can be the difference between a blank and a bite. Finding the shoaled-up fish is the entire game.</ExpertTip>
            </GuideSection>
        </div>
    );
};

export default SeasonalGuide;