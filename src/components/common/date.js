import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'd LLLL yyyy', { locale: fr })}
    </time>
  )
}
