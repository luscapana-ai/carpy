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


const FishCareGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Ultimate Fish Care Guide</h1>
            <p className="mb-8 text-slate-400">Being a great angler isn't just about catching fish; it's about respecting your prize and ensuring it's returned safely to the water, in perfect condition, to grow bigger and fight another day. Good fish care is the mark of a true carp angler. This guide covers the essential practices.</p>

            <GuideSection title="The Essential Fish Care Kit">
                <p>These items are non-negotiable and should be the first things you pack. Having them ready is a sign of a responsible and well-prepared angler.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>A Large, Padded Unhooking Mat or Cradle:</strong> This is your number one priority. A 'cradle' style mat with high, padded sides is the best option as it fully contains the fish and prevents it from sliding out, offering maximum protection. Ensure it is placed on flat, clear ground.</li>
                    <li><strong>A Deep Landing Net (42-inch minimum):</strong> A large net with soft, fish-safe mesh is essential. The deep mesh allows the fish to rest comfortably in the water while you prepare.</li>
                    <li><strong>A Dedicated Weigh Sling:</strong> Modern weigh slings are designed to support the fish's full length and weight evenly. Look for one with full-length flotation aids and mesh sides for good water flow. Never weigh a fish by hanging it from its gills or jaw.</li>
                    <li><strong>Forceps or Pliers:</strong> For easily and safely removing a tricky or deep hook hold without causing damage to the fish's mouth.</li>
                    <li><strong>A Carp Care Kit:</strong> A small bottle of fish-safe antiseptic treatment (like Kryston Klin-ik or Gardner Medic Plus) to treat the hook hold and any other marks, lifted scales, or split fins on the fish's body.</li>
                    <li><strong>A Large Bucket of Lake Water:</strong> You will need this to keep the fish, the mat, and the sling constantly wet. A dry surface can remove the fish's protective slime layer.</li>
                </ul>
            </GuideSection>

            <GuideSection title="Preparation is Everything: The Pro Mindset">
                <p>The best anglers have their fish care station set up and ready to go *before* they even cast their first line. A calm, rehearsed process minimises stress for both you and the fish.</p>
                <SubHeading>Your Pre-Fishing Checklist</SubHeading>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Choose a Spot:</strong> Pick a flat, clear, and shaded (if possible) area for your unhooking mat, close to the water's edge.</li>
                    <li><strong>Lay Everything Out:</strong> Place your unhooking mat down. Open your weigh sling and place it next to the mat. Have your forceps, carp care kit, and scales ready and within immediate reach.</li>
                    <li><strong>Prepare Your Camera:</strong> If you plan to take a photo, set up your camera or phone on a small tripod now. Frame the shot on the mat so you're not fumbling with it later.</li>
                    <li><strong>Fill Your Bucket:</strong> Get a full bucket of lake water and place it right next to your mat.</li>
                </ol>
                <ExpertTip>This entire setup process should become second nature. Having everything prepared means that when you do get a bite, your full focus is on the fish, not on a frantic search for your scales or forceps.</ExpertTip>
            </GuideSection>

            <GuideSection title="From Landing to Mat: A Calm & Efficient Process">
                <p>This is a critical phase where a calm head and a smooth process are vital. The goal is to move the fish from the water to the mat as quickly and safely as possible.</p>
                 <SubHeading>The Step-by-Step Transfer</SubHeading>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Let the Fish Recover:</strong> Once the carp is in the net, let it rest in deep water for a minute or two. This allows it to regain some strength and makes it calmer to handle on the mat.</li>
                    <li><strong>Secure the Net:</strong> Unclip your net handle. Roll or twist the net mesh down to secure the fish safely within the bottom third of the net. This prevents it from thrashing.</li>
                    <li><strong>Use the Sling for Transfer:</strong> Submerge your weigh sling in the water. Carefully slide the landing net, with the fish inside, into the weigh sling.</li>
                    <li><strong>Lift & Carry:</strong> Holding the weigh sling's handles securely, lift the fish from the water. This method provides full support for the fish's body. Move quickly but carefully to your pre-wetted unhooking mat.</li>
                </ol>
                
                 <SubHeading>On The Mat: The First 30 Seconds</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Keep Everything Wet:</strong> The first thing you should do is pour a generous amount of lake water over the fish and the mat.</li>
                    <li><strong>Calm the Fish:</strong> Place the wet flap of your weigh sling or a damp cloth over the fish's eyes. This has a significant calming effect.</li>
                    <li><strong>Assess the Situation:</strong> Quickly locate the hook and check the fish for any other marks or injuries that may need attention.</li>
                </ul>
            </GuideSection>

            <GuideSection title="Unhooking, Weighing & First Aid">
                <SubHeading>Unhooking with Care</SubHeading>
                <p>With the fish calm, unhooking should be a quick and simple process. Hold the hook firmly and rotate it back the way it went in. If the hook is tricky to remove, use your forceps for a clean and easy extraction.</p>
                <SubHeading>Fish First Aid</SubHeading>
                <p>Apply your carp care antiseptic liberally to the hook hold. Check the fish's body and fins for any lifted scales, sores, or split fins, and treat these areas as well. This helps to prevent infection and promotes healing.</p>
                <SubHeading>Weighing with Care</SubHeading>
                 <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Zero Your Scales:</strong> Lift your wet, empty weigh sling and zero your scales to it. This ensures you're only weighing the fish.</li>
                    <li><strong>Secure the Fish:</strong> Carefully transfer the fish into the sling. Zip it up fully and make sure all fins are folded flat against its body to prevent damage.</li>
                    <li><strong>Lift Smoothly:</strong> Lift the scales smoothly and briefly to record the weight. Avoid bouncing or jerking the scales.</li>
                    <li><strong>Return to Mat:</strong> Get the fish back onto the mat and out of the sling as quickly as possible.</li>
                </ol>
            </GuideSection>

            <GuideSection title="Catch Photography: A Masterclass in Respect">
                <p>A good catch photo is a memory for a lifetime, but it must be done with the fish's safety as the absolute priority. The perfect shot is never worth risking the health of the carp.</p>
                <SubHeading>The Golden Rules of Holding a Carp</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Always Kneel:</strong> Never stand up while holding a carp. Stay low over the unhooking mat at all times. If the fish does slip, it has a very short and safe drop.</li>
                    <li><strong>Keep Your Hands Wet:</strong> Wet hands prevent the removal of the fish's vital protective slime layer.</li>
                    <li><strong>Support the Fish Correctly:</strong> Slide one hand under the fish's head, with your fingers cupping the large pectoral fin. Slide your other hand under the body just behind the anal fin. This provides full support for the fish's weight.</li>
                    <li><strong>Hold it Close to Your Body:</strong> Support the fish securely against your body. Holding it with outstretched arms gives you less control and is more likely to result in the fish being dropped.</li>
                    <li><strong>Keep it Brief & Wet:</strong> Limit the time the fish is held out of water to an absolute minimum (30 seconds at a time is a good rule). If you need more time, rest the fish back on the wet mat. Constantly pour water over the fish while it's on the mat.</li>
                 </ul>
                 
                <SubHeading>Self-Take Safety</SubHeading>
                <p>Taking your own photos requires extra preparation and care.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Frame the Shot First:</strong> Set your camera on a mini-tripod and frame the shot with your unhooking mat *before* you even lift the fish.</li>
                    <li><strong>Use a Remote or Timer:</strong> Use a Bluetooth remote shutter or your camera's self-timer. This is far safer than trying to handle a fish and a phone simultaneously.</li>
                    <li><strong>Be Quick:</strong> Be prepared to get one or two good shots and then return the fish. Don't strive for perfection at the fish's expense.</li>
                </ul>
                <ExpertTip>Think about your background. A photo with the lake and scenery behind you looks far better than one with your bivvy and bins in the shot. Position your mat accordingly before you start.</ExpertTip>
            </GuideSection>
            
            <GuideSection title="The Safe & Strong Return">
                <p>This is the final, crucial step. Your goal is to see the fish swim away strongly and in perfect health.</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Carry the fish back to the water in the weigh sling.</li>
                    <li>Gently lower the sling into the water in a clear, deep margin.</li>
                    <li>Unzip the sling and allow the fish to find its balance in the water.</li>
                    <li>Support the fish in an upright position with both hands, facing away from you, until it has fully recovered its strength. You will feel the fish trying to right itself.</li>
                    <li>Only release your grip when the fish gives a strong kick of its tail and swims away powerfully on its own. Never just drop the fish back.</li>
                </ol>
            </GuideSection>

            <GuideSection title="The Responsible Use of Retainer Slings">
                 <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">
                    <p className="font-bold">⚠️ CRITICAL: Sacking or retaining fish is a highly controversial practice and is banned on many fisheries. NEVER retain a fish for longer than absolutely necessary. Its welfare is your only priority.</p>
                </div>
                 <SubHeading>Ask Yourself Before Retaining:</SubHeading>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Is it allowed?</strong> Check the fishery rules first.</li>
                    <li><strong>Is it necessary?</strong> Is the fish genuinely exhausted and needs recovery time, or are you just waiting for better light? The latter is rarely a good enough reason.</li>
                    <li><strong>Is it safe?</strong> Is the water deep enough? Is it well-oxygenated? Are there snags nearby? If the answer to any of these is no, do not retain the fish.</li>
                    <li><strong>How long for?</strong> A 15-20 minute maximum is a good rule of thumb. Retaining a fish for hours is unacceptable.</li>
                 </ul>
            </GuideSection>
        </div>
    );
};

export default FishCareGuide;