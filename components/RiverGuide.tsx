
import React from 'react';
import { WavesIcon, NavigationArrowIcon, GaugeIcon, WindIcon } from './icons';

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

const RiverGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Master River Carp Guide</h1>
            <p className="mb-8 text-slate-400">River carp fishing is one of the ultimate challenges in angling. It requires a deep understanding of water levels, flow dynamics, and ever-changing conditions. Unlike stillwaters, rivers are living, breathing ecosystems that can change in an instant.</p>

            <GuideSection title="Understanding River Levels (Depths)">
                <p>The depth of a river is never static. It is heavily influenced by rainfall, often many miles upstream. Mastering river levels is the foundation of river watercraft.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Steady/Normal Levels:</strong> The most predictable time to fish. Carp will be in their standard patrol routes, often along marginal shelves or near structures.</li>
                    <li><strong>Rising Water (The Trigger):</strong> As the river begins to rise, it pushes natural food off the banks and oxygen levels increase. This is a massive trigger for carp to feed. However, if it rises too fast, debris can make fishing impossible.</li>
                    <li><strong>The "Peak" & Falling:</strong> Once the river peaks and begins to fall, the fishing can be electric. Carp will often move into the margins or slack-water areas to find relief from the heavy flow while picking off the abundance of food washed in.</li>
                    <li><strong>Low/Stagnant Water:</strong> In hot, dry spells, river levels can drop, reducing oxygen. Look for deeper pools, weir pools, or areas with moving water where oxygen levels are higher.</li>
                </ul>
                <ExpertTip>Use online river level gauges (like the Environment Agency in the UK) to track your local river. A rise of just 6 inches can completely change the fish's location.</ExpertTip>
            </GuideSection>

            {/* FIX: Use single quotes for the title attribute to correctly handle nested double quotes */}
            <GuideSection title='Flow & Currents: Reading the "Push"'>
                <p>Carp in rivers are athletes. They spend their lives fighting current, which means they are generally stronger and leaner than stillwater carp. Understanding how they use the flow to save energy is key.</p>
                <SubHeading>Flow Dynamics</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Main Stream:</strong> The fastest, deepest part of the river. While carp can be found here, they rarely spend long periods in heavy flow.</li>
                    <li><strong>The "Crease":</strong> The visible line where fast water meets slow water. This is a prime patrol route. Carp sit in the slow water, letting the fast water deliver food directly to them.</li>
                    <li><strong>Eddies & Slacks:</strong> Areas where the water circles back or stops. These are essential resting and feeding zones, especially when the river is high.</li>
                    <li><strong>Undercut Banks:</strong> The flow often carves out deep cavities under the banks. These are prime holding spots for big, wary carp.</li>
                </ul>
            </GuideSection>

            {/* FIX: Use single quotes for the title attribute and corrected the double-quote typo at the end of "Color" */}
            <GuideSection title='Water Clarity (The "Color")'>
                <p>The clarity of the water dictates how you approach your rigs and baiting.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Clear Water:</strong> Requires stealth and fine presentation. Fluorocarbon hooklinks and subtle, natural baits (hemp, snails) are best.</li>
                    <li><strong>"Tap Water" Clarity:</strong> A slight tint. Perfect conditions for most tactics.</li>
                    <li><strong>Colored/Chocolate Water:</strong> After heavy rain, the river may turn brown. Carp rely on their sense of smell. Switch to highly flavored, pungent baits like fishmeals, glugged boilies, or large bunches of lobworms.</li>
                </ul>
                <ExpertTip>In colored water, use "visual" additions like large pieces of white bread or bright artificial corn to help the fish locate the bait in the gloom.</ExpertTip>
            </GuideSection>

            <GuideSection title="Finding the Shelf: The Hidden Depth">
                <p>The most important feature in any river is the "shelf"—the point where the shallow margin drops off into the deeper channel.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The Near Shelf:</strong> Often just a few feet from the bank. An incredibly productive spot at night.</li>
                    <li><strong>The Far Shelf:</strong> If you can reach it, the shelf against the far bank is often a safe zone for fish pressured by bankside activity.</li>
                    <li><strong>Plumbing the River:</strong> Use a heavy lead (4oz+) on a braided line to find the shelf. You'll feel the lead tumble down the slope until it settles on the flatter, deeper bottom.</li>
                </ul>
            </GuideSection>

            <GuideSection title="River Rigs: Stability in the Stream">
                <p>Standard stillwater rigs often fail in rivers due to the current. You need stability.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Heavy Leads:</strong> Use 4oz to 6oz "Gripper" leads to hold your rig in the flow. If your lead is bouncing, you won't catch.</li>
                    <li><strong>Short, Robust Hooklinks:</strong> Keep hooklinks short (4-6 inches) and use strong materials like 25lb coated braid to prevent tangles in the current.</li>
                    <li><strong>The Backlead:</strong> Essential for pinning your line to the riverbed. This prevents the flow from catching your line and creating a "bow," which can pull your lead off the spot.</li>
                </ul>
            </GuideSection>

            {/* FIX: Use single quotes for the title attribute to handle nested double quotes */}
            <GuideSection title='River Baiting: The "Drip-Feed" Tactic'>
                <p>Baiting a river is different. The flow will carry your bait downstream. You must compensate for this.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Baiting Upstream:</strong> Throw your free offerings slightly upstream of your rig. The flow will then wash the bait down onto your hookbait.</li>
                    <li><strong>Heavy Particles:</strong> Use heavy baits like boilies and large pellets that stay on the bottom. Light baits like maggots or hemp will be washed away too quickly in a fast flow.</li>
                    <li><strong>The "Groundbait Bomb":</strong> Use stiff groundbait balls to hold small particles on the spot longer.</li>
                </ul>
            </GuideSection>
        </div>
    );
};

export default RiverGuide;
