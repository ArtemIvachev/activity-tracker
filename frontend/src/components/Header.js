export default function Header({ title, description }) {
  return (
    <div className='mb-8 mt-8 px-8'>
      <div className='items-left flex'>
        <div className='flex-1'>
          <h1 className='text-xl font-bold text-white'>{title}</h1>
          <p className='mt-2 text-sm text-white'>{description}</p>
        </div>
      </div>
    </div>
  )
}
