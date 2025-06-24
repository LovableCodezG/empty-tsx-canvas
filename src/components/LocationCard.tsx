
import { 
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
} from "@/components/ui/card-curtain-reveal"

interface LocationCardProps {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  emoji: string
}

const LocationCard = ({ title, subtitle, description, imageSrc, emoji }: LocationCardProps) => {
  return (
    <CardCurtainReveal className="h-80 w-full border border-gray-200 bg-white text-gray-800 shadow-sm rounded-lg">
      <CardCurtainRevealBody className="p-4 flex flex-col justify-start h-full">
        <div className="text-2xl mb-3">{emoji}</div>
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
        <div className="text-sm text-gray-600 mb-3">{subtitle}</div>
        <p className="text-xs text-gray-700 leading-relaxed flex-1">
          {description}
        </p>
      </CardCurtainRevealBody>

      <CardCurtainRevealFooter className="absolute inset-0">
        <img
          width="100%"
          height="100%"
          alt={title}
          className="object-cover w-full h-full rounded-lg"
          src={imageSrc}
        />
      </CardCurtainRevealFooter>
    </CardCurtainReveal>
  )
}

export default LocationCard;
