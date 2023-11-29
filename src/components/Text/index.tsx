import { Colors, FontSize, FontWeight } from 'themes'
import './text.css'

interface Props {
  content: string
  fontSize?: FontSize
  fontWeight?: FontWeight
  color?: Colors
}

const Text = ({
  content,
  fontSize = FontSize.TwoSmall,
  fontWeight = FontWeight.Regular,
  color = Colors.Black,
}: Props) => {
  return (
    <p className={`font-size-${fontSize} font-weight-${fontWeight} color-${color}`}>{content}</p>
  )
}

export default Text
