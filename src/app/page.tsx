import Hero from '@/components/home/Hero';
import Marquee from '@/components/ui/Marquee';
import OnThePass from '@/components/home/OnThePass';
import Specials from '@/components/home/Specials';
import PassBoard from '@/components/home/PassBoard';
import Numbers from '@/components/home/Numbers';
import HouseRules from '@/components/home/HouseRules';
import Faq from '@/components/home/Faq';
import ClosingCta from '@/components/home/ClosingCta';

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Marquee />
      <OnThePass />
      <Specials />
      <PassBoard />
      <Numbers />
      <HouseRules />
      <Faq />
      <ClosingCta />
    </main>
  );
}
