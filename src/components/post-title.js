export default function PostTitle({ children }) {
  return (
    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-6 lg:mb-12 text-left">
      {children}
    </h1>
  )
}
