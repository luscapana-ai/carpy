import React from 'react';

const BaitSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3 border-b-2 border-slate-700 pb-2">{title}</h2>
        <div className="space-y-4 text-slate-300">
            {children}
        </div>
    </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-white">{children}</h3>
);

const BaitGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Ultimate Carp Bait Guide</h1>
            <p className="mb-8 text-slate-400">Choosing the right bait is one of the most critical aspects of successful carp fishing. This guide covers the main types of baits and, crucially, how to use them effectively to get more bites.</p>

            <BaitSection title="Boilies">
                <p>Boilies are the most popular carp bait. They are boiled paste balls made from a combination of milk proteins, fishmeals, bird foods, and flavorings. Their hard texture makes them resistant to nuisance fish.</p>
                <SubHeading>Types of Boilies:</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Freezer Baits:</strong> Made with fresh ingredients like eggs, these are highly attractive but must be kept frozen to prevent spoiling. Generally considered the highest quality option.</li>
                    <li><strong>Shelf-Life Baits:</strong> Contain preservatives, allowing them to be stored at room temperature. They are convenient but can be slightly less effective than freezer baits.</li>
                    <li><strong>Bottom Baits:</strong> Standard sinking boilies that sit on the lakebed.</li>
                    <li><strong>Pop-ups:</strong> Buoyant boilies, often brightly colored, used to lift the hook off debris or for specific presentations like the Chod or Ronnie Rig.</li>
                    <li><strong>Wafters:</strong> Critically balanced to sink only under the weight of the hook, creating a more natural and easily inhaled presentation.</li>
                </ul>
                <SubHeading>How to Use Boilies:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>As Loose Feed:</strong> Scatter them around your spot using a catapult or a throwing stick ('cobra') to create a feeding area.</li>
                    <li><strong>On a Stringer:</strong> Thread 3-4 boilies onto PVA string and attach it to your hook. This leaves a small, attractive pile of freebies right next to your hookbait.</li>
                    <li><strong>Crushed or Halved:</strong> Breaking boilies releases their flavour much faster and prevents them from rolling on slopes. Add crushed boilies to spod mixes and PVA bags.</li>
                </ul>
            </BaitSection>

            <BaitSection title="Particles">
                <p>Particles are small seeds, nuts, and pulses that are brilliant for creating a carpet of feed to hold carp in an area for long periods. They are generally cheaper than boilies for heavy baiting.</p>
                <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">
                    <p className="font-bold">⚠️ IMPORTANT: All dry particles (except sweetcorn) MUST be soaked for 24 hours and then boiled for at least 30 minutes. Unprepared particles can swell inside a fish and cause fatal harm.</p>
                </div>
                 <SubHeading>Popular Particles:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Sweetcorn:</strong> A classic. Its bright color and sweet taste are irresistible to carp. Can be used straight from the tin.</li>
                    <li><strong>Hemp Seed:</strong> Small, oily black seeds that carp find addictive. The absolute best particle for creating a competitive feeding response.</li>
                    <li><strong>Tigernuts:</strong> A sweet, crunchy nut that big carp love. They must be prepared correctly, but their crunch factor can single out larger fish.</li>
                </ul>
                <SubHeading>How to Use Particles:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>In a Spod Mix:</strong> This is their primary use. A mix of hemp, corn, and other small seeds creates a visually attractive, high-scent area that keeps fish grazing for hours.</li>
                    <li><strong>As a Hookbait:</strong> A few grains of sweetcorn or a single tigernut on a hair rig can be an incredibly effective hookbait, especially over a bed of matching particles.</li>
                </ul>
            </BaitSection>
            
            <BaitSection title="Pellets">
                <p>Pellets are compressed food items that break down in water at different rates, releasing attraction over time. They are perfect for use in PVA bags, spod mixes, or as a standalone feed.</p>
                <SubHeading>Types of Pellets:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Carp Pellets:</strong> Low-oil pellets designed for carp, break down relatively quickly to create instant attraction.</li>
                    <li><strong>Trout/Halibut Pellets:</strong> High-oil pellets that break down slowly, releasing a strong scent trail. Best used in warmer water as the oil congeals in the cold.</li>
                </ul>
                <SubHeading>How to Use Pellets:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Solid PVA Bags:</strong> The ultimate short-range tactic. A small bag filled with pellets ensures a perfect pile of food right next to your hookbait every time.</li>
                    <li><strong>Stick Mixes:</strong> Mix crushed pellets with a liquid attractant to create a damp mix. Compress this around your hooklink using a plunger to create a "stick" of bait that dissolves in water.</li>
                    <li><strong>In Spod Mixes:</strong> Add various sizes of pellets to a spod mix to create different breakdown rates, keeping attraction in your swim for longer.</li>
                </ul>
            </BaitSection>

             <BaitSection title="Bait Application Strategies">
                <p>How you deliver your bait to the spot is just as important as the bait itself. Here are the key methods:</p>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Spodding/Spombing:</strong> Using a rocket-shaped device on a dedicated heavy-action rod to accurately deliver large quantities of bait (particles, pellets, boilies) at range.</li>
                    <li><strong>PVA (Polyvinyl Alcohol):</strong> A water-soluble material used to deliver bait right next to your hook. Comes in solid bags, mesh tubing (for creating 'sticks'), and string (for 'stringers'). The key benefit is perfect, tangle-free presentation.</li>
                    <li><strong>Catapult:</strong> For firing boilies or larger particles at short to medium range.</li>
                    <li><strong>Throwing Stick (Cobra):</strong> A curved tube used to fling boilies out at long range with practice.</li>
                </ul>
            </BaitSection>
            
            <BaitSection title="Naturals & Other Baits">
                 <p>Never underestimate the power of natural or traditional baits, especially during colder months or for stalking.</p>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Maggots:</strong> Excellent in winter. A writhing ball of maggots presented in a PVA bag or with a maggot clip can be deadly when all else fails.</li>
                    <li><strong>Worms:</strong> A highly natural food source packed with attraction. Great for margin fishing or tipping a boilie hookbait for extra movement.</li>
                    <li><strong>Bread:</strong> From a simple piece of floating crust for surface fishing to compressed flakes on the hook, bread is a cheap and effective classic.</li>
                </ul>
            </BaitSection>

            <BaitSection title="Artificial Baits">
                <p>Durable plastic or foam baits that are great for their visual appeal and resistance to small fish. They can be soaked in flavourings to add extra attraction.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Artificial Corn/Maize:</strong> A buoyant, brightly coloured imitation that's perfect for tipping off a boilie to add a spot of colour and balance the rig.</li>
                    <li><strong>Zig Foam:</strong> Used for Zig Rigging to catch carp cruising in the upper layers of the water. Can be cut to any size and is available in multiple colours.</li>
                </ul>
            </BaitSection>
        </div>
    );
};

export default BaitGuide;