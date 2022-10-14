import type { NextPage } from 'next'
import cardService from '../services/cards.service';
import Cards from '../components/Cards';
import RightFloatingBtn from '../components/RightFloatingBtn';

const Stickies: NextPage = () => {
  const cards = cardService.FakeCardAPI();

  return (
    <div>
      <Cards cards={cards}/>
      <RightFloatingBtn/>
    </div>)
}

export default Stickies;
