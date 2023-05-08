import { cards } from '@/constants/cards'

function InfoCard({ title, description }) {
  return (
    <div className='m-4 flex rounded-2xl bg-neutral p-4'>
      <div>
        <h4 className='text-lg font-bold text-white'>{title}</h4>
        <p className='mt-1 text-white'>{description}</p>
      </div>
    </div>
  )
}
export default function Info() {
  return (
    <div className='mb-8 mt-8 px-8'>
      <div className='items-left mb-4 flex flex-col'>
        <div className='mb-8 flex'>
          <h1 className='text-xl font-bold text-white'>Полезная информация</h1>
        </div>
        <div className='flex justify-between'>
          {cards.map((card, index) => (
            <InfoCard key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
  )
}
