import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'LLLL	d, yyyy', { locale: fr })}
    </time>
  )
}
